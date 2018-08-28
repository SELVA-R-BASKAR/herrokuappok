import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AgentUiModalComponent } from '../agent-ui-modal/agent-ui-modal.component';
import { AgentSessionService } from '../../../service/agent-session.service';
import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { AccessTokenService } from '../../../service/access-token.service';

import { get } from 'lodash-es';

const _ = { get };

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private agentSessionService: AgentSessionService,
    private http: HttpClient,
    private paramService: MoxtraParamService,
    private accessService: AccessTokenService,
  ) { }

  ngOnInit() {
  }

  onAgentButtonClicked() {
    this.bsModalRef.hide();
    const timestamp = new Date().getTime();
    // tslint:disable-next-line:max-line-length
    const oauth_url = `${this.paramService.getBaseUrl()}v1/oauth/token?client_id=${this.paramService.getClientId()}&client_secret=${this.paramService.getClientSecret()}&grant_type=http://www.moxtra.com/auth_uniqueid&uniqueid=${this.paramService.getLoanAgent()}&timestamp=${timestamp}&orgid=${this.paramService.getOrgId()}`;
    const myheader = new HttpHeaders()
    .set('Content-Type', 'application/json');
    this.http.get(oauth_url, { headers: myheader }).subscribe((data: any) => {
      const access_token = this.accessService.setToken(_.get(data, 'access_token'));
      this.bsModalRef = this.modalService.show(AgentUiModalComponent, {class: 'modal-lg'});
      this.agentSessionService.setValidSession(true);
      // this.startUserChats();
    }, error => {
      console.log(error);
    });
  }
}
