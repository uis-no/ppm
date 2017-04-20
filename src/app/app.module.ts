import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth.service';


import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';


import { MarkdownDirective } from './directives/markdown.directive';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ApplyComponent } from './project-details/apply.component';

// Services
import { LoginService } from './services/passport.service';
import { EmployeesService } from './services/employee.service';
import { ProjectsService } from './services/projects.service';
import { StudentsService } from './services/students.service';
import { FileService } from './services/file.service';


import { AddProjectComponent } from './add-project/add-project-employee.component';

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
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-homepage',
    component: HomepageComponent,
  },
  {
    path: 'app-homepage/project-details/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-project',
    component: AddProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/project-details/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    MarkdownDirective,
    ApplyComponent,
    MarkdownDirective

  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [EmployeesService, ProjectsService, StudentsService, AUTH_PROVIDERS, AuthGuard, Auth, LoginService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
