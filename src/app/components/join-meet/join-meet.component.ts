import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AgentCallService } from '../../service/agent-call.service';
import { MoxtraParamService } from '../../service/moxtra-param.service';
import { AccessTokenService } from '../../service/access-token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var $: any;


@Component({
  selector: 'app-join-meet',
  templateUrl: './join-meet.component.html',
  styleUrls: ['./join-meet.component.css']
})

export class JoinMeetComponent implements OnInit {

  showModal: boolean;
  sessionKey: string;
  public moxtraModalRef: BsModalRef;
  @ViewChild('moxtraCallInModal') moxtraModal: TemplateRef<any>;
  constructor(
    private paramService: MoxtraParamService,
    private accessService: AccessTokenService,
    private agentCall: AgentCallService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.agentCall.incomingCallStatus.subscribe(data => {
      this.showModal = data;
      if (this.showModal) {
        this.moxtraModalRef = this.modalService.show(this.moxtraModal);
        //$('#moxtraCallInModal').modal('show');
        this.loadReceiver();
      } else {
        $('#moxtraCallInModal').modal('hide');
      }
    });

    this.agentCall.sessionKeyVal.subscribe(data => {
      this.sessionKey = data;
    });
  }

  loadReceiver() {
    const options = {
      mode: this.paramService.getMoxtraMode(),
      client_id: this.paramService.getClientId(),
      sdk_version: 4,
      plugin_version: 'latest',
      access_token: this.accessService.getToken(),
      invalid_token: function(event) {
      }
    };
    Moxtra.init(options);
    const meetOptions = {
      session_key: this.sessionKey,
      iframe: true,
      video: true,
      tagid4iframe: 'agentCallInContainer',
      iframewidth: '100%',
      iframeheight: '550px',
      extension: {  'show_dialogs': { 'meet_invite': true }},
      options: {
        'MEET_ATTENDEE_WITHOUT_INVITE': true,
        'MEET_WITHOUT_AUDIO_DIALIN': true,
        'MEET_WITHOUT_AUDIO': false
      },
      start_meet: function(event) {
      },
      exit_meet: function(event) {
      },
      end_meet: function(event) {
        this.moxtraModalRef.hide();
      }
    };
    Moxtra.joinMeet(meetOptions);
  }
}
