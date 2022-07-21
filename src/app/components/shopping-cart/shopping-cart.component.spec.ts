import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AlertControllerMock } from 'src/app/model/mocks/alert-controller.mock';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ProductOptionsPipeModule } from 'src/app/pipes/product-options/product-options.pipe.module';
import { ProductTotalPricePipeModule } from 'src/app/pipes/product-total-price/product-total-price.pipe.module';
import { AppState } from 'src/app/store/app-state';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let page: PageMock;
  let store: Store<AppState>;
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
        StoreModule.forRoot([]),
        // StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(AlertController, {useValue: alertController})
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

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

  // describe('given there are products', () => {

  //   const shoppingCartProduct1: AddProduct = {
  //     color: 'Azul',
  //     id: '1',
  //     product: {id: 1, images: ['']} as any,
  //     size: 'M'
  //   };

  //   beforeEach(() => {
  //     store.dispatch(addProduct({shoppingCartProduct: shoppingCartProduct1}));
  //     fixture.detectChanges();
  //   });

  //   it('then hide empty message', () => {
  //     expect(page.querySelector('[test-id="empty"]')).toBeNull();
  //   });

  //   it('then show products', () => {
  //     expect(page.querySelector('[test-id="products"]')).not.toBeNull();
  //   });

  //   it('then show products list', () => {
  //     expect(page.querySelectorAll('[test-id="product"]').length).toEqual(1);
  //   });

  //   describe('when there is only one item', () => {

  //     it('then hide minus item button', () => {
  //       expect(page.querySelector('[test-id="minus-item"]')).toBeNull();
  //     });

  //     it('then show remove item button', () => {
  //       expect(page.querySelector('[test-id="remove-item"]')).not.toBeNull();
  //     });

  //   });

  //   describe('when there are multiple items', () => {

  //     beforeEach(() => {
  //       store.dispatch(addProduct({shoppingCartProduct: shoppingCartProduct1}));
  //       fixture.detectChanges();
  //     });

  //     it('then show minus item button', () => {
  //       expect(page.querySelector('[test-id="minus-item"]')).not.toBeNull();
  //     });

  //     it('then hide remove item button', () => {
  //       expect(page.querySelector('[test-id="remove-item"]')).toBeNull();
  //     });

  //   });

    // it('when user clicks to add an item, then add item', done => {
    //   page.querySelectorAll('[test-id="add-item"]')[0].click();
    //   fixture.detectChanges();

    //   store.select('shoppingCart').pipe(take(1)).subscribe(state => {
    //     expect(state.products[0].stockOption.quantity).toEqual(2);
    //     done();
    //   });
    // });

    // it('when user clicks to minus an item, then minus item', done => {
    //   store.dispatch(addProduct({shoppingCartProduct: shoppingCartProduct1}));
    //   fixture.detectChanges();

    //   page.querySelectorAll('[test-id="minus-item"]')[0].click();
    //   fixture.detectChanges();

    //   store.select('shoppingCart').pipe(take(1)).subscribe(state => {
    //     expect(state.products[0].stockOption.quantity).toEqual(1);
    //     done();
    //   });
    // });

    // describe('when user clicks to remove an item', () => {

    //   it('then ask remove item', done => {
    //     page.querySelectorAll('[test-id="remove-item"]')[0].click();
    //     fixture.detectChanges();

    //     setTimeout(() => {
    //       expect(alertController.isPresented).toBeTruthy();
    //       done();
    //     }, 100);
    //   });

      // it('then remove item', done => {
      //   page.querySelectorAll('[test-id="remove-item"]')[0].click();
      //   fixture.detectChanges();

      //   alertController.buttons[1].handler();

      //   store.select('shoppingCart').pipe(take(1)).subscribe(state => {
      //     expect(state.products.length).toEqual(0);
      //     done();
      //   });
      // });

  //   });

  // });

  // describe('given user clicks to finish purchase', () => {

  //   const shoppingCartProduct1: AddProduct = {
  //     color: 'Azul',
  //     id: '1',
  //     product: {id: 1, images: ['']} as any,
  //     size: 'M'
  //   };

  //   beforeEach(() => {
  //     store.dispatch(addProduct({shoppingCartProduct: shoppingCartProduct1}));
  //     fixture.detectChanges();

  //     page.querySelector('[test-id="finish-button"]').click();
  //     fixture.detectChanges();
  //   });

  //   xit('when user is not logged, then show login page', () => {
  //     expect(modalController.isPresented).toBeTruthy();
  //   });

  // });

});
