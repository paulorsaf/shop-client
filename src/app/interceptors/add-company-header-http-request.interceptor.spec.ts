import { TestBed } from '@angular/core/testing';
import { AddCompanyHeaderHttpRequestInterceptor } from './add-company-header-http-request.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api/api.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('AddCompanyHeaderHttpRequestInterceptor', () => {
  
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  it('given http request, then add company header', () => {
    setupTest("jwtToken")

    apiService.get("testingApi").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`testingApi`);
    expect(httpRequest.request.headers.get('Company')).toEqual(environment.companyId);
  });

  function setupTest(token: any){
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AddCompanyHeaderHttpRequestInterceptor,
          multi: true,
        }
      ]
    })

    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  }

});