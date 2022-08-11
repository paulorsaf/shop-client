import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AlertControllerMock } from 'src/app/model/mocks/alert-controller.mock';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { ProductOptionsPipeModule } from 'src/app/pipes/product-options/product-options.pipe.module';
import { ProductTotalPricePipeModule } from 'src/app/pipes/product-total-price/product-total-price.pipe.module';
import { AppState } from 'src/app/store/app-state';
import { addProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { setUser } from 'src/app/store/user/user.actions';
import { userReducer } from 'src/app/store/user/user.reducers';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;
  let alertController: AlertControllerMock;
  let modalController: ModalControllerMock;

  beforeEach(waitForAsync(() => {
    alertController = new AlertControllerMock();
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      imports: [
        IonicModule.forRoot(),
        ProductOptionsPipeModule,
        ProductTotalPricePipeModule,
        RouterTestingModule.withRoutes([{
          path: 'delivery-address', component: BlankMockComponent
        }]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer),
        StoreModule.forFeature('user', userReducer)
      ]
    })
    .overrideProvider(AlertController, {useValue: alertController})
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

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

    const shoppingCartProduct1: ShoppingCartProduct = {
      amount: 1,
      product: {id: 1, images: ['']} as any,
      stockOption: {
        id: '2',
        color: 'Azul',
        size: 'M'
      }
    };

    beforeEach(() => {
      store.dispatch(addProduct({product: shoppingCartProduct1}));
      fixture.detectChanges();
    });

    it('then hide empty message', () => {
      expect(page.querySelector('[test-id="empty"]')).toBeNull();
    });

    it('then show products', () => {
      expect(page.querySelector('[test-id="products"]')).not.toBeNull();
    });

    it('then show products list', () => {
      expect(page.querySelectorAll('[test-id="product"]').length).toEqual(1);
    });

    describe('when there is only one item', () => {

      it('then hide minus item button', () => {
        expect(page.querySelector('[test-id="minus-item"]')).toBeNull();
      });

      it('then show remove item button', () => {
        expect(page.querySelector('[test-id="remove-item"]')).not.toBeNull();
      });

    });

    describe('when there are multiple items', () => {

      beforeEach(() => {
        store.dispatch(addProduct({product: shoppingCartProduct1}));
        fixture.detectChanges();
      });

      it('then show minus item button', () => {
        expect(page.querySelector('[test-id="minus-item"]')).not.toBeNull();
      });

      it('then hide remove item button', () => {
        expect(page.querySelector('[test-id="remove-item"]')).toBeNull();
      });

    });

    it('when user clicks to add an item, then add item', done => {
      page.querySelectorAll('[test-id="add-item"]')[0].click();
      fixture.detectChanges();

      store.select('shoppingCart').pipe(take(1)).subscribe(state => {
        expect(state.products[0].amount).toEqual(2);
        done();
      });
    });

    it('when user clicks to decrease an item, then decrease item', done => {
      store.dispatch(addProduct({product: shoppingCartProduct1}));
      fixture.detectChanges();

      page.querySelectorAll('[test-id="minus-item"]')[0].click();
      fixture.detectChanges();

      store.select('shoppingCart').pipe(take(1)).subscribe(state => {
        expect(state.products[0].amount).toEqual(1);
        done();
      });
    });

    describe('when user clicks to remove an item', () => {

      it('then ask remove item', done => {
        page.querySelectorAll('[test-id="remove-item"]')[0].click();
        fixture.detectChanges();

        setTimeout(() => {
          expect(alertController.isPresented).toBeTruthy();
          done();
        }, 100);
      });

      it('then remove item', done => {
        page.querySelectorAll('[test-id="remove-item"]')[0].click();
        fixture.detectChanges();

        alertController.buttons[1].handler();

        store.select('shoppingCart').pipe(take(1)).subscribe(state => {
          expect(state.products.length).toEqual(0);
          done();
        });
      });

    });

  });

  describe('given user clicks to finish purchase', () => {

    const shoppingCartProduct1: ShoppingCartProduct = {
      amount: 1,
      product: {id: 1, images: ['']} as any,
      stockOption: {
        id: '2',
        color: 'Azul',
        size: 'M'
      }
    };

    beforeEach(() => {
      store.dispatch(addProduct({product: shoppingCartProduct1}));
      fixture.detectChanges();
    });

    it('when user is not logged, then show login page', done => {
      page.querySelector('[test-id="finish-button"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(modalController.isPresented).toBeTruthy();
        done();
      }, 100)
    });

    describe('when user is logged', () => {

      beforeEach(() => {
        const user = {id: 1} as any;
        store.dispatch(setUser({user}));
        fixture.detectChanges();

        page.querySelector('[test-id="finish-button"]').click();
        fixture.detectChanges();
      })

      it('then hide modal', () => {
        expect(modalController.isDismissed).toBeTruthy();
      });

      it('then delivery address page', done => {
        setTimeout(() => {
          expect(location.path()).toEqual('/delivery-address');
          done();
        }, 100)
      });

    })

  });

});
