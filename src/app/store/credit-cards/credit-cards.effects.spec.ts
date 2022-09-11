import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { CreditCardsEffects } from './credit-cards.effects';
import { CreditCardService } from 'src/app/services/credit-card/credit-card.service';
import { CreditCardServiceMock } from 'src/app/model/mocks/credit-card.service.mock';
import { deleteCreditCard, deleteCreditCardFail, deleteCreditCardSuccess, loadCreditCards, loadCreditCardsFail, loadCreditCardsSuccess } from './credit-cards.actions';

describe('Credit card effects', () => {
  let effects: CreditCardsEffects;
  let actions$: Observable<Action>;
  let creditCardService: CreditCardServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    creditCardService = new CreditCardServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([CreditCardsEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(CreditCardService, { useValue: creditCardService });

    effects = TestBed.get(CreditCardsEffects);
  });

  describe('given load credit cards', () => {

    beforeEach(() => {
      actions$ = of(loadCreditCards());
    })

    it('when success, then return load credit cards success', (done) => {
      const creditCards = [{id: 1}] as any;
      creditCardService.response = of(creditCards);

      effects.loadCreditCardsEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCreditCardsSuccess({creditCards}));
        done();
      });
    });
  
    it('when fail, then return load credit cards fail', (done) => {
      creditCardService.response = throwError(error);

      effects.loadCreditCardsEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCreditCardsFail({error}));
        done();
      });
    });

  })

  describe('given delete credit card', () => {

    beforeEach(() => {
      actions$ = of(deleteCreditCard({id: "anyId"}));
    })

    it('when success, then return delete credit card success', (done) => {
      creditCardService.response = of({});

      effects.deleteCreditCardEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(deleteCreditCardSuccess());
        done();
      });
    });
  
    it('when fail, then return delete credit card fail', (done) => {
      creditCardService.response = throwError(error);

      effects.deleteCreditCardEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(deleteCreditCardFail({error}));
        done();
      });
    });

  })

  describe('given delete credit card success', () => {

    beforeEach(() => {
      actions$ = of(deleteCreditCardSuccess());
    })

    it('then return load credit cards', (done) => {
      effects.deleteCreditCardEffectSuccess$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCreditCards());
        done();
      });
    });

  })

});
