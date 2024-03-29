import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Purchase } from 'src/app/model/purchase/purchase';
import { RetryPaymentPage } from '../retry-payment/retry-payment.page';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss'],
})
export class PurchaseCardComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  retryPayment($event, purchase: Purchase) {
    $event.stopPropagation();
    this.modalController.create({
      component: RetryPaymentPage,
      componentProps: {
        purchase
      }
    }).then(modal => modal.present());
  }

  goToPurchaseDetail() {
    this.router.navigate([`purchases/${this.purchase.id}`]);
  }

}
