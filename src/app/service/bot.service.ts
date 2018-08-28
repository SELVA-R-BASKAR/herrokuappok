
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { MoxtraParamService } from './moxtra-param.service';
import { AccessTokenService } from './access-token.service';
@Injectable()

export class BotService {

  private message: string;

  constructor(
    private http: HttpClient, 
    private paramService: MoxtraParamService,
    private accessTokenService: AccessTokenService 
  ) { }

  callBot(action: string, fname: string, binder_id: string) {

    console.log('Service initiated');
    if (action == null || fname == null || binder_id == null) {

      console.log('some fields missing');
    } else {

      if (action.indexOf('started a conversation') !== -1) {
        
        this.message = 'Hi ' + fname + ', Welcome to OmniBank Support. How can i help you?';
        console.log('Welcome to OmniBank Support. How can i help you?');
      } else if (action.indexOf('join this conversation') !== -1) {
        
        this.message = 'We have connected our bank representative';
        console.log('We have connected our bank representative');
      } else {
        if (action.indexOf(':')) {
          
          action = action.split(":")[1];
          console.log(action);
        }

        const google_bot_url = 'https://api.api.ai/v1/query';
        const myheader = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer 0bb20e1146ed44c8b98fd1750d50c16d');
        const jsonBody = {
          'query': action,
          'lang': 'en',
          'sessionId': '1234567890'
        };

        this.http.post(google_bot_url, jsonBody, { headers: myheader }).subscribe(data => {
          this.message = data['result']['speech'];
          console.log(data);
        }, error => {
          console.log(error);
        });
      }
    }


    const timestamp = Math.floor(Date.now());
    let botAccessToken;
    // tslint:disable-next-line:max-line-length
    const url = `${this.paramService.getBaseUrl()}oauth/token?client_id=${this.paramService.getClientId()}&client_secret=${this.paramService.getClientSecret()}&grant_type=http://www.moxtra.com/auth_uniqueid&uniqueid=VirtualAssist&timestamp=${timestamp}&orgid=${this.paramService.getOrgId()}`;
    this.http.get(url).subscribe((data) => {
      botAccessToken = data['access_token'];
      // tslint:disable-next-line:no-shadowed-variable
      this.accessTokenService.setBotAccessToken(botAccessToken);
      const url2 = `${this.paramService.getBaseUrl()}v1/${binder_id}/comments?access_token=${botAccessToken}`;
      const jsonBody2 = {
        'text': this.message
      };
      // tslint:disable-next-line:no-shadowed-variable
      const moxtraHead = new HttpHeaders()
        .set('Content-Type', 'application/json');
      // tslint:disable-next-line:no-shadowed-variable
      this.http.post(url2, jsonBody2, { headers: moxtraHead }).subscribe(data => {
      }, err => {
        console.log(err);
      });
      
    }, (error) => {
      console.log(error);
     });
  }
}




