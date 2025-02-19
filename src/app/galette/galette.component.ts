import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CdkStep, CdkStepLabel} from "@angular/cdk/stepper";
import {OrderStepperComponent} from "./order-stepper/order-stepper.component";
import {FormlyModule} from "@ngx-formly/core";
import {deliveryFields} from "./delivery.form";
import {MenuComponent} from "./menu/menu.component";
import {OrderSummaryComponent} from "./order-summary/order-summary.component";
import {Subscription} from "rxjs";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {PaymentFormComponent} from "./payment/payment.component";
import {OrderConfirmationComponent} from "./order-confirmation/order-confirmation.component";
import {Order, setDefaultOrder} from "./galette.interface";
import {GalettesService} from "../api/galettes.service";

@Component({
  selector: 'sfo-galette',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkStep,
    OrderStepperComponent,
    CdkStepLabel,
    FormlyModule,
    FormlyMaterialModule,
    MenuComponent,
    OrderSummaryComponent,
    PaymentFormComponent,
    OrderConfirmationComponent
  ],
  templateUrl: './galette.component.html',
  styleUrl: './galette.component.scss'
})
export class GaletteComponent implements OnInit, OnDestroy {
  public order: Order = setDefaultOrder();
  public delivery: Order['delivery'] | {} = {};
  public orderConfirmed = false;
  public orderForm = new FormGroup({
    order: new FormGroup({
      items: new FormGroup({
        signatures: new FormGroup({}),
        custom: new FormGroup({})
      })
    }, {updateOn: 'change'}),
    delivery: new FormGroup({}),
    payment: new FormGroup({})
  });

  public currentForm: FormGroup = this.orderForm.controls['order'];
  public currentIndex: number = 0;
  public buttonLabels = {
    0: {previous: '', next: 'Indiquer le mode de livraison'},
    1: {previous: 'Revenir à la commande', next: 'Procéder au paiement'},
    2: {previous: 'Revenir au mode de livraison', next: 'Valider la commande'},
    3: {previous: '', next: ''}
  }

  private deliverySubscription?: Subscription;

  protected readonly deliveryFields = deliveryFields;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private galetteService: GalettesService
  ) {
    this.galetteService.currentOrder().subscribe((order: Order | null) => {
      this.order = order ?? setDefaultOrder();
    })
  }

  public ngOnInit(): void {
    this.deliverySubscription = this.orderForm.controls['delivery'].statusChanges.subscribe({
      next: (status) => {
        if (!this.order) {
          return
        }
        if (status === 'VALID') {
          this.order = {...this.order, delivery: this.delivery as Order['delivery']};
        } else {
          this.order = {...this.order, delivery: undefined };
        }
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  public updateCurrentForm(index: number) {
    if (this.currentIndex === index) {
      return;
    }
    if (index === 3) {
      this.orderConfirmed = true;
      return;
    }
    const mapping: Record<number, FormGroup> = {
      0: this.orderForm.controls['order'],
      1: this.orderForm.controls['delivery'],
      2: this.orderForm.controls['payment'],
    }
    this.currentForm = mapping[index];
    this.currentIndex = index;
  }

  public updateOrder(items: Order['items']) {
    this.order = {...this.order, items};
  }

  public resetOrder() {
    this.orderForm.reset();
    this.order = setDefaultOrder();
    this.delivery = {}
    this.orderConfirmed = false;
  }

  public ngOnDestroy() {
    this.deliverySubscription?.unsubscribe();
  }
}
