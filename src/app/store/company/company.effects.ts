import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company/company.service';
import { loadCompany, loadCompanyById, loadCompanyByIdFail, loadCompanyByIdSuccess, loadCompanyFail, loadCompanySuccess } from './company.action';

@Injectable()
export class CompanyEffects {

  loadCompanyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompany),
      switchMap(() =>
        this.companyService.find().pipe(
          map(company => loadCompanySuccess({company})),
          catchError(error => of(loadCompanyFail({error})))
        )
      )
    )
  );

  loadCompanyByIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanyById),
      switchMap((params: {id: string}) =>
        this.companyService.findById(params.id).pipe(
          map(company => loadCompanyByIdSuccess({company})),
          catchError(error => of(loadCompanyByIdFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}

}
