import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MailService {

  constructor(private http: Http) {}

  sendMail(mail: String, subject: String, body: String): Promise<any> {
    return this.http.post('/api/sendMail', {mail: mail, subject: subject, bodyText: body})
                    .toPromise()
                    .then(res => res.json() as any)
                    .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
