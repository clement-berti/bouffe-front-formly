import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {FormlyModule} from "@ngx-formly/core";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GaletteCardComponent} from "./examples/galette/menu/galette-card/galette-card.component";
import {MultiSelectDropdownComponent} from "./formly/multi-select-dropdown/multi-select-dropdown.component";
import {StepWrapperComponent} from "./formly/wrappers/step-wrapper/step-wrapper.component";

export const formProviders = () => importProvidersFrom([
  ReactiveFormsModule,
  BrowserAnimationsModule,
  FormlyModule.forRoot({
    types: [
      {
        name: 'galette-card',
        component: GaletteCardComponent,
      },
      {
        name: 'select-multiple',
        component: MultiSelectDropdownComponent,
      }
    ],
    wrappers: [
      {
        name: 'step-wrapper',
        component: StepWrapperComponent
      }
    ],
    validationMessages: [{ name: 'required', message: 'Ce champ est requis' }],
  })
]);

export const provideForms = () => {
  return formProviders();
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideForms(), provideRouter(routes)]
};
