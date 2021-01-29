import {EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService{

  recipeSelected = new EventEmitter<Recipe>();

  // tslint:disable-next-line:variable-name
  private _recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'test descpition',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
      [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Test Recipe-2',
      'test descpition',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
      [
          new Ingredient('Meat', 1),
          new Ingredient('Buns', 2)
      ])
  ];

  getRecipes(): Recipe[] {
    return this._recipes.slice();
  }
}
