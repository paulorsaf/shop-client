import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AddCompanyHeaderHttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store
      .select('organization')
      .pipe(
        take(1),
        switchMap(state => {
          if (state.selectedCompany) {
            request = request.clone({
              headers: request.headers.set("Company", state.selectedCompany.id)
            });
          }
          return next.handle(request);
        })
      )
  }
}
