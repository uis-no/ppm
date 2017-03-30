import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../interfaces/project.interface';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import 'rxjs/add/operator/map';
//require('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/passport-saml');

@Component({
  selector: 'project-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {
  // instantiate posts to an empty object
  projects: Project[];
  selectedProject: Project;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService
      .getAllProjects()
      .then((projects: Project[]) => {
        this.projects = projects.map((project) => {
          console.log(project);
          return project;
        });
      });
  }

  private getIndexOfProject = (projectId : Number) => {
    return this.projects.findIndex((project) => {
      return project._id === projectId;
    });
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  createNewProject() {
    var project: Project = {
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
    this.selectProject(project);
  }

  deleteProject = (projectId: Number) => {
    var idx = this.getIndexOfProject(projectId);
    if (idx !== -1) {
      this.projects.splice(idx, 1);
      this.selectProject(null);
    }
    return this.projects;
  }

  addProject = (project: Project) => {
    this.projects.push(project);
    this.selectProject(project);
    return this.projects;
  }

  updateProject = (project: Project) => {
    var idx = this.getIndexOfProject(project._id);
    if (idx !== -1) {
      this.projects[idx] = project;
      this.selectProject(project);
    }
    return this.projects;
  }

  spInitSSO(binding) {
    window.location.href = '/sso/spinitsso-' + (binding === 0 ? 'redirect' : 'post');
  }
}
