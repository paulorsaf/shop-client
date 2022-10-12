import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrganizationService } from 'src/app/services/organization/organization.service';
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

  setSelectedCompanyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedCompany),
      switchMap(() => of(clear()))
    )
  );

  constructor(
    private actions$: Actions,
    private organizationService: OrganizationService
  ) {}

}
