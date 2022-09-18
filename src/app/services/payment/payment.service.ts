import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address/address';
import { CreditCardPayment, PaymentType } from 'src/app/model/payment/payment';
import { CalculatePrice, CalculatePriceResponse } from 'src/app/model/purchase/calculate-price';
import { ProductNotes, ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  calculatePrice(calculate: CalculatePrice): Observable<CalculatePriceResponse> {
    const url = `${environment.api}/purchases/prices`;
    return this.http.patch<CalculatePriceResponse>(url, calculate);
  }

  payByMoney(paymentDetails: Payment): Observable<void> {
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

  payByCreditCard(paymentDetails: PaymentByCreditCard): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentByCreditCard(paymentDetails);
    }
    return this.makePaymentCreditCard(paymentDetails);
  }

  payBySavedCreditCard(paymentDetails: PaymentBySavedCreditCard): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentBySavedCreditCard(paymentDetails);
    }
    return this.makePaymentBySavedCreditCard(paymentDetails);
  }

  private makePaymentByMoney(paymentDetails: Payment) {
    const url = `${environment.api}/purchases`;
    return this.http.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        type: PaymentType.MONEY
      },
      productNotes: paymentDetails.productNotes,
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
          deliveryPrice: paymentDetails.deliveryPrice,
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

  private makePaymentCreditCard(paymentDetails: PaymentByCreditCard) {
    const url = `${environment.api}/purchases`;
    return this.http.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        billingAddress: paymentDetails.billingAddress,
        creditCard: paymentDetails.creditCard,
        type: PaymentType.CREDIT_CARD
      },
      productNotes: paymentDetails.productNotes,
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private makePaymentBySavedCreditCard(paymentDetails: PaymentBySavedCreditCard) {
    const url = `${environment.api}/purchases`;
    return this.http.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        creditCardId: paymentDetails.creditCardId,
        type: PaymentType.CREDIT_CARD
      },
      productNotes: paymentDetails.productNotes,
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private retryPaymentByMoney(paymentDetails: Payment) {
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

  private retryPaymentByCreditCard(paymentDetails: PaymentByCreditCard) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return this.http.patch<void>(url, {
      payment: {
        billingAddress: paymentDetails.billingAddress,
        creditCard: paymentDetails.creditCard,
        type: PaymentType.CREDIT_CARD
      }
    });
  }

  private retryPaymentBySavedCreditCard(paymentDetails: PaymentBySavedCreditCard) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return this.http.patch<void>(url, {
      payment: {
        creditCardId: paymentDetails.creditCardId,
        type: PaymentType.CREDIT_CARD
      }
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

type Payment = {
  deliveryAddress: Address;
  deliveryPrice: number;
  productNotes: ProductNotes[];
  purchaseId?: string;
  shoppingCart: ShoppingCartProduct[];
}

type PaymentByPix = {
  receipt: File;
} & Payment;

type PaymentByCreditCard = {
  billingAddress: Address;
  creditCard: CreditCardPayment;
} & Payment;

type PaymentBySavedCreditCard = {
  creditCardId: string;
} & Payment;