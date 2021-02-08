import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
// @ts-ignore
import {Subscription} from 'rxjs-compat/Subscription';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
      }
    );
  }

  // tslint:disable-next-line:typedef
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
