import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async show() {
    const loading = await this.loadingController.create()
    loading.present();
  }

  async hide() {
    try {
      const loading = await this.loadingController.getTop();
      loading?.dismiss();
    } catch (error){}
  }

}