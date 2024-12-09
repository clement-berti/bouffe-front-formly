import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormControl} from "@angular/forms";

export const INGREDIENTS = [
  {value: 'tomato-chutney', label: 'Chutney de tomates'},
  {value: 'ham', label: 'Jambon'},
  {value: 'comte', label: 'Comté AOP'},
  {value: 'egg', label: 'Oeuf'},
  {value: 'swiss-cheese', label: 'Emmental'},
  {value: 'mushroom', label: 'Champignons'},
  {value: 'avocado', label: 'Avocat'},
  {value: 'fresh-cream', label: 'Crème Fraîche'}
]

export const ASIDE_SALADS = [
  {value: 'mache', label: 'Mâche'},
  {value: 'roquette', label: 'Roquette'},
  {value: 'batavia', label: 'Batavia'},
  {value: 'mesclun', label: 'Mesclun'},
]

export const SWEET_INGREDIENTS = [
  {value: 'butter-sugar', label: 'Beurre sucre'},
  {value: 'sugar', label: 'Sucre'},
  {value: 'chocolate', label: 'Chocolat'},
  {value: 'caramel', label: 'Caramel'},
  {value: 'almonds', label: 'Amandes éffilées'},
  {value: 'banana', label: 'Bananes'},
  {value: 'strawberry', label: 'Fraises'},
  {value: 'ice-cream', label: 'Glace à la vanille'},
  {value: 'whipped-cream', label: 'Crème fouéttée'},
]

export const customGaletteFields: FormlyFieldConfig[] = [
  {
    key: 'base',
    type: 'radio',
    defaultValue: 'galette',
    props: {
      label: '1. Votre base',
      required: true,
      options: [
        {value: 'galette', label: 'Galette de sarasin'},
        {value: 'crepe', label: 'Crêpe de froment'},
      ]
    }
  },
  {
    key: 'fillings',
    type: 'select',
    props: {
      label: '2. Vos ingrédients',
      placeholder: 'Placeholder',
      required: true,
      multiple: true,
      selectAllOption: 'Select All',
      options: [],
    },
    expressions: {
      'props.options': (field => field.options?.formState.getFillingOptions(field.model.base)),
      'props.required': (field) => field.model.base === 'galette',
    },
    hooks: {
      onInit: (field: FormlyFieldConfig) => {
        field.form?.get('base')?.valueChanges.subscribe(() => {
          if (field.model.id === undefined) {
            field.formControl?.patchValue([]);
          }
        });
      },
    },
  },
  {
    key: 'aside',
    type: 'select',
    props: {
      label: '3. Votre accompagnement',
      multiple: false,
      options: ASIDE_SALADS,
    },
    expressions: {
      hide: (field) => field.model['base'] === 'crepe'
    }
  },
  {
    key: 'price',
    hooks: {
      onInit: (field) => {
        field.form?.valueChanges.subscribe(() => {
          const price = field.options?.formState.getPricing(field.model)
          if (price !== field.model.price) {
            field.formControl?.patchValue(price, { emitEvent: true, onlySelf: true });
          }
        });
      }
    }
  }
]
