import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { companyReducer } from 'src/app/store/company/company.reducers';
import { makePurchaseSuccess } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { RetryPaymentPage } from './retry-payment.page';

describe('RetryPaymentPage', () => {
  let component: RetryPaymentPage;
  let fixture: ComponentFixture<RetryPaymentPage>;
  let store: Store<AppState>;
  let page: PageMock;
  let modalController: ModalControllerMock;

  beforeEach(waitForAsync(() => {
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      declarations: [ RetryPaymentPage ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('company', companyReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

    fixture = TestBed.createComponent(RetryPaymentPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    component.purchase = {
      companyId: "anyCompanyId",
      products: []
    } as any;

    fixture.detectChanges();
  }));

  it('given page starts, then load purchase company', done => {
    store.select('company').subscribe(state => {
      expect(state.isLoadingById).toBeTruthy();
      done();
    })
  });

  it('given user clicks on close button, then close modal', done => {
    page.querySelector('[test-id="close-button"]').click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(modalController.isDismissed).toBeTruthy();
      done();
    }, 100);
  })

  it('given payment success, then close modal', done => {
    store.dispatch(makePurchaseSuccess());
    fixture.detectChanges();

    setTimeout(() => {
      expect(modalController.isDismissed).toBeTruthy();
      done();
    }, 100);
  })

});
