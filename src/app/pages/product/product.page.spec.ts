import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ActivatedRouteMock } from 'src/app/model/mocks/activated-route.mock';
import { AppState } from 'src/app/store/app-state';
import { productReducer } from 'src/app/store/product/product.reducers';
import { ProductPage } from './product.page';
import { loadProductSuccess } from 'src/app/store/product/product.actions';
import { ColorPipeModule } from 'src/app/pipes/color.pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';

describe('ProductPage', () => {
  let component: ProductPage;
  let fixture: ComponentFixture<ProductPage>;
  let page: PageMock;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    activatedRoute = new ActivatedRouteMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ ProductPage ],
      imports: [
        IonicModule.forRoot(),
        ColorPipeModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('product', productReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(ToastController, {useValue: toastController})
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

      it('then hide color required error message', () => {
        expect(page.querySelector('[test-id="color-required-error"]')).toBeNull();
      });

    });

    it('when product doesnt have colors, then hide colors', () => {
      expect(page.querySelector('[test-id="product-colors"]')).toBeNull();
    });

    describe('when product has sizes', () => {

      beforeEach(() => {
        const product = {id: 1, sizes: ['M']} as any;
        store.dispatch(loadProductSuccess({product}));
        fixture.detectChanges();
      });

      it('then show sizes', () => {
        expect(page.querySelector('[test-id="product-sizes"]')).not.toBeNull();
      });

      it('then hide size required error message', () => {
        expect(page.querySelector('[test-id="size-required-error"]')).toBeNull();
      });

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

  describe('given user clicks on add to shopping cart', () => {

    let product;

    beforeEach(() => {
      product = {id: 1} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    });

    it('then add product to shopping cart', done => {
      addToShoppintCart();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products).toEqual([{product, quantity: 1}]);
        done();
      });
    });

    it('then show success message', done => {
      addToShoppintCart();

      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100);
    });

    describe('when product has color', () => {

      beforeEach(() => {
        product = {id: 1, colors: ['Amarelo', 'Verde', 'Vermelho']} as any;
        store.dispatch(loadProductSuccess({product}));
        fixture.detectChanges();
      });

      describe('and color is not informed', () => {

        beforeEach(() => {
          addToShoppintCart();
        });

        it('and color is not informed, then dont add to shopping cart', done => {
          store.select('shoppingCart').subscribe(state => {
            expect(state.products).toEqual([]);
            done();
          });
        });

        it('and color is not informed, then show color required message', () => {
          expect(page.querySelector('[test-id="color-required-error"]')).not.toBeNull();
        });

      });

      describe('and color is informed', () => {

        beforeEach(() => {
          page.querySelectorAll('[test-id="color"]')[1].click();
          fixture.detectChanges();

          addToShoppintCart();
        });

        it('and color is informed, then add to shopping card', done => {
          store.select('shoppingCart').subscribe(state => {
            expect(state.products).toEqual([{color: 'Verde', product, quantity: 1}]);
            done();
          });
        });

        it('and color is informed, then hide color required message', () => {
          expect(page.querySelector('[test-id="color-required-error"]')).toBeNull();
        });

      });

    });

    describe('when product has size', () => {

      beforeEach(() => {
        product = {id: 1, sizes: ['P', 'M', 'G']} as any;
        store.dispatch(loadProductSuccess({product}));
        fixture.detectChanges();
      });

      describe('and size is not informed', () => {

        beforeEach(() => {
          addToShoppintCart();
        });

        it('then dont add to shopping cart', done => {
          store.select('shoppingCart').subscribe(state => {
            expect(state.products).toEqual([]);
            done();
          });
        });

        it('then show size required message', () => {
          expect(page.querySelector('[test-id="size-required-error"]')).not.toBeNull();
        });

      });

      describe('and size is informed', () => {

        beforeEach(() => {
          component.setSize({target: {value: 'M'}} as any);
          fixture.detectChanges();

          addToShoppintCart();
        });

        it('then add to shopping card', done => {
          store.select('shoppingCart').subscribe(state => {
            expect(state.products).toEqual([{size: 'M', product, quantity: 1}]);
            done();
          });
        });

        it('then hide size required message', () => {
          expect(page.querySelector('[test-id="size-required-error"]')).toBeNull();
        });

      });

    });

    const addToShoppintCart = () => {
      page.querySelector('[test-id="add-product-button"]').click();
      fixture.detectChanges();
    };

  });

});
