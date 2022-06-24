import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BannerEffects } from './banner/banner.effects';
import { bannerReducer } from './banner/banner.reducers';
import { CategoryEffects } from './category/category.effects';
import { categoryReducer } from './category/category.reducers';
import { TrendingEffects } from './trending/trending.effects';
import { trendingReducer } from './trending/trending.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('banner', bannerReducer),
    StoreModule.forFeature('category', categoryReducer),
    StoreModule.forFeature('trending', trendingReducer),
    EffectsModule.forRoot([
      BannerEffects,
      CategoryEffects,
      TrendingEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ]
})
export class AppStoreModule {}
