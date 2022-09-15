import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { PurchasesEffects } from './purchases.effects';
import { PurchaseServiceMock } from 'src/app/model/mocks/purchase.service.mock';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { loadLastPurchase, loadLastPurchaseFail, loadLastPurchaseSuccess, loadPaymentPurchaseById, loadPaymentPurchaseByIdFail, loadPaymentPurchaseByIdSuccess, loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from './purchases.actions';

describe('Purchase effects', () => {
  let effects: PurchasesEffects;
  let actions$: Observable<Action>;
  let purchaseService: PurchaseServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    purchaseService = new PurchaseServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PurchasesEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(PurchaseService, { useValue: purchaseService });

    effects = TestBed.get(PurchasesEffects);
  });

  describe('given load purchases', () => {

    beforeEach(() => {
      actions$ = of(loadPurchases());
    })

    it('when success, then return load purchases success', (done) => {
      const purchases = [{id: 1}] as any;
      purchaseService.response = of(purchases);

      effects.loadPurchasesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPurchasesSuccess({purchases}));
        done();
      });
    });
  
    it('when fail, then return load purchases fail', (done) => {
      purchaseService.response = throwError(error);

      effects.loadPurchasesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPurchasesFail({error}));
        done();
      });
    });

  })

  describe('given load last purchase', () => {

    beforeEach(() => {
      actions$ = of(loadLastPurchase());
    })

    it('when success, then return load last purchase success', (done) => {
      const purchase = {id: 1} as any;
      purchaseService.response = of(purchase);

      effects.loadLastPurchaseEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadLastPurchaseSuccess({purchase}));
        done();
      });
    });
  
    it('when fail, then return load last purchase fail', (done) => {
      purchaseService.response = throwError(error);

      effects.loadLastPurchaseEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadLastPurchaseFail({error}));
        done();
      });
    });

  })

  describe('given load payment purchase by id', () => {

    beforeEach(() => {
      actions$ = of(loadPaymentPurchaseById());
    })

    it('when success, then return load payment purchase by id success', (done) => {
      const purchase = {id: 1} as any;
      purchaseService.response = of(purchase);

      effects.loadPaymentPurchaseByIdEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPaymentPurchaseByIdSuccess({purchase}));
        done();
      });
    });
  
    it('when fail, then return load payment purchase by id fail', (done) => {
      purchaseService.response = throwError(error);

      effects.loadPaymentPurchaseByIdEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPaymentPurchaseByIdFail({error}));
        done();
      });
    });

  })

});
