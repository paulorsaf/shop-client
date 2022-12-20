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

  loadOrganizationCompaniesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizationCompaniesSuccess),
      switchMap((params: {companies: Company[]}) => {
        if (params.companies.length === 1) {
          const company = params.companies[0];
          if (company.chatId) {
            var s = document.createElement('script');
            s.innerHTML = `(function(d, w, c) {w.SibConversationsID = '${company.chatId}';w[c] = w[c] || function() {(w[c].q = w[c].q || []).push(arguments);};var s = d.createElement('script');s.async = true;s.src = 'https://conversations-widget.sendinblue.com/sib-conversations.js';if (d.head) d.head.appendChild(s);})(document, window, 'SibConversations')`;
            document.body.appendChild(s);
          }
        }
        return of({});
      })
    ), {
      dispatch: false
    }
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

  setSelectedCompany_ChatId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedCompany),
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

  constructor(
    private actions$: Actions,
    private organizationService: OrganizationService,
    private storageService: StorageService
  ) {}

}
