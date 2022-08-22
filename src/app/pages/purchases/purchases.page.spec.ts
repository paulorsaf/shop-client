import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { PaymentType } from 'src/app/model/payment/payment';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';
import { AppState } from 'src/app/store/app-state';
import { loadPurchasesFail, loadPurchasesSuccess } from 'src/app/store/purchases/purchases.actions';
import { purchasesReducer } from 'src/app/store/purchases/purchases.reducers';
import { PurchasesPage } from './purchases.page';

describe('PurchasesPage', () => {
  let component: PurchasesPage;
  let fixture: ComponentFixture<PurchasesPage>;
  let store: Store<AppState>;
  let page: PageMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ PurchasesPage ],
      imports: [
        PaymentTypePipeModule,
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchases', purchasesReducer)
      ]
    })
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then load purchases', done => {
    store.select('purchases').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading purchases', () => {

    it('then show purchases loader', () => {
      expect(page.querySelector('[test-id="purchases-loader"]')).not.toBeNull();
    });

    it('then hide purchases', () => {
      expect(page.querySelector('[test-id="purchases"]')).toBeNull();
    });

  })

  describe('given purchases loaded', () => {

    beforeEach(() => {
      const purchases = [{id: 1}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();
    })

    it('then hide purchases loader', () => {
      expect(page.querySelector('[test-id="purchases-loader"]')).toBeNull();
    });

    it('then show purchases', () => {
      expect(page.querySelector('[test-id="purchases"]')).not.toBeNull();
    });

    describe('when purchases found', () => {

      it('then show purchase list', () => {
        expect(page.querySelector('[test-id="purchases-list"]')).not.toBeNull();
      });

      it('then hide empty message', () => {
        expect(page.querySelector('[test-id="purchases-empty"]')).toBeNull();
      });

    })

    describe('when no purchases found', () => {

      beforeEach(() => {
        const purchases = [] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();
      })

      it('then hide purchase list', () => {
        expect(page.querySelector('[test-id="purchases-list"]')).toBeNull();
      });

      it('then show empty message', () => {
        expect(page.querySelector('[test-id="purchases-empty"]')).not.toBeNull();
      });

    })

    it("when payment type is by money, then hide payment status item", () => {
      const purchases = [{payment: {type: PaymentType.MONEY}}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment"]')).toBeNull();
    })

    it("when payment type is not by money, then show payment status item", () => {
      const purchases = [{payment: {type: PaymentType.PIX}}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment"]')).not.toBeNull();
    })

    describe('when delivery type is delivery', () => {

      beforeEach(() => {
        const purchases = [{address: {address: "anyAddress"}}] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();
      })

      it("then show delivery status item", () => {
        expect(page.querySelector('[test-id="deliverying"]')).not.toBeNull();
      })

      it("then hide ready for pick-up status item", () => {
        expect(page.querySelector('[test-id="ready-for-pick-up"]')).toBeNull();
      })

    })

    describe('when delivery type is pick-up', () => {

      beforeEach(() => {
        const purchases = [{address: null}] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();
      })

      it("then hide delivery status item", () => {
        expect(page.querySelector('[test-id="deliverying"]')).toBeNull();
      })

      it("then show ready for pick-up status item", () => {
        expect(page.querySelector('[test-id="ready-for-pick-up"]')).not.toBeNull();
      })

    })
    
    describe('given purchase status', () => {

      it('when status is not verifying payment, then hide verifying payment message', () => {
        const purchases = [{status: "ANY"}] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();

        expect(page.querySelector('[test-id="verifying-payment-message"]')).toBeNull();
      })

      it('when status is verifying payment, then show verifying payment message', () => {
        const purchases = [{status: "VERIFYING_PAYMENT"}] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();

        expect(page.querySelector('[test-id="verifying-payment-message"]')).not.toBeNull();
      })

    })
    
    describe('given payment', () => {

      it('when error on payment, then show error message', () => {
        const purchases = [{status: "ANY", payment: {error: {}}}] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();

        expect(page.querySelector('[test-id="payment-error"]')).not.toBeNull();
      })

      it('when no error on payment, then hide error message', () => {
        const purchases = [{status: "ANY", payment: {}}] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();

        expect(page.querySelector('[test-id="payment-error"]')).toBeNull();
      })

    })

  })

  describe('given error on loading purchases', () => {

    beforeEach(() => {
      const error = {error: "error"};
      store.dispatch(loadPurchasesFail({error}));
      fixture.detectChanges();
    })

    it('then show error message', done => {
      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

});