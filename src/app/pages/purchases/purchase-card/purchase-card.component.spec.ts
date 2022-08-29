import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { PaymentType } from 'src/app/model/payment/payment';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';
import { PurchaseCardComponent } from './purchase-card.component';

describe('PurchaseCardComponent', () => {
  let component: PurchaseCardComponent;
  let fixture: ComponentFixture<PurchaseCardComponent>;
  let page: PageMock;
  let modalController: ModalControllerMock;
  let location: Location;

  beforeEach(waitForAsync(() => {
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      declarations: [ PurchaseCardComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          {path: 'purchases/:id', component: BlankMockComponent}
        ]),
        PaymentTypePipeModule
      ]
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCardComponent);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;

    page = fixture.debugElement.nativeElement;
  }));

  it('given user clicks on purchase, then go to purchase detail page', done => {
    component.purchase = {id: 1} as any;
    fixture.detectChanges();

    page.querySelector('[test-id="purchase-card"]').click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/purchases/1');
      done();
    }, 100);
  });

  describe('given payment type', () => {

    it("when by money, then hide payment status item", () => {
      component.purchase = {payment: {type: PaymentType.MONEY}} as any;
      fixture.detectChanges();
  
      expect(page.querySelector('[test-id="payment"]')).toBeNull();
    })
  
    it("when not by money, then show payment status item", () => {
      component.purchase = {payment: {type: PaymentType.PIX}} as any;
      fixture.detectChanges();
  
      expect(page.querySelector('[test-id="payment"]')).not.toBeNull();
    })

  })

  describe('given delivery type', () => {

    describe('when delivery', () => {

      beforeEach(() => {
        component.purchase = {address: {address: "anyAddress"}} as any;
        fixture.detectChanges();
      })
  
      it("then show delivery status item", () => {
        expect(page.querySelector('[test-id="deliverying"]')).not.toBeNull();
      })
  
      it("then hide ready for pick-up status item", () => {
        expect(page.querySelector('[test-id="ready-for-pick-up"]')).toBeNull();
      })
  
    })

    describe('when pick-up', () => {
  
      beforeEach(() => {
        component.purchase = {address: null} as any;
        fixture.detectChanges();
      })
  
      it("then hide delivery status item", () => {
        expect(page.querySelector('[test-id="deliverying"]')).toBeNull();
      })
  
      it("then show ready for pick-up status item", () => {
        expect(page.querySelector('[test-id="ready-for-pick-up"]')).not.toBeNull();
      })
  
    })

  })
    
  describe('given there is error on payment', () => {

    beforeEach(() => {
      component.purchase = {status: "ANY", payment: {error: {}}} as any;
      fixture.detectChanges();
    })

    it('then hide purchase message', () => {
      expect(page.querySelector('[test-id="purchase-message"]')).toBeNull();
    })

    it('then show error message', () => {
      expect(page.querySelector('[test-id="payment-error"]')).not.toBeNull();
    })

    describe('when user clicks on retry payment button', () => {

      beforeEach(() => {
        page.querySelector('[test-id="retry-payment-button"]').click();
        fixture.detectChanges();
      })

      it('then open retry payment page', done => {
        setTimeout(() => {
          expect(modalController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

  });

  describe('given there is no error on payment', () => {

    beforeEach(() => {
      component.purchase = {status: "ANY", payment: {}} as any;
      fixture.detectChanges();
    })

    it('then show purchase message', () => {
      expect(page.querySelector('[test-id="purchase-message"]')).not.toBeNull();
    })

    it('then hide error message', () => {
      expect(page.querySelector('[test-id="payment-error"]')).toBeNull();
    })

    it('then hide retry payment button', () => {
      expect(page.querySelector('[test-id="retry-payment-button"]')).toBeNull();
    })
    
  });
    
  describe('given purchase status', () => {

    it('when status is created, then show created payment message', () => {
      component.purchase = {status: "CREATED"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="created-payment-message"]')).not.toBeNull();
    })

    it('when status is verifying payment, then show verifying payment message', () => {
      component.purchase = {status: "VERIFYING_PAYMENT"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="verifying-payment-message"]')).not.toBeNull();
    })

    it('when status is not verifying payment, then hide verifying payment message', () => {
      component.purchase = {status: "ANY"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="verifying-payment-message"]')).toBeNull();
    })

    it('when status is paid, then show paid message', () => {
      component.purchase = {status: "PAID"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="paid-message"]')).not.toBeNull();
    })

    it('when status is not paid, then hide paid message', () => {
      component.purchase = {status: "ANY"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="paid-message"]')).toBeNull();
    })

    it('when status is sorting out, then show sorting out message', () => {
      component.purchase = {status: "SORTING_OUT"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="sorting-out-message"]')).not.toBeNull();
    })

    it('when status is not sorting out, then hide sorting out message', () => {
      component.purchase = {status: "ANY"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="sorting-out-message"]')).toBeNull();
    })

    it('when status is ready, then show ready message', () => {
      component.purchase = {status: "READY"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="ready-message"]')).not.toBeNull();
    })

    it('when status is not ready, then hide ready message', () => {
      component.purchase = {status: "ANY"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="ready-message"]')).toBeNull();
    })

    it('when status is deliverying, then show deliverying message', () => {
      component.purchase = {status: "DELIVERYING"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="deliverying-message"]')).not.toBeNull();
    })

    it('when status is not deliverying, then hide deliverying message', () => {
      component.purchase = {status: "ANY"} as any;
      fixture.detectChanges();

      expect(page.querySelector('[test-id="deliverying-message"]')).toBeNull();
    })

  })

});
