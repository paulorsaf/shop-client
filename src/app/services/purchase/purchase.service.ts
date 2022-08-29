import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from 'src/app/model/purchase/purchase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() {
    const url = `${environment.api}/purchases`;
    return this.http.get<Purchase[]>(url);
  }

  findById(id: string) {
    const url = `${environment.api}/purchases/${id}`;
    return this.http.get<Purchase>(url);
  }

}
