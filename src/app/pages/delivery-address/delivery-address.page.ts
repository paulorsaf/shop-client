import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Address } from 'src/app/model/address/address';
import { states } from 'src/app/model/address/states-list';
import { Company } from 'src/app/model/company/company';
import { clearAddress, searchByZipCode } from 'src/app/store/address/address.actions';
import { AddressState } from 'src/app/store/address/address.state';
import { AppState } from 'src/app/store/app-state';
import { setDeliveryAddress, setDeliveryPrice } from 'src/app/store/shopping-cart/shopping-cart.actions';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
})
export class DeliveryAddressPage implements OnInit {

  addressSubscription: Subscription;

  form: FormGroup;
  states: {name: string, code: string}[] = states;

  address$: Observable<Address>;
  company$: Observable<Company>;
  deliveryPrice$: Observable<number>;
  isLoadedDeliveryPrice$: Observable<boolean>;
  isLoadingDeliveryPrice$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.store.dispatch(clearAddress());

    this.address$ = this.store.select(state => state.address.address);
    this.company$ = this.store.select(state => state.organization.selectedCompany);
    this.deliveryPrice$ = this.store.select(state => state.address.deliveryPrice);
    this.isLoadingDeliveryPrice$ = this.store.select(
      state => state.address.isGettingDeliveryPrice
    );
    this.isLoadedDeliveryPrice$ = this.store.select(
      state => state.address.isGotDeliveryPrice
    );

    this.createForm();
  }

  goToPayment() {
    if (this.form.value.deliveryType === "DELIVERY") {
      this.form.markAllAsTouched();
      if (this.form.valid) {
        const address = {...this.form.value};
        delete address.deliveryType;
        this.updateShoppingCartStateAndGoToPayment(address);
      }
    } else {
      this.updateShoppingCartStateAndGoToPayment(null);
    }
  }

  onChangeZipCode() {
    this.store.dispatch(searchByZipCode({zipCode: this.form.value.zipCode}));

    this.addressSubscription = this.store.select('address')
      .subscribe(state => {
        this.toggleLoading(state.isLoading);
        this.onZipCodeLoaded(state);
        this.onZipCodeFail(state.error)
      });
  }

  private updateShoppingCartStateAndGoToPayment(address: Address) {
    this.setDeliveryPrice();
    this.store.dispatch(setDeliveryAddress({address}));
    this.router.navigate(['/payment']);
  }

  private setDeliveryPrice() {
    if (this.form.value.deliveryType === "DELIVERY") {
      this.store.select('address')
        .pipe(take(1))
        .subscribe(state => {
          this.store.dispatch(setDeliveryPrice({deliveryPrice: state.deliveryPrice}));
        })
    } else {
      this.store.dispatch(setDeliveryPrice({deliveryPrice: undefined}));
    }
  }

  private onZipCodeFail(error: any) {
    if (error) {
      this.showErrorMessage(error);
    }
  }

  private async showErrorMessage(error: any){
    const toast = await this.toastController.create({
      color: "danger",
      header: "Erro ao buscar CEP",
      message: error?.error?.message,
      position: "bottom",
      duration: 2000
    });
    toast.present();
  }

  private onZipCodeLoaded(state: AddressState) {
    if (state.isLoaded) {
      this.form.get('city').setValue(state.address.city);
      this.form.get('complement').setValue(state.address.complement);
      this.form.get('latitude').setValue(state.address.latitude);
      this.form.get('longitude').setValue(state.address.longitude);
      this.form.get('neighborhood').setValue(state.address.neighborhood);
      this.form.get('number').setValue(state.address.number);
      this.form.get('state').setValue(state.address.state);
      this.form.get('street').setValue(state.address.street);
    }
  }

  private async toggleLoading(isLoading: boolean) {
    if (isLoading) {
      this.showLoading();
    } else {
      this.addressSubscription.unsubscribe();
      try {
        const loading = await this.loadingController.getTop();
        loading?.dismiss();
      } catch (error){}
    }
  }

  private async showLoading() {
    const loading = await this.loadingController.create();
    loading.present();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      deliveryType: ["DELIVERY"],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      latitude: [0],
      longitude: [0],
    });
  }

}
