import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PurchaseDetailPage } from './purchase-detail.page';
import { AppState } from 'src/app/store/app-state';
import { purchaseDetailReducer } from 'src/app/store/purchase-detail/purchase-detail.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteMock } from 'src/app/model/mocks/activated-route.mock';
import { ActivatedRoute } from '@angular/router';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { loadPurchaseDetailFail, loadPurchaseDetailSuccess } from 'src/app/store/purchase-detail/purchase-detail.action';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';

fdescribe('PurchaseDetailPage', () => {
  let component: PurchaseDetailPage;
  let fixture: ComponentFixture<PurchaseDetailPage>;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let page: PageMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    activatedRoute = new ActivatedRouteMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [
        PurchaseDetailPage
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then load purchase detail', done => {
    store.select('purchaseDetail').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading purchase', () => {

    it('then show purchase detail loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).not.toBeNull();
    })

    it('then hide purchase detail', () => {
      expect(page.querySelector('[test-id="purchase-detail"]')).toBeNull();
    })

  })

  describe('given purchase loaded', () => {

    beforeEach(() => {
      const purchase = {id: '1'} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then hide purchase detail loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show purchase detail', () => {
      expect(page.querySelector('[test-id="purchase-detail"]')).not.toBeNull();
    })

  })

  describe('given purchase loaded with error', () => {

    beforeEach(() => {
      const error = {id: '1'} as any;
      store.dispatch(loadPurchaseDetailFail({error}));
      fixture.detectChanges();
    })

    it('then hide purchase detail loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show error message', done => {
      setTimeout(() => {
        expect(toastController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

});
