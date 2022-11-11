import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, of, Subscriber } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Address } from 'src/app/model/address/address';
import { ProductNotes } from 'src/app/model/product/product-notes';
import { Purchase } from 'src/app/model/purchase/purchase';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Purchase[]> {
    const url = `${environment.api}/purchases`;
    return this.apiService.get<Purchase[]>(url)
  }

  findById(id: string) {
    const url = `${environment.api}/purchases/${id}`;
    return this.apiService.get<Purchase>(url);
  }

  findLastPurchase(): Observable<Purchase> {
    let counter = 0;
    return new Observable(observer => {
      return this.makeCallLastPurchase(observer, counter)
    })
  }

  findPaymentPurchase(id: string): Observable<Purchase> {
    let counter = 0;
    return new Observable(observer => {
      return this.makeCallPaymentPurchase(id, observer, counter)
    })
  }

  savePurchase(purchase: SavePurchase) {
    const url = `${environment.api}/purchases`;
    return this.apiService.post<void>(url, {
      deliveryAddress: purchase.deliveryAddress,
      deliveryPrice: purchase.deliveryPrice,
      productNotes: purchase.productNotes,
      products: purchase.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private makeCallLastPurchase(observer: Subscriber<Purchase>, counter: number) {
    this.callLastPurchase().pipe(take(1)).subscribe(response => {
      if (counter === 2 || response.payment.error || response.payment.id){
        observer.next(response);
        observer.complete();
      } else {
        this.makeCallLastPurchase(observer, ++counter);
      }
    }, error => {
      observer.error(error);
      observer.complete();
    })
  }

  private callLastPurchase() {
    const url = `${environment.api}/purchases/last`;
    return interval(5000).pipe(
      switchMap(() => this.apiService.get<Purchase>(url))
    );
  }

  private makeCallPaymentPurchase(id: string, observer: Subscriber<Purchase>, counter: number) {
    this.callPaymentPurchase(id).pipe(take(1)).subscribe(response => {
      if (counter === 2 || response.payment.error || response.payment.id){
        observer.next(response);
        observer.complete();
      } else {
        this.makeCallPaymentPurchase(id, observer, ++counter);
      }
    }, error => {
      observer.error(error);
      observer.complete();
    })
  }

  private callPaymentPurchase(id: string) {
    const url = `${environment.api}/purchases/${id}`;
    return interval(5000).pipe(
      switchMap(() => this.apiService.get<Purchase>(url))
    );
  }

}

type SavePurchase = {
  deliveryAddress: Address;
  deliveryPrice: number;
  productNotes: ProductNotes[];
  shoppingCart: ShoppingCartProduct[];
}