import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PaymentType } from 'src/app/model/payment/payment';
import { AppState } from 'src/app/store/app-state';
import { makePurchase } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { selectTotalPrice, ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit, OnDestroy {

  form: FormGroup;

  wasPaying = false;
  totalPrice$: Observable<number>;

  paymentSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.totalPrice$ = this.store.select(selectTotalPrice);

    this.createForm();

    this.onPaying();
  }

  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe();
  }

  finishPurchase() {
    this.store.dispatch(makePurchase({purchase: {
      paymentType: this.form.value.paymentType
    }}))
  }

  uploadReceipt($event) {
    const receipt = $event.target.files[0];
    this.store.dispatch(makePurchase({purchase: {
      paymentType: this.form.value.paymentType, receipt
    }}));

    $event.target.value = "";
  }

  private onPaying() {
    this.paymentSubscription = this.store.select('shoppingCart')
      .subscribe(state => {
        this.toggleLoading(state);
        this.onPaymentSuccess(state);
        this.onPaymentFail(state.error);
      })
  }

  private onPaymentSuccess(state: ShoppingCartState) {
    if (state.isPaid) {
      this.router.navigate(['/success']);
    }
  }

  private toggleLoading(state: ShoppingCartState) {
    if (state.isPaying) {
      this.wasPaying = true;
      this.loadingController.create()
        .then(loading => loading.present())
    } else if (this.wasPaying) {
      this.loadingController.dismiss();
    }
  }

  private async onPaymentFail(error: any){
    if (error) {
      const toast = await this.toastController.create({
        color: "danger",
        message: error.error.message,
        position: "bottom",
        duration: 10000
      });
      toast.present();
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      paymentType: [PaymentType.PIX]
    });
  }

  get PaymentType() {return PaymentType};

}
