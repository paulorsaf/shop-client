import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OrganizationLoadedGuard } from './guards/organization-loaded.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'categories/:id',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'delivery-address',
    loadChildren: () => import('./pages/delivery-address/delivery-address.module').then(m => m.DeliveryAddressPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'purchases',
    loadChildren: () => import('./pages/purchases/purchases.module').then(m => m.PurchasesPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'purchases',
    loadChildren: () => import('./pages/purchase-detail/purchase-detail.module').then(m => m.PurchaseDetailPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'credit-cards',
    loadChildren: () => import('./pages/credit-cards/credit-cards.module').then(m => m.CreditCardsPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule),
    canActivate: [OrganizationLoadedGuard]
  },
  {
    path: 'organization',
    loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationPageModule),
    canActivate: [OrganizationLoadedGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
