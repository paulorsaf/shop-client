import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { HeroComponent } from './hero/hero.component';
import { TrendingComponent } from './trending/trending.component';
import { CategoriesComponent } from './categories/categories.component';
import { SectionTitleComponent } from './section-title/section-title.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    HeroComponent,
    TrendingComponent,
    CategoriesComponent,
    SectionTitleComponent
  ]
})
export class HomePageModule {}
