import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MoxtraParamService } from './moxtra-param.service';
import { AccessTokenService } from './access-token.service';

@Injectable()
export class ChatService {

  

  constructor(
    private http: HttpClient,
    private configService: MoxtraParamService,
    private tokenService: AccessTokenService,
  ) { }

  // This function will create the chat.

  createUser(firstName: string, lastName: string) {
    const timestamp = new Date().getTime();
    console.log('timestamp'+timestamp);
    // tslint:disable-next-line:max-line-length
    const reqUrl = `${this.configService.getBaseUrl()}v1/oauth/token?client_id=${this.configService.getClientId()}&client_secret=${this.configService.getClientSecret()}&grant_type=http://www.moxtra.com/auth_uniqueid&uniqueid=${this.configService.getCustUniqueId()}&timestamp=${timestamp}&orgid=${this.configService.getOrgId()}&firstname=${firstName}&lastname=${lastName}`;
    // tslint:disable-next-line:max-line-length
    /*https://apisandbox.moxtra.com/oauth/token?client_id='+clientId+'&client_secret='+clientSecret+'&grant_type=http://www.moxtra.com/auth_uniqueid&uniqueid='+cust_uniqueId+'&timestamp='+timestamp+'&orgid='+orgId+'&firstname='+$('#txtFirstName').val()+'&lastname='+$('#txtLastName').val(),
    */
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      })
    };
    return this.http.post(reqUrl, {}, headerOptions);
  }

  addOrgUsers(event: any, userListStr: string) {
    const reqUrl = `${this.configService.getBaseUrl()}v1/${event.binder_id}/addorguser?access_token=${this.tokenService.getToken()}`;
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      })
    };
    return this.http.post(reqUrl, userListStr, headerOptions);
  }


  removeUser(event: any, removeBot: string) {
    const reqUrl = `${this.configService.getBaseUrl()}v1/${event.binder_id}/removeuser?access_token=${this.tokenService.getToken()}`;
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      })
    };
    return this.http.post(reqUrl, removeBot, headerOptions);
  }

  sendMoxtraMessage(message: string,access_token?: string){
    let moxtraUrl;
    if(access_token === undefined){
      
      moxtraUrl = `${this.configService.getBaseUrl()}v1/${this.configService.getBinder()}/comments?access_token=${this.tokenService.getToken()}`;
    }
    else{
      console.log('binder id is '+this.configService.getBinder());
      moxtraUrl = `${this.configService.getBaseUrl()}v1/${this.configService.getBinder()}
      /comments?access_token=${this.tokenService.getBotAccessToken()}`;
    }
    const moxtraData = {
      'text': message
    };
    const moxtraHead = {headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
    return this.http.post(moxtraUrl, moxtraData,moxtraHead);
  }
  }