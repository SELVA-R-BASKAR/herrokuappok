import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccessTokenService } from './access-token.service';
import { MoxtraParamService } from './moxtra-param.service';
@Injectable()
export class MoxtraBotService {

  constructor(
    private http: HttpClient,
    private accessService: AccessTokenService,
    private configService: MoxtraParamService
  ) { }
  getBotId() {
    return this.http.get(`${this.configService.getBaseUrl()}v1/me/orgs/${this.configService.getOrgId()}/bots`, {
      params: {
        'access_token': this.accessService.getToken()
      }
    });
  }
}
