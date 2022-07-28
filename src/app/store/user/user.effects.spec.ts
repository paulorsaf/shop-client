import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { UserEffects } from './user.effects';
import { AuthServiceMock } from 'src/app/model/mocks/auth.service.mock';
import { AuthService } from 'src/app/services/auth/auth.service';
import { loginUserByToken, loginUserByTokenFail, loginUserByTokenSuccess, logout, logoutFail, logoutSuccess, setUser } from './user.actions';

describe('User effects', () => {
  let effects: UserEffects;
  let actions$: Observable<Action>;
  let authService: AuthServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    authService = new AuthServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([UserEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(AuthService, { useValue: authService });

    effects = TestBed.get(UserEffects);
  });

  describe('given logout', () => {

    beforeEach(() => {
      actions$ = of(logout());
    })

    it('when success, then return logout success', (done) => {
      authService.response = of({});

      effects.logoutEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(logoutSuccess());
        done();
      });
    });
  
    it('when fail, then return logout fail', (done) => {
      authService.response = throwError(error);

      effects.logoutEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(logoutFail({error}));
        done();
      });
    });

  })

  describe('given logout success', () => {

    beforeEach(() => {
      actions$ = of(logoutSuccess());
    })

    it('then set user as null', (done) => {
      authService.response = of({});

      effects.logoutSuccess$.subscribe((newAction) => {
        expect(newAction).toEqual(setUser({user: null}));
        done();
      });
    });

  })

  describe('given login by token', () => {

    beforeEach(() => {
      actions$ = of(loginUserByToken());
    })

    it('when success, then return login by token success', (done) => {
      const user = {id: 1} as any;
      authService.response = of(user);

      effects.loginUserByTokenEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loginUserByTokenSuccess({user}));
        done();
      });
    });
  
    it('when fail, then return login by token fail', (done) => {
      authService.response = throwError(error);

      effects.loginUserByTokenEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loginUserByTokenFail());
        done();
      });
    });

  })

});
