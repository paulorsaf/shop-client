import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoginEffects } from './login.effects';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.actions';
import { AuthServiceMock } from 'src/app/model/mocks/auth.service.mock';
import { AuthService } from 'src/app/services/auth/auth.service';
import { setUser } from '../user/user.actions';

describe('Login effects', () => {
  let effects: LoginEffects;
  let actions$: Observable<Action>;
  let authService: AuthServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    authService = new AuthServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([LoginEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(AuthService, { useValue: authService });

    effects = TestBed.get(LoginEffects);
  });

  describe('given login', () => {

    beforeEach(() => {
      actions$ = of(login({email: "any", password: "any"}));
    })

    it('when success, then return login success', (done) => {
      const user = <any> {id: 1};
      authService.response = of(user);

      effects.loginEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loginSuccess({user}));
        done();
      });
    });
  
    it('when fail, then return login fail', (done) => {
      authService.response = throwError(error);

      effects.loginEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loginFail({error}));
        done();
      });
    });

  })

  describe('given login success', () => {

    const user = {id: 1} as any;

    beforeEach(() => {
      actions$ = of(loginSuccess({user}));
    })

    it('then return set user', (done) => {
      effects.loginSuccessEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(setUser({user}));
        done();
      });
    });

  })

  describe('given recover password', () => {

    beforeEach(() => {
      actions$ = of(recoverPassword({email: "any"}));
    })

    it('when success, then return recover password success', (done) => {
      authService.response = of({});

      effects.recoverPasswordEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(recoverPasswordSuccess());
        done();
      });
    });
  
    it('when fail, then return recover password fail', (done) => {
      authService.response = throwError(error);

      effects.recoverPasswordEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(recoverPasswordFail({error}));
        done();
      });
    });

  })

});
