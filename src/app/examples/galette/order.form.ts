import {FormlyFieldConfig} from "@ngx-formly/core";

export const orderForm: FormlyFieldConfig[] = [
  {
    key: "signatureGalettes",
    type: "repeat-galettes",
    fieldArray: {
      type: "galette-card"
    }
  }
]
