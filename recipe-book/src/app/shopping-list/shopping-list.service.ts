import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService{

  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10)
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  // tslint:disable-next-line:typedef
  getIngredient(){
    return this.ingredients.slice();
  }

  // tslint:disable-next-line:typedef
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
