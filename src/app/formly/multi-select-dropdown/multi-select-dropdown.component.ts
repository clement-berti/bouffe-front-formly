import {Component} from '@angular/core';
import {FieldType} from "@ngx-formly/material";
import {FieldTypeConfig} from "@ngx-formly/core";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'sfo-multi-select-dropdown',
  standalone: true,
  imports: [
    MatSelect,
    MatFormField,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss'
})
export class MultiSelectDropdownComponent extends FieldType<FieldTypeConfig> {
}
