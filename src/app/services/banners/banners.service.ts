import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/model/banner/banner';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Banner[]> {
    const url = `${environment.api}/banners`;
    return this.http.get<Banner[]>(url);
  }

};
