import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { SessionService } from '../../../service/session.service';
import { AgentSessionService } from '../../../service/agent-session.service';
import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { AccessTokenService } from '../../../service/access-token.service';
import { SignInModalComponent } from '../sign-in-modal/sign-in-modal.component';
import { CallInviteModalComponent } from '../.././agent-call/call-invite-modal/call-invite-modal.component';

import { get, map } from 'lodash-es';

const _ = { get, map };

@Component({
  selector: 'app-agent-ui-modal',
  templateUrl: './agent-ui-modal.component.html',
  styleUrls: ['./agent-ui-modal.component.css']
})
export class AgentUiModalComponent implements OnInit {

  constructor(
    private paramService: MoxtraParamService,
    private accessService: AccessTokenService,
    private http: HttpClient,
    public bsModalRef: BsModalRef,
    public bsModalCallInvite: BsModalRef,
    private modalService: BsModalService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.startUserChats();
  }

  startUserChats() {
    const in_options = {
      client_id: this.paramService.getClientId(),
      mode: this.paramService.getMoxtraMode(),
      access_token: this.accessService.getToken(),
      sdk_version: 4,
      invalid_token: (result) => {
        alert('Invalid token for session_id: ' + result.session_id);
      }
    };

    Moxtra.init(in_options);

    const options = {
      iframe: true,
      tagid4iframe: 'agentUiViewPort',
      iframewidth: '100%',
      iframeheight: '600px',
      unique_id: '',
      autostart_meet: true,
      autostart_note: true,
      access_token: this.accessService.getToken(),
      extension: { 'show_dialogs': { 'meet_invite': false, 'member_invite': false } },
      start_timeline: (event: any) => {
        console.log('Timeline started session Id: ' + event.session_id + ' binder id: ' + event.binder_id);
      },
      view_binder: (event: any) => {
        console.log('Binder switched session Id: ' + event.session_id + ' binder id: ' + event.binder_id);
        const binderID = this.paramService.setBinder(_.get(event, 'binder_id'));
        const binderUrl = `${this.paramService.getBaseUrl()}${binderID}`;
        const binderHeader = new HttpHeaders()
          .set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.accessService.getToken());
        this.http.get(binderUrl, { headers: binderHeader }).subscribe((data: any) => {
          const unique_id = this.paramService.setCustUniqueId(_.get(data.data.users[0].user, 'unique_id'));
          options.unique_id = _.map(data.data.users, (user) => {
            return user.user.unique_id;
          });
          console.log(options.unique_id);
        }, error => {
          console.log(error);
        });
      },
      start_meet: (event: any) => {
        console.log('Meet started session key: ' + event.session_key + ' session id: ' + event.session_id);
      },
      request_view_binder: (event: any) => {
      },
      invite_meet: (event: any) => {
        console.log('NEW INVITE MODAL TRIGGERED');
        this.bsModalCallInvite = this.modalService.show(CallInviteModalComponent);
        this.sessionService.setSessionKey(event.session_key);
        // this.bsModalRef = this.modalService.show(SignInModalComponent);
      },
      end_meet: (event: any) => {
        console.log('Meet end event');
        this.bsModalRef.hide();
      },
      save_meet: (event: any) => {
        console.log('Meet saved on binder: ' + event.binder_id);
      },
      start_note: (event: any) => {
        console.log('session key: ' + event.session_key + ' session id: ' + event.session_id);
      },
      save_note: (event: any) => {
        console.log('Note saved on binder: ' + event.destination_binder_id);
      },
      cancel_note: (event: any) => {
        console.log('Note cancelled');
      },
      error: (event: any) => {
        alert('Timeline error code: ' + event.error_code + ' error message: ' + event.error_message);
      }
    };
    Moxtra.timeline(options);
  }

}
