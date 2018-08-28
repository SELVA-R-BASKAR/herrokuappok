import { EventEmitter, Component, OnInit, Output } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';


import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { LoanService } from '../../../service/loan.service';
import { ChatService } from '../../../service/chat.service';
import { LoanStatusService } from '../../../service/loan-status.service';
import { AccessTokenService } from '../../../service/access-token.service';
import { get, map, last } from 'lodash-es';

const _ = { get, map, last };

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  public clientLoanNumber: string;
  public progressBar = false;
  public moxtraError = false;
  public dynamic = 0;
  private flag = {
    clientId: false,
    loanId: false
  };

  constructor(
    private loan: LoanService,
    private configService: MoxtraParamService,
    private chatService: ChatService,
    private loanStatusService: LoanStatusService,
    private accessTokenService: AccessTokenService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }


  validate(inp, val): void {
    switch (inp) {
      case 'clientId':
        if (val === '') {
          this.flag.clientId = true;
        } else {
          this.flag.clientId = false;
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
    this.loanStatusService.getLoanStatus(this.clientLoanNumber).subscribe(
      (loanStatus: any) => {

        this.increement(this.dynamic, this.dynamic + 60, 20);
        // tslint:disable-next-line:max-line-length
        const message = `Your Application is ${loanStatus.PercentComplete}% completed.
          Please talk to our agent for more information.`;
        this.chatService.sendMoxtraMessage(message,'bot').subscribe(data => {

          this.increement(this.dynamic, this.dynamic + 15, 0);
          this.bsModalRef.hide();
          this.progressBar = false;
        }, err => {

          this.moxtraError = true;
          console.log(err);
        });
      },
      (err) => {
        console.log(err);
        const errorReplyMessage = 'Some error occured please check your network or try again.';
        this.chatService.sendMoxtraMessage(errorReplyMessage, 'bot').subscribe(data => {
          console.log('data sent successfully');
          this.bsModalRef.hide();
        }, error => {
          this.moxtraError = true;
          console.log(error);
        });
      }

    );





  }

  clearMessage(): void {
    this.loan.clearMessage();
  }


}
