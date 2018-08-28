import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AgentCallService {

  private incomingCall = new BehaviorSubject<boolean>(false);
  incomingCallStatus = this.incomingCall.asObservable();

  private sessionKey = new BehaviorSubject<string>('');
  sessionKeyVal = this.sessionKey.asObservable();

  constructor() { }

  changeIncomingCallStatus(status) {
    this.incomingCall.next(status);
  }

  changeSessionKey(key) {
    this.sessionKey.next(key);
  }
}
