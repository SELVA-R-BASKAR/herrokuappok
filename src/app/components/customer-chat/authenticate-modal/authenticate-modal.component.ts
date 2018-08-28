import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { ChatService } from '../../../service/chat.service';
import { BorrowerAuthService } from '../../../service/borrower-auth.service';
import { AccessTokenService } from '../../../service/access-token.service';

@Component({
  selector: 'app-authenticate-modal',
  templateUrl: './authenticate-modal.component.html',
  styleUrls: ['./authenticate-modal.component.css']
})
export class AuthenticateModalComponent implements OnInit {

  private email: string;
  private loanId: string;
  private ssn: string;
  private firstName: string;
  private lastName: string;
  flag = {
    email: false,
    ssn: false,
    firtsName: false,
    lastName: false
  };
  public dynamic: number = 0;
  public progressBar = false;
  public moxtraError = false;
  constructor(
    private configService: MoxtraParamService,
    private http: HttpClient,
    private chatService: ChatService,
    public bsModalRef: BsModalRef,
    private borrowerAuthService: BorrowerAuthService,
    private accessService: AccessTokenService,
  ) { }


  ngOnInit() {
  }

  validate(inp, val): void {
    switch (inp) {
      case 'email':
        // tslint:disable-next-line:max-line-length
        const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ((val === '') || val.search(emailTest) === -1) {
          this.flag.email = true;
        } else {
          this.flag.email = false;
        }
        break;

      case 'ssn':
        if (val === '') {
          this.flag.ssn = true;
        } else {
          this.flag.ssn = false;
        }
        break;

      case 'firstName':
        if (val === '') {
          this.flag.firtsName = true;
        } else {
          this.flag.firtsName = false;
        }
        break;

      case 'lastName': if (val === '') {
        this.flag.lastName = true;
      } else {
        this.flag.lastName = false;
      }
        break;

    }
  }


  increement(current: number, end: number, timeout: number): void {
    for (let i = current; i <= end; i++) {
      setTimeout(() => { this.dynamic = i }, timeout);
    }
  }
  invokeMessage(): void {

    this.progressBar = true;
    this.increement(this.dynamic, this.dynamic + 25, 50);
    this.borrowerAuthService.authenticateBorrower(this.loanId, this.firstName, this.lastName, this.ssn, this.email)
      .subscribe((borrowerAuthStatus: any) => {

        this.increement(this.dynamic, this.dynamic + 60, 20);
        console.log('borrow'+borrowerAuthStatus.StatusMessage);
        this.chatService.sendMoxtraMessage(borrowerAuthStatus.StatusMessage, 'bot').subscribe(data => {
          this.increement(this.dynamic, this.dynamic + 15, 0);
          this.progressBar = false;
          this.bsModalRef.hide();
        }, err => {
          this.moxtraError = true;
          console.log(err);
        });
      }, error => {
        console.log(error);
        const errorReplyMessage = 'Some error occured please check your network or try again.';
        this.chatService.sendMoxtraMessage(errorReplyMessage, 'bot').subscribe(data => {
          console.log('data sent successfully');
          this.bsModalRef.hide();
        }, error => {
          this.moxtraError = true;
          console.log(error);
        });
      });
  }

}
