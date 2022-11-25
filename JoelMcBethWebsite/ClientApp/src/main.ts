import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
    let baseUrl = document.getElementsByTagName('base')[0].href;

    if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return baseUrl;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));

export { renderModule, renderModuleFactory } from '@angular/platform-server';