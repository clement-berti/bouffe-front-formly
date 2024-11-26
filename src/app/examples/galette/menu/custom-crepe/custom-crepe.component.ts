import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormlyModule} from "@ngx-formly/core";
import {ASIDE_SALADS, customGaletteFields, INGREDIENTS, SWEET_INGREDIENTS} from "./custom-crepe.form";
import {CustomGalette} from "../menu.component";
import * as uuid from "uuid";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {CrepePreviewComponent} from "../crepe-preview/crepe-preview.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'sfo-custom-crepe',
  standalone: true,
  imports: [
    FormlyModule,
    JsonPipe,
    CrepePreviewComponent,
    CurrencyPipe
  ],
  templateUrl: './custom-crepe.component.html',
  styleUrl: './custom-crepe.component.scss'
})
export class CustomCrepeComponent implements OnChanges {

  @Input() model?: CustomGalette;
  @Output() onSave = new EventEmitter();

  public customForm = customGaletteFields;
  public form = new FormGroup({});
  public editing: boolean = false;

  private originalModel?: CustomGalette;

  formState = {
    getFillingOptions: (baseValue: string) => {
      switch (baseValue) {
        case 'crepe':
          return SWEET_INGREDIENTS;
        case 'galette':
          return INGREDIENTS;
        default:
          return [];
      }
    },
    getPricing: (model: CustomGalette) => {
      let total = 0;
      const basePricing = {
        'crepe': 4,
        'galette': 5
      }
      total += basePricing[model.base]
      total += model.fillings.length * 0.8
      return total;
    }
  };

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'].currentValue === undefined) {
      this.model = this.generateNewGalette();
      this.editing = false;
    } else {
      this.model = changes['model'].currentValue;
      this.originalModel = {...changes['model'].currentValue};
      this.editing = true;
    }
  }

  public add() {
    this.onSave.emit(this.model);
    this.model = this.generateNewGalette();
    this.editing = false;
  }

  public cancel() {
    this.onSave.emit(this.originalModel);
    this.model = this.generateNewGalette();
    this.editing = false;
  }

  public generateNewGalette(): CustomGalette {
    return {
      id: undefined,
      fillings: [],
      base: 'galette',
      aside: '',
      quantity: 1,
      price: 5
    }
  };
}
