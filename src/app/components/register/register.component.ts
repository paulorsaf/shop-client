import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { register } from 'src/app/store/register/register.actions';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;

  registerErrorSubscription: Subscription;
  registeredSubscription: Subscription;
  registeringSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.createForm();

    this.onRegistering();
    this.onRegistered();
    this.onRegisterError();
  }

  ngOnDestroy(): void {
    this.registerErrorSubscription.unsubscribe();
    this.registeredSubscription.unsubscribe();
    this.registeringSubscription.unsubscribe();
  }

  register() {
    this.store.dispatch(register({userRegister: this.form.value}))
  }

  async login() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: LoginComponent
    });
    modal.present();
  }

  private onRegistering() {
    this.registeringSubscription = this.store
      .select(state => state.register.isRegistering)
      .pipe(filter(isRegistering => isRegistering))
      .subscribe(() => 
        this.loadingController.create()
          .then(loading => loading.present())
      );
  }

  private onRegistered() {
    this.registeredSubscription = this.store
      .select(state => state.register.isRegistered)
      .pipe(filter(isRegistered => isRegistered))
      .subscribe(() => {
        this.loadingController.dismiss();
        this.modalController.dismiss();
      });
  }

  private onRegisterError() {
    this.registerErrorSubscription = this.store
      .select(state => state.register.error)
      .pipe(filter(error => !!error))
      .subscribe(error => {
        this.loadingController.dismiss();
        this.showErrorMessage(error);
      });
  }

  private async showErrorMessage(error: any){
    const toast = await this.toastController.create({
      color: "danger",
      message: error.message,
      position: "bottom",
      duration: 2000
    });
    toast.present();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      cpfCnpj: ['', [Validators.required, ValidateCpfCnpj]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]]
    });
  }

}

function ValidateCpfCnpj(control: AbstractControl) {
  const value = control.value;
  if (value.length <= 14) {
    if (!isCpfValid(value)) {
      return { invalidCpf: true };
    }
  } else if (!isCnpjValid(value)) {
    return { invalidCnpj: true };
  }
  return false;
}

function isCpfValid(strCPF: any){
  strCPF = strCPF.replace(/[^\d]+/g,'');
  let Soma = 0;
  let Resto;

  if (strCPF == "00000000000") {
    return false;
  }

  for (let i=1; i<=9; i++) {
    Soma = Soma + strCPF.substring(i-1, i) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) {
    Resto = 0;
  }
  if (Resto != strCPF.substring(9, 10) ) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma = Soma + strCPF.substring(i-1, i) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) {
    Resto = 0;
  }
  if (Resto != strCPF.substring(10, 11)) {
    return false;
  }
  return true;
}

function isCnpjValid(cnpj: string) {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if(cnpj == '') {
    return false;
  }
  if (cnpj.length != 14) {
    return false;
  }

  if (cnpj == "00000000000000" || 
    cnpj == "11111111111111" || 
    cnpj == "22222222222222" || 
    cnpj == "33333333333333" || 
    cnpj == "44444444444444" || 
    cnpj == "55555555555555" || 
    cnpj == "66666666666666" || 
    cnpj == "77777777777777" || 
    cnpj == "88888888888888" || 
    cnpj == "99999999999999") {
    return false;
  }

  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0,tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(0))) {
    return false;
  }
       
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(1))) {
    return false;
  }
         
  return true;
}