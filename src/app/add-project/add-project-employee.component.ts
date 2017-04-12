import { Component, OnInit, ViewChild } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employee.service';
import { ProjectsService } from '../services/projects.service';
import { StudentsService } from '../services/students.service';
import { Course } from '../interfaces/course.interface';
import { Employee } from '../interfaces/employee.interface';
import { Project } from '../interfaces/project.interface';
import { Student } from '../interfaces/student.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'new-project',
  templateUrl: './add-project-employee.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [CoursesService, EmployeesService, ProjectsService, StudentsService]
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

  names: string[] = [];

  employees: Employee[];

  students: Student[];

  studentCount: number = 1;
/*  twoStudents: boolean = false;
  threeStudents: boolean = false;*/

  project: Project = {
    course: '',
    title: '',
    description: '',
    proposer: [{role: '', user: ''}],
    approved: false,
    responsible: [{role: '', user: ''}],
    advisor: [{role: '', user: ''}],
    examiner: [{role: '', user: ''}],
    student: [],
//    time_limits: []
  };

/*  student: Student = {
    _id: '',
    name: '',
    mail: '',
    mobile: '',
    grades: [],
    course: ''
  };*/

  student: Student;

  userType: any;

  constructor(private coursesService: CoursesService, private employeeService: EmployeesService, 
              private projectsService: ProjectsService, private studentsService: StudentsService) { }



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
          this.names.push(employee.name);
          return employee;
        });
      });

    this.studentsService
      .getAllStudents()
      .then((students: Student[]) => {
        this.students = students.map((student) => {
          this.names.push(student.name);
          return student;
        });
      });

  }
  


/*  getEmployee(name: string) {
    this.employeeService.getEmployee(this.name).then((employee: Employee) => {
    this.employee = employee;
      });
  }*/



  getUser(user: string) {
/*    switch (this.userType) {                    // bruk denne senere

    }*/
    this.employeeService
      .getEmployee(user)
      .then((employee: Employee) => {
        return employee.mobile;
      });
  }



  createProject(project: Project, student: string) {
    for (var i = 0; i < project.proposer.length; i++) {
      this.employeeService.getEmployee(project.proposer[i].user)
                          .then((proposer: Employee) => {
                            
                          })
    }
    

/*    for (i = 0; i < student.length; i++) {
      this.studentsService.getStudent(student[i])
                          .then((student: Student) => {
                            project.student.push(student._id);
                          });
    }*/
    this.projectsService.createProject(project).then(() => {
      console.log(project);
      this.submitted = true;
    });
  }



  searchAll = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.names.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));



  addStudent() {
    this.studentCount++;
    if (this.studentCount > 3) {this.studentCount = 3};
/*    switch (this.studentCount) {
      case 1:
        this.twoStudents = false;
        this.threeStudents = false;
        break;
      case 2:
        this.twoStudents = true;
        this.threeStudents = false;
        break;
      case 3:
        this.twoStudents = true;
        this.threeStudents = true;
        break;
    }*/
  }

  removeStudent() {
    this.studentCount--;
    if (this.studentCount < 1) {this.studentCount = 1};
/*    switch (this.studentCount) {
      case 1:
        this.twoStudents = false;
        this.threeStudents = false;
        break;
      case 2:
        this.twoStudents = true;
        this.threeStudents = false;
        break;
      case 3:
        this.twoStudents = true;
        this.threeStudents = true;
        break;
    }*/
  }

}

