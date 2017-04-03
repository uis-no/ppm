import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth.service';
import { ProjectsService } from './projects.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'app-homepage',
    pathMatch: 'full'
  },
  {
    path: 'projects',

    component: ProjectsComponent
  },
  {
    path: 'app-homepage',
    component: HomepageComponent
  },
  {
    path: 'new-project',
    component: AddProjectComponent, canActivate: [AuthGuard]
  },
  {
    path: 'projects/project-details/:id',
    component: ProjectDetailsComponent
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
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],

  providers: [ProjectsService, AUTH_PROVIDERS, AuthGuard, Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
