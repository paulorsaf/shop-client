import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  find(): Observable<Company> {
    const url = `${environment.api}/companies`;
    return this.http.get<Company>(url);
  }

  findById(id: string): Observable<Company> {
    const url = `${environment.api}/companies/${id}`;
    return this.http.get<Company>(url);
  }

}
