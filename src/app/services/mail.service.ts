import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable
export class MailService {

  constructor(private http: HTTP) {}

  sendMail() {
    return this.http.get('/api/sendMail')
                    .toPromise()
                    .then(res => res.json())
                    .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
}
