import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { RegisterEffects } from './register.effects';
import { AuthServiceMock } from 'src/app/model/mocks/auth.service.mock';
import { AuthService } from 'src/app/services/auth/auth.service';
import { register, registerFail, registerSuccess } from './register.actions';
import { login } from '../login/login.actions';

describe('Register effects', () => {
  let effects: RegisterEffects;
  let actions$: Observable<Action>;
  let authService: AuthServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    authService = new AuthServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RegisterEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(AuthService, { useValue: authService });

    effects = TestBed.get(RegisterEffects);
  });

  describe('given register', () => {

    beforeEach(() => {
      const userRegister = {id: 1} as any;
      actions$ = of(register({userRegister}));
    })

    it('when success, then return register success', (done) => {
      const userRegister = {id: 1} as any;
      authService.response = of(userRegister);

      effects.registerEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(registerSuccess({userRegister}));
        done();
      });
    });
  
    it('when fail, then return register fail', (done) => {
      authService.response = throwError(error);

      effects.registerEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(registerFail({error}));
        done();
      });
    });

  })

  describe('given register success', () => {

    beforeEach(() => {
      const userRegister = {email: "anyEmail", password: "anyPassword"} as any;
      actions$ = of(registerSuccess({userRegister}));
    })

    it('then return login', (done) => {
      effects.registerSuccessEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(login({email: "anyEmail", password: "anyPassword"}));
        done();
      });
    });

  })

});
