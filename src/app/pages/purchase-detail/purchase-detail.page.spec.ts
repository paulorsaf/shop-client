import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PurchaseDetailPage } from './purchase-detail.page';
import { AppState } from 'src/app/store/app-state';
import { purchaseDetailReducer } from 'src/app/store/purchase-detail/purchase-detail.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteMock } from 'src/app/model/mocks/activated-route.mock';
import { ActivatedRoute } from '@angular/router';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { loadPurchaseDetailFail, loadPurchaseDetailSuccess } from 'src/app/store/purchase-detail/purchase-detail.action';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { companyReducer } from 'src/app/store/company/company.reducers';

describe('PurchaseDetailPage', () => {
  let component: PurchaseDetailPage;
  let fixture: ComponentFixture<PurchaseDetailPage>;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let page: PageMock;
  let modalController: ModalControllerMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    activatedRoute = new ActivatedRouteMock();
    modalController = new ModalControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [
        PurchaseDetailPage
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        PaymentTypePipeModule,
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('company', companyReducer),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(ModalController, {useValue: modalController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then load purchase detail', done => {
    store.select('purchaseDetail').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading purchase', () => {

    it('then show purchase detail loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).not.toBeNull();
    })

    it('then hide purchase detail', () => {
      expect(page.querySelector('[test-id="purchase-detail"]')).toBeNull();
    })

  })

  describe('given purchase loaded', () => {

    beforeEach(() => {
      const purchase = {id: '1', price: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then hide purchase detail loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show purchase detail', () => {
      expect(page.querySelector('[test-id="purchase-detail"]')).not.toBeNull();
    })

    it('when payment doesnt have error, then hide payment error', () => {
      expect(page.querySelector('[test-id="payment-error"]')).toBeNull();
    })

    it('when payment has error, then show payment error', () => {
      const purchase = {id: '1', payment: {error: 'any error'}, price: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment-error"]')).not.toBeNull();
    })

    describe('when status is waiting for payment', () => {

      let purchase;

      beforeEach(() => {
        purchase = {id: '1', payment: {}, status: "WAITING_PAYMENT", price: {}} as any;
      })

      it('and there is no error, then show payment button', () => {
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
        
        expect(page.querySelector('[test-id="payment-button"]')).not.toBeNull();
      })

      it('and there is error, then hide payment button', () => {
        purchase.payment.error = {};
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();

        expect(page.querySelector('[test-id="payment-button"]')).toBeNull();
      })

      it('when user clicks on payment button, then show payment page', done => {
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
        
        page.querySelector('[test-id="payment-button"]').click();
        fixture.detectChanges();

        setTimeout(() => {
          expect(modalController.isPresented).toBeTruthy();;
          done();
        }, 100)
      })

    })

  })

  describe('given purchase loaded with error', () => {

    beforeEach(() => {
      const error = {id: '1'} as any;
      store.dispatch(loadPurchaseDetailFail({error}));
      fixture.detectChanges();
    })

    it('then hide purchase detail loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show error message', done => {
      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

  describe('given payment by pix', () => {

    beforeEach(() => {
      const purchase = {id: '1', payment: {type: 'PIX', receiptUrl: "receiptUrl"}, price: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then hide payment by money details', () => {
      expect(page.querySelector('[test-id="payment-by-money"]')).toBeNull();
    })

    it('then hide payment by credit card details', () => {
      expect(page.querySelector('[test-id="payment-by-credit-card"]')).toBeNull();
    })

    it('then show receipt', () => {
      expect(page.querySelector('[test-id="receipt"]')).not.toBeNull();
    })

    it('when user clicks on receipt, then show receipt', () => {
      spyOn(window, 'open');

      page.querySelector('[test-id="receipt"]').click();
      fixture.detectChanges();

      expect(window.open).toHaveBeenCalled();
    })

  })

  describe('given payment by money', () => {

    beforeEach(() => {
      const purchase = {id: '1', payment: {type: 'MONEY'}, price: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then show payment by money details', () => {
      expect(page.querySelector('[test-id="payment-by-money"]')).not.toBeNull();
    })

    it('then hide payment by credit card details', () => {
      expect(page.querySelector('[test-id="payment-by-credit-card"]')).toBeNull();
    })

  })

  describe('given payment by credit card', () => {

    beforeEach(() => {
      const purchase = {id: '1', payment: {type: 'CREDIT_CARD'}, price: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then hide payment by money details', () => {
      expect(page.querySelector('[test-id="payment-by-money"]')).toBeNull();
    })

    it('then show payment by credit card details', () => {
      expect(page.querySelector('[test-id="payment-by-credit-card"]')).not.toBeNull();
    })

  })

});
