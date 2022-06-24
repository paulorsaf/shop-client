import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Banner } from 'src/app/model/banner/banner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientMock } from 'src/app/model/mocks/http-client.mock';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpClientMock;

  beforeEach(() => {
    http = new HttpClientMock();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
    .overrideProvider(HttpClient, {useValue: http});

    service = TestBed.inject(ProductService);
  });

  describe('given find product by id', () => {

    it('then call product by id url', done => {
      const product: Banner = <any> {id: 1, price: 10};
  
      http._response = of([product]);
  
      service.findById("1").subscribe(() => {
        expect(http._urlCalled.indexOf("/products/1") >= 0).toBeTruthy()
        done();
      })
    });

    it('then return product', done => {
      const product: Banner = <any> {id: 1, price: 10};
  
      http._response = of([product]);
  
      service.findById("1").subscribe(response => {
        expect(response).toEqual(product);
        done();
      })
    });

  })

});
