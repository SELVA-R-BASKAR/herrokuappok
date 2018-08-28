import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MoxtraParamService } from '../../service/moxtra-param.service';
import { AddContactService } from '../../service/add-contacts.service';

import { AccessTokenService } from '../../service/access-token.service';
import { CallModalContentComponent } from './call-modal-content/call-modal-content.component';
import { CallInviteModalComponent } from './call-invite-modal/call-invite-modal.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { get, map, isNil } from 'lodash-es';
const _ = { get, map, isNil };


@Component({
  selector: 'app-agent-call',
  templateUrl: './agent-call.component.html',
  styleUrls: ['./agent-call.component.css'],
})
export class AgentCallComponent implements OnInit, OnDestroy {
  callClicked = true;
  moxtraInitialized = true;

  @ViewChild('templateMoxtraModal') moxtraModal: TemplateRef<any>;
  public bsModalRefMeet: BsModalRef;
  public bsModalRefCall: BsModalRef;
  public bsModalRef: BsModalRef;


  ngOnDestroy(): void {
  }

  constructor(
    private paramService: MoxtraParamService,
    private accessService: AccessTokenService,
    private modalService: BsModalService,
    private http: HttpClient,
    private statusService: AddContactService



  ) { }

  ngOnInit() {
    console.log('inside else');
  }

  /*  onCallButtonClicked() {
     if (this.callClicked) {
       console.log('moxtra called');
       this.bsModalRefMeet = this.modalService.show(CallModalContentComponent);
     } else {
       this.bsModalRefMeet.hide();
     }
     this.callClicked = !this.callClicked;
   } */


  onCallButtonClicked() {
    if (this.callClicked) {
      console.log("button clicked true");
      this.bsModalRefMeet = this.modalService.show(CallModalContentComponent);
      this.callClicked = false;
    }
    else {
      console.log("button clicked false");
      this.bsModalRefMeet.hide();
      this.callClicked = true;
    }
 }

  /*  onCallButtonClicked() {
     if (_.isNil(this.bsModalRefMeet)) {
       this.bsModalRefMeet = this.modalService.show(CallModalContentComponent);
       this.statusService.setMeetStatus();
 
     } else {
       this.bsModalRefMeet.hide();
       this.bsModalRefMeet = null;
       //this.statusService.setMeetStatus();
 
     }
   } */

  /* onCallClicked(){
    this.callClicked = !this.callClicked;

    if(this.callClicked){
      this.initializeMoxtra();
    }
  }
  onCloseButtonClicked(){
    this.callClicked = false;
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
    const options = {
      iframe: true,
      unique_id: this.paramService.getLoanAgent(),
      extension: { 'show_dialogs': { 'meet_invite': false, 'member_invite': true } },
      video: true,
      tagid4iframe: 'meetViewPort',
      iframewidth: '100%',
      iframeheight: '490px',
      start_meet: (event: any) => {
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
        this.callClicked = false;
      }
    };
    Moxtra.meet(options);
  } */
}

