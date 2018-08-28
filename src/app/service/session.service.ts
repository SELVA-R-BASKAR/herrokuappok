import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  private sessionKey: string;
  constructor() { }

  getSessionKey() {
    return this.sessionKey;
  }

  setSessionKey(sessionKey: string) {
    this.sessionKey = sessionKey;
  }
}
