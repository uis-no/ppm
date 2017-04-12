import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//import { MarkdownModule } from 'angular2-markdown';
import { FileUploadModule } from 'ng2-file-upload';

import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth.service';


import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';

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
    redirectTo: 'app-homepage',
    pathMatch: 'full'
  },
  {
    path: 'projects',

    component: ProjectsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'app-homepage',
    component: HomepageComponent, 
  },
  {
    path: 'new-project',
    component: AddProjectComponent, canActivate: [AuthGuard]
  },
  {
    path: 'projects/project-details/:id',
    component: ProjectDetailsComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
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

  providers: [EmployeesService, ProjectsService, AUTH_PROVIDERS, AuthGuard, Auth],

  bootstrap: [AppComponent]
})
export class AppModule { }
