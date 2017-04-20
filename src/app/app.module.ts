import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';
import { MarkdownDirective } from './directives/markdown.directive';

import { AppComponent } from './app.component';

// Services
import { LoginService } from './services/passport.service';
import { EmployeesService } from './services/employee.service';
import { ProjectsService } from './services/projects.service';
import { FileService } from './services/file.service';

import { AddProjectComponent } from './add-project/add-project-employee.component';

// Controllers
import { ProjectsComponent } from './projects/projects.component';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth.service';

import { HomepageComponent } from './homepage/homepage.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsPendingComponent } from './projects-pending/projects-pending.component';

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
    component: HomepageComponent
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
    ProjectsPendingComponent,
    MarkdownDirective
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [EmployeesService, ProjectsService, LoginService, FileService, AUTH_PROVIDERS, AuthGuard, Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
