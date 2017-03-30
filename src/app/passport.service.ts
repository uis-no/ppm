import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  // Check if authenticated, silly way of doing this, but it works
  getAuth() {
    return this.http.get('/isAuthenticated')
                  .toPromise()
                  .then(res => res.json())
                  .catch(this.handleError);
  }

  // Get all posts from the API
  getUser() {
    return this.http.get('/user')
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError);

  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
