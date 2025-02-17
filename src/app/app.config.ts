import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {FormlyModule} from "@ngx-formly/core";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MultiSelectDropdownComponent} from "./formly/multi-select-dropdown/multi-select-dropdown.component";
import {StepWrapperComponent} from "./formly/wrappers/step-wrapper/step-wrapper.component";
import {provideHttpClient} from "@angular/common/http";
import {provideNgxStripe} from 'ngx-stripe';
import {creditCardValidator, expiryDateValidator} from "./galette/payment/payment-card.validator";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

export const formlyConfig = {
  types: [
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
  validators: [
    {name: 'creditCard', validation: creditCardValidator},
    {name: 'expiryDate', validation: expiryDateValidator},
  ],
  validationMessages: [
    {name: 'required', message: 'Ce champ est requis'}
  ],
}

export const formProviders = () => importProvidersFrom([
  ReactiveFormsModule,
  BrowserAnimationsModule,
  FormlyModule.forRoot(formlyConfig)
]);

export const provideForms = () => {
  return formProviders();
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideNgxStripe('***your-stripe-publishable-key***'),
    provideHttpClient(), provideForms(), provideRouter(routes),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}]
};
