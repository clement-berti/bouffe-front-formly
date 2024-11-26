import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrepePreviewComponent} from "../menu/crepe-preview/crepe-preview.component";
import {CurrencyPipe} from "@angular/common";
import {Order} from "../galette.component";
import {Galette, galettes} from "../menu";

@Component({
  selector: 'sfo-order-summary',
  standalone: true,
  imports: [
    CrepePreviewComponent,
    CurrencyPipe
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnChanges {
  @Input() order?: Order;

  public subtotal = 0;
  public deliveryPrice = 0;
  public total = 0;
  public nameMapping = new Map<string, Galette>(Array.from(galettes.map((galette) => [galette.id, galette])));

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'].currentValue) {
      this.subtotal = this.computeSubtotal(changes['order'].currentValue?.items)
    }
    this.total = this.subtotal;
  }

  private computeSubtotal(items?: Order['items']): number {
    let subtotal = 0;
    items?.custom.forEach((galette) => {
      subtotal += galette.quantity * galette.price
    })
    items?.signatures.forEach((galette) => {
      subtotal += galette.quantity * (this.nameMapping.get(galette.id)?.price ?? 0)
    })
    return subtotal;
  }
}
