import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BannerEffects } from './banner/banner.effects';
import { bannerReducer } from './banner/banner.reducers';
import { CategoryEffects } from './category/category.effects';
import { categoryReducer } from './category/category.reducers';
import { LoginEffects } from './login/login.effects';
import { loginReducer } from './login/login.reducers';
import { ProductEffects } from './product/product.effects';
import { productReducer } from './product/product.reducers';
import { ProductsEffects } from './products/products.effects';
import { productsReducer } from './products/products.reducers';
import { PurchasesEffects } from './purchases/purchases.effects';
import { purchasesReducer } from './purchases/purchases.reducers';
import { RegisterEffects } from './register/register.effects';
import { registerReducer } from './register/register.reducers';
import { ShoppingCartEffects } from './shopping-cart/shopping-cart.effects';
import { shoppingCartReducer } from './shopping-cart/shopping-cart.reducers';
import { TrendingEffects } from './trending/trending.effects';
import { trendingReducer } from './trending/trending.reducers';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('banner', bannerReducer),
    StoreModule.forFeature('category', categoryReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('product', productReducer),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('purchases', purchasesReducer),
    StoreModule.forFeature('register', registerReducer),
    StoreModule.forFeature('shoppingCart', shoppingCartReducer),
    StoreModule.forFeature('trending', trendingReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forRoot([
      BannerEffects,
      CategoryEffects,
      LoginEffects,
      ProductEffects,
      ProductsEffects,
      PurchasesEffects,
      RegisterEffects,
      ShoppingCartEffects,
      TrendingEffects,
      UserEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ]
})
export class AppStoreModule {}
