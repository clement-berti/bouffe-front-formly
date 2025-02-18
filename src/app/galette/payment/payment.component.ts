import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {PaymentIntent, PaymentIntentResult, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {
  injectStripe,
  StripeCardComponent,
  StripeService
} from "ngx-stripe";
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {paymentFields} from "./payment.form";

@Component({
  selector: 'sfo-payment',
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule
  ],
  providers: [
    StripeService
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentFormComponent implements OnInit {
  @Input() form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = paymentFields;
  options = {}

  stripe = injectStripe('blabla');
  stripeTest?: FormGroup;

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  public ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Angular', [Validators.required]],
      amount: [1001, [Validators.required, Validators.pattern(/d+/)]],
    });
  }

  //
  // createToken() {
  //   const name = this.stripeTest?.get('name')?.value;
  //   if (!name) {
  //     return
  //   }
  //   this.stripe
  //     .createToken(this.card.element, { name })
  //     .subscribe((result) => {
  //       if (result.token) {
  //         // Use the token
  //         console.log(result.token.id);
  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }

  // cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       iconColor: '#666EE8',
  //       color: '#31325F',
  //       fontWeight: '300',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSize: '18px',
  //       '::placeholder': {
  //         color: '#CFD7E0'
  //       }
  //     }
  //   }
  // };
  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee'
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  pay(): void {
    if (this.stripeTest?.valid) {
      this.createPaymentIntent(this.stripeTest!.get('amount')!.value)
        .pipe(
          switchMap((pi: PaymentIntent) =>
            this.stripeService.confirmCardPayment(pi.client_secret ?? '', {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest!.get('name')!.value,
                },
              },
            })
          )
        )
        .subscribe((result: PaymentIntentResult) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  public createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `api.url/create-payment-intent`,
      { amount }
    );
  }
}
