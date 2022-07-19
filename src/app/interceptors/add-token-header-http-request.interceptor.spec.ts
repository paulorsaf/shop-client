import { TestBed } from '@angular/core/testing';
import { AddTokenHeaderHttpRequestInterceptor } from './add-token-header-http-request.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api/api.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('AddTokenHeaderHttpRequestInterceptorInterceptor', () => {
  
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  it('user logged should add header', () => {
    setupTest("jwtToken")

    apiService.get("testingApi").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`testingApi`);
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer jwtToken');
  });

  it('user not logged should not add header', () => {
    setupTest(null);
    
    apiService.get("testingApi").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`testingApi`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });

  function setupTest(token: any){
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
      ],
      providers: [
        ApiService,
        AngularFireAuth,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AddTokenHeaderHttpRequestInterceptor,
          multi: true,
        }
      ]
    }).overrideProvider(AngularFireAuth, <any> {useValue: {idToken: of(token)}})

    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  }

});