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
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsPendingComponent } from './projects-pending/projects-pending.component';

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
  providers: [EmployeesService, ProjectsService, LoginService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
