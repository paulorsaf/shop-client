import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { OrganizationPage } from '../pages/organization/organization.page';
import { AppState } from '../store/app-state';

@Injectable({
  providedIn: 'root',
})
export class OrganizationLoadedGuard implements CanActivate {

    constructor(
        private modalController: ModalController,
        private store: Store<AppState>
    ){}
  
    canActivate(): Observable<boolean> {
        return this.store.select('organization')
            .pipe(
                filter(state => state.isLoaded),
                take(1),
                tap(console.log),
                switchMap(state =>
                    iif(
                        () => state.companies.length === 1,
                        of(true),
                        iif(
                            () => !!state.selectedCompany,
                            of(true),
                            this.openModal()
                        )
                    )
                )
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