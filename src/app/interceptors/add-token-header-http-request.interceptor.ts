import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AddTokenHeaderHttpRequestInterceptor implements HttpInterceptor {

  constructor(
    public auth: AngularFireAuth
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.idToken.pipe(
      take(1),
      map(token => {
        if (token){
          request = request.clone({
            headers: request.headers.set("Authorization", `Bearer ${token}`)
          });
        }
        return request;
      }),
      switchMap(request => {
        return next.handle(request)
      })
    )
  }
}
