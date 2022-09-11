import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditCardsPage } from './credit-cards.page';

const routes: Routes = [
  {
    path: '',
    component: CreditCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditCardsPageRoutingModule {}
