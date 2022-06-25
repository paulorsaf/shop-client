import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ActivatedRouteMock } from 'src/app/model/mocks/activated-route.mock';
import { AppState } from 'src/app/store/app-state';
import { productReducer } from 'src/app/store/product/product.reducers';
import { ProductPage } from './product.page';
import { loadProductSuccess } from 'src/app/store/product/product.actions';
import { ColorPipeModule } from 'src/app/pipes/color.pipe.module';

describe('ProductPage', () => {
  let component: ProductPage;
  let fixture: ComponentFixture<ProductPage>;
  let page: PageMock;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;

  beforeEach(waitForAsync(() => {
    activatedRoute = new ActivatedRouteMock();

    TestBed.configureTestingModule({
      declarations: [ ProductPage ],
      imports: [
        IonicModule.forRoot(),
        ColorPipeModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('product', productReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .compileComponents();

    fixture = TestBed.createComponent(ProductPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page start, then load product', done => {
    store.select('product').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    });
  });

  describe('given loading product', () => {

    it('then show product loader', () => {
      expect(page.querySelector('[test-id="loader"]')).not.toBeNull();
    });

    it('then hide product', () => {
      expect(page.querySelector('[test-id="product"]')).toBeNull();
    });

  });

  describe('given product loaded', () => {

    beforeEach(() => {
      const product = {id: 1} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    });

    it('then hide product loader', () => {
      expect(page.querySelector('[test-id="loader"]')).toBeNull();
    });

    it('then show product', () => {
      expect(page.querySelector('[test-id="product"]')).not.toBeNull();
    });

    describe('when product has colors', () => {

      beforeEach(() => {
        const product = {id: 1, colors: ['Amarelo', 'Verde', 'Vermelho']} as any;
        store.dispatch(loadProductSuccess({product}));
        fixture.detectChanges();
      });

      it('then show colors', () => {
        expect(page.querySelector('[test-id="product-colors"]')).not.toBeNull();
      });

      it('and user selects color, then mark color as selected', () => {
        page.querySelectorAll('[test-id="product-colors"] ion-icon')[1].click();
        fixture.detectChanges();

        expect(page.querySelectorAll('[test-id="product-colors"] ion-icon')[1]).toHaveClass('selected');
      });

    });

    it('when product doesnt have colors, then hide colors', () => {
      expect(page.querySelector('[test-id="product-colors"]')).toBeNull();
    });

    it('when product has sizes, then show sizes', () => {
      const product = {id: 1, sizes: ['M']} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-sizes"]')).not.toBeNull();
    });

    it('when product doesnt have sizes, then hide sizes', () => {
      expect(page.querySelector('[test-id="product-sizes"]')).toBeNull();
    });

    it('when product has description, then show description', () => {
      const product = {id: 1, description: 'any description'} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-description"]')).not.toBeNull();
    });

    it('when product doesnt have description, then hide description', () => {
      expect(page.querySelector('[test-id="product-description"]')).toBeNull();
    });

  });

});
