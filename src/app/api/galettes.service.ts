import { Injectable } from '@angular/core';
import {Galette, Order} from "../galette/galette.interface";
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GalettesService {
  private galettes = GALETTES;

  constructor() { }

  public getAllDeliciousGalettes(): Observable<Galette[]> {
    return of(this.galettes);
  }

  public currentOrder(): Observable<Order | null> {
    const order = localStorage.getItem('order');
    if (order === null) {
      return of(null);
    }
    return of(JSON.parse(order));
  }

  public saveOrder(order: Order): Observable<Order> {
    localStorage.setItem('order', JSON.stringify(order));
    return of(order);
  }

  public confirmOrder(order: Order): Observable<Order> {
    localStorage.removeItem('order');
    return of(order).pipe(delay(2000));
  }
}

export const GALETTES: Galette[] = [
  {
    id: '1',
    type: 'galette',
    name: 'La Comté',
    price: 8.5,
    ingredients: [
      'Comté AOP',
      'Oeuf',
      'Champignons',
      'Jambon',
      'Crème fraîche',
      'Piment d’Espelette'
    ],
    picture: './menu/galette-comte.png'
  },
  {
    id: '2',
    type: 'galette',
    name: 'La Galette saucisse',
    price: 10.5,
    ingredients: [
      'Andouillette',
      'Oignons caramélisés',
      'Chutney de tomates',
      'Servis avec de la salade'
    ],
    picture: './menu/galette-saucisse.png'
  },
  {
    id: '3',
    type: 'galette',
    name: 'La Satay',
    price: 10.5,
    ingredients: [
      'Poulet Satay tendre',
      'Fromage Suisse',
      'Cacahuètes grillées',
      'Coriandre fraîche'
    ],
    picture: './menu/galette-satay.png'
  },
  {
    id: '4',
    type: 'galette',
    name: 'La Curry',
    price: 11.5,
    ingredients: [
      'Poulet au curry vert',
      'Fromage suisse',
      'Brocolis',
      'Basilic frais'
    ],
    picture: './menu/galette-curry.png'
  },
  {
    id: '5',
    type: 'crepe',
    name: 'La Traou Mad',
    price: 8.5,
    ingredients: [
      'Caramel au beurre salé',
      'Framboises',
      'Glace à la vanille',
      'Palais breton émiétté'
    ],
    picture: './menu/crepe-traoumad.png'
  },
  {
    id: '6',
    type: 'crepe',
    name: 'La Bloody suzette',
    price: 10.5,
    ingredients: [
      'Orange sanguine',
      'zestes',
      'Caramel au beurre salé',
      'Sauce au Grand Marnier'
    ],
    picture: './menu/crepe-bloody-suzette.png'
  },
  {
    id: '7',
    type: 'crepe',
    name: 'La Belle Hélène',
    price: 9.5,
    ingredients: [
      'Poires pochées', 'sauce au chocolat', 'glace à la vanille', 'amandes grillées'
    ],
    picture: './menu/crepe-belle-helene.png'
  },
  {
    id: '9',
    type: 'crepe',
    name: 'La Cointreau',
    price: 11.5,
    ingredients: [
      'Cointreau', 'Pêches pochées', 'glace à la vanille', 'crème fouettée','amandes grillées', 'coulis de fruits rouges'
    ],
    picture: './menu/crepe-cointreau.png'
  },
]
