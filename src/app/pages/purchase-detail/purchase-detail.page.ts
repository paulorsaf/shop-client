import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Address } from 'src/app/model/address/address';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { loadPurchaseDetail } from 'src/app/store/purchase-detail/purchase-detail.action';
import { RetryPaymentPage } from '../purchases/retry-payment/retry-payment.page';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.page.html',
  styleUrls: ['./purchase-detail.page.scss'],
})
export class PurchaseDetailPage implements OnInit, OnDestroy {

  address$: Observable<Address>;
  isLoading$: Observable<boolean>;
  purchase$: Observable<Purchase>;
  
  errorSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.address$ = this.store.select(state =>
      state.purchaseDetail.purchase?.address || state.company.company?.address
    );
    this.isLoading$ = this.store.select(state => state.purchaseDetail.isLoading);
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);

    this.onError();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadPurchaseDetail({id}));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  showReceipt() {
    this.purchase$.pipe(take(1)).subscribe(purchase => {
      window.open(purchase?.payment?.receiptUrl, '_blank');
    })
  }

  retryPayment() {
    this.purchase$.pipe(take(1)).subscribe(purchase => {
      this.modalController.create({
        component: RetryPaymentPage,
        componentProps: {
          purchase
        }
      }).then(modal => modal.present());
    });
  }

  private onError() {
    this.errorSubscription = this.store
      .select(state => state.purchaseDetail.error)
      .pipe(filter(error => error))
      .subscribe(error => this.showError(error))
  }

  private async showError(error) {
    const toast = await this.toastController.create({
      header: "Erro ao recuperar compra",
      message: error?.error?.message,
      duration: 5000
    })
    
    toast.present();
  }

}
