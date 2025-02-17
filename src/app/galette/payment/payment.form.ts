import {FormlyFieldConfig} from "@ngx-formly/core";

export const paymentFields: FormlyFieldConfig[] = [
  {
    key: 'cardHolder',
    type: 'input',
    props: {
      label: 'Titulaire de la carte',
      placeholder: 'NOM Prénom',
      required: true,
    }
  },
  {
    key: 'cardNumber',
    type: 'input',
    props: {
      label: 'Numéro de carte',
      placeholder: '2234 5678 9012 3456',
      required: true,
      maxLength: 19,
      minLength: 16,
      pattern: '^[2-5][0-9 ]*$',
      inputmode: "numeric",
    },
    validators: {
      validation: ['creditCard'],
    },
    validation: {
      messages: {
        pattern: 'Votre numéro de carte est invalide',
      }
    },
    hooks: {
      onInit: (field) => {
        // Format automatique du numéro de carte avec des espaces
        field.formControl?.valueChanges.subscribe(value => {
          if (value) {
            const val = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            field.formControl?.setValue(val, {emitEvent: false});
          }
        });
      }
    }
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-2',
        key: 'expiryDate',
        type: 'input',
        props: {
          label: 'Date d\'expiration',
          placeholder: 'MM/YY',
          required: true,
          pattern: '^(0[1-9]|1[0-2])\/([0-9]{2})$',
          maxLength: 5
        },
        validators: {
          validation: ['expiryDate']
        },
        validation: {
          messages: {
            expiryDate: "La date d'expiration est dans le passé, votre carte est-elle périmée ?",
            required: 'Oopsy daisy!'
          }
        },
        hooks: {
          onInit: (field) => {
            // Format automatique de la date d'expiration avec un slash
            field.formControl?.valueChanges.subscribe(value => {
              if (value) {
                const val = value.replace(/\//g, '').replace(/^(\d{2})(\d{1})/g, '$1\/$2').trim();
                field.formControl?.setValue(val, {emitEvent: false});
              }
            });
          }
        }
      },
      {
        className: 'flex-1',
        key: 'cvv',
        type: 'input',
        props: {
          label: 'CVV',
          placeholder: '123',
          required: true,
          maxLength: 4,
          minLength: 3,
          pattern: '^[0-9]*$',
          type: 'password'
        },
        hooks: {
          onInit: (field) => {
            field.form?.get('cardNumber')?.valueChanges.subscribe(value => {
              if (!field.props) {
                return
              }
              const digitMapping: Record<number, number> = {
                2: 3, // Mastercard
                3: 4, // Amex
                4: 3, // Visa
                5: 3, // Mastercard
              }
              field.props.maxLength = digitMapping[value[0]] ?? 4
            });
          }
        }
      }
    ]
  }
];

