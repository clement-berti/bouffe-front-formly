import {
  Component,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {GalettePreviewComponent} from "../menu/galette-preview/galette-preview.component";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {Order} from "../galette.component";
import {Galette} from "../menu";
import {MatIcon} from "@angular/material/icon";
import {DebugSwitchComponent} from "./debug-switch/debug-switch.component";
import {MatTooltip} from "@angular/material/tooltip";
import {GalettesService} from "../../api/galettes.service";

@Component({
  selector: 'sfo-order-summary',
  standalone: true,
  imports: [
    GalettePreviewComponent,
    CurrencyPipe,
    JsonPipe,
    MatIcon,
    DebugSwitchComponent,
    MatTooltip
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnChanges {
  @Input() order?: Order;

  public subtotal = 0;
  public deliveryPrice = 0;
  public total = 0;
  public nameMapping = new Map<string, Galette>();
  public debug: boolean = false;

  constructor(
    private galetteService: GalettesService,
  ) {
    this.galetteService.getAllDeliciousGalettes().subscribe((galettes: Galette[]) => {
      this.nameMapping = new Map<string, Galette>(Array.from(galettes.map((galette) => [galette.id, galette])))
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'].currentValue) {
      this.subtotal = this.computeSubtotal(changes['order'].currentValue?.items)
      this.deliveryPrice = changes['order'].currentValue?.delivery?.deliveryMode === 'homeDelivery' ? 5 : 0;
    }
    this.total = this.subtotal + this.deliveryPrice;
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
