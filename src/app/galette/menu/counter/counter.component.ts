import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

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
    if (this.counter === 0) {
      return
    }
    this.counter = Math.max(0, this.counter  - 1);
    this.onChange.emit(this.counter);
  }

  public onUpdate(event: any, { blur }: { blur: boolean }) {
    const value = event.target.value;
    if (this.counter === value || value < 0) {
      event.target.value = 0
      return;
    }
    this.counter = Number(value);
    this.onChange.emit(this.counter);
    if (blur) {
      event.target.blur();
      event.preventDefault();
    }
  }

  public onIncrease() {
    this.counter += 1;
    this.onChange.emit(this.counter);
  }
}
