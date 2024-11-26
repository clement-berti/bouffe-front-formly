import {Component, Input} from '@angular/core';
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {data, fields} from "../fields.form";

@Component({
  selector: 'sfo-sform-material',
  standalone: true,
  imports: [
    FormlyModule,
    FormlyMaterialModule
  ],
  templateUrl: './sform-material.component.html',
  styleUrl: './sform-material.component.scss'
})
export class SformMaterialComponent {
  data = data;
  fields: FormlyFieldConfig[] = fields;
}
