import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Banner } from 'src/app/model/banner/banner';
import { map, switchMap, } from 'rxjs/operators';
import { Product } from 'src/app/model/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  findById(id: string): Observable<Product> {
    const url = `${environment.apiCms}/products/${id}?_format=json`;
    return this.http.get<Product[]>(url).pipe(
      switchMap(products => of(products[0])),
      map(product => {
        this.adjustProduct(product);
        return product;
      })
    );
  }

  findByCategory(id: string): Observable<Product[]> {
    const url = `${environment.apiCms}/categories/${id}/products?_format=json`;
    return this.http.get<Product[]>(url).pipe(
      map(products => {
        products.forEach(p => this.adjustProduct(p));
        return products;
      })
    );
  }

  private adjustProduct(product: Product) {
    product.images = this.transformArrayWithPrefix(product.images, environment.imageBaseUrl);
    product.image = product.images[0];
    product.colors = this.transformArray(product.colors);
    product.sizes = this.transformArray(product.sizes);
  }

  private transformArray(array) {
    if (!array) {
      return [];
    }
    return this.transformArrayWithPrefix(array, '');
  }

  private transformArrayWithPrefix(array, prefix: string) {
    const value = ((array as unknown) as string)?.split(', ');
    if (value) {
      return value.map(c => prefix + c);
    }
    return [];
  }

};
