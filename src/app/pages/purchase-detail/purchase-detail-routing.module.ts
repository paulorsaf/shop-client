import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseDetailPage } from './purchase-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: PurchaseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseDetailPageRoutingModule {}
