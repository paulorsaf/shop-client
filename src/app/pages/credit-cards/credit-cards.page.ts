import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CreditCard } from 'src/app/model/payment/credit-card';
import { AppState } from 'src/app/store/app-state';
import { deleteCreditCard, loadCreditCards } from 'src/app/store/credit-cards/credit-cards.actions';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.page.html',
  styleUrls: ['./credit-cards.page.scss'],
})
export class CreditCardsPage implements OnInit, OnDestroy {

  hasBackButton = true;

  creditCards$: Observable<CreditCard[]>;
  isLoading$: Observable<boolean>;

  errorSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private navController: NavController,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {
    this.hasBackButton = (this.location.getState() as any)?.navigationId !== 1;
  }

  ngOnInit() {
    this.creditCards$ = this.store.select(state => state.creditCards.creditCards);
    this.isLoading$ = this.store.select(state =>
      state.creditCards.isLoading || state.creditCards.isDeleting
    );
    
    this.watchError();

    this.store.dispatch(loadCreditCards());
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  goHome() {
    this.navController.navigateRoot('/');
  }

  delete(creditCard: CreditCard) {
    this.alertController.create({
      header: 'Remover cartão de crédito',
      message: 'Deseja remover cartão de crédito?',
      buttons: [{
        text: 'Não'
      }, {
        text: 'Sim',
        id: 'remove-item',
        handler: () => this.store.dispatch(deleteCreditCard({id: creditCard.id}))
      }]
    }).then(alert => alert.present());
  }

  private watchError() {
    this.errorSubscription = this.store
      .select(state => state.creditCards.error)
      .pipe(filter(error => error))
      .subscribe(error => {
        this.showErrorMessage(error);
      });
  }

  private async showErrorMessage(error: any) {
    const toast = await this.toastController.create({
      header: "Erro ao recuperar cartões de crédito",
      message: error?.error?.message,
      duration: 5000
    })
    toast.present();
  }

}
