import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employee.service';
import { ProjectsService } from '../services/projects.service';
import { Course } from '../interfaces/course.interface';
import { Employee } from '../interfaces/employee.interface';
import { Project } from '../interfaces/project.interface';
import { MarkdownService } from '../services/markdown.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'new-project',
  templateUrl: './add-project-employee.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [CoursesService, EmployeesService, ProjectsService, MarkdownService]
})



export class AddProjectComponent implements OnInit {

  submitted: boolean = false;

  courses: Course[];

  employee: Employee = {
    name: '',
    mail: '',
    mobile: '',
    course: ''
  };

  employees: Employee[];

  name: string;

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

  output: string;
  private toggle: boolean = false;

  constructor(private coursesService: CoursesService, private projectsService: ProjectsService,
              private employeeService: EmployeesService, private md: MarkdownService) { }



  ngOnInit() {

    this.coursesService
      .getAllCourses()
      .then((courses: Course[]) => {
        this.courses = courses.map((course) => {
          return course;
        });
      });

    this.employeeService
      .getAllEmployees()
      .then((employees: Employee[]) => {
        this.employees = employees.map((employee) => {
          console.log(employee);
          return employee;
        });
      });
  }


  toggleMarkdown() {
    if(this.toggle == true) {
      this.toggle = false;
    } else {
      this.toggle = true;
    }
    this.output = this.md.convert(this.project.description);

  }



/*  getEmployee(name: string) {
    this.employeeService.getEmployee(this.name).then((employee: Employee) => {
    this.employee = employee;
      });
  }*/

  createProject(project: Project) {
    this.projectsService.createProject(project).then(() => {
      console.log("project" + project);
      console.log("this-project" + this.project);
      this.submitted = true;
    });
  }

}
