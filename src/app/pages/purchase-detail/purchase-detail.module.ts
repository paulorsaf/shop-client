import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchaseDetailPageRoutingModule } from './purchase-detail-routing.module';
import { PurchaseDetailPage } from './purchase-detail.page';
import { PurchaseStockOptionModule } from 'src/app/components/purchase-stock-option/purchase-stock-option.module';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';
import { PurchaseStatusMessageModule } from 'src/app/components/purchase-status-message/purchase-status-message.module';
import { PurchaseStatusesModule } from 'src/app/components/purchase-statuses/purchase-statuses.module';
import { PurchaseDetailLoaderComponent } from './purchase-detail-loader/purchase-detail-loader.component';
import { ProductNameByIdPipeModule } from 'src/app/pipes/product-name-by-id/product-name-by-id.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseDetailPageRoutingModule,
    PurchaseStockOptionModule,
    PaymentTypePipeModule,
    PurchaseStatusMessageModule,
    PurchaseStatusesModule,

    ProductNameByIdPipeModule
  ],
  declarations: [
    PurchaseDetailPage,
    PurchaseDetailLoaderComponent
  ]
})
export class PurchaseDetailPageModule {}
