import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, JsonPipe, NgOptimizedImage} from "@angular/common";
import {MatStep, MatStepContent, MatStepper} from "@angular/material/stepper";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CdkStep, CdkStepLabel} from "@angular/cdk/stepper";
import {OrderStepperComponent} from "./order-stepper/order-stepper.component";
import {FormlyModule} from "@ngx-formly/core";
import {deliveryFields} from "./delivery.form";
import {CustomGalette, Item, MenuComponent} from "./menu/menu.component";
import {CrepePreviewComponent} from "./menu/crepe-preview/crepe-preview.component";
import {OrderSummaryComponent} from "./order-summary/order-summary.component";
import {Subscription} from "rxjs";
import {FormlyMaterialModule} from "@ngx-formly/material";

export interface Order {
  delivery?: {
    deliveryMode: 'homeDelivery' | 'takeaway',
    address?: {
      fullname: string,
      street: string,
      postcode: string,
      city: string
    },
    hasComplementaryAddress: boolean,
    complementaryAddress?: string
  },
  items: { signatures: Item[], custom: CustomGalette[] }
}

@Component({
  selector: 'sfo-galette',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatStepper,
    MatStep,
    MatStep,
    MatStepper,
    ReactiveFormsModule,
    MatStepContent,
    CdkStep,
    OrderStepperComponent,
    CdkStepLabel,
    FormlyModule,
    FormlyMaterialModule,
    MenuComponent,
    JsonPipe,
    CurrencyPipe,
    CrepePreviewComponent,
    OrderSummaryComponent
  ],
  templateUrl: './galette.component.html',
  styleUrl: './galette.component.scss'
})
export class GaletteComponent implements OnInit, OnDestroy {
  public order: Order = {delivery: undefined, items: {signatures: [], custom: []}}
  public delivery: Order['delivery'] | {} = {};
  public formGroup1 = new FormGroup({});
  public deliveryForm = new FormGroup({});

  public currentForm: FormGroup = this.formGroup1;
  public buttonLabels = {
    0: {previous: '', next: 'Indiquer le mode de livraison'},
    1: {previous: 'Revenir à la commande', next: 'Procéder au paiement'},
    2: {previous: 'Revenir au mode de livraison', next: 'Valider la commande'}
  }

  private deliverySubscription?: Subscription;

  protected readonly deliveryFields = deliveryFields;

  public ngOnInit(): void {
    this.deliverySubscription = this.deliveryForm.statusChanges.subscribe({
      next: (status) => {
        if (status === 'VALID') {
          this.order = {...this.order, delivery: this.delivery as Order['delivery']};
        } else {
          this.order = {...this.order, delivery: undefined };
        }
      }
    })
  }

  public updateCurrentForm(index: number) {
    const mapping: Record<number, FormGroup> = {
      0: this.formGroup1,
      1: this.deliveryForm
    }
    this.currentForm = mapping[index];
  }

  public updateOrder(items: Order['items']) {
    this.order = {...this.order, items};
  }

  public ngOnDestroy() {
    this.deliverySubscription?.unsubscribe();
  }
}
