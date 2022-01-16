import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebaseConfig);

let doInitializeApp: boolean = true;

firebase.auth().onAuthStateChanged(() => {
  if (doInitializeApp) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
      doInitializeApp = false;
  }
});

