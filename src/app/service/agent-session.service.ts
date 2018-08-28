import { Injectable } from '@angular/core';

@Injectable()
export class AgentSessionService {

  isValidSession = false;

  constructor() { }

  setValidSession(val: boolean) {
    this.isValidSession = val;
  }

  getValidSession(): boolean {
    return this.isValidSession;
  }

}
