import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoanStatusService {

  constructor( private http: HttpClient, ) { }

  getLoanStatus(clientLoanNumber: string) {
    const url = `http://10.167.12.166/NetOxygenAPIGateway/api/GetLoanStatus`;
    const data = {
      'ClientLoanNumber': clientLoanNumber,
      'clientIdentifier': 'wgs',
      'environmentIdentifier': 'ZPITG'
    };

    // const moxtraHead = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    // });
    return this.http.post(url,data);


  }

}
