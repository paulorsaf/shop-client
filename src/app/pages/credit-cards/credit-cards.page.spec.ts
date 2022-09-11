import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AlertControllerMock } from 'src/app/model/mocks/alert-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { AppState } from 'src/app/store/app-state';
import { deleteCreditCardFail, deleteCreditCardSuccess, loadCreditCardsFail, loadCreditCardsSuccess } from 'src/app/store/credit-cards/credit-cards.actions';
import { creditCardsReducer } from 'src/app/store/credit-cards/credit-cards.reducers';
import { CreditCardsPage } from './credit-cards.page';

describe('CreditCardsPage', () => {
  let component: CreditCardsPage;
  let fixture: ComponentFixture<CreditCardsPage>;
  let store: Store<AppState>;
  let page: PageMock;
  let toastController: ToastControllerMock;
  let alertController: AlertControllerMock;

  beforeEach(waitForAsync(() => {
    alertController = new AlertControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ CreditCardsPage ],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('creditCards', creditCardsReducer)
      ]
    })
    .overrideProvider(AlertController, {useValue: alertController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardsPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then load credit cards', done => {
    store.select('creditCards').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  })

  describe('given loading credit cards', () => {

    it('then show credit cards loader', () => {
      expect(page.querySelector('[test-id="credit-cards-loader"]')).not.toBeNull();
    })

    it('then hide credit cards', () => {
      expect(page.querySelector('[test-id="credit-cards"]')).toBeNull();
    })

    xit('then hide credit card button', () => {
      expect(page.querySelector('[test-id="add-card-button"]')).toBeNull();
    })

  })

  describe('given credit cards loaded', () => {

    beforeEach(() => {
      const creditCards = [{id: "anyCreditCardId"}] as any;
      store.dispatch(loadCreditCardsSuccess({creditCards}));
      fixture.detectChanges();
    })

    it('then hide credit cards loader', () => {
      expect(page.querySelector('[test-id="credit-cards-loader"]')).toBeNull();
    })

    it('then show credit cards', () => {
      expect(page.querySelector('[test-id="credit-cards"]')).not.toBeNull();
    })

    xit('then show add credit card button', () => {
      expect(page.querySelector('[test-id="add-card-button"]')).not.toBeNull();
    })

    it('when there are credit cards, then hide empty results message', () => {
      expect(page.querySelector('[test-id="empty-results"]')).toBeNull();
    })

    it('when no credit cards, then show empty results message', () => {
      store.dispatch(loadCreditCardsSuccess({creditCards: []}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="empty-results"]')).not.toBeNull();
    })

    it('when user clicks on delete button, then ask user confirmation', done => {
      page.querySelector('[test-id="delete-button"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(alertController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

    it('when user cancels deletion, then dont delete', done => {
      page.querySelector('[test-id="delete-button"]').click();
      fixture.detectChanges();

      store.select('creditCards').subscribe(state => {
        expect(state.isDeleting).toBeFalsy();
        done();
      })
    })

    it('when user confirm deletion, then delete', done => {
      page.querySelector('[test-id="delete-button"]').click();
      fixture.detectChanges();

      alertController.buttons[1].handler();

      store.select('creditCards').subscribe(state => {
        expect(state.isDeleting).toBeTruthy();
        done();
      })
    })

  })

  describe('given deleting credit card', () => {

    beforeEach(() => {
      const creditCards = [{id: "anyCreditCardId"}] as any;
      store.dispatch(loadCreditCardsSuccess({creditCards}));
      fixture.detectChanges();

      page.querySelector('[test-id="delete-button"]').click();
      fixture.detectChanges();

      alertController.buttons[1].handler();
      fixture.detectChanges();
    })

    it('then show credit cards loader', () => {
      expect(page.querySelector('[test-id="credit-cards-loader"]')).not.toBeNull();
    })

    it('then hide credit cards', () => {
      expect(page.querySelector('[test-id="credit-cards"]')).toBeNull();
    })

    describe('when deleted with success', () => {

      beforeEach(() => {
        store.dispatch(deleteCreditCardSuccess());
        fixture.detectChanges();
      })

      it('then hide credit cards loader', () => {
        expect(page.querySelector('[test-id="credit-cards-loader"]')).toBeNull();
      })
  
      it('then show credit cards', () => {
        expect(page.querySelector('[test-id="credit-cards"]')).not.toBeNull();
      })

    })

    describe('when failed delete', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(deleteCreditCardFail({error}));
        fixture.detectChanges();
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(alertController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

  describe('given error on load credit cards', () => {

    beforeEach(() => {
      const error = {error: "error"};
      store.dispatch(loadCreditCardsFail({error}));
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