import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";

if (environment.production) {
  enableProdMode();

  Sentry.init({
    dsn: "https://2c7c0f1d7fd34e538523e214e3af1666@o1394695.ingest.sentry.io/6716776",
    integrations: [
      new BrowserTracing({
        tracingOrigins: ["localhost", window.location.origin],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
