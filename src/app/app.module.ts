import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


import { AppComponent } from './app.component';
import { AgentCallComponent } from './components/agent-call/agent-call.component';
import { AgentUIComponent } from './components/agent-ui/agent-ui.component';
import { CustomerChatComponent } from './components/customer-chat/customer-chat.component';
import { JoinMeetComponent } from './components/join-meet/join-meet.component';
import { ModalFormComponent } from './components/customer-chat/modal-form/modal-form.component';
import { AuthenticateModalComponent } from './components/customer-chat/authenticate-modal/authenticate-modal.component';

import { BotService } from './service/bot.service';
import { ChatService } from './service/chat.service';
import { AgentCallService } from './service/agent-call.service';
import { MoxtraParamService } from './service/moxtra-param.service';
import { SessionService } from './service/session.service';
import { AccessTokenService } from './service/access-token.service';
import { LoanService } from './service/loan.service';
import { LoanStatusService } from './service/loan-status.service';
import { BorrowerAuthService } from './service/borrower-auth.service';
import { SignInModalComponent } from './components/agent-ui/sign-in-modal/sign-in-modal.component';
import { AgentUiModalComponent } from './components/agent-ui/agent-ui-modal/agent-ui-modal.component';
import { AgentSessionService } from './service/agent-session.service';
import { CallModalContentComponent } from './components/agent-call/call-modal-content/call-modal-content.component';
import { CallInviteModalComponent } from './components/agent-call/call-invite-modal/call-invite-modal.component';
import { AddContactsModalComponent } from './components/agent-call/add-contacts-modal/add-contacts-modal.component';
import { AddContactService } from './service/add-contacts.service';
import { MoxtraBotService } from './service/moxtra-bot.service';

@NgModule({
  declarations: [
    AppComponent,
    AgentCallComponent,
    AgentUIComponent,
    CustomerChatComponent,
    JoinMeetComponent,
    ModalFormComponent,
    AuthenticateModalComponent,
    SignInModalComponent,
    AgentUiModalComponent,
    CallModalContentComponent,
    CallInviteModalComponent,
    AddContactsModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    BotService,
    ChatService,
    AgentCallService,
    MoxtraParamService,
    SessionService,
    AccessTokenService,
    LoanStatusService,
    BorrowerAuthService,
    LoanService,
    AgentSessionService,
    MoxtraBotService,
    AddContactService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalFormComponent,
    JoinMeetComponent,
    AuthenticateModalComponent,
    SignInModalComponent,
    AgentUiModalComponent,
    CallModalContentComponent,
    CallInviteModalComponent,
    AddContactsModalComponent
  ],
  exports: [AgentCallComponent, AgentUIComponent, CustomerChatComponent],
})
export class AppModule { }
