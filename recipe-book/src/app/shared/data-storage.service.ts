import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {exhaustMap, map, take, tap} from "rxjs/operators";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
  constructor(
    private http:HttpClient,
    private recipeService:RecipeService,
    private authService: AuthService
  ) {
  }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://recipe-book-e79d9-default-rtdb.firebaseio.com/recipe.json',
      recipes
    ).subscribe(responce =>{
      console.log(responce)
    })
  }

  fetchRecipes(){

    return this.authService.user.pipe(take(1),exhaustMap(
      user =>{
        return this.http.get<Recipe[]>(
          'https://recipe-book-e79d9-default-rtdb.firebaseio.com/recipe.json',
          {
            params: new HttpParams().set('auth',user.token)
          }
        )
      }
    ),
        map(recipe=>{
          return recipe.map(recipe =>{
            return {
              ...recipe,
              ingredients : recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap(recipe =>{
          this.recipeService.setRecipes(recipe);
        })
    )

  }
}
