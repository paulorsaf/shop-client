import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { Banner } from 'src/app/model/banner/banner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product/product.service';
import { of } from 'rxjs';
import { HttpClientMock } from 'src/app/model/mocks/http-client.mock';
import { Category } from 'src/app/model/category/category';

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpClientMock;

  beforeEach(() => {
    http = new HttpClientMock();

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    })
    .overrideProvider(HttpClient, {useValue: http});

    service = TestBed.inject(CategoryService);
  });

  describe('given find all', () => {

    const categories: Category[] = <any> [{id: 1}, {id: 2}];

    beforeEach(() => {
      http._response = of(categories);
    })
  
    it('then call categories api', done => {
      service.findAll().subscribe(() => {
        expect(http._urlCalled).toContain("/categories");
        done();
      })
    });
  
    it('then return categories', done => {
      service.findAll().subscribe(response => {
        expect(response).toEqual(categories);
        done();
      })
    });

  })

});
