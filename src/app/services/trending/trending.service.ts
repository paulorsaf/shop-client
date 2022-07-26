import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trending } from 'src/app/model/trending/trending';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Trending[]> {
    const url = `${environment.api}/trendins`;
    return this.http.get<Trending[]>(url);
  }

}
