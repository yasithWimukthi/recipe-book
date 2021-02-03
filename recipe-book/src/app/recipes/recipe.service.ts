import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
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
}
