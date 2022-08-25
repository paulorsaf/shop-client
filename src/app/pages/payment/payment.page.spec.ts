import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { LoadingControllerMock } from 'src/app/model/mocks/loading-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { AppState } from 'src/app/store/app-state';
import { companyReducer } from 'src/app/store/company/company.reducers';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { PaymentPage } from './payment.page';

describe('PaymentPage', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;
  let page: PageMock;
  let location: Location;
  let store: Store<AppState>;
  let loadingController: LoadingControllerMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    loadingController = new LoadingControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ PaymentPage ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'payment/purchase-success', component: BlankMockComponent
        }]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('company', companyReducer),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    })
    .overrideProvider(LoadingController, {useValue: loadingController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPage);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

});
