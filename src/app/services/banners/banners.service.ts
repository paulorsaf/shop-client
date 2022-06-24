import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable, of } from 'rxjs';
import { Banner, BannerWrapper } from 'src/app/model/banner/banner';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  findAll(): Observable<Banner[]> {
    const url = `${environment.apiCms}/banners?_format=json`;
    return this.http.get<BannerWrapper[]>(url).pipe(
      switchMap(banners =>
        forkJoin(banners.map(b => this.productService.findById(b.productId))).pipe(
          switchMap(products => of(products.map(p => {
            const banner: Banner = {
              title: p.title,
              body: p.body,
              id: p.id,
              image: p.images[0],
              price: p.price,
              priceWithDiscount: p.priceWithDiscount
            };
            return banner;
          })))
        ),
      )
    );
  }

};
