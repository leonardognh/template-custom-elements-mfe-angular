import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { EnvironmentInjector } from '@angular/core';
import { MfeAngular } from './app/mfe-angular';

(async () => {
  const app = await createApplication({ providers: [] });
  const injector = app.injector.get(EnvironmentInjector);

  const el = createCustomElement(MfeAngular, { injector });

  customElements.define('mfe-angular', el);

  window.dispatchEvent(new CustomEvent('mfe:ready', { detail: { id: 'hello', version: '0.0.1' } }));
})();
