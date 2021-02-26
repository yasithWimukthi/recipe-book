import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Subscription} from "rxjs";

import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy{

  isAuthenticated: boolean;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('inside ngOnInit');
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = user ? true : false;
      console.log('Header component : \n' + user)
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
