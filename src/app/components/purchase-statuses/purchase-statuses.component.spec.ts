import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { PurchaseStatusesComponent } from './purchase-statuses.component';

describe('PurchaseStatusesComponent', () => {
  let component: PurchaseStatusesComponent;
  let fixture: ComponentFixture<PurchaseStatusesComponent>;
  let page: PageMock;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseStatusesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseStatusesComponent);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('given purchase type is not by money, then show payment status', () => {
    component.purchase = {payment: {type: "ANY"}} as any;
  
    fixture.detectChanges();

    expect(page.querySelector('[test-id="payment"]')).not.toBeNull();
  })

  it('given purchase type is by money, then hide payment status', () => {
    component.purchase = {payment: {type: "MONEY"}} as any;
  
    fixture.detectChanges();

    expect(page.querySelector('[test-id="payment"]')).toBeNull();
  })

  describe('given purchase is delivery', () => {

    beforeEach(() => {
      component.purchase = {address: {}} as any;
      fixture.detectChanges();
    })

    it('then show delivery status', () => {
      expect(page.querySelector('[test-id="deliverying"]')).not.toBeNull();
    })

    it('then hide ready for pickup status', () => {
      expect(page.querySelector('[test-id="ready-for-pick-up"]')).toBeNull();
    })

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
      expect(page.querySelector('[test-id="ready-for-pick-up"]')).not.toBeNull();
    })

  })

});
