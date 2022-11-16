import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { OrganizationEffects } from './organization.effects';
import { loadOrganizationCompanies, loadOrganizationCompaniesFail, loadOrganizationCompaniesSuccess, setSelectedCompany } from './organization.action';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { clear } from '../shopping-cart/shopping-cart.actions';
import { StorageService } from 'src/app/services/storage/storage.service';

describe('Organization effects', () => {
  let effects: OrganizationEffects;
  let actions$: Observable<Action>;
  let organizationService: OrganizationServiceMock;
  let storageService: StorageServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    organizationService = new OrganizationServiceMock();
    storageService = new StorageServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([OrganizationEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(OrganizationService, { useValue: organizationService })
    .overrideProvider(StorageService, { useValue: storageService });

    effects = TestBed.inject(OrganizationEffects);
  });

  describe('given load organization', () => {

    beforeEach(() => {
      actions$ = of(loadOrganizationCompanies());
    })

    it('when success, then return login success', (done) => {
      const companies = [{id: 1}, {id: 2}] as any;
      organizationService.response = of(companies);

      effects.loadOrganizationCompaniesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadOrganizationCompaniesSuccess({companies}));
        done();
      });
    });
  
    it('when fail, then return login fail', (done) => {
      organizationService.response = throwError(error);

      effects.loadOrganizationCompaniesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadOrganizationCompaniesFail({error}));
        done();
      });
    });

  })

  describe('given set selected company', () => {

    beforeEach(() => {
      const company = {id: 1} as any;
      actions$ = of(setSelectedCompany({company}));
    })

    it('then clear shopping cart', (done) => {
      effects.setSelectedCompany_ClearShoppingCartEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(clear());
        done();
      });
    });

    it('then save company id on memory', (done) => {
      effects.setSelectedCompany_SaveOnMemory$.subscribe(() => {
        expect(storageService._keySet).toEqual("SELECTED_COMPANY_ID");
        done();
      });
    });

  })

});

export class OrganizationServiceMock {
  response = of({});
  findById() {
    return this.response;
  }
}

class StorageServiceMock {
  _keySet;
  setItem(key) {
    this._keySet = key;
    return of({});
  }
}