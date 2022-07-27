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
import { ColorPipeModule } from 'src/app/pipes/color/color.pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { ProductOptionsPipeModule } from 'src/app/pipes/product-options/product-options.pipe.module';
import { ProductOptionsPipe } from 'src/app/pipes/product-options/product-options.pipe';
import { HasSizePipeModule } from 'src/app/pipes/product-has-size/product-has-size.pipe.module';
import { HasColorPipeModule } from 'src/app/pipes/product-has-color/product-has-color.pipe.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';

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
        HasColorPipeModule,
        HasSizePipeModule,
        RouterTestingModule.withRoutes([]),
        ProductOptionsPipeModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('product', productReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ],
      providers: [
        ProductOptionsPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

    it('when product doesnt have colors, then hide colors', () => {
      expect(page.querySelector('[test-id="product-colors"]')).toBeNull();
    });

    it('when product has colors, then show colors', () => {
      const product = {id: 1, stockOptions: [
        {color: 'Amarelo'}, {color: 'Verde'}, {color: 'Vermelho'}
      ]} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-colors"]')).not.toBeNull();
    });

    it('when product doesnt have sizes, then hide sizes', () => {
      expect(page.querySelector('[test-id="product-sizes"]')).toBeNull();
    });

    it('when product has sizes, then show sizes', () => {
      const product = {id: 1, stockOptions: [{size: 'M'}]} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-sizes"]')).not.toBeNull();
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

  describe('given product has colors and sizes', () => {

    beforeEach(() => {
      const product = {id: 1, stockOptions: [
        {color: 'Amarelo', size: 'M'}, {color: 'Verde', size: 'P'}, {color: 'Vermelho', size: 'G'}
      ]} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    })

    it('when size is not selected, then hide colors', () => {
      expect(page.querySelector('[test-id="product-colors"]')).toBeNull();
    })

    it('when size is selected, then show colors', () => {
      component.selectedSize = "M";
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-colors"]')).not.toBeNull();
    })

    it('when user changes size, then remove selected color', () => {
      component.setColor('Verde');
      fixture.detectChanges();

      component.setSize({target: {value: 'M'}} as any);
      fixture.detectChanges();

      expect(component.selectedColor).toEqual("");
    })

  })

  describe('given user clicks on add to shopping cart', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })

    it('when product doesnt have stock options, then add product to shopping cart without stock options', done => {
      const product = dispatchLoadProductSuccessWithoutStockOptions();

      addToShoppingCart();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products[0]).toEqual({amount: 1, product});
        done();
      })
    });

    it('when product has stock options, then add product to shopping cart with stock options', done => {
      const product = dispatchLoadProductSuccessWithStockOptions("anyColor", "anySize");

      component.selectedColor = "anyColor";
      component.selectedSize = "anySize";
      fixture.detectChanges();

      addToShoppingCart();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products[0]).toEqual({
          amount: 1, product, stockOption: {
            id: "anyStockOptionId", color: "anyColor", size: "anySize"
          }
        });
        done();
      })
    });

    it('when product has stock options with only color, then add product to shopping cart with stock option', done => {
      const product = dispatchLoadProductSuccessWithStockOptions("anyColor", undefined);

      component.selectedColor = "anyColor";
      fixture.detectChanges();

      addToShoppingCart();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products[0]).toEqual({
          amount: 1, product, stockOption: {
            id: "anyStockOptionId", color: "anyColor", size: undefined
          }
        });
        done();
      })
    });

    it('when product has stock options with only size, then add product to shopping cart with stock option', done => {
      const product = dispatchLoadProductSuccessWithStockOptions(undefined, "anySize");

      component.selectedSize = "anySize";
      fixture.detectChanges();

      addToShoppingCart();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products[0]).toEqual({
          amount: 1, product, stockOption: {
            id: "anyStockOptionId", size: "anySize", color: undefined
          }
        });
        done();
      })
    });

    it('then show success message', done => {
      dispatchLoadProductSuccessWithoutStockOptions();

      addToShoppingCart();

      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100);
    });

    function addToShoppingCart() {
      page.querySelector('[test-id="add-product-button"]').click();
      fixture.detectChanges();
    };

    function dispatchLoadProductSuccessWithStockOptions(color: string, size: string) {
      const product = {
        id: 1,
        stockOptions: [{id: "anyStockOptionId", color, size, quantity: 10}]
      } as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      return product;
    };

    function dispatchLoadProductSuccessWithoutStockOptions() {
      const product = {
        id: 1
      } as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      return product;
    };

  });

});
