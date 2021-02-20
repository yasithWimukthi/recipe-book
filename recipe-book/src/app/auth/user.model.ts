export class User{
  // @ts-ignore
  // @ts-ignore
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationData: Date
  ){};

  get token(){
    // @ts-ignore
    if(!this._tokenExpirationData || new Date()>this._tokenExpirationData){
      return null;
    }
    return this._token;
  }
}
