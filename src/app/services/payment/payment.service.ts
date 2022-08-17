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

  payByPix(paymentDetails: PaymentByPix): Observable<void> {
    const url = `${environment.api}/purchases`;
    return this.http.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      payment: {
        type: PaymentType.PIX,
        receipt: paymentDetails.receipt
      },
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

}

type PaymentByMoney = {
  deliveryAddress: Address;
  shoppingCart: ShoppingCartProduct[]
}

type PaymentByPix = {
  receipt: File;
} & PaymentByMoney;