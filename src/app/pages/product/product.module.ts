import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductPage } from './product.page';
import { ColorPipeModule } from 'src/app/pipes/color/color.pipe.module';
import { ProductLoaderComponent } from './product-loader/product-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    ColorPipeModule
  ],
  declarations: [
    ProductPage,
    ProductLoaderComponent
  ]
})
export class ProductPageModule {}
