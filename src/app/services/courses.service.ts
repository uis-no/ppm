import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Course } from '../interfaces/course.interface';

@Injectable()
export class CoursesService {

  constructor(private http: Http) { }

  // Get all courses
  getAllCourses(): Promise<Course[]> {
        return this.http.get('/api/course')
                        .toPromise()
                        .then(res => res.json() as Course[])
                        .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
