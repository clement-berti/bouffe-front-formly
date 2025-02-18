import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {Galette} from "../../galette.interface";
import {CounterComponent} from "../counter/counter.component";

@Component({
  selector: 'sfo-galette-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    CounterComponent
  ],
  templateUrl: './galette-card.component.html',
  styleUrl: './galette-card.component.scss'
})
export class GaletteCardComponent {
  @Input() galette!: Galette;
  @Input() quantity: number | undefined = 0;

  @Output() onChange = new EventEmitter<number>();
}
