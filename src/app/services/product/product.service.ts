import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  findById(id: string): Observable<Product> {
    const url = `${environment.api}/products/${id}`;
    return this.http.get<Product>(url);
  }

  findByCategory(id: string): Observable<Product[]> {
    const url = `${environment.api}/categories/${id}/products`;
    return this.http.get<Product[]>(url);
  }

};
