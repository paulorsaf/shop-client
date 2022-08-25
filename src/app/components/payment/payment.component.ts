import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { PaymentType } from 'src/app/model/payment/payment';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { makePurchase } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {

  @Input() company: Company;
  @Input() purchase: Purchase;
  @Input() totalPrice: number;

  wasPaying = false;

  form: FormGroup;
  paymentSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.createForm();

    this.onPaying();
  }

  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe();
  }

  finishPurchase() {
    this.store.dispatch(
      makePurchase({
        payment: {
          type: this.form.value.paymentType
        },
        purchaseId: this.purchase?.id
      })
    )
  }

  uploadReceipt($event) {
    const receiptUrl = $event.target.files[0];
    this.store.dispatch(
      makePurchase({
        payment: {
          type: this.form.value.paymentType,
          receiptUrl
        },
        purchaseId: this.purchase?.id
      })
    );

    $event.target.value = "";
  }

  copyPix() {
    this.copyText(this.company.pixKey);
  }

  private copyText(text: string) {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    document.body.appendChild(el);

    el.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        document.body.removeChild(el);
        this.toastController.create({
          color: "success",
          message: "PIX copiado com sucesso",
          position: "bottom",
          duration: 3000
        }).then(toast => toast.present());
      }
    } catch (err) {
    }
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
      this.router.navigate(['/payment/purchase-success']);
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
