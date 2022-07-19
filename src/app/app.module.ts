import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductOptionsPipeModule } from './pipes/product-options/product-options.pipe.module';
import { ProductOptionsPipe } from './pipes/product-options/product-options.pipe';
import { ProductTotalPricePipeModule } from './pipes/product-total-price/product-total-price.pipe.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AddTokenHeaderHttpRequestInterceptor } from './interceptors/add-token-header-http-request.interceptor';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AddCompanyHeaderHttpRequestInterceptor } from './interceptors/add-company-header-http-request.interceptor';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AppStoreModule,
    ProductOptionsPipeModule,
    ProductTotalPricePipeModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    ProductOptionsPipe,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenHeaderHttpRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddCompanyHeaderHttpRequestInterceptor,
      multi: true
    }
  ],
  exports: [ShoppingCartComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
