import {FormlyFieldConfig} from "@ngx-formly/core";

export const data = {
  name: 'Kiki'
}
export const fields: FormlyFieldConfig[] = [
  {
    key: 'name',
    name: 'Name',
    type: 'input',
    props: {
      placeholder: 'Dupont',
      description: 'First name to specify your identity'
    }
  }
]
