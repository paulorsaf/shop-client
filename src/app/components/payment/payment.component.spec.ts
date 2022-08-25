import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { LoadingControllerMock } from 'src/app/model/mocks/loading-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { PaymentType } from 'src/app/model/payment/payment';
import { AppState } from 'src/app/store/app-state';
import { companyReducer } from 'src/app/store/company/company.reducers';
import { makePurchase, makePurchaseFail, makePurchaseSuccess } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let page: PageMock;
  let location: Location;
  let store: Store<AppState>;
  let loadingController: LoadingControllerMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    loadingController = new LoadingControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'payment/purchase-success', component: BlankMockComponent
        }]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('company', companyReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(LoadingController, {useValue: loadingController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  describe('given page starts', () => {

    it('then create form', () => {
      expect(component.form).not.toBeUndefined();
    })

    it('when form created, then form delivery type should be delivery', () => {
      expect(component.form.value.paymentType).toEqual(PaymentType.PIX);
    })

  })

  describe('given payment type', () => {

    describe('when pix', () => {

      beforeEach(() => {
        component.form.controls.paymentType.setValue('PIX');
        fixture.detectChanges();
      })

      it('then show pix key', () => {
        expect(page.querySelector('[test-id="pix-key"]')).not.toBeNull();
      })

      it('then show receipt button', () => {
        expect(page.querySelector('[test-id="receipt-button"]')).not.toBeNull();
      })

      it('then hide finish purchase button', () => {
        expect(page.querySelector('[test-id="finish-purchase-button"]')).toBeNull();
      })

    })

    describe('when not pix', () => {

      beforeEach(() => {
        component.form.controls.paymentType.setValue('MONEY');
        fixture.detectChanges();
      })

      it('then show finish purchase button', () => {
        expect(page.querySelector('[test-id="finish-purchase-button"]')).not.toBeNull();
      })

      it('then hide pix key', () => {
        expect(page.querySelector('[test-id="pix-key"]')).toBeNull();
      })

      it('then hide receipt button', () => {
        expect(page.querySelector('[test-id="receipt-button"]')).toBeNull();
      })

    })

  })

  describe('given user clicks on send receipt button', () => {

    const file = {id: 1} as any;

    beforeEach(() => {
      component.form.controls.paymentType.setValue('PIX');
      fixture.detectChanges();
    })

    it('then pay for purchase', done => {
      component.uploadReceipt({target: {files: [file]}});
      fixture.detectChanges();

      store.select('shoppingCart').subscribe(state => {
        expect(state.isPaying).toBeTruthy();
        done();
      })
    })

    it('when payment for a new purchase, then dont send purchase id', () => {
      spyOn(store, 'dispatch');

      component.uploadReceipt({target: {files: [file]}});
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(
        makePurchase({
          payment: {
            type: 'PIX',
            receiptUrl: {id: 1}
          } as any,
          purchaseId: undefined
        })
      )
    })

    it('when payment for an existing purchase, then send purchase id', () => {
      component.purchase = {id: "anyPurchaseId"} as any;

      spyOn(store, 'dispatch');

      component.uploadReceipt({target: {files: [file]}});
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(
        makePurchase({
          payment: {
            type: 'PIX',
            receiptUrl: {id: 1}
          } as any,
          purchaseId: "anyPurchaseId"
        })
      )
    })

  })

  describe('given user clicks on finish purchase button', () => {

    beforeEach(() => {
      component.form.controls.paymentType.setValue('MONEY');
      fixture.detectChanges();
    })

    it('then pay for purchase', done => {
      page.querySelector('[test-id="finish-purchase-button"]').click();
      fixture.detectChanges();

      store.select('shoppingCart').subscribe(state => {
        expect(state.isPaying).toBeTruthy();
        done();
      })
    })

    it('when payment for a new purchase, then dont send purchase id', () => {
      spyOn(store, 'dispatch');

      page.querySelector('[test-id="finish-purchase-button"]').click();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(
        makePurchase({
          payment: {
            type: 'MONEY'
          } as any,
          purchaseId: undefined
        })
      )
    })

    it('when payment for an existing purchase, then send purchase id', () => {
      component.purchase = {id: "anyPurchaseId"} as any;
      spyOn(store, 'dispatch');

      page.querySelector('[test-id="finish-purchase-button"]').click();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(
        makePurchase({
          payment: {
            type: 'MONEY'
          } as any,
          purchaseId: "anyPurchaseId"
        })
      )
    })

  })

  describe('given payment', () => {

    beforeEach(() => {
      store.dispatch(makePurchase({payment: {
        type: "ANY", receiptUrl: {id: 1} as any
      }}));
      fixture.detectChanges();
    })

    it('when paying, then show loading', done => {
      setTimeout(() => {
        expect(loadingController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

    describe('when payment success', () => {

      beforeEach(() => {
        store.dispatch(makePurchaseSuccess());
        fixture.detectChanges();
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then go to success page', done => {
        setTimeout(() => {
          expect(location.path()).toEqual('/payment/purchase-success');
          done();
        }, 100)
      })

    })

    describe('when payment fail', () => {

      beforeEach(() => {
        store.dispatch(makePurchaseFail({error: {error: "error"}}));
        fixture.detectChanges();
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(toastController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

});
