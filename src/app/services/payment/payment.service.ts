import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address/address';
import { PaymentType } from 'src/app/model/payment/payment';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  payByMoney(paymentDetails: PaymentByMoney): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentByMoney(paymentDetails);
    }
    return this.makePaymentByMoney(paymentDetails);
  }

  payByPix(paymentDetails: PaymentByPix): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentByPix(paymentDetails);
    }
    return this.makePaymentByPix(paymentDetails);
  }

  private makePaymentByMoney(paymentDetails: PaymentByMoney) {
    const url = `${environment.api}/purchases`;
    return this.http.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      payment: {
        type: PaymentType.MONEY
      },
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private makePaymentByPix(paymentDetails: PaymentByPix) {
    return new Observable<void>(observer => {
      this.toBase64(paymentDetails.receipt).then(result => {
        const url = `${environment.api}/purchases`;
        this.http.post<void>(url, {
          deliveryAddress: paymentDetails.deliveryAddress,
          payment: {
            type: PaymentType.PIX
          },
          products: paymentDetails.shoppingCart.map(s => ({
            amount: s.amount,
            productId: s.product.id,
            stockOptionId: s.stockOption?.id
          })),
          file: result,
          name: paymentDetails.receipt.name
        }).subscribe(() => {
          observer.next();
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  private retryPaymentByMoney(paymentDetails: PaymentByMoney) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return this.http.patch<void>(url, {
      payment: {
        type: PaymentType.MONEY
      }
    });
  }

  private retryPaymentByPix(paymentDetails: PaymentByPix) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return new Observable<void>(observer => {
      this.toBase64(paymentDetails.receipt).then(result => {
        this.http.patch<void>(url, {
          payment: {
            type: PaymentType.PIX
          },
          file: result,
          name: paymentDetails.receipt.name
        }).subscribe(() => {
          observer.next();
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  private toBase64(image: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

}

type PaymentByMoney = {
  deliveryAddress: Address;
  purchaseId?: string;
  shoppingCart: ShoppingCartProduct[];
}

type PaymentByPix = {
  receipt: File;
} & PaymentByMoney;