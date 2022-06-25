import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { ShoppingCartEffects } from './shopping-cart.effects';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { ModalController } from '@ionic/angular';
import { openShoppingCart } from './shopping-cart.actions';
import { AppState } from '../app-state';
import { shoppingCartReducer } from './shopping-cart.reducers';
import { take } from 'rxjs/operators';

describe('Shopping cart effects', () => {
  let effects: ShoppingCartEffects;
  let actions$: Observable<Action>;
  let modalController: ModalControllerMock;
  let store: Store<AppState>;

  beforeEach(() => {
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ShoppingCartEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(ModalController, { useValue: modalController });

    effects = TestBed.get(ShoppingCartEffects);
    store = TestBed.inject(Store);
  });

  describe('given open shopping cart', () => {

    beforeEach(() => {
      actions$ = of(openShoppingCart());
    });

    it('then present shopping cart modal', (done) => {
      effects.openShoppingCartEffect$.subscribe(() => {
        setTimeout(() => {
          expect(modalController.isPresented).toBeTruthy();
          done();
        }, 100);
      });
    });

    it('when dismiss, then close modal', (done) => {
      store.dispatch(openShoppingCart());

      effects.openShoppingCartEffect$.pipe(take(1)).subscribe(() => {
        setTimeout(() => {
          store.select('shoppingCart').pipe(take(1)).subscribe(state => {
            expect(state.isOpen).toBeFalsy();
            done();
          });
        }, 100);
      });
    });

  });

});
