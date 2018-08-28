import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AccessTokenService } from '../../../service/access-token.service';
import { MoxtraParamService } from '../../../service/moxtra-param.service';
import { CallInviteModalComponent } from '../call-invite-modal/call-invite-modal.component';
import { AddContactService } from '../../../service/add-contacts.service';

@Component({
  selector: 'app-add-contacts-modal',
  templateUrl: './add-contacts-modal.component.html',
  styleUrls: ['./add-contacts-modal.component.css']
})
export class AddContactsModalComponent implements OnInit {
  // @ViewChild('f') contactsAddForm: NgForm;
  dropDownContacts: string[];
  addedContacts: object[] = [];
  add_unique_id;
  add_id;
  first_name;
  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private modalService: BsModalService,
    private accessService: AccessTokenService,
    private paramService: MoxtraParamService,
    private addContactService: AddContactService
) {

  }

  ngOnInit() {
    
  }

  onDropDownClicked() {
    this.dropDownContacts = this.addContactService.getDropDownList();
    console.log('ON DROP DOWN CLICKED:');
    console.log(this.dropDownContacts);
  }

  onAddClicked() {
       console.log('ON ADD BUTTON CLICKED:');
       console.log(this.addedContacts);
    // console.log(this.contactsAddForm);
    // console.log(this.contactsAddForm.value.first_name);
    this.bsModalRef.hide();
    this.addContactService.addContact(this.addedContacts);
  }

  onBackClicked() {
    this.bsModalRef.hide();
  }

  changeModel(event, addContact, i) {
    this.add_unique_id = addContact.unique_id;
    this.add_id = addContact.id;
    this.first_name = addContact.first_name;
    var target = event.target || event.srcElement || event.currentTarget;
    if (target.checked === true) {
      this.addedContacts.push({ 'unique_id': this.add_unique_id, 'id': this.add_id, 'first_name': this.first_name });
      console.log('ON CHECKBOX CHECKED:');
      console.log(this.addedContacts);
      this.addContactService.setChecksCount();
      console.log('checked'+this.addContactService.getChecksCount());
    }
    else {
      let i = this.addedContacts.indexOf(target.checked);
      this.addedContacts.splice(i, 1);
      console.log('ON CHECKBOX UNCHECKED:');
      console.log(this.addedContacts);
      this.addContactService.setUnChecksCount();
      console.log('unchecked'+this.addContactService.getUnChecksCount());


    }
    
  }
}




