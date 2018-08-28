import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MoxtraParamService } from '../../service/moxtra-param.service';
import { AccessTokenService } from '../../service/access-token.service';
import { AgentUiModalComponent } from './agent-ui-modal/agent-ui-modal.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { AgentSessionService } from '../../service/agent-session.service';

import { get, map, isNil } from 'lodash-es';
const _ = { get, map, isNil };

@Component({
  selector: 'app-agent-ui',
  templateUrl: './agent-ui.component.html',
  styleUrls: ['./agent-ui.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AgentUIComponent implements OnInit, OnDestroy {

  public BsModalRef1: BsModalRef;

  ngOnDestroy(): void {
  }

  constructor(
    private http: HttpClient,
    private paramService: MoxtraParamService,
    private accessService: AccessTokenService,
    private modalService: BsModalService,
    private agentSessionService: AgentSessionService,
  ) { }

  ngOnInit() {
  }

  onAgentUIButtonClicked() {
    if (_.isNil(this.BsModalRef1)) {
      if (!this.agentSessionService.getValidSession()) {
        this.BsModalRef1 = this.modalService.show(SignInModalComponent);
      } else {
        this.BsModalRef1 = this.modalService.show(AgentUiModalComponent, {class: 'modal-lg'});
      }
    } else {
      this.BsModalRef1.hide();
      this.BsModalRef1 = null;
    }
  }
 }


