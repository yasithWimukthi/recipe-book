import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
// @ts-ignore
import {Subject} from "rxjs";

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
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

  constructor(private slService: ShoppingListService){}

  getRecipes(): Recipe[] {
    return this._recipes.slice();
  }

  // tslint:disable-next-line:typedef
  getRecipe(id: number){
    return this._recipes[id];
  }

  // tslint:disable-next-line:typedef
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this._recipes.push(recipe);
    this.recipeChanged.next(this._recipes.slice());
  }

  updateRecipe(index: number,recipe: Recipe){
    this._recipes[index] = recipe;
    this.recipeChanged.next(this._recipes.slice());
  }

  deleteRecipe(index: number){
    this._recipes.splice(index, 1);
    this.recipeChanged.next(this._recipes.slice());
  }

  setRecipes(recipes:Recipe[]){
    this._recipes = recipes;
    this.recipeChanged.next(recipes.slice());
  }
}
