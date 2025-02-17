export interface Galette {
  id: string,
  type: 'galette' | 'crepe',
  name: string,
  price: number,
  ingredients: string[],
  picture: string
}

export type Crepe = Galette;
