import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Company } from 'src/app/model/company/company';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { clear } from '../shopping-cart/shopping-cart.actions';
import { loadOrganizationCompanies, loadOrganizationCompaniesFail, loadOrganizationCompaniesSuccess, setSelectedCompany } from './organization.action';

@Injectable()
export class OrganizationEffects {

  loadOrganizationCompaniesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizationCompanies),
      switchMap(() =>
        this.organizationService.findById(environment.organizationId).pipe(
          map(companies => loadOrganizationCompaniesSuccess({companies})),
          catchError(error => of(loadOrganizationCompaniesFail({error})))
        )
      )
    )
  );

  setSelectedCompany_ClearShoppingCartEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedCompany),
      switchMap(() => of(clear()))
    )
  );

  setSelectedCompany_SaveOnMemory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedCompany),
      switchMap((params: {company: Company}) => 
        this.storageService.setItem('SELECTED_COMPANY_ID', params.company.id)
      )
    ), {
      dispatch: false
    }
  );

  constructor(
    private actions$: Actions,
    private organizationService: OrganizationService,
    private storageService: StorageService
  ) {}

}
