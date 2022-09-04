import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { Address } from 'src/app/model/address/address';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { LoadingControllerMock } from 'src/app/model/mocks/loading-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { getDeliveryPrice, getDeliveryPriceSuccess, searchByZipCodeFail, searchByZipCodeSuccess } from 'src/app/store/address/address.actions';
import { addressReducer } from 'src/app/store/address/address.reducers';
import { AppState } from 'src/app/store/app-state';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { DeliveryAddressPage } from './delivery-address.page';

fdescribe('DeliveryAddressPage', () => {
  let component: DeliveryAddressPage;
  let fixture: ComponentFixture<DeliveryAddressPage>;
  let page: PageMock;
  let location: Location;
  let store: Store<AppState>;
  let loadingController: LoadingControllerMock;
  let toastController: ToastControllerMock;

  const address = {
    street: "anyStreet",
    number: 'anyNumber',
    complement: 'anyComplement',
    neighborhood: 'anyNeighborhood',
    city: 'anyCity',
    state: 'anyState',
    latitude: 1,
    longitude: 2
  } as any;

  beforeEach(waitForAsync(() => {
    loadingController = new LoadingControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ DeliveryAddressPage ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'payment', component: BlankMockComponent
        }]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('address', addressReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(LoadingController, {useValue: loadingController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddressPage);
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
      expect(component.form.value.deliveryType).toEqual("DELIVERY");
    })

    it('then hide address details', () => {
      expect(page.querySelector('[test-id="address-details"]')).toBeNull();
    })

  })

  describe('given delivery type', () => {

    it('when delivery, then show address form', () => {
      expect(page.querySelector('[test-id="address-form"]')).not.toBeNull();
    })

    it('when pick up, then hide address form', () => {
      component.form.get('deliveryType')!.setValue('PICK_UP');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="address-form"]')).toBeNull();
    })

  })

  describe('given form', () => {

    it('when street is empty, then street should be invalid', () => {
      expect(component.form.get('street')!.valid).toBeFalsy();
    })

    it('when number is empty, then number should be invalid', () => {
      expect(component.form.get('number')!.valid).toBeFalsy();
    })

    it('when complement is empty, then complement should be invalid', () => {
      expect(component.form.get('complement')!.valid).toBeFalsy();
    })

    it('when neighborhood is empty, then neighborhood should be invalid', () => {
      expect(component.form.get('neighborhood')!.valid).toBeFalsy();
    })

    it('when zip code is empty, then zip code should be invalid', () => {
      expect(component.form.get('zipCode')!.valid).toBeFalsy();
    })

    it('when city is empty, then city should be invalid', () => {
      expect(component.form.get('city')!.valid).toBeFalsy();
    })

    it('when state is empty, then state should be invalid', () => {
      expect(component.form.get('state')!.valid).toBeFalsy();
    })

  })

  describe('given user changes zip code', () => {

    beforeEach(() => {
      component.form.get('zipCode').setValue('12.345-67');
      fixture.detectChanges();

      component.onChangeZipCode();
    })

    it('then search for zip code details', done => {
      store.select('address').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    });

    describe('when searching for zip code', () => {

      it('then show loading', done => {
        setTimeout(() => {
          expect(loadingController.isPresented).toBeTruthy();
          done();
        })
      })

      it('then hide address details', () => {
        expect(page.querySelector('[test-id="address-details"]')).toBeNull();
      })

    })

    describe('when zip code loaded', () => {

      beforeEach(() => {
        store.dispatch(searchByZipCodeSuccess({address}));
        fixture.detectChanges();
      })

      it('then show address details', () => {
        expect(page.querySelector('[test-id="address-details"]')).not.toBeNull();
      })

      it('then populate address fields', () => {
        expect(component.form.value).toEqual({
          deliveryType: "DELIVERY",
          street: "anyStreet",
          number: "anyNumber",
          complement: "anyComplement",
          neighborhood: "anyNeighborhood",
          zipCode: "12.345-67",
          city: "anyCity",
          state: "anyState",
          latitude: 1,
          longitude: 2,
        });
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        })
      })

    })

    describe('when error on load zip code', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(searchByZipCodeFail({error}));
        fixture.detectChanges();
      })

      it('then show error', done => {
        setTimeout(() => {
          expect(toastController.isPresented).toBeTruthy();
          done();
        })
      })

    })

  })

  describe('given getting delivery price', () => {

    beforeEach(() => {
      store.dispatch(searchByZipCodeSuccess({address}));
      store.dispatch(getDeliveryPrice({zipCode: "anyZipCode"}));
      fixture.detectChanges();
    });

    it('then show delivery price loader', () => {
      expect(page.querySelector('[test-id="delivery-price-value-loader"]')).not.toBeNull();
    })

    it('then hide delivery price', () => {
      expect(page.querySelector('[test-id="delivery-price-value"]')).toBeNull();
    })

    describe('when delivery price loaded', () => {

      beforeEach(() => {
        store.dispatch(getDeliveryPriceSuccess({deliveryPrice: 10}));
        fixture.detectChanges();
      });
  
      it('then hide delivery price loader', () => {
        expect(page.querySelector('[test-id="delivery-price-value-loader"]')).toBeNull();
      })
  
      it('then show delivery price', () => {
        expect(page.querySelector('[test-id="delivery-price-value"]')).not.toBeNull();
      })

    })

  })

  describe('given delivery type is delivery', () => {

    it('when form is invalid and user clicks on next button, then do not go to payment page', done => {
      page.querySelector('[test-id="next-button"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('');
        done();
      }, 100);
    })
    
    describe('when form is valid and user clicks on next button', () => {

      beforeEach(() => {
        fillForm();
  
        store.dispatch(getDeliveryPriceSuccess({deliveryPrice: 10}));
        page.querySelector('[test-id="next-button"]').click();
        fixture.detectChanges();
      })

      it('then save delivery address', done => {
        store.select('shoppingCart').subscribe(state => {
          expect(state.deliveryAddress).toEqual({
            street: 'anyStreet',
            number: 'anyNumber',
            complement: 'anyComplement',
            neighborhood: 'anyNeighborhood',
            zipCode: 'anyZipCode',
            city: 'anyCity',
            state: 'anyState',
            latitude: 1,
            longitude: 2
          } as Address)
          done();
        })
      })

      it('then set delivery price', done => {
        store.select('shoppingCart').subscribe(state => {
          expect(state.deliveryPrice).toEqual(10);
          done();
        })
      })

      it('then go to payment page', done => {
        setTimeout(() => {
          expect(location.path()).toEqual('/payment');
          done();
        }, 100);
      })

    })

  })

  describe('given delivery type is pick up', () => {

    beforeEach(() => {
      component.form.controls.deliveryType.setValue('PICK_UP');
      fixture.detectChanges();
    })

    it('then hide delivery price', () => {
      store.dispatch(searchByZipCodeSuccess({address: {} as any}));
      store.dispatch(getDeliveryPriceSuccess({deliveryPrice: 10}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="delivery-price"]')).toBeNull();
    })

    describe('when user clicks on next button', () => {

      it('then set delivery price', done => {
        store.dispatch(getDeliveryPriceSuccess({deliveryPrice: 10}));
        
        page.querySelector('[test-id="next-button"]').click();
        fixture.detectChanges();

        store.select('shoppingCart').subscribe(state => {
          expect(state.deliveryPrice).toBeUndefined();
          done();
        })
      })

      it('then go to payment page', done => {
        page.querySelector('[test-id="next-button"]').click();
        fixture.detectChanges();

        setTimeout(() => {
          expect(location.path()).toEqual('/payment');
          done();
        }, 100);
      })

    })

  })

  function fillForm() {
    component.form.controls.street.setValue('anyStreet');
    component.form.controls.number.setValue('anyNumber');
    component.form.controls.complement.setValue('anyComplement');
    component.form.controls.neighborhood.setValue('anyNeighborhood');
    component.form.controls.zipCode.setValue('anyZipCode');
    component.form.controls.city.setValue('anyCity');
    component.form.controls.state.setValue('anyState');
    component.form.controls.latitude.setValue(1);
    component.form.controls.longitude.setValue(2);
    fixture.detectChanges();
  }

});
