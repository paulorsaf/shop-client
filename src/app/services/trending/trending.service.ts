import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Trending, TrendingWrapper } from 'src/app/model/trending/trending';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  findAll(): Observable<Trending[]> {
    const url = `${environment.apiCms}/trendings?_format=json`;
    return this.http.get<TrendingWrapper[]>(url).pipe(
      switchMap(trendings =>
        forkJoin(trendings.map(t => this.productService.findById(t.productId))).pipe(
          switchMap(products => of(products.map(p => {
            const trending: Trending = {
              title: p.title,
              description: p.description,
              id: p.id,
              image: p.images[0],
              price: p.price,
              priceWithDiscount: p.priceWithDiscount
            };
            return trending;
          })))
        )
      )
    );
  }

}
