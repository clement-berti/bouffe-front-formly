import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormlyModule} from "@ngx-formly/core";
import {customGaletteFields, INGREDIENTS, SWEET_INGREDIENTS} from "./galette-creative.form";
import {CustomGalette} from "../menu.component";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {GalettePreviewComponent} from "../galette-preview/galette-preview.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'sfo-custom-crepe',
  standalone: true,
  imports: [
    FormlyModule,
    GalettePreviewComponent,
    CurrencyPipe
  ],
  templateUrl: './galette-creative.component.html',
  styleUrl: './galette-creative.component.scss'
})
export class GaletteCreativeComponent implements OnChanges {
  @Input() model?: CustomGalette;
  @Output() onSave = new EventEmitter();

  public customForm = customGaletteFields;
  public form = new FormGroup({});
  public editing: boolean = false;

  private originalModel?: CustomGalette;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.form.valueChanges.subscribe(() => {
      changeDetectorRef.detectChanges();
    });
  }

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
    this.onSave.emit({...this.model, id: this.editing ? this.model?.id : undefined});
    this.editing = false;
    this.form.reset(this.generateNewGalette());
  }

  public cancel() {
    this.onSave.emit(this.originalModel);
    this.editing = false;
    this.form.reset(this.generateNewGalette());
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
