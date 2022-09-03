import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AddressEffects } from './address.effects';
import { searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from './address.actions';
import { AddressService } from 'src/app/services/address/address.service';

describe('Address effects', () => {
  let effects: AddressEffects;
  let actions$: Observable<Action>;
  let addressService: AddressServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    addressService = new AddressServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddressEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(AddressService, { useValue: addressService });

    effects = TestBed.get(AddressEffects);
  });

  describe('given search by zip code', () => {

    beforeEach(() => {
      actions$ = of(searchByZipCode({zipCode: 'anyZipCode'}));
    });

    it('when success, then return search by zip code success', (done) => {
      const address = {id: 1} as any;
      addressService._response = of(address);

      effects.searchByZipCodeEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(searchByZipCodeSuccess({address}));
        done();
      });
    });

    it('when fail, then return search by zip code fail', (done) => {
      addressService._response = throwError(error);

      effects.searchByZipCodeEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(searchByZipCodeFail({error}));
        done();
      });
    });

  });

});

class AddressServiceMock {
  _response;
  findByZipCode() {
    return this._response;
  }
}