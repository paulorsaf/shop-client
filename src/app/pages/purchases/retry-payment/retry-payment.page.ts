import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Company } from 'src/app/model/company/company';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { loadCompanyById } from 'src/app/store/company/company.action';

@Component({
  selector: 'app-retry-payment',
  templateUrl: './retry-payment.page.html',
  styleUrls: ['./retry-payment.page.scss'],
})
export class RetryPaymentPage implements OnInit, OnDestroy {

  company$: Observable<Company>;

  purchase: Purchase;
  products$: Observable<{amount: number; price: number, weight: number, priceWithDiscount: number}[]>;

  isPaidSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.company$ = this.store.select(state => state.company.selectedCompany);
    this.products$ = this.store.select(state => state.purchaseDetail.purchase.products.map(p => ({
      amount: p.amount,
      price: p.price,
      priceWithDiscount: p.priceWithDiscount,
      weight: p.weight
    })));

    this.isPaidSubscription = this.store
      .select(state => state.shoppingCart.isPaid)
      .pipe(filter(isPaid => isPaid))
      .subscribe(() => {
        this.close();
      })

    this.store.dispatch(loadCompanyById({id: this.purchase.companyId}));
  }

  ngOnDestroy(): void {
    this.isPaidSubscription.unsubscribe();
  }

  close() {
    this.modalController.dismiss();
  }

}
