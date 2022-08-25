import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Company } from 'src/app/model/company/company';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { loadPurchases } from 'src/app/store/purchases/purchases.actions';
import { RetryPaymentPage } from './retry-payment/retry-payment.page';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit, OnDestroy {

  company$: Observable<Company>;
  isLoading$: Observable<boolean>;
  purchases$: Observable<Purchase[]>;

  errorSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.company$ = this.store.select(state => state.company.company);
    this.isLoading$ = this.store.select(state => state.purchases.isLoading);
    this.purchases$ = this.store.select(state => state.purchases.purchases);

    this.watchError();

    this.store.dispatch(loadPurchases());
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  retryPayment(purchase: Purchase) {
    this.modalController.create({
      component: RetryPaymentPage,
      componentProps: {
        purchase
      }
    }).then(modal => modal.present());
  }

  private watchError() {
    this.errorSubscription = this.store
      .select(state => state.purchases.error)
      .pipe(filter(error => !!error))
      .subscribe(error => {
        this.showErrorMessage(error);
      })
  }

  private async showErrorMessage(error: any){
    const toast = await this.toastController.create({
      color: "danger",
      message: error.error.message,
      position: "bottom",
      duration: 10000
    });
    toast.present();
  }

}
