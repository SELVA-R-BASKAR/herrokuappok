import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class LoanService {

  private subject = new Subject<any>();

  constructor() { }
 
    sendMessage(client: string, loan: string) {
        let data={ clientId: client, loanId: loan};
        this.subject.next(JSON.stringify(data)); 
    }
 
    clearMessage() {
        this.subject.next();
    }
    

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
