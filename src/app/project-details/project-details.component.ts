import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.interface';

@Component({
  selector: 'project-details-component',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ProjectsService]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  project: Project;
  private sub: any;
  id: number;

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) { }

  // Reads the url and grabs the id and makes a call to the service to get the project based on id
  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>  {
      this.id = Number.parseInt(params['id']);
      this.projectsService.getProject(this.id).then((project: Project) => {
        this.project = project;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
