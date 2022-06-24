import { TestBed } from '@angular/core/testing';
import { BannersService } from './banners.service';
import { Banner } from 'src/app/model/banner/banner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product/product.service';
import { of } from 'rxjs';
import { HttpClientMock } from 'src/app/model/mocks/http-client.mock';
import { ProductServiceMock } from 'src/app/model/mocks/product.service.mock';

describe('BannersService', () => {
  let service: BannersService;
  let productService: ProductServiceMock;
  let http: HttpClientMock;

  beforeEach(() => {
    http = new HttpClientMock();
    productService = new ProductServiceMock();

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    })
    .overrideProvider(ProductService, {useValue: productService})
    .overrideProvider(HttpClient, {useValue: http});

    service = TestBed.inject(BannersService);
  });

  describe('given find all', () => {

    const banner1: Banner = <any> {id: 1, price: 10};
    const banners = [banner1];

    beforeEach(() => {
      http._response = of([{productId: 1}]);
  
      productService._response = banners;
    })

    it('then call product by id url', done => {
      service.findAll().subscribe(() => {
        expect(http._urlCalled.indexOf("/banners") >= 0).toBeTruthy()
        done();
      })
    });
  
    it('then return banners', done => {
      service.findAll().subscribe(response => {
        expect(response).toEqual(banners);
        done();
      })
    });

  })

});
