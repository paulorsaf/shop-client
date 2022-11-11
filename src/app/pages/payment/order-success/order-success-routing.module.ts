import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSuccessPage } from './order-success.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSuccessPageRoutingModule {}
