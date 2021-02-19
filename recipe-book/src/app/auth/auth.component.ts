import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error:string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid){
      // @ts-ignore
      authObs = this.authService.login(email, password);
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>
    this.isLoading = true;

    if(this.isLoginMode){

    }else{
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      resData =>{
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )

    authForm.reset();
  }
}
