import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subscriber } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Purchase } from 'src/app/model/purchase/purchase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Purchase[]> {
    const url = `${environment.api}/purchases`;
    return this.http.get<Purchase[]>(url)
  }

  findById(id: string) {
    const url = `${environment.api}/purchases/${id}`;
    return this.http.get<Purchase>(url);
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
      switchMap(() => this.http.get<Purchase>(url))
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
      switchMap(() => this.http.get<Purchase>(url))
    );
  }

}
