import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadPurchaseDetailSuccess } from 'src/app/store/purchase-detail/purchase-detail.action';
import { purchaseDetailReducer } from 'src/app/store/purchase-detail/purchase-detail.reducers';
import { loadLastPurchase, loadLastPurchaseSuccess, loadPaymentPurchaseById } from 'src/app/store/purchases/purchases.actions';
import { purchasesReducer } from 'src/app/store/purchases/purchases.reducers';
import { addProduct, makePurchase } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { environment } from 'src/environments/environment';
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
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer),
        StoreModule.forFeature('purchases', purchasesReducer),
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

  describe('given page starts', () => {

    describe('when purchase detail is loaded', () => {

      beforeEach(() => {
        const purchase = {id: "anyId"} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        store.dispatch(makePurchase({payment: {type: "MONEY"}}));
      })

      it('then load last purchase', done => {
        fixture.detectChanges();

        store.select('purchases').subscribe(state => {
          expect(state.isLoadingPaymentPurchase).toBeTruthy();
          done();
        })
      })

      it('then load payment purchase by id', () => {
        spyOn(store, 'dispatch');
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledWith(loadPaymentPurchaseById());
      })

    })

    describe('when purchase detail is not loaded', () => {

      describe('and payment not by money', () => {

        beforeEach(() => {
          store.dispatch(makePurchase({payment: {type: "CREDIT_CARD"}}));
        })

        it('then load last purchase', done => {
          fixture.detectChanges();

          store.select('purchases').subscribe(state => {
            expect(state.isLoadingPaymentPurchase).toBeTruthy();
            done();
          })
        })

        it('then load last payment purchase', () => {
          spyOn(store, 'dispatch');
          fixture.detectChanges();
  
          expect(store.dispatch).toHaveBeenCalledWith(loadLastPurchase());
        })

      })
  
      it('and payment by money, then do not load last purchase', done => {
        store.dispatch(makePurchase({payment: {type: "MONEY"}}));
        fixture.detectChanges();

        store.select('purchases').subscribe(state => {
          expect(state.isLoadingPaymentPurchase).toBeFalsy();
          done();
        })
      })

    })

  })

  describe('given loading last purchase', () => {

    beforeEach(() => {
      store.dispatch(makePurchase({payment: {type: "CREDIT_CARD"}}));
      fixture.detectChanges();
    })

    it('then show last purchase loader', () => {
      expect(page.querySelector('[test-id="last-purchase-loader"]')).not.toBeNull();
    })

    it('then hide last purchase', () => {
      expect(page.querySelector('[test-id="last-purchase"]')).toBeNull();
    })

    describe('when loaded', () => {

      beforeEach(() => {
        store.dispatch(loadLastPurchaseSuccess({purchase: {
          payment: {receiptUrl: "anyReceiptUrl"
        }} as any}));
        fixture.detectChanges();
      })

      it('then hide last purchase loader', () => {
        expect(page.querySelector('[test-id="last-purchase-loader"]')).toBeNull();
      })
  
      it('then show last purchase', () => {
        expect(page.querySelector('[test-id="last-purchase"]')).not.toBeNull();
      })

      describe('and payment success', () => {
  
        it('then show last purchase success', () => {
          expect(page.querySelector('[test-id="last-purchase-success"]')).not.toBeNull();
        })
    
        it('then hide last purchase error', () => {
          expect(page.querySelector('[test-id="last-purchase-error"]')).toBeNull();
        })

      })

      describe('and payment fail', () => {

        beforeEach(() => {
          store.dispatch(loadLastPurchaseSuccess({purchase: {
            payment: {error: "any error"}
          } as any}));
          fixture.detectChanges();
        })
  
        it('then hide last purchase success', () => {
          expect(page.querySelector('[test-id="last-purchase-success"]')).toBeNull();
        })
    
        it('then show last purchase error', () => {
          expect(page.querySelector('[test-id="last-purchase-error"]')).not.toBeNull();
        })

      })

    })

  })

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

  describe('given payment not by money', () => {

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
