import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import {MultiSelectDropdownComponent} from "./multi-select-dropdown.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NoopAnimationsModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'select-multiple',
          component: MultiSelectDropdownComponent
        },
      ],
    }),
  ],
})
export class MultiSelectDropdownModule {}
