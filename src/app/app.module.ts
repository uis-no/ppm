import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './posts.service';
import { TestfolderComponent } from './testfolder/testfolder.component';
import { DisplayProjectComponent } from './display-project/display-project.component';
import { DisplayAllProjectsComponent } from './display-all-projects/display-all-projects.component';



const ROUTES = [
  {
    path: '',
    redirectTo: 'projects',
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
    path: 'app-display-project',
    component: DisplayProjectComponent
  },
  {
    path: 'app-display-all-projects',
    component: DisplayAllProjectsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    TestfolderComponent,
    DisplayProjectComponent,
    DisplayAllProjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
