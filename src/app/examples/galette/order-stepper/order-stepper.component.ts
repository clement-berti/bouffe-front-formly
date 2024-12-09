import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JsonPipe, NgTemplateOutlet} from "@angular/common";
import {FormGroup} from "@angular/forms";

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
  @Input() currentForm?: FormGroup;
  @Output() onStepSelected = new EventEmitter<number>();

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
    this.onStepSelected.emit(index);
  }
}
