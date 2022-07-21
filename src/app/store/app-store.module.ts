import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BannerEffects } from './banner/banner.effects';
import { bannerReducer } from './banner/banner.reducers';
import { CategoryEffects } from './category/category.effects';
import { categoryReducer } from './category/category.reducers';
import { ProductEffects } from './product/product.effects';
import { productReducer } from './product/product.reducers';
import { ProductsEffects } from './products/products.effects';
import { productsReducer } from './products/products.reducers';
// import { ShoppingCartEffects } from './shopping-cart/shopping-cart.effects';
// import { shoppingCartReducer } from './shopping-cart/shopping-cart.reducers';
import { TrendingEffects } from './trending/trending.effects';
import { trendingReducer } from './trending/trending.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('banner', bannerReducer),
    StoreModule.forFeature('category', categoryReducer),
    StoreModule.forFeature('product', productReducer),
    StoreModule.forFeature('products', productsReducer),
    // StoreModule.forFeature('shoppingCart', shoppingCartReducer),
    StoreModule.forFeature('trending', trendingReducer),
    EffectsModule.forRoot([
      BannerEffects,
      CategoryEffects,
      ProductEffects,
      ProductsEffects,
      // ShoppingCartEffects,
      TrendingEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ]
})
export class AppStoreModule {}
