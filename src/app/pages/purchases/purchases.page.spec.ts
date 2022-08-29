import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';
import { AppState } from 'src/app/store/app-state';
import { companyReducer } from 'src/app/store/company/company.reducers';
import { loadPurchasesFail, loadPurchasesSuccess } from 'src/app/store/purchases/purchases.actions';
import { purchasesReducer } from 'src/app/store/purchases/purchases.reducers';
import { PurchasesPage } from './purchases.page';

describe('PurchasesPage', () => {
  let component: PurchasesPage;
  let fixture: ComponentFixture<PurchasesPage>;
  let store: Store<AppState>;
  let page: PageMock;
  let modalController: ModalControllerMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    modalController = new ModalControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ PurchasesPage ],
      imports: [
        PaymentTypePipeModule,
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('company', companyReducer),
        StoreModule.forFeature('purchases', purchasesReducer)
      ]
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then load purchases', done => {
    store.select('purchases').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading purchases', () => {

    it('then show purchases loader', () => {
      expect(page.querySelector('[test-id="purchases-loader"]')).not.toBeNull();
    });

    it('then hide purchases', () => {
      expect(page.querySelector('[test-id="purchases"]')).toBeNull();
    });

  })

  describe('given purchases loaded', () => {

    beforeEach(() => {
      const purchases = [{id: 1}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();
    })

    it('then hide purchases loader', () => {
      expect(page.querySelector('[test-id="purchases-loader"]')).toBeNull();
    });

    it('then show purchases', () => {
      expect(page.querySelector('[test-id="purchases"]')).not.toBeNull();
    });

    describe('when purchases found', () => {

      it('then show purchase list', () => {
        expect(page.querySelector('[test-id="purchases-list"]')).not.toBeNull();
      });

      it('then hide empty message', () => {
        expect(page.querySelector('[test-id="purchases-empty"]')).toBeNull();
      });

    })

    describe('when no purchases found', () => {

      beforeEach(() => {
        const purchases = [] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();
      })

      it('then hide purchase list', () => {
        expect(page.querySelector('[test-id="purchases-list"]')).toBeNull();
      });

      it('then show empty message', () => {
        expect(page.querySelector('[test-id="purchases-empty"]')).not.toBeNull();
      });

    })

  })

  describe('given error on loading purchases', () => {

    beforeEach(() => {
      const error = {error: "error"};
      store.dispatch(loadPurchasesFail({error}));
      fixture.detectChanges();
    })

    it('then show error message', done => {
      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

});