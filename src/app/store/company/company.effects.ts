import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Company } from 'src/app/model/company/company';
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

  loadCompanySuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanySuccess),
      switchMap((params: {company: Company}) => {
        if (params.company.chatId) {
          var s = document.createElement('script');
          s.innerHTML = `(function(d, w, c) {w.SibConversationsID = '${params.company.chatId}';w[c] = w[c] || function() {(w[c].q = w[c].q || []).push(arguments);};var s = d.createElement('script');s.async = true;s.src = 'https://conversations-widget.sendinblue.com/sib-conversations.js';if (d.head) d.head.appendChild(s);})(document, window, 'SibConversations')`;
          document.body.appendChild(s);
        }
        return of({});
      })
    ), {
      dispatch: false
    }
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
