import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { PurchaseStatusMessageComponent } from './purchase-status-message.component';

describe('PurchaseStatusMessageComponent', () => {
  let component: PurchaseStatusMessageComponent;
  let fixture: ComponentFixture<PurchaseStatusMessageComponent>;
  let page: PageMock;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseStatusMessageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseStatusMessageComponent);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('given purchase status is created, then show created payment message', () => {
    component.purchase = {status: "CREATED"} as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="created-payment-message"]')).not.toBeNull();
  })

  it('given purchase status is verifying payment, then show verifying payment message', () => {
    component.purchase = {status: "VERIFYING_PAYMENT"} as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="verifying-payment-message"]')).not.toBeNull();
  })

  it('given purchase status is paid, then show paid message', () => {
    component.purchase = {status: "PAID"} as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="paid-message"]')).not.toBeNull();
  })

  it('given purchase status is sorting out, then show sorting out message', () => {
    component.purchase = {status: "SORTING_OUT"} as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="sorting-out-message"]')).not.toBeNull();
  })

  it('given purchase status is ready, then show ready message', () => {
    component.purchase = {status: "READY"} as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="ready-message"]')).not.toBeNull();
  })

  it('given purchase status is deliverying, then show deliverying message', () => {
    component.purchase = {status: "DELIVERYING"} as any;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="deliverying-message"]')).not.toBeNull();
  })
  
});
