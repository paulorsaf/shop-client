import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address/address';
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
    const url = `${environment.api}/payments/money`;
    return this.http.post<void>(url, paymentDetails);
  }

  payByPix(paymentDetails: PaymentByPix): Observable<void> {
    const url = `${environment.api}/payments/pix`;
    return this.http.post<void>(url, paymentDetails);
  }

}

type PaymentByMoney = {
  deliveryAddress: Address;
  shoppingCart: ShoppingCartProduct[]
}

type PaymentByPix = {
  receipt: File;
} & PaymentByMoney;