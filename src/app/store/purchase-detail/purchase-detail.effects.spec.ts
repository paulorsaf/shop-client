import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { PurchaseDetailEffects } from './purchase-detail.effects';
import { PurchaseServiceMock } from 'src/app/model/mocks/purchase.service.mock';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './purchase-detail.action';

fdescribe('Purchase detail effects', () => {
  let effects: PurchaseDetailEffects;
  let actions$: Observable<Action>;
  let purchaseService: PurchaseServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    purchaseService = new PurchaseServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PurchaseDetailEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(PurchaseService, { useValue: purchaseService });

    effects = TestBed.get(PurchaseDetailEffects);
  });

  describe('given load purchase detail', () => {

    beforeEach(() => {
      actions$ = of(loadPurchaseDetail({id: "anyId"}));
    })

    it('when success, then return load purchase detail success', (done) => {
      const purchase = {id: 1} as any;
      purchaseService.response = of(purchase);

      effects.loadPurchasesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPurchaseDetailSuccess({purchase}));
        done();
      });
    });
  
    it('when fail, then return load purchase fail', (done) => {
      purchaseService.response = throwError(error);

      effects.loadPurchasesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadPurchaseDetailFail({error}));
        done();
      });
    });

  })

});
