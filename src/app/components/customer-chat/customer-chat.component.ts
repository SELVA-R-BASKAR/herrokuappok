import { Component, OnInit, OnDestroy, HostListener, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { isNumber } from 'util';
import { ChatService } from '../../service/chat.service';
import { MoxtraParamService } from '../../service/moxtra-param.service';
import { SessionService } from '../../service/session.service';
import { AccessTokenService } from '../../service/access-token.service';
import { BotService } from '../../service/bot.service';
import { AgentCallService } from '../../service/agent-call.service';
import { Subscription } from 'rxjs/Subscription';
import { LoanService } from '../../service/loan.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { AuthenticateModalComponent } from './authenticate-modal/authenticate-modal.component';
// Importing features from lodash selectively
import { get, find, includes, has } from 'lodash-es';
import { MoxtraBotService } from '../../service/moxtra-bot.service';

// Constructing the undersocore object
const _ = { get, find, includes, has };

@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.css'],
})
export class CustomerChatComponent implements OnInit {
  @ViewChild('templateAlertModal') alertModal: TemplateRef<any>;
  option = '';
  SecondResponse = true;
  loopAgent = false;
  chatClicked = false;
  showChat = false;
  connectState = true;
  fabClass = 'button-fab-primary show-bottom';
  iconClass = 'glyphicon glyphicon-comment';
  firstName: string;
  lastName: string;
  clientID: string;
  clientLoanNum: string;
  countryCode: string;
  phone: number;
  email: string;
  ssnNum: string;
  zip: string;
  flag = {
    fname: false,
    lname: false,
    phone: false,
    email: false,
  };
  showModal: boolean = false;
  muteDialogFlow: boolean = false;
  modalRef: BsModalRef;
  constructor(
    private chatService: ChatService,
    private configService: MoxtraParamService,
    private sessionService: SessionService,
    private accessService: AccessTokenService,
    private botService: BotService,
    private http: HttpClient,
    private agentCallService: AgentCallService,
    private Loan: LoanService,
    private modalService: BsModalService,
    private moxtraBotService: MoxtraBotService
  ) { }

  ngOnInit() {
    this.countryCode = '+91';
    this.firstName = '';
    this.lastName = '';
    this.clientID = '123456ddg';
    this.clientLoanNum = '123456ddg';
    this.phone = 9789725148;
    this.email = 'deepanshu.dixit1@wipro.com';
    this.ssnNum = '123456ddg';
    this.zip = '632014';
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("refresh");
    console.log(event);
    const url = `${this.configService.getBaseUrl()}v1/${this.configService.getBinder()}`;
    const binderHeader = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.accessService.getToken());
    this.http.delete(url, { headers: binderHeader }).subscribe((data: any) => {
      console.log(`terminated:`);
      console.log(data);
    }, err => { console.log(err); });
    // Do more processing...
    event.returnValue = false;
  }

  onChatButtonClick($event: Event) {
    this.chatClicked = !this.chatClicked;
    if (this.chatClicked) {
      this.fabClass = 'button-fab-danger show-bottom';
      this.iconClass = 'glyphicon glyphicon-remove';
      if (this.connectState)
        this.connect();
    } else {
      this.fabClass = 'button-fab-primary show-bottom';
      this.iconClass = 'glyphicon glyphicon-comment';
    }
  }

  validate(inp, val): void {
    switch (inp) {
      case 'fname':
        if (val === '') {
          this.flag.fname = true;
        } else {
          this.flag.fname = false;
        }
        break;
      case 'lname':
        if (val === '') {
          this.flag.lname = true;
        } else {
          this.flag.lname = false;
        }
        break;
      case 'phone':
        if (val === '' || isNaN(val) || val.length !== 10) {
          this.flag.phone = true;
        } else {
          this.flag.phone = false;
        }
        break;
      case 'email':
        // tslint:disable-next-line:max-line-length
        const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (val === '' || val.search(emailTest) === -1) {
          this.flag.email = true;
        } else {
          this.flag.email = false;
        }
        break;
    }
  }

  connect(): void {
    this.showChat = true;
    this.connectState = false;
    this.firstName = 'NAWGS78';
    //this.firstName = 'NAWGS' + this.configService.getRandomNumber();
    this.configService.setCustUniqueId(this.firstName);
    /*     the code below is used for user Input form
        if(this.firstName === '') {
        this.firstName = 'NAWGS'+this.configService.getRandomNumber();
        this.configService.setCustUniqueId(this.firstName);
        }
        else{
        this.configService.setCustUniqueId(this.firstName + this.ssnNum.substr(-4));
        }
        if (!this.flag.lname && !this.flag.phone && !this.flag.email) { */
    if (this.showChat) {
      console.log(' UniqueIdGenerated ' + this.firstName);
      this.chatService.createUser(this.firstName, this.lastName)
        .subscribe((response: any) => {

          this.accessService.setToken(response.access_token);
          //bot
          this.moxtraBotService.getBotId().subscribe((data) => {
            console.log(data);
            this.configService.setbot_userId(_.get(data, ['data', 'bots', '0', 'user', 'id']));
            console.log('the bot id is ' + this.configService.getbot_userId());
            const http_body = {
              'user': {
                'user_id': this.configService.getbot_userId()
              },
              'message': {
                'text': 'hi'
              }
            };
            this.http.post(`${this.configService.getBaseUrl()}v1/me/messages`, http_body, {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
              params: new HttpParams().set('access_token', this.accessService.getToken())
            }).subscribe(res => {
               console.log(res);
               this.configService.setBinder(_.get(res, ['data', 'binder_id']));
          /*   Delete Hi automatically
             this.chatService.deleteComment(_.get(res,['data','result','comment_id']))
               .subscribe((res) => {
                 console.log(res);
               },(err) => {
             console.log(err);
               });
              console.log('the binder id is ' + this.configService.getBinder()); */
              this.hiddenTimeline();
              this.loadChat();

            }, (err) => {
              console.log(err);
            });
          }, err => {
            console.log(err);
          });
        }, error => {
          this.chatClicked = false;
          this.iconClass = 'glyphicon glyphicon-comment';
          this.fabClass = 'button-fab-primary show-bottom';
          alert('There was an error in creating the error');
          console.log(error);
        });
    }
  }

/* The below function is used to select an option through buttons 
   menuOptions(option) {
     console.log(option);
      const http_body = {
        'message': {
          'text': `${option}`
        }
      };
      this.http.post(`${this.configService.getBaseUrl()}v1/${this.configService.getBinder()}/messages`, http_body, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        params: new HttpParams().set('access_token', this.accessService.getToken())
      }).subscribe(res => {
         console.log(res);

      }, (err) => {
        console.log(err);
      });
} */

  
// This function will load the hidden timeline or the history of chats for the created user.
hiddenTimeline() {
    const in_options = {
      client_id: this.configService.getClientId(),
      mode: this.configService.getMoxtraMode(),
      sdk_version: 4,
      access_token: this.accessService.getToken(),
      invalid_token: (result) => {
        console.log('Error Occured', result);
      }
    };
    Moxtra.init(in_options);
    const timeline_options = {
      publish_feed: (event: any) => {
      },
      receive_feed: (event: any) => {
      },
      all_binders: (event: any) => {
      },
      update_binders: (event: any) => {
      },
      start_timeline: (event: any) => {
      },
      view_binder: (event: any) => {
      },
      create_binder: (event: any) => {
      },
      delete_binder: (event: any) => {
      },
      remove_binder_user: (event: any) => {
      },
      request_meet: (event: any) => {
      },
      invite_meet: (event: any) => {
      },
      start_meet: (event: any) => {
      },
      end_meet: (event: any) => {
      },
      exit_meet: (event: any) => {
      },
      request_view_member: (event: any) => {
      },
      save_meet: (event: any) => {
      },
      start_note: (event: any) => {
      },
      save_note: (event: any) => {
      },
      cancel_note: (event: any) => {
      },
      added_binders: (event: any) => {
        console.log(event.data[0]);
        if (event.data[0].meet['session_key'] !== undefined) {

          // Setting the Session Key
          this.sessionService.setSessionKey(
            _.get(event.data[0].meet, 'session_key')
          );
          this.agentCallService.changeSessionKey(event.data[0].meet.session_key);
          const host = _.get(event.data[0], 'message');
          console.log(host);
          console.log(host.length);
          const audio = new Audio('../../../assets/audio/inc_call.mp3');
          console.log(`Host: ${this.firstName} ${this.lastName}`);
          console.log((`Host: ${this.firstName} ${this.lastName}`).length);
          audio.play();
          if (host !== `Host: ${this.firstName}${this.lastName}`) {
            console.log('hosted');
            this.modalRef = this.modalService.show(this.alertModal);
          } else {
            audio.pause();

          }
        }
      },
      error: (event: any) => {
      },
    };
    Moxtra.timelineData(timeline_options);
  }

  // Agent in call response
  callInResponse(response) {
    this.modalRef.hide();
    if (response === 'accept') {
      this.agentCallService.changeIncomingCallStatus(true);
    } else {
      this.agentCallService.changeIncomingCallStatus(false);
    }

  }
  // This function loads the chat.
  loadChat() {
    const in_options = {
      client_id: this.configService.getClientId(),
      mode: this.configService.getMoxtraMode(),
      sdk_version: 4,
      access_token: this.accessService.getToken(),
      invalid_token: (result) => {
        alert('Invalid token for session_i ' + result.session_id);
      },
    };

    Moxtra.init(in_options);
    const options = {
      unique_id: this.configService.getAgentUniqueId(),
      binder_id: this.configService.getBinder(),
      iframe: true,
      iframewidth: '100%',
      iframeheight: '94%',
      tagid4iframe: 'chatViewPort',
      autostart_note: true,
      extension: {
        'show_dialogs': {
          'member_invite': false
        },
        'show_binder_options': true
      },
      request_note: (event: any) => {
      },
      start_chat: (event: any) => {
        this.configService.setBinder(event.binder_id);
        console.log('binder id is ' + event.binder_id);
      },
      request_view_member: (event: any) => {
      },
      invite_member: (event: any) => {
      },
      publish_feed: (event: any) => {
        console.log(event);
        console.log('inside publish feed ');
      },
      receive_feed: (event: any) => {
        const msg = _.get(event, "message");
        console.log('inside receive feed');
        console.log(event);
        console.log(event.message);
        this.option = event.message.split(":")[1];
        console.log(this.option);
        this.option = this.option.split(" ")[2];
        console.log(this.option);
        if (_.includes(msg, 'loop in our agent')) {
          // Moxtra.removeWidget(options.tagid4iframe);
          options.unique_id = this.configService.getLoanAgent();
          const body =
            {
              "users": [
                {
                  "user": {
                    "unique_id": "agent"
                  }
                }
              ]
            }
          console.log('Binder switched session Id: ' + event.session_id + ' binder id: ' + event.binder_id);
          const binderID = this.configService.setBinder(_.get(event, 'binder_id'));
          const binderUrl = `${this.configService.getBaseUrl()}v1/${event.binder_id}/addorguser`;
          const binderHeader = new HttpHeaders()
            .set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.accessService.getToken());
          this.http.post(binderUrl, body, { headers: binderHeader }).subscribe((data: any) => {
            console.log(data);
          }, err => { console.log(err); });
          this.muteDialogFlow = false;
        }
      },
      request_meet: (event: any) => {
      },
      error: (event: any) => {
      },
    };
    Moxtra.chatView(options);
  }

  public openLoanModal() {
    this.modalRef = this.modalService.show(ModalFormComponent);
  }
  public openAuthenticateModal() {
    this.modalRef = this.modalService.show(AuthenticateModalComponent);
  }
}
