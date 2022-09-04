import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  findByZipCode(zipCode: string): Observable<Address> {
    const url = `${environment.api}/address/zipcode/${zipCode.replace(/[^\d]/g, '')}`;
    return this.http.get<Address>(url);
  }

  findDeliveryPrice(zipCode: string): Observable<number> {
    const url = `${environment.api}/deliveries/${zipCode.replace(/[^\d]/g, '')}`;
    return this.http.get<number>(url);
  }

};
