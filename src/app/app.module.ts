import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';

import { ProjectsService } from './projects.service';
import { AddProjectComponent } from './add-project/add-project.component';
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
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
