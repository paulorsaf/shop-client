import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductPage } from './product.page';
import { ColorPipeModule } from 'src/app/pipes/color/color.pipe.module';
import { ProductLoaderComponent } from './product-loader/product-loader.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ProductSizesComponent } from './product-sizes/product-sizes.component';
import { ProductColorsComponent } from './product-colors/product-colors.component';
import { HasSizePipeModule } from 'src/app/pipes/product-has-size/product-has-size.pipe.module';
import { HasColorPipeModule } from 'src/app/pipes/product-has-color/product-has-color.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    ColorPipeModule,
    HeaderModule,

    HasColorPipeModule,
    HasSizePipeModule
  ],
  declarations: [
    ProductPage,
    ProductLoaderComponent,
    ProductColorsComponent,
    ProductSizesComponent
  ]
})
export class ProductPageModule {}
