import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { EnvironmentInjector } from '@angular/core';
import { MfeAngular } from './app/mfe-angular';
import { appConfig } from '@/app.config';

(async () => {
  const app = await createApplication(appConfig);

  const tag = 'mfe-angular';

  if (!customElements.get(tag)) {
    const el = createCustomElement(MfeAngular, { injector: app.injector });
    customElements.define(tag, el);
    window.dispatchEvent(new CustomEvent('mfe:ready', { detail: { id: tag, version: '0.0.1' } }));
  }
})();
