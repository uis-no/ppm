import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//import { MarkdownModule } from 'angular2-markdown';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';

import { EmployeesService } from './services/employee.service';
import { ProjectsService } from './services/projects.service';
import { AddProjectComponent } from './add-project/add-project-employee.component';

// Directive
//import { MarkdownDirective } from './markdown.directive';

// Controllers
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'new-project',
    component: AddProjectComponent
  },
  {
    path: 'projects/project-details/:id',
    component: ProjectDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [EmployeesService, ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
