import { Component } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.interface';

@Component({
  selector: 'new-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent{

  submitted: boolean = false;

  project: Project = {
    course: '',
    title: '',
    description: '',
    proposer: [],
    approved: false,
    responsible: [],
    advisor: [],
    examiner: [],
    student: [],
//    time_limits: []
  };

  constructor(private projectsService: ProjectsService) { }
  
  createProject(project: Project) {
    this.projectsService.createProject(project).then(() => {
      console.log("project" + project);
      console.log("this-project" + this.project);
      this.submitted = true;
    });
  }
}
