import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ActivatedRouteMock } from 'src/app/model/mocks/activated-route.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { categoryReducer } from 'src/app/store/category/category.reducers';
import { loadProductsByCategorySuccess } from 'src/app/store/products/products.actions';
import { productsReducer } from 'src/app/store/products/products.reducers';
import { CategoryPage } from './category.page';

describe('CategoryPage', () => {
  let component: CategoryPage;
  let fixture: ComponentFixture<CategoryPage>;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let page: PageMock;

  beforeEach(waitForAsync(() => {
    activatedRoute = new ActivatedRouteMock();

    TestBed.configureTestingModule({
      declarations: [ CategoryPage ],
      imports: [
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('category', categoryReducer),
        StoreModule.forFeature('products', productsReducer)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page start, then load categories', done => {
    store.select('category').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    });
  });

  it('given page start, then load category products', done => {
    store.select('products').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    });
  });

  describe('given loading category products', () => {

    it('then show category products loading', () => {
      expect(page.querySelector('[test-id="products-loader"]')).not.toBeNull();
    });

    it('then hide category products', () => {
      expect(page.querySelector('[test-id="products"]')).toBeNull();
    });

  });

  describe('given category products loaded', () => {

    beforeEach(() => {
      const products = [{id: 1}] as any;
      store.dispatch(loadProductsByCategorySuccess({products}));
      fixture.detectChanges();
    });

    it('then hide category products loading', () => {
      expect(page.querySelector('[test-id="products-loader"]')).toBeNull();
    });

    it('then show category products', () => {
      expect(page.querySelector('[test-id="products"]')).not.toBeNull();
    });

  });

});
