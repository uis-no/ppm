import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { Project } from '../interfaces/project.interface';

@Injectable()
export class ProjectsService {

  constructor(private http: Http) { }

  notifyExaminer(id:number) {
        return this.http.get(`/api/projects/notify/${id}`)
                        .toPromise()
                        .then()
                        .catch(this.handleError);
  }

  // Get all projects
  getAllProjects(): Promise<Project[]> {
        return this.http.get('/api/projects')
                        .toPromise()
                        .then(res => res.json() as Project[])
                        .catch(this.handleError);
  }

  getMyProject(): Promise<Project> {
    return this.http.get('/api/my_project')
                    .toPromise()
                    .then(res => res.json() as Project)
                    .catch(this.handleError);
  }

//TODO: add observables to accommodate for many requests
  getUnreviewedProjects(): Promise<Project[]> {
          return this.http.get('/api/projects/unreviewed')
                          .toPromise()
                          .then(res => res.json() as Project[])
                          .catch(this.handleError);
  }

  //Get a project by id
  // TODO: find out how to cast objectid to string or number
  getProject(id:number): Promise<Project> {
        return this.http.get(`/api/projects/${id}`)
                        .toPromise()
                        .then(res => res.json() as Project)
                        .catch(this.handleError);
  }

  // Add new Project
  createProject(newProject: Project): Promise<Project> {
        return this.http.post('/api/projects', newProject)
                        .toPromise()
                        .then(res => res.json() as Project)
                        .catch(this.handleError);
  }

   // Update a project
    updateProject (putProject: Project): Promise<Project> {
        return this.http.put(`/api/projects/` + putProject._id, putProject)
                        .toPromise()
                        .then(res => res.json() as Project)
                        .catch(this.handleError);
    }

    // Delete a project
    deleteProject (delProjectId: Number): Promise<Number> {
        return this.http.delete(`/api/projects/` + delProjectId)
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
