import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './posts.service';
import { TestfolderComponent } from './testfolder/testfolder.component';
import { DisplayProjectComponent } from './display-project/display-project.component';
import { DisplayAllProjectsComponent } from './display-all-projects/display-all-projects.component';
import { HomepageComponent } from './homepage/homepage.component';



const ROUTES = [
  {
    path: '',
    redirectTo: 'app-homepage',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: PostsComponent
  },
  {
    path: 'app-testfolder',
    component: TestfolderComponent
  },
  {
    path: 'app-display-project/:id',
    component: DisplayProjectComponent
  },
  {
    path: 'app-display-all-projects',
    component: DisplayAllProjectsComponent
  },
  {
    path: 'app-homepage',
    component: HomepageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    TestfolderComponent,
    DisplayProjectComponent,
    DisplayAllProjectsComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PostsService, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
