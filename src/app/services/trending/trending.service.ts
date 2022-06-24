import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
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

  findAll() : Observable<Trending[]> {
    const url = `${environment.apiCms}/trendings?_format=json`;
    return this.http.get<TrendingWrapper[]>(url).pipe(
      switchMap(trendings =>
        forkJoin(trendings.map(t => this.productService.findById(t.productId)))
      )
    );
  }

}
