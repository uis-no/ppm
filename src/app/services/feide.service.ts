import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Project } from '../interfaces/project.interface';

@Injectable()
export class FeideService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getUser(): Promise<Project[]> {
    return this.http.get('/api/projects')
                .toPromise()
                .then(res => res.json() as Project[])
                .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
