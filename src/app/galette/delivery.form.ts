import {FormlyFieldConfig} from "@ngx-formly/core";

const capitalize = (value: string) => {
  if (!value) return '';
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


export const deliveryFields: FormlyFieldConfig[] = [
  {
    key: 'deliveryMode',
    type: 'radio',
    props: {
      options: [
        {value: 'takeaway', label: 'Click & Collect (gratuit)'},
      ],
      required: true
    },
  },
  {
    template: '<p class="address-restaurant"><b>“Bouffe Front Galettes”</b><br/>23 Impasse du bonheur, 92200, Neuilly-sur-Seine</p>',
  },
  {
    key: 'deliveryMode',
    type: 'radio',
    props: {
      options: [
        {value: 'homeDelivery', label: 'A domicile dans toute l\'Île-de-France (5€)'},
      ],
      required: true
    },
  },
  {
    key: 'address',
    expressions: {
      hide: (field: FormlyFieldConfig) =>
        field.parent?.model?.deliveryMode !== 'homeDelivery',
    },
    fieldGroup: [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'fullname',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Prénom Nom',
              placeholder: 'Antoine Dupont',
              required: true,
            },
            parsers: [
              capitalize
            ],
          },
          {
            key: 'phone',
            type: 'input',
            className: 'flex-1',
            props: {
              type: 'tel',
              label: 'Téléphone',
              placeholder: '06 12 34 56 78',
              pattern: "(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.\\-]*\\d{2}){4}",
              required: true,
              updateOn: 'blur'
            },
            validation: {
              messages: {
                pattern: 'Le numéro de téléphone doit être un numéro français'
              },
              show: true
            }
          },
        ]
      },
      {template: '<h4 class="mb-3">Adresse de livraison</h4>'},
      {
        key: 'street',
        type: 'input',
        props: {
          label: 'Adresse',
          placeholder: '3 impasse du bonheur',
          required: true
        },
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'postcode',
            type: 'input',
            props: {
              label: 'Code Postal',
              placeholder: '92200',
              required: true,
              pattern: /^(75[0-1]\d{2}|(77|78|91|92|93|94|95)\d{3})$/,
            },
            validation: {
              messages: {
                pattern: 'Le code postal doit être en Île-de-France'
              }
            }
          },
          {
            key: 'city',
            type: 'input',
            className: 'flex-2',
            props: {
              label: 'Ville',
              placeholder: 'Neuilly-sur-Seine',
              required: true
            },
          },
        ]
      },
      {
        key: 'hasComplementaryAddress',
        type: 'checkbox',
        defaultValue: false,
        props: {
          label: 'Ajouter un complément d\'adresse',
        },
      },
      {
        key: 'complementaryAdress',
        type: 'textarea',
        props: {
          placeholder: 'Code d\'entrée V123',
          required: true,
        },
        expressions: {
          hide: (field: FormlyFieldConfig) =>
            !field?.model?.hasComplementaryAddress,
        },
      },
    ]
  }
]
