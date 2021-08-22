import { Injectable } from '@angular/core';
import { resolve } from 'url';
import {Dish} from '../shared/dish';
import { DISHES } from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  // With Out Promise
  // getDishes():Dish[]{
  //   return DISHES;
  // }

  // getDish(id: string): Dish {
  //   return DISHES.filter((dish) => (dish.id === id))[0];
  // }

  // getFeaturedDish(): Dish {
  //   return DISHES.filter((dish) => dish.featured)[0];
  // }
  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      // Simulate delay from server
      setTimeout(()=>resolve(DISHES),2000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      // Simulate delay from server
      setTimeout(()=>resolve((DISHES.filter((dish) => (dish.id === id))[0])),2000);
  });
}

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      // Simulate delay from server
      setTimeout(()=>resolve((DISHES.filter((dish) => dish.featured)[0])),2000);
    });
  }
}
