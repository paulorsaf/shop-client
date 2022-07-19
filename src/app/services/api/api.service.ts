import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: any) : Observable<T>{
        return this.http.get<T>(url, {params});
    }

    delete<T>(url: string, params?: any) : Observable<T>{
        return this.http.delete<T>(url);
    }

    post<T>(url: string, body?: any) : Observable<T>{
        return this.http.post<T>(url, body);
    }

    postMultipart<T>(url: string, file?: any, fileName?: string) : Observable<T>{
        let formData = new FormData();
        formData.append('files', file, fileName);

        return this.http.post<T>(url, formData)
    }

    patch<T>(url: string, body?: any) : Observable<T>{
        return this.http.patch<T>(url, body);
    }

}