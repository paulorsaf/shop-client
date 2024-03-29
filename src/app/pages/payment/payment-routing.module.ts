import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  },
  {
    path: 'purchase-success',
    loadChildren: () => import('./purchase-success/purchase-success.module').then( m => m.PurchaseSuccessPageModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./order-success/order-success.module').then( m => m.OrderSuccessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
