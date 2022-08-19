import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { PurchasesEffects } from './purchases.effects';
import { PurchaseServiceMock } from 'src/app/model/mocks/purchase.service.mock';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from './purchases.actions';

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
  
    it('when fail, then return register fail', (done) => {
      purchaseService.response = throwError(error);

      effects.loadPurchasesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPurchasesFail({error}));
        done();
      });
    });

  })

});
