import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

  async showError({message, duration}: MessageParams) {
    this.showToaster({
      color: "danger",
      duration: duration || 5000,
      message
    });
  }

  async showSuccess({message, duration}: MessageParams) {
    this.showToaster({
      color: "primary",
      duration,
      message
    });
  }

  async showWarning({message, duration}: MessageParams) {
    this.showToaster({
      color: "warning",
      duration,
      message
    });
  }

  private async showToaster({color, duration, message}: ToastParams) {
    const toast = await this.toastController.create({
      color,
      message,
      position: "bottom",
      duration: duration || 2000,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    toast.present();
  }

};

type MessageParams = {
  duration?: number;
  message: string;
}

type ToastParams = {
  color: string;
  duration?: number;
  message: string;
}