import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Crepe, Galette} from "../menu";
import {GaletteCardComponent} from "./galette-card/galette-card.component";
import {GaletteCreativeComponent} from "./galette-creative/galette-creative.component";
import * as uuid from 'uuid';
import {GalettePreviewComponent} from "./galette-preview/galette-preview.component";
import {CounterComponent} from "./counter/counter.component";
import {GalettesService} from "../../api/galettes.service";

export interface Item {
  id: string,
  quantity: number
}

export interface CustomGalette {
  id: string | undefined,
  base: 'crepe' | 'galette',
  fillings: string[],
  aside: string,
  quantity: number,
  price: number
}

@Component({
  selector: 'sfo-menu',
  standalone: true,
  imports: [
    GaletteCardComponent,
    GaletteCreativeComponent,
    GalettePreviewComponent,
    CounterComponent
  ],
  providers: [
    GalettesService
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnChanges {
  protected galettes: Galette[] = []
  protected crepes: Crepe[] = []
  protected orderMapping: Record<string, Item | null> = {};

  public customGaletteToEdit?: CustomGalette;

  @Input() order: { signatures: Item[], custom: CustomGalette[] } = {signatures: [], custom: []};

  @Output() onChange = new EventEmitter();

  constructor(private galettesService: GalettesService) {
    this.galettesService.getAllDeliciousGalettes().subscribe((galettes: Galette[]) => {
      this.galettes = galettes.filter((g) => g.type === 'galette');
      this.crepes = galettes.filter((g) => g.type === 'crepe');
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      this.orderMapping = this.computeOrderMapping(changes['order'].currentValue.signatures ?? [])
    }
  }

  public computeOrderMapping(items: Item[]): Record<string, Item> {
    return Object.fromEntries(items.map((item) => [item.id, item]))
  }

  public updateQuantity(id: string, quantity: number) {
    const galetteIndex = this.order.signatures.findIndex((galette) => galette.id === id);
    if (galetteIndex < 0 && quantity > 0) {
      const galette = {id, quantity}
      this.order.signatures.push(galette);
    } else if (quantity === 0) {
      this.order.signatures.splice(galetteIndex, 1);
    } else {
      this.order.signatures[galetteIndex].quantity = quantity;
    }
    this.orderMapping = this.computeOrderMapping(this.order.signatures);
    this.onChange.emit(this.order);
  }

  public saveCustomCrepe(galette: CustomGalette) {
    const index = this.order.custom.findIndex((g) => galette.id === g.id)
    if (index >= 0) {
      this.order.custom[index] = galette
    } else {
      galette.id = uuid.v4();
      this.order.custom.push(galette)
    }
    this.onChange.emit(this.order);
  }

  public updateCustomGalette(id: string | undefined, quantity: number) {
    const index: number = this.order.custom.findIndex((galette) => galette.id === id);
    if (quantity === 0) {
      this.order.custom.splice(index, 1);
    } else {
      this.order.custom[index].quantity = quantity;
    }
    this.onChange.emit(this.order);
  }

  public edit(galette: CustomGalette) {
    this.customGaletteToEdit = {...galette};
  }
}
