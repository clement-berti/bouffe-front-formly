import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {StripeElements, StripeElement, StripeCardElement, Stripe} from '@stripe/stripe-js';

@Component({
  selector: 'sfo-payment',
  standalone: true,
  imports: [
    FormlyModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  stripe!: Stripe;
  elements!: StripeElements;
  card!: StripeCardElement;
  options = {}

  @ViewChild('cardElement') cardElement!: ElementRef;

  constructor() {}

  ngOnInit() {
    // this.stripe = injectStripe('YOUR_PUBLIC_STRIPE_KEY');
    this.elements = this.stripe.elements();

    this.card = this.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);
  }

  onSubmit() {
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        console.error(result.error.message);
      } else {
        console.log('Token:', result.token);
      }
    });
  }
}
