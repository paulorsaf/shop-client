import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/model/payment/credit-card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(
    private http: HttpClient
  ) { }

  delete(id: string): Observable<CreditCard[]> {
    const url = `${environment.api}/payments/creditcards/${id}`;
    return this.http.delete<CreditCard[]>(url)
  }

  find(): Observable<CreditCard[]> {
    const url = `${environment.api}/payments/creditcards`;
    return this.http.get<CreditCard[]>(url)
  }

}
