import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { ShoppingCartEffects } from './shopping-cart.effects';
import { makePurchase, makePurchaseByCreditCard, makePurchaseByMoney, makePurchaseByPix, makePurchaseFail, makePurchaseSuccess, openShoppingCart } from './shopping-cart.actions';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { ModalController } from '@ionic/angular';
import { AppState } from '../app-state';
import { shoppingCartReducer } from './shopping-cart.reducers';
import { PaymentType } from 'src/app/model/payment/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PaymentServiceMock } from 'src/app/model/mocks/payment-service.mock';

fdescribe('Products effects', () => {
  let effects: ShoppingCartEffects;
  let actions$: Observable<Action>;
  let modalController: ModalControllerMock;
  let paymentService: PaymentServiceMock;
  let store: Store<AppState>;

  const error = {error: "error"};

  beforeEach(() => {
    modalController = new ModalControllerMock();
    paymentService = new PaymentServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ShoppingCartEffects]),
      ],
      providers: [
        provideMockActions(() => actions$)
      ],
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .overrideProvider(PaymentService, {useValue: paymentService});

    effects = TestBed.get(ShoppingCartEffects);
    store = TestBed.inject(Store);
  });

  describe('given open shopping cart', () => {

    beforeEach(() => {
      actions$ = of(openShoppingCart());
    });

    it('then show shopping cart modal', (done) => {
      effects.openShoppingCartEffect$.subscribe(() => {
        setTimeout(() => {
          expect(modalController.isPresented).toBeTruthy();
          done();
        }, 200)
      });
    });

  });

  describe('given make purchase', () => {

    it('when pix, then return make purchase with pix', (done) => {
      const payment = {type:  PaymentType.PIX, receiptUrl: {id: 1} as any}
      actions$ = of(makePurchase({payment}));

      effects.makePurchaseEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseByPix({purchaseId: undefined, receipt: {id: 1} as any}));
        done();
      });
    });

    it('when money, then return make purchase with money', (done) => {
      const payment = {type:  PaymentType.MONEY}
      actions$ = of(makePurchase({payment}));

      effects.makePurchaseEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseByMoney({purchaseId: undefined}));
        done();
      });
    });

    it('when credit card, then return make purchase with credit card', (done) => {
      const billingAddress = {id: "anyAddress"} as any;
      const creditCard = {id: "anyCard"} as any;
      const payment = {billingAddress, creditCard, type:  PaymentType.CREDIT_CARD}
      actions$ = of(makePurchase({payment}));

      effects.makePurchaseEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseByCreditCard({
          billingAddress,
          creditCard,
          purchaseId: undefined
        }));
        done();
      });
    });

  });

  describe('given make purchase by pix', () => {

    const receipt = {id: 1} as any;

    it('when success, then return make purchase success', (done) => {
      paymentService.response = of({});

      actions$ = of(makePurchaseByPix({receipt}));

      effects.makePurchaseByPixEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseSuccess());
        done();
      });
    });

    it('when fail, then return make purchase fail', (done) => {
      paymentService.response = throwError(error)

      actions$ = of(makePurchaseByPix({receipt}));

      effects.makePurchaseByPixEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseFail({error}));
        done();
      });
    });

  });

  describe('given make purchase by money', () => {

    it('when success, then return make purchase success', (done) => {
      paymentService.response = of({});

      actions$ = of(makePurchaseByMoney({}));

      effects.makePurchaseByMoneyEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseSuccess());
        done();
      });
    });

    it('when fail, then return make purchase fail', (done) => {
      paymentService.response = throwError(error)

      actions$ = of(makePurchaseByMoney({}));

      effects.makePurchaseByMoneyEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseFail({error}));
        done();
      });
    });

  });

  describe('given make purchase by credit card', () => {

    beforeEach(() => {
      const billingAddress = {id: "anyBillingAddress"} as any;
      const creditCard = {id: "anyCreditCard"} as any;

      actions$ = of(makePurchaseByCreditCard({billingAddress, creditCard}));
    })

    it('when success, then return make purchase success', (done) => {
      paymentService.response = of({});

      effects.makePurchaseByCreditCardEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseSuccess());
        done();
      });
    });

    it('when fail, then return make purchase fail', (done) => {
      paymentService.response = throwError(error);

      effects.makePurchaseByCreditCardEffect$.subscribe(action => {
        expect(action).toEqual(makePurchaseFail({error}));
        done();
      });
    });

  });

});
