import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { CompanyEffects } from './company.effects';
import { loadCompany, loadCompanyById, loadCompanyByIdFail, loadCompanyByIdSuccess, loadCompanyFail, loadCompanySuccess } from './company.action';
import { CompanyServiceMock } from 'src/app/model/mocks/company.service.mock';
import { CompanyService } from 'src/app/services/company/company.service';

describe('Company effects', () => {
  let effects: CompanyEffects;
  let actions$: Observable<Action>;
  let companyService: CompanyServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    companyService = new CompanyServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([CompanyEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(CompanyService, { useValue: companyService });

    effects = TestBed.inject(CompanyEffects);
  });

  describe('given load company', () => {

    beforeEach(() => {
      actions$ = of(loadCompany());
    })

    it('when success, then return login success', (done) => {
      const company = <any> {id: 1};
      companyService.response = of(company);

      effects.loadCompanyEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCompanySuccess({company}));
        done();
      });
    });
  
    it('when fail, then return login fail', (done) => {
      companyService.response = throwError(error);

      effects.loadCompanyEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCompanyFail({error}));
        done();
      });
    });

  })

  describe('given load company by id', () => {

    beforeEach(() => {
      actions$ = of(loadCompanyById({id: "anyId"}));
    })

    it('when success, then return login success', (done) => {
      const company = <any> {id: 1};
      companyService.response = of(company);

      effects.loadCompanyByIdEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCompanyByIdSuccess({company}));
        done();
      });
    });
  
    it('when fail, then return login fail', (done) => {
      companyService.response = throwError(error);

      effects.loadCompanyByIdEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCompanyByIdFail({error}));
        done();
      });
    });

  })

});
