import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ActivatedRouteMock } from 'src/app/model/mocks/activated-route.mock';
import { AppState } from 'src/app/store/app-state';
import { productReducer } from 'src/app/store/product/product.reducers';
import { ProductPage } from './product.page';
import { loadProductSuccess, setSelectedColor, setSelectedSize } from 'src/app/store/product/product.actions';
import { ColorPipeModule } from 'src/app/pipes/color/color.pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { ProductOptionsPipeModule } from 'src/app/pipes/product-options/product-options.pipe.module';
import { ProductOptionsPipe } from 'src/app/pipes/product-options/product-options.pipe';
import { HasSizePipeModule } from 'src/app/pipes/product-has-size/product-has-size.pipe.module';
import { HasColorPipeModule } from 'src/app/pipes/product-has-color/product-has-color.pipe.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { addProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';

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
      const product = {id: 1, stock: [{color: 'Amarelo'}]} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-colors"]')).not.toBeNull();
    });

    it('when product doesnt have sizes, then hide sizes', () => {
      expect(page.querySelector('[test-id="product-sizes"]')).toBeNull();
    });

    it('when product has sizes, then show sizes', () => {
      const product = {id: 1, stock: [{size: 'M'}]} as any;
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
      const product = {id: 1, stock: [
        {color: 'Amarelo', size: 'M'}, {color: 'Verde', size: 'P'}, {color: 'Vermelho', size: 'G'}
      ]} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    })

    it('when size is not selected, then hide colors', () => {
      expect(page.querySelector('[test-id="product-colors"]')).toBeNull();
    })

    it('when size is selected, then show colors', () => {
      store.dispatch(setSelectedSize({size: "anySize"}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="product-colors"]')).not.toBeNull();
    })

    it('when user changes size, then remove selected color', done => {
      store.dispatch(setSelectedColor({color: "anyColor"}));
      fixture.detectChanges();

      store.dispatch(setSelectedSize({size: "anySize"}));
      fixture.detectChanges();

      store.select('product').subscribe(state => {
        expect(state.selectedColor).toBeUndefined();
        done();
      })
    })

  })

  describe('given user clicks on add to shopping cart', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })

    it('when product doesnt have stock options, then add product to shopping cart without stock options', done => {
      const product = {id: 1} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();

      clickOnAddToShoppingCartButton();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products[0]).toEqual({amount: 1, product});
        done();
      })
    });

    it('when product has stock options, then add product to shopping cart with stock options', done => {
      const product = {
        id: 1,
        stock: [{id: "anyStockOptionId", color: "anyColor", size: "anySize", quantity: 10}]
      } as any;
      dispatchLoadProductSuccess(product);
      store.dispatch(setSelectedSize({size: "anySize"}));
      store.dispatch(setSelectedColor({color: "anyColor"}));
      fixture.detectChanges();

      clickOnAddToShoppingCartButton();

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
      const product = {
        id: 1,
        stock: [{id: "anyStockOptionId", color: "anyColor", quantity: 10}]
      } as any;
      dispatchLoadProductSuccess(product);
      store.dispatch(setSelectedColor({color: "anyColor"}));
      fixture.detectChanges();

      clickOnAddToShoppingCartButton();

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
      const product = {
        id: 1,
        stock: [{id: "anyStockOptionId", size: "anySize", quantity: 10}]
      } as any;
      dispatchLoadProductSuccess(product);

      store.dispatch(setSelectedSize({size: "anySize"}));
      fixture.detectChanges();

      clickOnAddToShoppingCartButton();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products[0]).toEqual({
          amount: 1, product, stockOption: {
            id: "anyStockOptionId", size: "anySize", color: undefined
          }
        });
        done();
      })
    });

    function clickOnAddToShoppingCartButton() {
      page.querySelector('[test-id="add-product-button"]').click();
      fixture.detectChanges();
    };

    function dispatchLoadProductSuccess(product) {
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    };

  });

  describe('given reduce product button', () => {

    beforeEach(() => {
      const product = {id: "anyProductId1"} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    })

    it('when shopping cart for product has no elements, then disable reduce product button', () => {
      expect(page.querySelector('[test-id="reduce-product-button"]').disabled).toBeTruthy();
    })
  
    it('when shopping cart for product has elements, then enable reduce product button', () => {
      store.dispatch(addProduct({product: {product: {id: "anyProductId1"}} as any}));
      fixture.detectChanges();
  
      expect(page.querySelector('[test-id="reduce-product-button"]').disabled).toBeFalsy();
    })

  })

  describe('given user clicks on remove from shopping cart', () => {

    beforeEach(() => {
      const product = {id: "anyProductId1"} as any;
      store.dispatch(loadProductSuccess({product}));

      store.dispatch(addProduct({product: {product: {id: "anyProductId1"}} as any}));
      fixture.detectChanges();
    })

    it('when only one product exists on shopping cart, then remove product', done => {
      page.querySelector('[test-id="reduce-product-button"]').click();
      fixture.detectChanges();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products).toEqual([]);
        done();
      })
    })

    it('when multiple products exist on shopping cart, then decrease amount', done => {
      store.dispatch(addProduct({product: {product: {id: "anyProductId1"}} as any}));
      fixture.detectChanges();

      page.querySelector('[test-id="reduce-product-button"]').click();
      fixture.detectChanges();

      store.select('shoppingCart').subscribe(state => {
        expect(state.products).toEqual([{
          product: {id: "anyProductId1"}, amount: 1
        }] as any);
        done();
      })
    })

  })

});
