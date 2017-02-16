import { Component } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectsService]
})
export class AppComponent {
  title = 'Thesis Manager';
}
