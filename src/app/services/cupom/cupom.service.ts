import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cupom } from 'src/app/model/purchase/cupom';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  constructor(
    private http: HttpClient
  ) { }

  findCupom(cupom: string): Observable<Cupom> {
    const url = `${environment.api}/cupoms/${cupom}`;
    return this.http.get<Cupom>(url);
  }

}