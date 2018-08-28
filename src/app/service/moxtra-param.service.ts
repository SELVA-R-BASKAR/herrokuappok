import { Injectable } from '@angular/core';

@Injectable()
export class MoxtraParamService {

  private cust_uniqueId: string;
  private clientId = 'MzA4ZjAwMjc';
  private clientSecret = 'Mzg5MzM3N2N';
  private orgId = 'PZ2qwRzePbsHHG8jAVfSpXL';
  private agent_uniqueId = 'VirtualAssist';
  private loan_agent = 'agent';
  private moxtraMode = 'sandbox';
  private baseUrl = 'https://apisandbox.moxtra.com/';
  private clientVABinder_id: string;
  private bot_userId;
  constructor() { }

  getClientId() {
    return this.clientId;
  }

  getClientSecret() {
    return this.clientSecret;
  }

  getOrgId() {
    return this.orgId;
  }

  getCustUniqueId() {
    return this.cust_uniqueId;
  }

  setCustUniqueId(unique_id) {
    this.cust_uniqueId = unique_id;
    return this.cust_uniqueId;
  }

  getAgentUniqueId() {
    return this.agent_uniqueId;
  }

  getLoanAgent() {
    return this.loan_agent;
  }

  getMoxtraMode() {
    return this.moxtraMode;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
  getbot_userId() {
    return this.bot_userId;
  }

  setbot_userId(bot_userId) {
    this.bot_userId = bot_userId;
  }

  setBinder(binder_id) {
    this.clientVABinder_id = binder_id;
    return this.clientVABinder_id;
  }

  getBinder() {
    return this.clientVABinder_id;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
  }

}
