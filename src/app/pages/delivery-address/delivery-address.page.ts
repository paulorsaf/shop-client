import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { setDeliveryAddress } from 'src/app/store/shopping-cart/shopping-cart.actions';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
})
export class DeliveryAddressPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.createForm();
  }

  goToPayment() {
    if (this.form.value.deliveryType === "DELIVERY") {
      if (this.form.valid) {
        const address = {...this.form.value};
        delete address.deliveryType;
        this.store.dispatch(setDeliveryAddress({address}));
        this.router.navigate(['/payment']);
      }
    } else {
      this.store.dispatch(setDeliveryAddress({address: null}))
      this.router.navigate(['/payment']);
    }
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
