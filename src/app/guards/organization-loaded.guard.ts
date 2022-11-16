import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Company } from '../model/company/company';
import { OrganizationPage } from '../pages/organization/organization.page';
import { StorageService } from '../services/storage/storage.service';
import { AppState } from '../store/app-state';
import { setSelectedCompany } from '../store/organization/organization.action';

@Injectable({
  providedIn: 'root',
})
export class OrganizationLoadedGuard implements CanActivate {

    constructor(
        private modalController: ModalController,
        private storageService: StorageService,
        private store: Store<AppState>
    ){}
  
    canActivate(): Observable<boolean> {
        return this.store.select('organization')
            .pipe(
                filter(state => state.isLoaded),
                take(1),
                switchMap(state =>
                    iif(
                        () => state.companies.length === 1,
                        of(true),
                        iif(
                            () => !!state.selectedCompany,
                            of(true),
                            this.verifySelectedCompany(state.companies)
                        )
                    )
                )
            )
    }

    private verifySelectedCompany(companies: Company[]) {
        return this.storageService.getItem('SELECTED_COMPANY_ID').pipe(
            switchMap(companyId => {
                if (companyId) {
                    const selectedCompany = companies.find(c => c.id === companyId);
                    if (selectedCompany) {
                        this.store.dispatch(setSelectedCompany({company: selectedCompany}));
                        return of(true);
                    }
                }
                return this.openModal();
            })
        )
    }

    private openModal(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.modalController.create({
                component: OrganizationPage
            }).then(modal => {
                modal.present();
                modal.onWillDismiss().then(() => {
                    observer.next(true);
                    observer.complete();
                });
            })
        })
    }
}