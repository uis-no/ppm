import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../interfaces/project.interface';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { MarkdownService } from '../services/markdown.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'project-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService, MarkdownService]
})
export class ProjectsComponent implements OnInit {
  // instantiate posts to an empty object
  projects: Project[];
  selectedProject: Project;
  tabState = 0;
  tabTitle= 'All';
  isCollapsed: boolean = true;

  constructor(private projectsService: ProjectsService, private md: MarkdownService) { }

  ngOnInit() {
    this.projectsService
      .getAllProjects()
      .then((projects: Project[]) => {
        this.projects = projects.map((project) => {
          return project;
        });
      });
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  renderTabState(tabState) {
    if (tabState == 0) {
      this.tabTitle = 'pending';
    } else if (tabState == 1) {
      this.tabTitle = 'unassigned';
    } else if (tabState == 2) {
      this.tabTitle = 'assigned';
    } else if (tabState == 3) {
      this.tabTitle = 'rejected';
    } else {
      this.tabTitle = 'All';
    }
  }

  toggleCollapse(id) {
    //var d = document.getElementById('project' + id);
    //d.collapse();
  }

  spInitSSO(binding) {
    window.location.href = '/sso/spinitsso-' + (binding === 0 ? 'redirect' : 'post');
  }
}
