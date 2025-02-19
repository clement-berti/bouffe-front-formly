import {CustomGalette, Item} from "./menu/menu.component";

export interface Galette {
  id: string,
  type: 'galette' | 'crepe',
  name: string,
  price: number,
  ingredients: string[],
  picture: string
}

export type Crepe = Galette;

export interface Order {
  delivery?: {
    deliveryMode: 'homeDelivery' | 'takeaway',
    address?: {
      fullname: string,
      street: string,
      postcode: string,
      city: string
    },
    hasComplementaryAddress: boolean,
    complementaryAddress?: string
  },
  items: { signatures: Item[], custom: CustomGalette[] }
  payment: {}
}

export const setDefaultOrder = () => ({delivery: undefined, items: {signatures: [], custom: []}, payment: {}})
