import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BannersComponent } from './banners/banners.component';
import { TrendingComponent } from './trending/trending.component';
import { CategoriesComponent } from './categories/categories.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    ProductCardModule
  ],
  declarations: [
    HomePage,
    BannersComponent,
    TrendingComponent,
    CategoriesComponent,
    SectionTitleComponent
  ]
})
export class HomePageModule {}
