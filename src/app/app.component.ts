import { Component } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { Project } from './interfaces/project.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectsService]
})
export class AppComponent {
  title = 'Thesis Manager';
}
