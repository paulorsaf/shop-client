import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Address } from 'src/app/model/address/address';
import { states } from 'src/app/model/address/states-list';
import { Company } from 'src/app/model/company/company';
import { CreditCard } from 'src/app/model/payment/credit-card';
import { PaymentType } from 'src/app/model/payment/payment';
import { CalculatePriceResponse } from 'src/app/model/purchase/calculate-price';
import { AppState } from 'src/app/store/app-state';
import { loadCreditCards } from 'src/app/store/credit-cards/credit-cards.actions';
import { calculatePurchasePrice } from 'src/app/store/purchases/purchases.actions';
import { loadCupom, makePurchase } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { copyText } from 'src/app/utils/text.util';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {

  @Input() address: Address;
  @Input() company: Company;
  @Input() products: {amount: number, price: number, priceWithDiscount: number, weight: number}[];
  @Input() purchaseId: string;
  
  form: FormGroup;
  paymentSubscription: Subscription;
  states: {name: string, code: string}[] = states;
  wasPaying = false;

  creditCards$: Observable<CreditCard[]>;
  isLoadingCreditCards$: Observable<boolean>;
  isLoadingCupom$: Observable<boolean>;
  isLoadingPrice$: Observable<boolean>;
  price$: Observable<CalculatePriceResponse>;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.creditCards$ = this.store.select(state => state.creditCards.creditCards);
    this.isLoadingCreditCards$ = this.store.select(state => state.creditCards.isLoading);
    this.isLoadingCupom$ = this.store.select(state => state.shoppingCart.isLoadingCupom);
    this.isLoadingPrice$ = this.store.select(state => state.shoppingCart.isCalculatingPrice);
    this.price$ = this.store.select(state => state.shoppingCart.price);

    this.createForm();

    this.onPaying();
    this.calculatePrice();

    this.form.controls.paymentType.valueChanges.subscribe(paymentType => {
      if (paymentType === PaymentType.CREDIT_CARD) {
        this.addCreditCardValidators();
        this.store.dispatch(loadCreditCards());
      } else {
        this.removeCreditCardValidators();
      }
    });
  }

  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe();
  }

  loadCupom() {
    if (this.form.value.cupom){
      this.store.dispatch(loadCupom({cupom: this.form.value.cupom}));

      this.onCupomLoadedOrFailed();
    }
  }

  finishPurchase() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const paymentType = this.form.controls.paymentType.value;
      if (paymentType === PaymentType.MONEY) {
        this.makePurchaseByMoney();
      } else if (paymentType === PaymentType.CREDIT_CARD) {
        this.makePurchaseByCreditCard();
      }
    }
  }

  askCreditCardPayment(card: CreditCard) {
    this.alertController.create({
      header: 'Pagar com cartão salvo',
      message: `Deseja finalizar o pedido com o cartão terminado em ${card.last4}?`,
      buttons: [{
        text: 'Não',
        handler: () => {}
      }, {
        text: 'Sim',
        id: 'remove-item',
        handler: () => this.store.dispatch(makePurchase({
          payment: {
            creditCardId: card.id,
            cupom: this.form.value.cupom,
            type: this.form.value.paymentType
          },
          purchaseId: this.purchaseId
        }))
      }]
    }).then(alert => alert.present());
  }

  private onCupomLoadedOrFailed() {
    this.store
      .select(state => ({
        cupom: state.shoppingCart.cupom,
        error: state.shoppingCart.error,
        isLoadedCupom: state.shoppingCart.isLoadedCupom,
      }))
      .pipe(
        filter(state => state.isLoadedCupom || state.error),
        take(1)
      )
      .subscribe(state => {
        if (state.isLoadedCupom) {
          if (!state.cupom) {
            this.showError({error: {message: "Cupom não encontrado"}})
          }
        }
        this.calculatePrice();
      })
  }

  private calculatePrice() {
    let address = null;
    if (this.address?.zipCode) {
      address = {
        destinationZipCode: this.address.zipCode
      };
    }

    this.store.dispatch(calculatePurchasePrice({calculate: {
      address,
      cupom: this.form.value.cupom,
      paymentType: this.form.controls.paymentType.value,
      products: this.products
    }}));
  }

  private makePurchaseByMoney() {
    this.store.dispatch(
      makePurchase({
        payment: {
          type: this.form.value.paymentType,
          cupom: this.form.value.cupom
        },
        purchaseId: this.purchaseId
      })
    )
  }

  private makePurchaseByCreditCard() {
    this.store.dispatch(
      makePurchase({
        payment: {
          billingAddress: this.form.value.billingAddress,
          creditCard: this.form.value.creditCard,
          cupom: this.form.value.cupom,
          type: this.form.value.paymentType
        },
        purchaseId: this.purchaseId
      })
    )
  }

  uploadReceipt($event) {
    const receiptUrl = $event.target.files[0];
    this.store.dispatch(
      makePurchase({
        payment: {
          cupom: this.form.value.cupom,
          receiptUrl,
          type: this.form.value.paymentType
        },
        purchaseId: this.purchaseId
      })
    );

    $event.target.value = "";
  }

  copyPix() {
    copyText({
      message: "PIX copiado com sucesso",
      text: this.company.payment.pixKey,
      toastController: this.toastController
    });
  }

  private onPaying() {
    this.paymentSubscription = this.store.select('shoppingCart')
      .subscribe(state => {
        this.toggleLoading(state);
        this.onPaymentSuccess(state);
        this.showError(state.error);
      })
  }

  private onPaymentSuccess(state: ShoppingCartState) {
    if (state.isPaid) {
      this.router.navigate(['/payment/purchase-success']);
    }
  }

  private async toggleLoading(state: ShoppingCartState) {
    if (state.isPaying) {
      this.wasPaying = true;
      this.loadingController.create()
        .then(loading => loading.present())
    } else if (this.wasPaying) {
      try {
        const loading = await this.loadingController.getTop();
        loading?.dismiss();
      } catch (error){}
    }
  }

  private async showError(error: any){
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
      billingAddress: this.formBuilder.group({
        street: [''],
        number: [''],
        neighborhood: [''],
        zipCode: [''],
        city: [''],
        state: [''],
      }),
      creditCard: this.formBuilder.group({
        cardFlag: [''],
        cardNumber: [''],
        cardHolder: [''],
        cardMonth: [''],
        cardYear: [''],
        cardCvc: ['']
      }),
      cupom: [''],
      paymentType: [PaymentType.PIX]
    });
  }

  private addCreditCardValidators(){
    this.setCreditCardControlValidator('creditCard', 'cardFlag', Validators.required);
    this.setCreditCardControlValidator('creditCard', 'cardNumber', Validators.required);
    this.setCreditCardControlValidator('creditCard', 'cardHolder', Validators.required);
    this.setCreditCardControlValidator('creditCard', 'cardMonth', Validators.required);
    this.setCreditCardControlValidator('creditCard', 'cardYear', Validators.required);
    this.setCreditCardControlValidator('creditCard', 'cardCvc', Validators.required);
    this.setCreditCardControlValidator('billingAddress', 'street', Validators.required);
    this.setCreditCardControlValidator('billingAddress', 'number', Validators.required);
    this.setCreditCardControlValidator('billingAddress', 'neighborhood', Validators.required);
    this.setCreditCardControlValidator('billingAddress', 'zipCode', Validators.required);
    this.setCreditCardControlValidator('billingAddress', 'city', Validators.required);
    this.setCreditCardControlValidator('billingAddress', 'state', Validators.required);
  }

  private removeCreditCardValidators(){
    this.setCreditCardControlValidator('creditCard', 'cardFlag');
    this.setCreditCardControlValidator('creditCard', 'cardNumber');
    this.setCreditCardControlValidator('creditCard', 'cardHolder');
    this.setCreditCardControlValidator('creditCard', 'cardMonth');
    this.setCreditCardControlValidator('creditCard', 'cardYear');
    this.setCreditCardControlValidator('creditCard', 'cardCvc');
    this.setCreditCardControlValidator('billingAddress', 'street');
    this.setCreditCardControlValidator('billingAddress', 'number');
    this.setCreditCardControlValidator('billingAddress', 'neighborhood');
    this.setCreditCardControlValidator('billingAddress', 'zipCode');
    this.setCreditCardControlValidator('billingAddress', 'city');
    this.setCreditCardControlValidator('billingAddress', 'state');
  }

  private setCreditCardControlValidator(control: string, subControl: string, validator?: ValidatorFn) {
    if (validator) {
      this.form.controls[control].get(subControl).addValidators(Validators.required);
    } else {
      this.form.controls[control].get(subControl).removeValidators(Validators.required);
      this.form.controls[control].reset();
    }
    this.form.controls[control].get(subControl).updateValueAndValidity();
  }

  get PaymentType() {return PaymentType};

}