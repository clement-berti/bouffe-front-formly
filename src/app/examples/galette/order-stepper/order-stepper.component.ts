import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import {Component, Input} from '@angular/core';
import {JsonPipe, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'sfo-order-stepper',
  templateUrl: './order-stepper.component.html',
  styleUrl: './order-stepper.component.scss',
  providers: [{provide: CdkStepper, useExisting: OrderStepperComponent}],
  standalone: true,
  imports: [NgTemplateOutlet, CdkStepperModule, JsonPipe],
})
export class OrderStepperComponent extends CdkStepper {
  @Input() buttonLabels: Record<number, {previous: string, next: string}> = {};

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
