import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AlertControllerMock } from 'src/app/model/mocks/alert-controller.mock';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { LoadingControllerMock } from 'src/app/model/mocks/loading-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { PaymentType } from 'src/app/model/payment/payment';
import { AppState } from 'src/app/store/app-state';
import { companyReducer } from 'src/app/store/company/company.reducers';
import { loadCreditCardsSuccess } from 'src/app/store/credit-cards/credit-cards.actions';
import { creditCardsReducer } from 'src/app/store/credit-cards/credit-cards.reducers';
import { calculatePurchasePriceSuccess } from 'src/app/store/purchases/purchases.actions';
import { loadCupomSuccess, makePurchase, makePurchaseFail, makePurchaseSuccess } from 'src/app/store/shopping-cart/shopping-cart.actions';
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
  let alertController: AlertControllerMock;

  beforeEach(waitForAsync(() => {
    alertController = new AlertControllerMock();
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
        StoreModule.forFeature('creditCards', creditCardsReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(AlertController, {useValue: alertController})
    .overrideProvider(LoadingController, {useValue: loadingController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    component.address = {city: "anyCity"} as any;
    component.company = {
      address: {city: "anyCity"},
      payment: {
        creditCard: {},
        cupom: '',
        money: true,
        pixKey: "anyPixKey"
      }
    } as any;

    fixture.detectChanges();
  }));

  describe('given page starts', () => {

    it('then create form', () => {
      expect(component.form).not.toBeUndefined();
    })

    it('when form created, then form delivery type should be delivery', () => {
      expect(component.form.value.paymentType).toEqual(PaymentType.PIX);
    })

    it('then calculate purchase price', done => {
      store.select('shoppingCart').subscribe(state => {
        expect(state.isCalculatingPrice).toBeTruthy();
        done();
      })
    })

  })

  describe('given calculating price', () => {

    it('then show price loader', () => {
      expect(page.querySelector('[test-id="price-loader"]')).not.toBeNull();
    })

    it('then hide price', () => {
      expect(page.querySelector('[test-id="price"]')).toBeNull();
    })

    it('then hide action buttons', () => {
      expect(page.querySelector('[test-id="action-buttons"]')).toBeNull();
    })

    describe('when price calculated', () => {

      beforeEach(() => {
        const price = {id: "anyPrice"} as any;
        store.dispatch(calculatePurchasePriceSuccess({price}));
        fixture.detectChanges();
      })
  
      it('then hide price loader', () => {
        expect(page.querySelector('[test-id="price-loader"]')).toBeNull();
      })
  
      it('then show price', () => {
        expect(page.querySelector('[test-id="price"]')).not.toBeNull();
      })

      it('then show action buttons', () => {
        expect(page.querySelector('[test-id="action-buttons"]')).not.toBeNull();
      })
  
    })

  })

  describe('given payment type', () => {

    beforeEach(() => {
      const price = {id: "anyPrice", deliveryPrice: 10} as any;
      store.dispatch(calculatePurchasePriceSuccess({price}));
      fixture.detectChanges();
    })

    it('when delivery is pick up, show money option', () => {
      component.address = undefined;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="money"]')).not.toBeNull();
    })

    it('when delivery city is equal to company city, then show money option', () => {
      component.address = {city: "anyCity"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="money"]')).not.toBeNull();
    })

    it('when delivery city is different from company city, then hide money option', () => {
      component.address = {city: "anyOtherCity"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="money"]')).toBeNull();
    })

    it('when company has payment by money configured, then show money option', () => {
      expect(page.querySelector('[test-id="money"]')).not.toBeNull();
    })

    it('when company doesnt have payment by money configured, then hide money option', () => {
      component.company.payment.money = false;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="money"]')).toBeNull();
    })

    it('when company has payment by pix configured, then show pix option', () => {
      expect(page.querySelector('[test-id="pix"]')).not.toBeNull();
    })

    it('when company doesnt have payment by pix configured, then hide pix option', () => {
      component.company.payment.pixKey = "";
      fixture.detectChanges();

      expect(page.querySelector('[test-id="pix"]')).toBeNull();
    })

    it('when company has credit card configured, then show credit card option', () => {
      expect(page.querySelector('[test-id="credit-card"]')).not.toBeNull();
    })

    it('when company doesnt have credit card configured, then hide credit card option', () => {
      component.company.payment.creditCard = null;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="credit-card"]')).toBeNull();
    })

    describe('when pix selected', () => {

      beforeEach(() => {
        component.form.controls.paymentType.setValue('PIX');
        fixture.detectChanges();
      });

      it('then show pix key', () => {
        expect(page.querySelector('[test-id="pix-key"]')).not.toBeNull();
      })

      it('then show receipt button', () => {
        expect(page.querySelector('[test-id="receipt-button"]')).not.toBeNull();
      })

      it('then hide finish purchase button', () => {
        expect(page.querySelector('[test-id="finish-purchase-button"]')).toBeNull();
      })

      it('then hide billing address', () => {
        expect(page.querySelector('[test-id="billing-address"]')).toBeNull();
      })

      it('then hide credit card form', () => {
        expect(page.querySelector('[test-id="credit-card-form"]')).toBeNull();
      })

      it('then hide credit card fee', () => {
        expect(page.querySelector('[test-id="credit-card-fee"]')).toBeNull();
      })

      it('then form is valid', () => {
        expect(component.form.valid).toBeTruthy();
      })

    })

    describe('when money selected', () => {

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

      it('then hide credit card form', () => {
        expect(page.querySelector('[test-id="credit-card-form"]')).toBeNull();
      })

      it('then hide billing address', () => {
        expect(page.querySelector('[test-id="billing-address"]')).toBeNull();
      })

      it('then hide credit card fee', () => {
        expect(page.querySelector('[test-id="credit-card-fee"]')).toBeNull();
      })

      it('then form is valid', () => {
        expect(component.form.valid).toBeTruthy();
      })

    })

    describe('when credit card selected', () => {

      beforeEach(() => {
        component.company = {payment: {creditCard: {}}} as any;
        fixture.detectChanges();

        component.form.controls.paymentType.setValue('CREDIT_CARD');
        fixture.detectChanges();

        const price = {id: "anyPrice", deliveryPrice: 10} as any;
        store.dispatch(calculatePurchasePriceSuccess({price}));
        fixture.detectChanges();
      })

      it('then hide pix key', () => {
        expect(page.querySelector('[test-id="pix-key"]')).toBeNull();
      })

      it('then hide receipt button', () => {
        expect(page.querySelector('[test-id="receipt-button"]')).toBeNull();
      })

      it('then show finish purchase button', () => {
        expect(page.querySelector('[test-id="finish-purchase-button"]')).not.toBeNull();
      })

      it('then show credit card form', () => {
        expect(page.querySelector('[test-id="credit-card-form"]')).not.toBeNull();
      })

      it('then show billing address', () => {
        expect(page.querySelector('[test-id="billing-address"]')).not.toBeNull();
      })

      it('then show credit card fee', () => {
        expect(page.querySelector('[test-id="credit-card-fee"]')).not.toBeNull();
      })

      it('then form is invalid', () => {
        expect(component.form.valid).toBeFalsy();
      })

      it('then load saved credit cards', done => {
        store.select('creditCards').subscribe(state => {
          expect(state.isLoading).toBeTruthy();
          done();
        })
      })

    })

  })

  describe('given loading saved credit cards', () => {

    beforeEach(() => {
      component.company = {payment: {creditCard: {}}} as any;
      fixture.detectChanges();

      component.form.controls.paymentType.setValue('CREDIT_CARD');
      fixture.detectChanges();
    })

    it('then show credit cards loader', () => {
      expect(page.querySelector('[test-id="credit-cards-loader"]')).not.toBeNull();
    })

    it('then hide credit cards', () => {
      expect(page.querySelector('[test-id="credit-cards"]')).toBeNull();
    })

    describe('when credit cards loaded', () => {

      beforeEach(() => {
        const creditCards = [{id: 1}] as any;
        store.dispatch(loadCreditCardsSuccess({creditCards}));
        fixture.detectChanges();
      })

      it('then hide credit cards loader', () => {
        expect(page.querySelector('[test-id="credit-cards-loader"]')).toBeNull();
      })
  
      it('then show credit cards', () => {
        expect(page.querySelector('[test-id="credit-cards"]')).not.toBeNull();
      })
  
      it('and no credit cards found, then hide credit cards', () => {
        const creditCards = [] as any;
        store.dispatch(loadCreditCardsSuccess({creditCards}));
        fixture.detectChanges();

        expect(page.querySelector('[test-id="credit-cards"] ion-card')).toBeNull();
      })

    })

  })

  describe('given user clicks on saved credit card', () => {

    beforeEach(() => {
      component.company = {payment: {creditCard: {}}} as any;
      fixture.detectChanges();

      component.form.controls.paymentType.setValue('CREDIT_CARD');
      fixture.detectChanges();

      const creditCards = [{id: 1}] as any;
      store.dispatch(loadCreditCardsSuccess({creditCards}));
      fixture.detectChanges();

      page.querySelector('[test-id="saved-credit-card"]').click();
      fixture.detectChanges();
    })

    it('then ask user confirmation', done => {
      setTimeout(() => {
        expect(alertController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

    describe('when user cancels', () => {

      beforeEach(() => {
        alertController.buttons[0].handler();
        fixture.detectChanges();
      })

      it('then dont make payment', done => {
        store.select('shoppingCart').subscribe(state => {
          expect(state.isPaying).toBeFalsy();
          done();
        })
      })

    })

    describe('when user confirms', () => {

      beforeEach(() => {
        alertController.buttons[1].handler();
        fixture.detectChanges();
      })

      it('then make payment', done => {
        store.select('shoppingCart').subscribe(state => {
          expect(state.isPaying).toBeTruthy();
          done();
        })
      })

    })

  })

  describe('given user changes payment type', () => {

    beforeEach(() => {
      const price = {id: "anyPrice"} as any;
      store.dispatch(calculatePurchasePriceSuccess({price}));
      fixture.detectChanges();

      component.form.controls.paymentType.setValue('CREDIT_CARD');
      fixture.detectChanges();
    })

  })

  describe('given form for payment by card', () => {

    beforeEach(() => {
      component.company = {payment: {creditCard: {}}} as any;
      fixture.detectChanges();

      component.form.controls.paymentType.setValue('CREDIT_CARD');
      fixture.detectChanges();
    })

    it('when card flag is empty, then card flag is invalid', () => {
      expect(component.form.controls.creditCard.get('cardFlag').valid).toBeFalsy();
    })

    it('when card flag is not empty, then card flag is valid', () => {
      component.form.controls.creditCard.get('cardFlag').setValue('anyFlag');

      expect(component.form.controls.creditCard.get('cardFlag').valid).toBeTruthy();
    })

    it('when card number is empty, then card number is invalid', () => {
      expect(component.form.controls.creditCard.get('cardNumber').valid).toBeFalsy();
    })

    it('when card number is not empty, then card number is valid', () => {
      component.form.controls.creditCard.get('cardNumber').setValue('anyNumber');

      expect(component.form.controls.creditCard.get('cardNumber').valid).toBeTruthy();
    })

    it('when card holder is empty, then card holder is invalid', () => {
      expect(component.form.controls.creditCard.get('cardHolder').valid).toBeFalsy();
    })

    it('when card holder is not empty, then card holder is valid', () => {
      component.form.controls.creditCard.get('cardHolder').setValue('anyNumber');

      expect(component.form.controls.creditCard.get('cardHolder').valid).toBeTruthy();
    })

    it('when card month is empty, then card month is invalid', () => {
      expect(component.form.controls.creditCard.get('cardMonth').valid).toBeFalsy();
    })

    it('when card month is not empty, then card month is valid', () => {
      component.form.controls.creditCard.get('cardMonth').setValue('anyNumber');

      expect(component.form.controls.creditCard.get('cardMonth').valid).toBeTruthy();
    })

    it('when card year is empty, then card year is invalid', () => {
      expect(component.form.controls.creditCard.get('cardYear').valid).toBeFalsy();
    })

    it('when card year is not empty, then card year is valid', () => {
      component.form.controls.creditCard.get('cardYear').setValue('anyNumber');

      expect(component.form.controls.creditCard.get('cardYear').valid).toBeTruthy();
    })

    it('when card cvc is empty, then card cvc is invalid', () => {
      expect(component.form.controls.creditCard.get('cardCvc').valid).toBeFalsy();
    })

    it('when card cvc is not empty, then card cvc is valid', () => {
      component.form.controls.creditCard.get('cardCvc').setValue('anyNumber');

      expect(component.form.controls.creditCard.get('cardCvc').valid).toBeTruthy();
    })

    it('when credit card is missing any value, then form should be invalid', () => {
      expect(component.form.valid).toBeFalsy();
    })

    it('when billing street is empty, then billing street is invalid', () => {
      expect(component.form.controls.billingAddress.get('street').valid).toBeFalsy();
    })

    it('when billing street is not empty, then billing street is valid', () => {
      component.form.controls.billingAddress.get('street').setValue('any');

      expect(component.form.controls.billingAddress.get('street').valid).toBeTruthy();
    })

    it('when billing number is empty, then billing number is invalid', () => {
      expect(component.form.controls.billingAddress.get('number').valid).toBeFalsy();
    })

    it('when billing number is not empty, then billing number is valid', () => {
      component.form.controls.billingAddress.get('number').setValue('any');

      expect(component.form.controls.billingAddress.get('number').valid).toBeTruthy();
    })

    it('when billing neighborhood is empty, then billing neighborhood is invalid', () => {
      expect(component.form.controls.billingAddress.get('neighborhood').valid).toBeFalsy();
    })

    it('when billing neighborhood is not empty, then billing neighborhood is valid', () => {
      component.form.controls.billingAddress.get('neighborhood').setValue('any');

      expect(component.form.controls.billingAddress.get('neighborhood').valid).toBeTruthy();
    })

    it('when billing zipCode is empty, then billing zipCode is invalid', () => {
      expect(component.form.controls.billingAddress.get('zipCode').valid).toBeFalsy();
    })

    it('when billing zipCode is not empty, then billing zipCode is valid', () => {
      component.form.controls.billingAddress.get('zipCode').setValue('any');

      expect(component.form.controls.billingAddress.get('zipCode').valid).toBeTruthy();
    })

    it('when billing city is empty, then billing city is invalid', () => {
      expect(component.form.controls.billingAddress.get('city').valid).toBeFalsy();
    })

    it('when billing city is not empty, then billing city is valid', () => {
      component.form.controls.billingAddress.get('city').setValue('any');

      expect(component.form.controls.billingAddress.get('city').valid).toBeTruthy();
    })

    it('when billing state is empty, then billing state is invalid', () => {
      expect(component.form.controls.billingAddress.get('state').valid).toBeFalsy();
    })

    it('when billing state is not empty, then billing state is valid', () => {
      component.form.controls.billingAddress.get('state').setValue('any');

      expect(component.form.controls.billingAddress.get('state').valid).toBeTruthy();
    })

    it('when credit card is filled, then form should be valid', () => {
      fillCreditCardForm();

      expect(component.form.valid).toBeTruthy();
    })

  })

  describe('given delivery type', () => {

    it('when delivery, then show delivery price', () => {
      const price = {id: "anyPrice", deliveryPrice: 10} as any;
      store.dispatch(calculatePurchasePriceSuccess({price}));
      fixture.detectChanges();
  
      expect(page.querySelector('[test-id="delivery-price"]')).not.toBeNull();
    })
  
    it('when pick up, then hide delivery price', () => {
      const price = {id: "anyPrice", deliveryPrice: 0} as any;
      store.dispatch(calculatePurchasePriceSuccess({price}));
      fixture.detectChanges();
  
      expect(page.querySelector('[test-id="delivery-price"]')).toBeNull();
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
            cupom: '',
            type: 'PIX',
            receiptUrl: {id: 1}
          } as any,
          purchaseId: undefined
        })
      )
    })

    it('when payment for an existing purchase, then send purchase id', () => {
      component.purchaseId = "anyPurchaseId";

      spyOn(store, 'dispatch');

      component.uploadReceipt({target: {files: [file]}});
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(
        makePurchase({
          payment: {
            cupom: '',
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
      const price = {id: 1} as any;
      store.dispatch(calculatePurchasePriceSuccess({price}));
      fixture.detectChanges();
    })

    describe('when payment by money', () => {

      beforeEach(() => {
        component.company = {payment: {creditCard: {}}} as any;
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

      it('and payment for a new purchase, then dont send purchase id', () => {
        spyOn(store, 'dispatch');
  
        page.querySelector('[test-id="finish-purchase-button"]').click();
        fixture.detectChanges();
  
        expect(store.dispatch).toHaveBeenCalledWith(
          makePurchase({
            payment: {
              cupom: '',
              type: 'MONEY'
            } as any,
            purchaseId: undefined
          })
        )
      })
  
      it('and payment for an existing purchase, then send purchase id', () => {
        component.purchaseId = "anyPurchaseId";
        spyOn(store, 'dispatch');
  
        page.querySelector('[test-id="finish-purchase-button"]').click();
        fixture.detectChanges();
  
        expect(store.dispatch).toHaveBeenCalledWith(
          makePurchase({
            payment: {
              cupom: '',
              type: 'MONEY'
            } as any,
            purchaseId: "anyPurchaseId"
          })
        )
      })

    })

    describe('when payment by credit card', () => {

      beforeEach(() => {
        component.company = {payment: {creditCard: {}}} as any;
        fixture.detectChanges();

        component.form.controls.paymentType.setValue('CREDIT_CARD');
        fixture.detectChanges();
      })

      it('and form is invalid, then dont pay for purchase', done => {
        page.querySelector('[test-id="finish-purchase-button"]').click();
        fixture.detectChanges();
  
        store.select('shoppingCart').subscribe(state => {
          expect(state.isPaying).toBeFalsy();
          done();
        })
      })
  
      it('and form is valid, then pay for purchase', done => {
        fillCreditCardForm();
  
        page.querySelector('[test-id="finish-purchase-button"]').click();
        fixture.detectChanges();
  
        store.select('shoppingCart').subscribe(state => {
          expect(state.isPaying).toBeTruthy();
          done();
        })
      })

      it('and payment for a new purchase, then dont send purchase id', () => {
        spyOn(store, 'dispatch');
  
        fillCreditCardForm();
        page.querySelector('[test-id="finish-purchase-button"]').click();
        fixture.detectChanges();
  
        expect(store.dispatch).toHaveBeenCalledWith(
          makePurchase({
            payment: {
              billingAddress: component.form.controls.billingAddress.value,
              creditCard: component.form.value.creditCard,
              cupom: '',
              type: 'CREDIT_CARD'
            } as any,
            purchaseId: undefined
          })
        )
      })
  
      it('and payment for an existing purchase, then send purchase id', () => {
        component.purchaseId = "anyPurchaseId";
        spyOn(store, 'dispatch');
  
        fillCreditCardForm();
        page.querySelector('[test-id="finish-purchase-button"]').click();
        fixture.detectChanges();
  
        expect(store.dispatch).toHaveBeenCalledWith(
          makePurchase({
            payment: {
              billingAddress: component.form.controls.billingAddress.value,
              creditCard: component.form.value.creditCard,
              cupom: '',
              type: 'CREDIT_CARD'
            } as any,
            purchaseId: "anyPurchaseId"
          })
        )
      })

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

  describe('given user clicks on search cupom button', () => {

    beforeEach(() => {
      const price = {id: "anyPrice"} as any;
      store.dispatch(calculatePurchasePriceSuccess({price}));
      fixture.detectChanges();
    })

    it('when cupom is empty, then do not search for cupom', done => {
      page.querySelector('[test-id="search-cupom-button"]').click();
      fixture.detectChanges();

      store.select('shoppingCart').subscribe(state => {
        expect(state.isLoadingCupom).toBeFalsy();
        done();
      })
    })

    it('when cupom is filled, then search for cupom', done => {
      component.form.get('cupom').setValue('anyCupom');
      fixture.detectChanges();

      page.querySelector('[test-id="search-cupom-button"]').click();
      fixture.detectChanges();

      store.select('shoppingCart').subscribe(state => {
        expect(state.isLoadingCupom).toBeTruthy();
        done();
      })
    })

    describe('when cupom is loading', () => {

      beforeEach(() => {
        component.form.get('cupom').setValue("anyCupom");
        fixture.detectChanges();

        page.querySelector('[test-id="search-cupom-button"]').click();
        fixture.detectChanges();
      })

      it('then hide search cupom button', () => {
        expect(page.querySelector('[test-id="search-cupom-button"]')).toBeNull();
      })

      it('then show cupom loader', () => {
        expect(page.querySelector('[test-id="cupom-loader"]')).not.toBeNull();
      })

    })

    describe('when cupom is loaded', () => {

      beforeEach(() => {
        component.form.get('cupom').setValue('anyCupom');
        fixture.detectChanges();

        page.querySelector('[test-id="search-cupom-button"]').click();
        fixture.detectChanges();
      })

      describe('and cupom is found', () => {

        beforeEach(() => {
          const cupom = {id: "anyCupomId"} as any;
          store.dispatch(loadCupomSuccess({cupom}));
          fixture.detectChanges();
        })

        it('then calculate purchase price', done => {
          store.select('shoppingCart').subscribe(state => {
            expect(state.isCalculatingPrice).toBeTruthy();
            done();
          })
        })

      })

      describe('and cupom not found', () => {

        beforeEach(() => {
          store.dispatch(loadCupomSuccess({cupom: null}));
          fixture.detectChanges();
        })

        it('then show error message', done => {
          setTimeout(() => {
            expect(toastController.isPresented).toBeTruthy();
            done();
          }, 100)
        })

      })

    })

  })

  function fillCreditCardForm() {
    component.form.controls.creditCard.get('cardFlag').setValue('any');
    component.form.controls.creditCard.get('cardNumber').setValue('any');
    component.form.controls.creditCard.get('cardHolder').setValue('any');
    component.form.controls.creditCard.get('cardYear').setValue('any');
    component.form.controls.creditCard.get('cardMonth').setValue('any');
    component.form.controls.creditCard.get('cardCvc').setValue('any');
    component.form.controls.billingAddress.get('street').setValue('any');
    component.form.controls.billingAddress.get('number').setValue('any');
    component.form.controls.billingAddress.get('neighborhood').setValue('any');
    component.form.controls.billingAddress.get('zipCode').setValue('any');
    component.form.controls.billingAddress.get('city').setValue('any');
    component.form.controls.billingAddress.get('state').setValue('any');
    fixture.detectChanges();
  }

});
