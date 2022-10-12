import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrganizationPageRoutingModule } from './organization-routing.module';
import { OrganizationPage } from './organization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationPageRoutingModule
  ],
  declarations: [OrganizationPage],
  exports: [OrganizationPage]
})

export class OrganizationPageModule {}