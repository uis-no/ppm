import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects-pending',
  templateUrl: './projects-pending.component.html',
  styleUrls: ['./projects-pending.component.css'],
  providers: [ProjectsService]
})
export class ProjectsPendingComponent implements OnInit {
  projects: Project[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getUnreviewedProjects().then((projects: Project[]) => {
      this.projects = projects.map((project) => {
        return project;
      });
    });
  }

}
