import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SformBootstrapComponent} from "./examples/sform-bootstrap/sform-bootstrap.component";
import {SformMaterialComponent} from "./examples/sform-material/sform-material.component";

@Component({
  selector: 'sfo-root',
  standalone: true,
  imports: [RouterOutlet, SformBootstrapComponent, SformMaterialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sform';
}
