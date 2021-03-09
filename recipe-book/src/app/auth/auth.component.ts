import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid){
      // @ts-ignore
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>
    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      resData =>{
        console.log(resData);
        this.isLoading = false;
        // @ts-ignore
        this.router.navigate(['/recipes']);
      },
      errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )

    authForm.reset();
  }

  onHandleError() {
    this.error =null;
  }
}
