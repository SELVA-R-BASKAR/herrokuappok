import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AccessTokenService } from '../../../service/access-token.service';
import { AddContactsModalComponent } from '../add-contacts-modal/add-contacts-modal.component';
import { AddContactService } from '../../../service/add-contacts.service';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-call-invite-modal',
  templateUrl: './call-invite-modal.component.html',
  styleUrls: ['./call-invite-modal.component.css']
})
export class CallInviteModalComponent implements OnInit {
  addCount: number;
  select:boolean = true;
  sessionKey: string;
  uniqueId: string;
  normalId: string;
  orgId: string;
  @ViewChild(AddContactsModalComponent) child;
  inviteContacts: object;
  displayContacts: string[] = [];
  constructor(
    public bsModalRef: BsModalRef,
    public bsModalRef1: BsModalRef,
    private paramService: MoxtraParamService,
    private modalService: BsModalService,
    private http: HttpClient,
    private accessService: AccessTokenService,
    private addContactService: AddContactService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.inviteContacts = this.addContactService.getContact();
    this.displayContacts = this.addContactService.getDisplayContact();
    this.addContactService.getDropDownListWeb();
  }
  
  onContactClicked() {
    console.log("ON CONTACTS ICON CLICKED");
    this.bsModalRef1 = this.modalService.show(AddContactsModalComponent);
  }

  onInviteClicked() {
    console.log('ON INVITE CLICKED:');
    console.log(this.inviteContacts);
    console.log(this.sessionService.getSessionKey());
    this.addCount = this.addContactService.getAddCounts();
    console.log(`ADD COUNTS: ${this.addCount}`);
    for (var i = 0; i < this.addCount; i++) {
      for (var j = 0; j < this.inviteContacts[i].length; j++) {
        this.sessionKey = this.sessionService.getSessionKey();
        this.orgId = this.paramService.getOrgId();
        this.uniqueId = this.inviteContacts[i][j].unique_id;
        this.normalId = this.inviteContacts[i][j].id;
        this.addContactService.inviteMeet(this.sessionKey, this.uniqueId, this.normalId, this.orgId)
          .subscribe((data) => {
            console.log(data);
          }, (err) => {
            console.log(err);
          });
      }
    }
    this.bsModalRef.hide();
    this.addContactService.clearCount();
    this.addContactService.clearContact();
    this.addContactService.clearDisplayContact();
  }
}
