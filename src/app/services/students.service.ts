import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Student } from '../interfaces/student.interface';

@Injectable()
export class StudentsService {

  constructor(private http: Http) { }

  // Get all Students
  getAllStudents(): Promise<Student[]> {
        return this.http.get('/api/student')
                        .toPromise()
                        .then(res => res.json() as Student[])
                        .catch(this.handleError);
  }

  //Get a Student by name
  getStudent(name: string): Promise<Student> {
        return this.http.get(`/api/student/${name}`)
                        .toPromise()
                        .then(res => res.json() as Student)
                        .catch(this.handleError);
  }

  getStudentByID(_id: string): Promise<Student> {
        return this.http.get(`/api/student/byid/${_id}`)
                        .toPromise()
                        .then(res => res.json() as Student)
                        .catch(this.handleError);
  }

  // Add new Student
  createStudent(newStudent: Student): Promise<Student> {
        return this.http.post('/api/student', newStudent)
                        .toPromise()
                        .then(res => res.json() as Student)
                        .catch(this.handleError);
  }

  // Update a Student
  updateStudent (putStudent: Student): Promise<Student> {
        return this.http.put(`/api/student/` + putStudent._id, putStudent)
                        .toPromise()
                        .then(res => res.json() as Student)
                        .catch(this.handleError);
    }

  // Delete a Student
  deleteStudent (delStudentId: Number): Promise<Number> {
        return this.http.delete(`/api/student/` + delStudentId)
                        .toPromise()
                        .then(res => res.json() as Number)
                        .catch(this.handleError);
    }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
