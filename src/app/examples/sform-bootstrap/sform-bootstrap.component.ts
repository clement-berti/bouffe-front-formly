import {Component} from '@angular/core';
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import { data, fields } from '../fields.form';

@Component({
  selector: 'sfo-sform-bootstrap',
  standalone: true,
  imports: [
    FormlyModule,
    FormlyBootstrapModule
  ],
  templateUrl: './sform-bootstrap.component.html',
  styleUrl: './sform-bootstrap.component.scss'
})
export class SformBootstrapComponent {
  data = data;
  fields: FormlyFieldConfig[] = fields;
}
