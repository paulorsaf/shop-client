import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { LoadingControllerMock } from 'src/app/model/mocks/loading-controller.mock';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { AppState } from 'src/app/store/app-state';
import { loginFail, loginSuccess, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
import { loginReducer } from 'src/app/store/login/login.reducers';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let modalController: ModalControllerMock;
  let loadingController: LoadingControllerMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    loadingController = new LoadingControllerMock();
    modalController = new ModalControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    })
    .overrideProvider(LoadingController, {useValue: loadingController})
    .overrideProvider(ModalController, {useValue: modalController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then create form', () => {
    expect(component.form).not.toBeUndefined();
  });

  describe('given form', () => {

    it('when email is empty, then email should be invalid', () => {
      component.form.get('email')!.setValue('');
      fixture.detectChanges();

      expect(component.form.get('email')!.valid).toBeFalsy();
    })

    describe('when email is invalid', () => {

      beforeEach(() => {
        component.form.get('email')!.setValue('invalidEmail');
        fixture.detectChanges();
      })

      it('then email should be invalid', () => {
        expect(component.form.get('email')!.valid).toBeFalsy();
      })
  
      it('then disable recover password button', () => {
        expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeTruthy();
      })

    })

    describe('when email is valid', () => {

      beforeEach(() => {
        component.form.get('email')!.setValue('valid@email.com');
        fixture.detectChanges();
      })

      it('then enable recover password button', () => {
        expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeFalsy();
      })
  
      it('then email should be valid', () => {
        expect(component.form.get('email')!.valid).toBeTruthy();
      })

    })

    it('when password is empty, then password should be invalid', () => {
      component.form.get('password')!.setValue('');
      fixture.detectChanges();

      expect(component.form.get('password')!.valid).toBeFalsy();
    })

    it('when password has a value, then password should be valid', () => {
      component.form.get('password')!.setValue('anyPassword');
      fixture.detectChanges();

      expect(component.form.get('password')!.valid).toBeTruthy();
    })

    it('given form is invalid, then disable login button', () => {
      expect(page.querySelector('[test-id="login-button"]').disabled).toBeTruthy();
    })

    describe('given email and password are valid', () => {

      beforeEach(() => {
        component.form.get('email')!.setValue('valid@email.com');
        component.form.get('password')!.setValue('anyPassword');
        fixture.detectChanges();
      })

      it('then form should be valid', () => {
        expect(component.form.valid).toBeTruthy();
      })

      it('then enable login button', () => {
        expect(page.querySelector('[test-id="login-button"]').disabled).toBeFalsy();
      })

    })

  })

  describe('given user clicks on recover password button', () => {

    beforeEach(() => {
      component.form.get('email')!.setValue('valid@email.com');
      fixture.detectChanges();
      
      page.querySelector('[test-id="recover-password-button"]').click();
      fixture.detectChanges();
    })

    it('then recover password', done => {
      store.select('login').subscribe(state => {
        expect(state.isRecoveringPassword).toBeTruthy();
        done();
      })
    })

    describe('when recovering password', () => {

      it('then show loading', done => {
        setTimeout(() => {
          expect(loadingController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

    describe('when password recovered', () => {

      beforeEach(() => {
        store.dispatch(recoverPasswordSuccess());
        fixture.detectChanges();
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then show success message', done => {
        setTimeout(() => {
          expect(toastController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

    describe('when fails to password recovered', () => {

      beforeEach(() => {
        store.dispatch(recoverPasswordFail({error: {error: "error"}}));
        fixture.detectChanges();
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(toastController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

  describe('given user clicks on login button', () => {

    beforeEach(() => {
      component.form.get('email')!.setValue('valid@email.com');
      component.form.get('password')!.setValue('anyPassword');
      fixture.detectChanges();
      
      page.querySelector('[test-id="login-button"]').click();
      fixture.detectChanges();
    })

    it('then login', done => {
      store.select('login').subscribe(state => {
        expect(state.isLoggingIn).toBeTruthy();
        done();
      })
    })

    describe('when logging in', () => {

      it('then show loading', done => {
        setTimeout(() => {
          expect(loadingController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

    describe('when logged in', () => {

      beforeEach(() => {
        store.dispatch(loginSuccess({user: {id: 1} as any}));
        fixture.detectChanges();
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then hide login apge', done => {
        setTimeout(() => {
          expect(modalController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

    })

    describe('when fails to login', () => {

      beforeEach(() => {
        store.dispatch(loginFail({error: {error: "error"}}));
        fixture.detectChanges();
      })

      it('then hide loading', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(toastController.isPresented).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

  describe('given user clicks on register button', () => {

    beforeEach(() => {
      page.querySelector('[test-id="register-button"]').click();
      fixture.detectChanges();
    })

    it('then hide login page', () => {
      expect(modalController.isDismissed).toBeTruthy();
    })
  
    it('then show register page', done => {
      setTimeout(() => {
        expect(modalController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

});