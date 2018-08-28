import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BorrowerAuthService {

  constructor(private http: HttpClient) { }

  authenticateBorrower(clientLoanNumber: string, firstName: string, lastName: string, ssn: string, email: string  ) {

    console.log(clientLoanNumber,firstName,lastName,ssn,email);
    const url = `http://10.167.12.166/NetOxygenAPIGateway/api/GetBorrowerAuthentication`;
    const ssnLast4Digit = ssn.substr(-4);
    const data = {
      'ClientLoanNumber': clientLoanNumber,
      'FirstName': firstName,
      'LastName': lastName,
      'Last4DigitsOfSSN': ssnLast4Digit,
      'Email': email,
      'clientIdentifier': 'wgs',
      'environmentIdentifier': 'ZPITG'
    };

    return this.http.post(url, data);
  }

}
