import { Component } from '@angular/core';
import { Auth }              from './auth.service';
import { ProjectsService } from './projects.service';
import { Project } from './project.interface';


@Component({
  selector: 'app-root',
  providers: [ Auth, ProjectsService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private auth: Auth) {}

  title = 'Thesis Manager';

}

