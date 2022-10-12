import { TestBed } from '@angular/core/testing';
import { AddCompanyHeaderHttpRequestInterceptor } from './add-company-header-http-request.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { Store, StoreModule } from '@ngrx/store';
import { organizationReducer } from '../store/organization/organization.reducers';
import { AppState } from '../store/app-state';
import { setSelectedCompany } from '../store/organization/organization.action';

describe('AddCompanyHeaderHttpRequestInterceptor', () => {
  
  let httpMock: HttpTestingController;
  let apiService: ApiService;
  let store: Store<AppState>;

  it('given http request, when there is company selected, then add company header', () => {
    setupTest("jwtToken");
    
    const company = {id: "anySelectedCompanyId"} as any;
    store.dispatch(setSelectedCompany({company}));

    apiService.get("testingApi").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`testingApi`);
    expect(httpRequest.request.headers.get('Company')).toEqual("anySelectedCompanyId");
  });

  function setupTest(token: any){
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('organization', organizationReducer)
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

    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  }

});