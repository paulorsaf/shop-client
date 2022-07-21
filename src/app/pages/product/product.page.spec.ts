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
import { HeaderModule } from 'src/app/components/header/header.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
        StoreModule.forFeature('product', productReducer)
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

  xdescribe('given user clicks on add to shopping cart', () => {

    let product;

    beforeEach(() => {
      product = {id: 1} as any;
      store.dispatch(loadProductSuccess({product}));
      fixture.detectChanges();
    });

    it('then show success message', done => {
      addToShoppintCart();

      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100);
    });

    describe('when product has size', () => {

      beforeEach(() => {
        product = {id: 1, stockOptions: [{size: 'P'}, {size: 'M'}, {size: 'G'}]} as any;
        store.dispatch(loadProductSuccess({product}));
        fixture.detectChanges();
      });

      describe('and size is not informed', () => {

        beforeEach(() => {
          addToShoppintCart();
        });

      });

      describe('and size is informed', () => {

        beforeEach(() => {
          component.setSize({target: {value: 'M'}} as any);
          fixture.detectChanges();

          addToShoppintCart();
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
