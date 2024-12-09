import {FormlyFieldConfig} from "@ngx-formly/core";

export const deliveryFields: FormlyFieldConfig[] = [
  {
    key: 'deliveryMode',
    type: 'radio',
    props: {
      options: [
        { value: 'takeaway', label: 'Click & Collect (gratuit)' },
      ],
      required: true
    },
  },
  {
    template: '<p class="ms-4 p-3 rounded-2 bg-body-secondary"><b>“Bouffe Front Galettes”</b><br/>23 Impasse du bonheur, 92200, Neuilly-sur-Seine</p>',
  },
  {
    key: 'deliveryMode',
    type: 'radio',
    props: {
      options: [
        { value: 'homeDelivery', label: 'A domicile dans toute l\'Île-de-France (5€)' },
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
        key: 'fullname',
        type: 'input',
        props: {
          label: 'Prénom Nom',
          placeholder: 'Antoine Dupont',
          required: true
        },
      },
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
            className: 'flex-1',
            props: {
              label: 'Code Postal',
              placeholder: '92200',
              required: true,
              pattern: /^(75[0-1]\d{2}|77\d{3}|78\d{3}|91\d{3}|92\d{3}|93\d{3}|94\d{3}|95\d{3})$/,
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
