import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Employee } from '../interfaces/employee.interface';

@Injectable()
export class EmployeesService {

  constructor(private http: Http) { }

  // Get all Employees
  getAllEmployees(): Promise<Employee[]> {
        return this.http.get('/api/employee')
                        .toPromise()
                        .then(res => res.json() as Employee[])
                        .catch(this.handleError);
  }

  //Get a Employee by name
  getEmployee(name: string): Promise<Employee> {
        return this.http.get(`/api/employee/${name}`)
                        .toPromise()
                        .then(res => res.json() as Employee)
                        .catch(this.handleError);
  }

  // Add new Employee
  createEmployee(newEmployee: Employee): Promise<Employee> {
        return this.http.post('/api/employee', newEmployee)
                        .toPromise()
                        .then(res => res.json() as Employee)
                        .catch(this.handleError);
  }

  // Update a Employee
  updateEmployee (putEmployee: Employee): Promise<Employee> {
        return this.http.put(`/api/employee/` + putEmployee._id, putEmployee)
                        .toPromise()
                        .then(res => res.json() as Employee)
                        .catch(this.handleError);
    }

  // Delete a Employee
  deleteEmployee (delEmployeeId: Number): Promise<Number> {
        return this.http.delete(`/api/employee/` + delEmployeeId)
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
