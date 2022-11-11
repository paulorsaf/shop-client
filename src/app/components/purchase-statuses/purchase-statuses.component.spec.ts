import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadOrganizationCompaniesSuccess } from 'src/app/store/organization/organization.action';
import { organizationReducer } from 'src/app/store/organization/organization.reducers';
import { PurchaseStatusesComponent } from './purchase-statuses.component';

describe('PurchaseStatusesComponent', () => {
  let component: PurchaseStatusesComponent;
  let fixture: ComponentFixture<PurchaseStatusesComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseStatusesComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('organization', organizationReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseStatusesComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('given purchase status is created, then highlight created tab', () => {
    component.purchase = { status: "CREATED" } as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="created"].selected')).not.toBeNull();
  })

  it('given purchase status is verifying payment, then highlight verifying payment tab', () => {
    component.purchase = { status: "VERIFYING_PAYMENT" } as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="payment"].selected')).not.toBeNull();
  })

  it('given purchase status is sorting out, then highlight sorting out tab', () => {
    component.purchase = { status: "SORTING_OUT" } as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="sorting-out"].selected')).not.toBeNull();
  })

  describe('given purchase is delivery', () => {

    beforeEach(() => {
      component.purchase = {address: {}} as any
      fixture.detectChanges();
    })

    it('then show deliverying tab', () => {
      expect(page.querySelector('[test-id="deliverying"]')).not.toBeNull();
    })

    it('then hide ready tab', () => {
      expect(page.querySelector('[test-id="ready"]')).toBeNull();
    })

    describe('when status is deliverying', () => {

      beforeEach(() => {
        component.purchase.status = "DELIVERYING";
        fixture.detectChanges();
      })

      it('then highlight deliverying tab', () => {
        expect(page.querySelector('[test-id="deliverying"].selected')).not.toBeNull();
      })

    })

  })

  describe('given purchase is pick up', () => {

    beforeEach(() => {
      component.purchase = {} as any;
      fixture.detectChanges();
    })

    it('then hide deliverying tab', () => {
      expect(page.querySelector('[test-id="deliverying"]')).toBeNull();
    })

    it('then show ready tab', () => {
      expect(page.querySelector('[test-id="ready"]')).not.toBeNull();
    })

    describe('when status is ready', () => {

      beforeEach(() => {
        component.purchase.status = "READY";
        fixture.detectChanges();
      })

      it('then highlight ready tab', () => {
        expect(page.querySelector('[test-id="ready"].selected')).not.toBeNull();
      })

    })

  })

  describe('given status is cancelled', () => {

    beforeEach(() => {
      component.purchase = {status: "CANCELLED"} as any
    })

    it('then show cancelled tab', () => {
      fixture.detectChanges();

      expect(page.querySelector('[test-id="cancelled"]')).not.toBeNull();
    })

    it('then highlight cancelled tab', () => {
      fixture.detectChanges();

      expect(page.querySelector('[test-id="cancelled"].selected')).not.toBeNull();
    })

    it('then hide finished tab', () => {
      fixture.detectChanges();

      expect(page.querySelector('[test-id="finished"]')).toBeNull();
    })

  })

  describe('given status is finished', () => {

    beforeEach(() => {
      component.purchase = {status: "FINISHED"} as any
    })

    it('then show finished tab', () => {
      fixture.detectChanges();

      expect(page.querySelector('[test-id="finished"]')).not.toBeNull();
    })

    it('then highlight finished tab', () => {
      fixture.detectChanges();

      expect(page.querySelector('[test-id="finished"].selected')).not.toBeNull();
    })

    it('then hide cancelled tab', () => {
      fixture.detectChanges();

      expect(page.querySelector('[test-id="cancelled"]')).toBeNull();
    })

  })

  it('given purchase type is by money, then hide payment status', () => {
    component.purchase = {payment: {type: "MONEY"}} as any;
  
    fixture.detectChanges();

    expect(page.querySelector('[test-id="payment"]')).toBeNull();
  })

  describe('given purchase is pick up', () => {

    beforeEach(() => {
      component.purchase = {} as any;
      fixture.detectChanges();
    })

    it('then hide delivery status', () => {
      expect(page.querySelector('[test-id="deliverying"]')).toBeNull();
    })

    it('then show ready for pickup status', () => {
      expect(page.querySelector('[test-id="ready"]')).not.toBeNull();
    })

  })

  describe('given purchase status', () => {

    describe('when finished', () => {

      beforeEach(() => {
        component.purchase = {status: "FINISHED"} as any;
        fixture.detectChanges();
      })

      it('then hide cancelled status', () => {
        expect(page.querySelector('[test-id="cancelled"]')).toBeNull();
      })

      it('then show finished status', () => {
        expect(page.querySelector('[test-id="finished"]')).not.toBeNull();
      })

    })

    describe('when cancelled', () => {

      beforeEach(() => {
        component.purchase = {status: "CANCELLED"} as any;
        fixture.detectChanges();
      })

      it('then show cancelled status', () => {
        expect(page.querySelector('[test-id="cancelled"]')).not.toBeNull();
      })

      it('then hide finished status', () => {
        expect(page.querySelector('[test-id="finished"]')).toBeNull();
      })

    })

  })

  describe('given payment type is money', () => {

    beforeEach(() => {
      component.purchase = {payment: {type: "MONEY"}} as any;
      fixture.detectChanges();
    })

    it('then hide verifying payment tab', () => {
      expect(page.querySelector('[test-id="verifying-payment"]')).toBeNull();
    })

    it('then hide paid tab', () => {
      expect(page.querySelector('[test-id="paid"]')).toBeNull();
    })

  })

  describe('given company payment is before purchase', () => {

    beforeEach(() => {
      const companies = [{payment: {isPaymentAfterPurchase: false}}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
    })

    it('then show verifying payment tab', () => {
      component.purchase = { status: "VERIFYING_PAYMENT", payment: {} } as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment"]')).not.toBeNull();
    })

    it('then hide verifying payment after tab', () => {
      component.purchase = { status: "WAITING_PAYMENT", payment: {} } as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment-after"]')).toBeNull();
    })

  })

  describe('given company payment is after purchase', () => {

    beforeEach(() => {
      const companies = [{payment: {isPaymentAfterPurchase: true}}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
    })

    it('then hide verifying payment tab', () => {
      component.purchase = { status: "VERIFYING_PAYMENT", payment: {} } as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment"]')).toBeNull();
    })

    it('then show waiting payment after tab', () => {
      component.purchase = { status: "WAITING_PAYMENT", payment: {} } as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment-after"]')).not.toBeNull();
    })

  })

});
