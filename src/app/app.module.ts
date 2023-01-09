import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductOptionsPipeModule } from './pipes/product-options/product-options.pipe.module';
import { ProductOptionsPipe } from './pipes/product-options/product-options.pipe';
import { ProductTotalPricePipeModule } from './pipes/product-total-price/product-total-price.pipe.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AddTokenHeaderHttpRequestInterceptor } from './interceptors/add-token-header-http-request.interceptor';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AddCompanyHeaderHttpRequestInterceptor } from './interceptors/add-company-header-http-request.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrMaskDirective, BrMaskerModule } from 'br-mask';
import { RegisterComponent } from './components/register/register.component';
import { PurchaseStockOptionModule } from './components/purchase-stock-option/purchase-stock-option.module';
import * as Sentry from "@sentry/angular";
import { OrganizationPageModule } from './pages/organization/organization.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: ''
    }),
    AppRoutingModule,
    HttpClientModule,
    AppStoreModule,
    ReactiveFormsModule,
    ProductOptionsPipeModule,
    ProductTotalPricePipeModule,
    PurchaseStockOptionModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    OrganizationPageModule,

    BrMaskerModule
  ],
  providers: [
    DatePipe,
    ProductOptionsPipe,
    BrMaskDirective,
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
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
