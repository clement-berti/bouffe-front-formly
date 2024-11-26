import { Routes } from '@angular/router';
import {SformBootstrapComponent} from "./examples/sform-bootstrap/sform-bootstrap.component";
import {SformMaterialComponent} from "./examples/sform-material/sform-material.component";
import {GaletteComponent} from "./examples/galette/galette.component";

export const routes: Routes = [
  {
    path: '',
    component: GaletteComponent
  },
  {
    path: 'bootstrap',
    component: SformBootstrapComponent
  },
  {
    path: 'material',
    component: SformMaterialComponent
  }
];
