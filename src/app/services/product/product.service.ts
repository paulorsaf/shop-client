import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Banner } from 'src/app/model/banner/banner';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  findById(id: string) : Observable<Banner> {
    const url = `${environment.apiCms}/products/${id}?_format=json`;
    return this.http.get<Banner[]>(url).pipe(
      switchMap(banners => of(banners[0])),
      map(banner => {
        banner.image = environment.imageBaseUrl + banner.image;
        return banner;
      })
    );
  }

}