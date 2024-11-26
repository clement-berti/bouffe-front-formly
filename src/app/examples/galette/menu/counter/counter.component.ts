import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sfo-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @Input() counter: number = 0;
  @Output() onChange = new EventEmitter<number>();

  public onDecrease() {
    this.counter = Math.max(0, this.counter  - 1);
    this.onChange.emit(this.counter);
  }

  public onIncrease() {
    this.counter += 1;
    this.onChange.emit(this.counter);
  }
}
