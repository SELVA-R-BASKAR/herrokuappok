import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AccessTokenService } from './access-token.service';
import { MoxtraParamService } from './moxtra-param.service';

@Injectable()
export class AddContactService {

    constructor(
        private http: HttpClient,
        private accessService: AccessTokenService,
        private paramService: MoxtraParamService
    ) { }

    contactChanged = new EventEmitter<object[]>();

    private contacts: object[] = [];
    private dropDown: object[] = [];
    private addCounts: number = 0;
    private displayContacts: string[] = [];
    checkCount: number = 0;
    unCheckCount: number = 0;
    totalCount: number = 0;
    dropDowncontacts: string[] = [];
    callStatus = false;

    setChecksCount() {
        this.checkCount = this.checkCount + 1;
    };
    
    setUnChecksCount() {
        this.unCheckCount = this.unCheckCount + 1;
    }
    
    getChecksCount() {
        return this.checkCount;
    }

    getUnChecksCount() {
        return this.unCheckCount;
    }

    addContact(contact: object) {
        console.log(contact);
        this.contacts.push(contact);
        console.log('CONTACTS');
        this.addCounts = this.addCounts + 1;
        console.log('addCounts' + this.addCounts);
        this.totalCount = this.checkCount - this.unCheckCount;
        for (var i = 0; i < this.totalCount; i++) {
            console.log('DISPLAY_COnTACTS');
            console.log(contact[i].first_name);
            this.displayContacts.push(contact[i].first_name);
            console.log(this.displayContacts);
        }
        this.totalCount = 0;
        this.checkCount = 0;
        this.unCheckCount = 0;
    }

    getContact() {
        return this.contacts;
    }

    getDisplayContact() {
        return this.displayContacts;
    }
    getAddCounts() {
        console.log('addCounts' + this.addCounts);
        return this.addCounts;
    }

    inviteMeet(sessionKey: string, uniqueId: string, normalId: string, orgId: string) {
        console.log(`session:${sessionKey},unique:${uniqueId},norm:${normalId},org:${orgId}`);
        const url = 'https://apisandbox.moxtra.com/v1/meets/inviteuser';
        const body = {
            "session_key": sessionKey,
            "users": [
                {
                    "user": {
                        "id": normalId
                    }
                },
                {
                    "user": {
                        "unique_id": uniqueId
                    }
                },
                {
                    "user": {

                        "org_id": orgId
                    }
                }

            ]

        };
        const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.accessService.getToken());
        return this.http.post(url, body, { headers: myheader });
    }

    getDropDownListWeb() {
        console.log('DROPDOWNLIST');
        const oauth_url = `https://apisandbox.moxtra.com/v1/me/orgs/${this.paramService.getOrgId()}/users`;
        //const oauth_url = `${this.paramService.getBaseUrl()}v1/me/contacts`;
        const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.accessService.getToken());
        this.http.get(oauth_url, { headers: myheader }).subscribe((data: any) => {
            console.log('access_token in CONTACTS:' + this.accessService.getToken());
            console.log(typeof data);
            console.log(data);
            // console.log(data.data.users[0].unique_id);
            this.dropDowncontacts = data.data.users as string[];
            console.log('Drop Down');
            console.log(this.dropDowncontacts);
        }, error => {
            console.log(error);
        });
    }

    getDropDownList() {
        return this.dropDowncontacts;
    }

    clearContact() {
        this.contacts = [];
    }

    clearDisplayContact() {
        this.displayContacts = [];
    }

    clearCount() {
        this.addCounts = 0;
    }

    setMeetStatus() {
        this.callStatus = !this.callStatus;
        console.log("value of call status"+this.callStatus)
    }
    getMeetStatus(){
        return this.callStatus;
    }
}
