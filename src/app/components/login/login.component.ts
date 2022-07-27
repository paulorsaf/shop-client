import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { login, recoverPassword } from 'src/app/store/login/login.actions';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  errorSubscription: Subscription;
  loadingSubscription: Subscription;
  loginSubscription: Subscription;
  passwordRecoveredSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.onError();
    this.onLoginSuccess();
    this.onPasswordRecovered();
    this.toggleLoading();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.passwordRecoveredSubscription.unsubscribe();
  }

  recoverPassword() {
    this.store.dispatch(recoverPassword({email: this.form.value.email}));
  }

  login() {
    this.store.dispatch(login(this.form.value));
  }

  async register() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: RegisterComponent
    })
    
    modal.present();
  }

  private async onLoginSuccess() {
    this.loginSubscription = this.store.select('login')
      .pipe(filter(state => state.isLoggedIn))
      .subscribe(() => {
        this.modalController.dismiss();
      });
  }

  private async onPasswordRecovered() {
    this.passwordRecoveredSubscription = this.store.select('login')
      .pipe(filter(state => state.isRecoveredPassword))
      .subscribe(() => {
        this.showSuccessMessage();
      });
  }

  private toggleLoading() {
    this.loadingSubscription = this.store.select('login').subscribe(state => {
      if (state.isRecoveringPassword || state.isLoggingIn) {
        this.loadingController.create()
          .then(loading => loading.present())
      } else if (state.error || state.isRecoveredPassword || state.isLoggedIn) {
        this.loadingController.dismiss();
      }
    })
  }

  private onError() {
    this.errorSubscription = this.store.select('login')
      .pipe(filter(state => !!state.error))
      .subscribe(state => {
        this.showErrorMessage(state.error);
      })
  }

  private async showSuccessMessage(){
    const toast = await this.toastController.create({
      color: "primary",
      message: "Email enviado com sucesso",
      position: "bottom",
      duration: 2000
    });
    toast.present();
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

}
