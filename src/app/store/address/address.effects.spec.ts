import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AddressEffects } from './address.effects';
import { clearZipCodeSearch, getDeliveryPrice, getDeliveryPriceFail, getDeliveryPriceSuccess, searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from './address.actions';
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

  describe('given search by zip code success', () => {

    beforeEach(() => {
      actions$ = of(searchByZipCodeSuccess({address: {zipCode: "anyZipCode"} as any}));
    });

    it('then return clear zip code search', (done) => {
      effects.searchByZipCodeSuccessClearZipCodeSearchEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(clearZipCodeSearch());
        done();
      });
    });

    it('then return get delivery price', (done) => {
      effects.searchByZipCodeSuccessGetDeliveryPriceEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(getDeliveryPrice({zipCode: "anyZipCode"}));
        done();
      });
    });

  });

  describe('given get delivery price', () => {

    beforeEach(() => {
      actions$ = of(getDeliveryPrice({zipCode: 'anyZipCode'}));
    });

    it('when success, then return get delivery price success', (done) => {
      const deliveryPrice = 10;
      addressService._response = of(deliveryPrice);

      effects.getDeliveryPriceEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(getDeliveryPriceSuccess({deliveryPrice}));
        done();
      });
    });

    it('when fail, then return get delivery price fail', (done) => {
      addressService._response = throwError(error);

      effects.getDeliveryPriceEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(getDeliveryPriceFail({error}));
        done();
      });
    });

  });

});

class AddressServiceMock {
  _response;
  findByZipCode() {
    return this._response || of({});
  }
  findDeliveryPrice() {
    return this._response || of({});
  }
}