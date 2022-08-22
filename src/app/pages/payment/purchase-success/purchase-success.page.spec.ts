import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { addProduct, makePurchase } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { PurchaseSuccessPage } from './purchase-success.page';

describe('PurchaseSuccessPage', () => {
  let component: PurchaseSuccessPage;
  let fixture: ComponentFixture<PurchaseSuccessPage>;
  let page: PageMock;
  let location: Location;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PurchaseSuccessPage
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: BlankMockComponent },
          { path: 'purchases', component: BlankMockComponent },
        ]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseSuccessPage);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    store.dispatch(addProduct({product: {
      product: {id: "anyProductId"} as any,
      amount: 1
    }}));
  }));

  describe('given payment by money', () => {

    beforeEach(() => {
      store.dispatch(makePurchase({
        payment: {type: "MONEY"}
      }));
      fixture.detectChanges();
    })

    it('then hide waiting for payment confirmation message', () => {
      expect(page.querySelector('[test-id="payment-confirmation"]')).toBeNull();
    });
    
    it('then show my purchases button', () => {
      expect(page.querySelector('[test-id="my-purchases-button"]')).not.toBeNull();
    });
    
    it('then show home button', () => {
      expect(page.querySelector('[test-id="home-button"]')).not.toBeNull();
    });
  
    it('then show purchase success message', () => {
      expect(page.querySelector('[test-id="purchase-success"]')).not.toBeNull();
    });

  });

  it('given user clicks on home button, then go to home', done => {
    page.querySelector('[test-id="home-button"]').click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/home');
      done();
    }, 100)
  })

  it('given user clicks on home button, then clear purchase details', done => {
    page.querySelector('[test-id="home-button"]').click();
    fixture.detectChanges();

    store.select('shoppingCart').subscribe(state => {
      expect(state.products).toEqual([]);
      done();
    })
  })

  it('given user clicks on my purchases button, then go to my purchases', done => {
    page.querySelector('[test-id="my-purchases-button"]').click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/purchases');
      done();
    }, 200)
  })

  it('given user clicks on my purchases button, then clear purchase details', done => {
    page.querySelector('[test-id="my-purchases-button"]').click();
    fixture.detectChanges();

    store.select('shoppingCart').subscribe(state => {
      expect(state.products).toEqual([]);
      done();
    })
  })

  describe('given payment by pix', () => {

    beforeEach(() => {
      store.dispatch(makePurchase({
        payment: {type: "PIX"}
      }));
      fixture.detectChanges();
    })

    it('then show waiting for payment confirmation message', () => {
      expect(page.querySelector('[test-id="payment-confirmation"]')).not.toBeNull();
    });
  
    it('then hide payment success message', () => {
      expect(page.querySelector('[test-id="purchase-success"]')).toBeNull();
    });
    
    it('then show home button', () => {
      expect(page.querySelector('[test-id="home-button"]')).not.toBeNull();
    });
    
    it('then show my purchases button', () => {
      expect(page.querySelector('[test-id="my-purchases-button"]')).not.toBeNull();
    });

  })

});
