import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonPipe, NgTemplateOutlet} from "@angular/common";
import {FormGroup} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'sfo-order-stepper',
  templateUrl: './order-stepper.component.html',
  styleUrl: './order-stepper.component.scss',
  providers: [{provide: CdkStepper, useExisting: OrderStepperComponent}],
  standalone: true,
  imports: [NgTemplateOutlet, CdkStepperModule, JsonPipe, MatIcon],
})
export class OrderStepperComponent extends CdkStepper implements OnInit {
  @Input() buttonLabels: Record<number, {previous: string, next: string}> = {};
  @Input() currentForm?: FormGroup;
  @Output() onStepSelected = new EventEmitter<number>();

  public ngOnInit() {
    this.linear = true;
  }

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
    this.onStepSelected.emit(index);
  }
}
