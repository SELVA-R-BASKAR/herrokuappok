import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { AccessTokenService } from '../../../service/access-token.service';
import { AddContactService } from '../../../service/add-contacts.service';

import { CallInviteModalComponent } from '../call-invite-modal/call-invite-modal.component';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-call-modal-content',
  templateUrl: './call-modal-content.component.html',
  styleUrls: ['./call-modal-content.component.css']
})

export class CallModalContentComponent implements OnInit {
  sessionKey: string;

  constructor(
    public bsModalRef: BsModalRef,
    public bsModalRefCall: BsModalRef,
    private paramService: MoxtraParamService,
    private accessService: AccessTokenService,
    private modalService: BsModalService,
    private sessionService: SessionService,
    private statusService: AddContactService
  ) { }

  ngOnInit() {
    this.initializeMoxtra();
  }
  
  onCloseButtonClicked() {
    this.bsModalRef.hide();
  }

  initializeMoxtra() {
    console.log('Init Moxtra');
    const in_options = {
      client_id: this.paramService.getClientId(),
      mode: this.paramService.getMoxtraMode(),
      access_token: this.accessService.getToken(),
      invalid_token: (result) => {
        alert('Invalid token for session_id: ' + result.session_id);
      },
    };
    Moxtra.init(in_options);
    console.log("inittt starteedddd");
    const options = {
      iframe: true,
      unique_id: this.paramService.getLoanAgent(),
      extension: { 'show_dialogs': { 'meet_invite': false, 'member_invite': true } },
      video: true,
      tagid4iframe: 'meetViewPort',
      iframewidth: '100%',
      iframeheight: '490px',
      start_meet: (event: any) => {
        console.log("meet starteddddddd");
        console.log('Meet started session key: ' + event.session_key + ' session id: ' + event.session_id);
      },
      invite_meet: (event: any) => {
        console.log('New Invite Modal Triggered');
        this.bsModalRefCall = this.modalService.show(CallInviteModalComponent);
      },
      error: (event: any) => {
      },
      resume_meet: function (event) {
      },
      end_meet: (event: any) => {
        this.bsModalRef.hide();
      }
    };
    Moxtra.meet(options);
  }
}

