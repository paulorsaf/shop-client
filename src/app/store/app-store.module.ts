import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { amplitudeMetaReducer } from '../amplitude/amplitude';
import { AddressEffects } from './address/address.effects';
import { addressReducer } from './address/address.reducers';
import { BannerEffects } from './banner/banner.effects';
import { bannerReducer } from './banner/banner.reducers';
import { CategoryEffects } from './category/category.effects';
import { categoryReducer } from './category/category.reducers';
import { CompanyEffects } from './company/company.effects';
import { companyReducer } from './company/company.reducers';
import { CreditCardsEffects } from './credit-cards/credit-cards.effects';
import { creditCardsReducer } from './credit-cards/credit-cards.reducers';
import { LoginEffects } from './login/login.effects';
import { loginReducer } from './login/login.reducers';
import { OrganizationEffects } from './organization/organization.effects';
import { organizationReducer } from './organization/organization.reducers';
import { ProductEffects } from './product/product.effects';
import { productReducer } from './product/product.reducers';
import { ProductsEffects } from './products/products.effects';
import { productsReducer } from './products/products.reducers';
import { PurchaseDetailEffects } from './purchase-detail/purchase-detail.effects';
import { purchaseDetailReducer } from './purchase-detail/purchase-detail.reducers';
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
    StoreModule.forRoot({}, {
      metaReducers: environment.production ? [
          amplitudeMetaReducer
      ] : []
  }),
    StoreModule.forFeature('address', addressReducer),
    StoreModule.forFeature('banner', bannerReducer),
    StoreModule.forFeature('category', categoryReducer),
    StoreModule.forFeature('company', companyReducer),
    StoreModule.forFeature('creditCards', creditCardsReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('organization', organizationReducer),
    StoreModule.forFeature('product', productReducer),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('purchaseDetail', purchaseDetailReducer),
    StoreModule.forFeature('purchases', purchasesReducer),
    StoreModule.forFeature('register', registerReducer),
    StoreModule.forFeature('shoppingCart', shoppingCartReducer),
    StoreModule.forFeature('trending', trendingReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forRoot([
      AddressEffects,
      BannerEffects,
      CategoryEffects,
      CompanyEffects,
      CreditCardsEffects,
      LoginEffects,
      OrganizationEffects,
      ProductEffects,
      ProductsEffects,
      PurchaseDetailEffects,
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
