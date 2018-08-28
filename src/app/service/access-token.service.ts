import { Injectable } from '@angular/core';

@Injectable()
export class AccessTokenService {

  private acessToken: string;
  private botAccessToken: string;

  constructor() { }

  getToken() {
    return this.acessToken;
  }

  setToken( token: string ) {
    this.acessToken = token;
    console.log(this.acessToken);
  }

  getBotAccessToken() {
    return this.botAccessToken;
  }
  setBotAccessToken(botToken: string) {
    this.botAccessToken = botToken;
  }
}
