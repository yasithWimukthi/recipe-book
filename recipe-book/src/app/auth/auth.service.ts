import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData{
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId: string;
}

@Injectable({providedIn:'root'})
export class AuthService{
  constructor(private http:HttpClient){

  }

  signup(email:string, password:string){
    // @ts-ignore
    // @ts-ignore
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZr3TAmyvgTnm9C3DAZXrVYLzNIvCPbiE',
      {
        email,
        password,
        returnSecureToken  :true
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!'

      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }

      switch (errorRes.error.error) {
        case 'EMAIL_EXISTS' :
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'OPERATION_NOT_ALLOWED' :
          errorMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
      }
      return throwError(errorMessage);
    }));
  }
}
