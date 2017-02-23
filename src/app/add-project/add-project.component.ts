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
    title: '',
    advisors: '',
    proposer: '',
    important_courses: '',
    background: '',
    motivation: '',
    methods: '',
    objectives: '',
    students_assigned: ''
  };

  constructor(private projectsService: ProjectsService) { }
  
  createProject(project: Project) {
    this.projectsService.createProject(project).then(() => {
      this.submitted = true;
    });
  }
}
