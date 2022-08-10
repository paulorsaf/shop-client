import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BrMaskDirective, BrMaskerModule } from 'br-mask';
import { LoadingControllerMock } from 'src/app/model/mocks/loading-controller.mock';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ToastControllerMock } from 'src/app/model/mocks/toast-controller.mock';
import { AppState } from 'src/app/store/app-state';
import { registerFail, registerSuccess } from 'src/app/store/register/register.actions';
import { registerReducer } from 'src/app/store/register/register.reducers';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let loadingController: LoadingControllerMock;
  let modalController: ModalControllerMock;
  let toastController: ToastControllerMock;

  beforeEach(waitForAsync(() => {
    loadingController = new LoadingControllerMock();
    modalController = new ModalControllerMock();
    toastController = new ToastControllerMock();

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        BrMaskerModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('register', registerReducer)
      ],
      providers: [
        BrMaskDirective
      ]
    })
    .overrideProvider(LoadingController, {useValue: loadingController})
    .overrideProvider(ModalController, {useValue: modalController})
    .overrideProvider(ToastController, {useValue: toastController})
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    store = TestBed.inject(Store);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given page starts, then create form', () => {
    expect(component.form).not.toBeUndefined();
  })

  describe('given form', () => {

    it('when name is empty, then name should be invalid', () => {
      component.form.get('name')!.setValue('');
      fixture.detectChanges();
  
      expect(component.form.get('name')!.valid).toBeFalsy();
    })

    it('when name is present, then name should be valid', () => {
      component.form.get('name')!.setValue('any name');
      fixture.detectChanges();
  
      expect(component.form.get('name')!.valid).toBeTruthy();
    })

    it('when email is empty, then email should be invalid', () => {
      component.form.get('email')!.setValue('');
      fixture.detectChanges();
  
      expect(component.form.get('email')!.valid).toBeFalsy();
    })

    it('when email is not valid, then email should be invalid', () => {
      component.form.get('email')!.setValue('invalidEmail');
      fixture.detectChanges();
  
      expect(component.form.get('email')!.valid).toBeFalsy();
    })

    it('when email is correct, then email should be valid', () => {
      component.form.get('email')!.setValue('valid@email.com');
      fixture.detectChanges();
  
      expect(component.form.get('email')!.valid).toBeTruthy();
    })

    it('when password is empty, then password should be invalid', () => {
      component.form.get('password')!.setValue('');
      fixture.detectChanges();
  
      expect(component.form.get('password')!.valid).toBeFalsy();
    })

    it('when password length is less than 6 chars, then password should be invalid', () => {
      component.form.get('password')!.setValue('12345');
      fixture.detectChanges();
  
      expect(component.form.get('password')!.valid).toBeFalsy();
    })

    it('when password is correct, then password should be valid', () => {
      component.form.get('password')!.setValue('123456');
      fixture.detectChanges();
  
      expect(component.form.get('password')!.valid).toBeTruthy();
    })

    it('when cpf/cnpj is empty, then cpf/cnpj should be invalid', () => {
      component.form.get('cpfCnpj')!.setValue('');
      fixture.detectChanges();
  
      expect(component.form.get('cpfCnpj')!.valid).toBeFalsy();
    })

    it('when cpf is not valid, then cpf/cnpj should be invalid', () => {
      component.form.get('cpfCnpj')!.setValue('863.262.680-91');
      fixture.detectChanges();
  
      expect(component.form.get('cpfCnpj')!.valid).toBeFalsy();
    })

    it('when cpf is valid, then cpf/cnpj should be valid', () => {
      component.form.get('cpfCnpj')!.setValue('863.262.680-95');
      fixture.detectChanges();
  
      expect(component.form.get('cpfCnpj')!.valid).toBeTruthy();
    })

    it('when cnpj is not valid, then cpf/cnpj should be invalid', () => {
      component.form.get('cpfCnpj')!.setValue('69.215.506/0001-11');
      fixture.detectChanges();
  
      expect(component.form.get('cpfCnpj')!.valid).toBeFalsy();
    })

    it('when cnpj is valid, then cpf/cnpj should be valid', () => {
      component.form.get('cpfCnpj')!.setValue('69.215.506/0001-14');
      fixture.detectChanges();
  
      expect(component.form.get('cpfCnpj')!.valid).toBeTruthy();
    })

    it('when phone is empty, then phone should be invalid', () => {
      component.form.get('phone')!.setValue('');
      fixture.detectChanges();
  
      expect(component.form.get('phone')!.valid).toBeFalsy();
    })

    it('when form is invalid, then disable register button', () => {
      expect(page.querySelector('[test-id="register-button"]').disabled).toBeTruthy();
    })

    it('when form is valid, then enable register button', () => {
      component.form.get('cpfCnpj').setValue('863.262.680-95');
      component.form.get('email').setValue('any@email.com');
      component.form.get('name').setValue('name');
      component.form.get('password').setValue('anyPassword');
      component.form.get('phone').setValue('23456789');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="register-button"]').disabled).toBeFalsy();
    })

  })

  describe('given user clicks on login button', () => {

    beforeEach(() => {
      page.querySelector('[test-id="login-button"]').click();
      fixture.detectChanges();
    })

    it('then hide modal', () => {
      expect(modalController.isDismissed).toBeTruthy();
    })
  
    it('then show login modal', done => {
      setTimeout(() => {
        expect(modalController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

  describe('given user clicks on register button', () => {

    beforeEach(() => {
      component.form.get('cpfCnpj').setValue('863.262.680-95');
      component.form.get('email').setValue('any@email.com');
      component.form.get('name').setValue('name');
      component.form.get('password').setValue('anyPassword');
      component.form.get('phone').setValue('23456789');
      fixture.detectChanges();

      page.querySelector('[test-id="register-button"]').click();
      fixture.detectChanges();
    })

    it('then register', done => {
      store.select('register').subscribe(state => {
        expect(state.isRegistering).toBeTruthy();
        done();
      })
    })

    it('when registering, then show loader', done => {
      setTimeout(() => {
        expect(loadingController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

    describe('when registered', () => {

      beforeEach(() => {
        const userRegister = {id: 1} as any;
        store.dispatch(registerSuccess({userRegister}));
        fixture.detectChanges();
      })

      it('then hide loader', done => {
        setTimeout(() => {
          expect(loadingController.isDismissed).toBeTruthy();
          done();
        }, 100)
      })

      it('then hide modal', () => {
        expect(modalController.isDismissed).toBeTruthy();
      })

    })

    describe('when error on register', () => {

      beforeEach(() => {
        store.dispatch(registerFail({error: {error: "error"}}));
        fixture.detectChanges();
      })

      it('then hide loader', done => {
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

});
