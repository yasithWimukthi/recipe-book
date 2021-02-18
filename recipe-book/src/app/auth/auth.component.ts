import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid){
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    if(this.isLoginMode){

    }else{
      this.authService.signup(email, password).subscribe(
        resData =>{
          console.log(resData)
        },
        error =>{
          console.log(error)
        }
      );
    }

    authForm.reset();
  }
}
