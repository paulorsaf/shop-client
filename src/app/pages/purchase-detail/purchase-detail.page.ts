import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { loadPurchaseDetail } from 'src/app/store/purchase-detail/purchase-detail.action';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.page.html',
  styleUrls: ['./purchase-detail.page.scss'],
})
export class PurchaseDetailPage implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  
  errorSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.purchaseDetail.isLoading);

    this.onError();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadPurchaseDetail({id}));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
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
      message: error?.error?.message
    })
    
    toast.present();
  }

}
