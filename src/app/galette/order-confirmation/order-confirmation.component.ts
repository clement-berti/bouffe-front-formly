import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from "../galette.component";

@Component({
  selector: 'sfo-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent {
  @Input() order?: Order;
  @Output() resetOrder = new EventEmitter();
  public orderNumber = this.generateRandomNumber()
  public waitingTime = this.generateWaitingTime()

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * 999) + 1;
  }

  private generateWaitingTime(): number {
    return Math.floor(Math.random() * 20) + 10;
  }
}
