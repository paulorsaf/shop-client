import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { AppState } from 'src/app/store/app-state';
import { copyText } from 'src/app/utils/text.util';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  company$: Observable<Company>;

  hasBackButton = true;

  constructor(
    private location: Location,
    private navController: NavController,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {
    this.hasBackButton = (this.location.getState() as any)?.navigationId !== 1;
  }

  ngOnInit() {
    this.company$ = this.store.select(state => state.company.company);
  }

  openUrl(url: string){
    window.open(url, '_blank');
  }

  openPhone(phone: string){
    window.open(`https://wa.me/${phone.replace(/[^\d]/g, '')}`, '_blank')
  }

  copyWhatsapp(whatsapp: string){
    copyText({
      message: "Whatsapp copiado com sucesso",
      text: whatsapp,
      toastController: this.toastController
    });
  }

  goHome() {
    this.navController.navigateRoot('/');
  }

}
