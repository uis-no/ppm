import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.interface';
import { Course } from '../course.interface';
import 'rxjs/add/operator/map';

@Component({
  selector: 'new-project',
  templateUrl: './add-project-employee.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ProjectsService]
})
export class AddProjectComponent implements OnInit {

  submitted: boolean = false;

  project: Project = {
    course: null,
    title: '',
    description: '',
    proposer: [],
    approved: false,
    responsible: [],
    advisor: [],
    examiner: [],
    student: [],
//    time_limits: []
  };

  courses: Course[];

  constructor(private projectsService: ProjectsService) { }

    ngOnInit() {
    this.projectsService
      .getAllCourses()
      .then((courses: Course[]) => {
        this.courses = courses.map((course) => {
          return course;
        });
      });
  }
  
  createProject(project: Project) {
    this.projectsService.createProject(project).then(() => {
      console.log("project" + project);
      console.log("this-project" + this.project);
      this.submitted = true;
    });
  }
}
