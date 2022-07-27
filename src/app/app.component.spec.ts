import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ModalControllerMock } from './model/mocks/modal-controller.mock';
import { PageMock } from './model/mocks/page.mock';
import { AppState } from './store/app-state';
import { setUser } from './store/user/user.actions';
import { userReducer } from './store/user/user.reducers';

fdescribe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let modalController: ModalControllerMock;

  beforeEach(waitForAsync(() => {
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('user', userReducer)
      ],
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  describe('given user is not logged', () => {

    it('then show login button', () => {
      expect(page.querySelector('[test-id="login-menu"]')).not.toBeNull();
    })

    it('then hide logout button', () => {
      expect(page.querySelector('[test-id="logout-menu"]')).toBeNull();
    })

    it('when user clicks on login button, then show login', done => {
      page.querySelector('[test-id="login-menu"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(modalController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

  describe('given user is logged', () => {

    beforeEach(() => {
      const user = {id: 1} as any;
      store.dispatch(setUser({user}));
      fixture.detectChanges();
    })

    it('then hide login button', () => {
      expect(page.querySelector('[test-id="login-menu"]')).toBeNull();
    })

    it('then show logout button', () => {
      expect(page.querySelector('[test-id="logout-menu"]')).not.toBeNull();
    })

    describe('when user clicks on logout button', () => {

      beforeEach(() => {
        page.querySelector('[test-id="logout-menu"]').click();
        fixture.detectChanges();
      })

      it('then logout', done => {
        store.select('user').subscribe(state => {
          expect(state.isLoggingOut).toBeTruthy();
          done();
        })
      })

    })

  })

});