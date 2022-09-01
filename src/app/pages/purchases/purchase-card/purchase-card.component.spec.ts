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

});
