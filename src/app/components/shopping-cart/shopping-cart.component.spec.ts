import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { ProductOptionsPipeModule } from 'src/app/pipes/product-options/product-options.pipe.module';
import { ProductTotalPricePipeModule } from 'src/app/pipes/product-total-price/product-total-price.pipe.module';
import { AppState } from 'src/app/store/app-state';
import { addProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      imports: [
        IonicModule.forRoot(),
        ProductOptionsPipeModule,
        ProductTotalPricePipeModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  describe('given no products', () => {

    it('then show empty message', () => {
      expect(page.querySelector('[test-id="empty"]')).not.toBeNull();
    });

    it('then hide products list', () => {
      expect(page.querySelector('[test-id="products"]')).toBeNull();
    });

  });

  describe('given there are products', () => {

    beforeEach(() => {
      const shoppingCartProduct1: ShoppingCartProduct = {
        color: 'Azul',
        product: {id: 1, images: ['']},
        quantity: 1,
        size: 'M'
      } as any;
      store.dispatch(addProduct({shoppingCartProduct: shoppingCartProduct1}));
      const shoppingCartProduct2: ShoppingCartProduct = {
        color: 'Azul',
        product: {id: 1, images: ['']},
        quantity: 1,
        size: 'P'
      } as any;
      store.dispatch(addProduct({shoppingCartProduct: shoppingCartProduct2}));
      fixture.detectChanges();
    });

    it('then hide empty message', () => {
      expect(page.querySelector('[test-id="empty"]')).toBeNull();
    });

    it('then show products', () => {
      expect(page.querySelector('[test-id="products"]')).not.toBeNull();
    });

    it('then show products list', () => {
      expect(page.querySelectorAll('[test-id="product"]').length).toEqual(2);
    });

  });

});
