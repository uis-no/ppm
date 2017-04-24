import { Component, OnInit, ViewChild } from '@angular/core';
import { CompaniesService} from '../services/companies.service';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employee.service';
import { ProjectsService } from '../services/projects.service';
import { StudentsService } from '../services/students.service';
import { Company } from '../interfaces/company.interface';
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
  providers: [CompaniesService, CoursesService, EmployeesService, ProjectsService, StudentsService]
})

export class AddProjectComponent implements OnInit {

  submitted: boolean = false;

  proposerNames: string[] = [];
  responsibleNames: string[] = [];
  advisorNames: string[] = [];
  studentNames: string[] = [];
  company: Company = {
    _id: '',
    name: '',
    mail: '',
    mobile: ''
  };
  companies: Company[];
  courses: Course[];
  employees: Employee[];
  students: Student[];
  studentCount: number = 1;
  advisorCount: number = 1;
  project: Project = {
    _id: 0,
    course: '',
    title: '',
    description: '',
    proposer: {role: '', _id: ''},
    status: 'pending',
    responsible: {role: '', _id: ''},
    advisor: [{role: '', _id: ''}],
    examiner: [{role: '', _id: ''}],
    student: []
  };

  constructor(private companiesService: CompaniesService, private coursesService: CoursesService, 
              private employeeService: EmployeesService, private projectsService: ProjectsService, 
              private studentsService: StudentsService) { }



  ngOnInit() {

    this.coursesService
      .getAllCourses()
      .then((courses: Course[]) => {
        this.courses = courses.map((course) => {
          return course;
        });
      });

    this.companiesService
      .getAllCompanies()
      .then((companies: Company[]) => {
        this.companies = companies.map((company) => {
          this.proposerNames.push(company.name);
          this.responsibleNames.push(company.name);
          this.advisorNames.push(company.name);
          return company;
        })
      })

    this.employeeService
      .getAllEmployees()
      .then((employees: Employee[]) => {
        this.employees = employees.map((employee) => {
          this.proposerNames.push(employee.name);
          this.responsibleNames.push(employee.name);
          this.advisorNames.push(employee.name);
          return employee;
        });
      });

    this.studentsService
      .getAllStudents()
      .then((students: Student[]) => {
        this.students = students.map((student) => {
          this.proposerNames.push(student.name);
          this.studentNames.push(student.name);
          return student;
        });
      });

  }
  


  // Create/POST project
  createProject() {
    this.projectsService.createProject(this.project).then(() => {this.submitted = true;});
  }



  populateSchema(isCompany) {
    var proposerFound = false;
    var responsibleFound = false;
    var advisorFound = false;
    var promises: Promise<any>[] = [];

    // Create new external user
    if (isCompany == true) {
      this.company._id = "645346";
      this.company.name = this.project.proposer[0]._id;
      promises.push(this.companiesService.createCompany(this.company).then(() => {}));
    }

    // Populate Proposers
    promises.push(this.employeeService.getEmployee(this.project.proposer._id)
                        .then((employee: Employee) => {
                          if (employee != null) {
                            proposerFound = true;
                            this.project.proposer.role = 'Employee';
                            this.project.proposer._id = employee._id;
                          }
    }));

    if (proposerFound == false) {
      promises.push(this.studentsService.getStudent(this.project.proposer._id)
                          .then((student: Student) => {
                            if (student != null) {
                              proposerFound = true;
                              this.project.proposer.role = 'Student';
                              this.project.proposer._id = student._id;
                            }
      }));
    }

    if (proposerFound == false) {
      promises.push(this.companiesService.getCompany(this.project.proposer._id)
                          .then((company: Company) => {
                            if (company != null) {
                              proposerFound = true;
                              this.project.proposer.role = 'Company';
                              this.project.proposer._id = company._id;
                            }
      }));
    }



    // Populate Responsibles
    promises.push(this.employeeService.getEmployee(this.project.responsible._id)
                        .then((employee: Employee) => {
                          if (employee != null) {
                            responsibleFound = true;
                            this.project.responsible.role = 'Employee';
                            this.project.responsible._id = employee._id;
                          }
    }));

    if (responsibleFound == false) {
      promises.push(this.companiesService.getCompany(this.project.responsible._id)
                          .then((company: Company) => {
                            if (company != null) {
                              responsibleFound = true;
                              this.project.responsible.role = 'Company';
                              this.project.responsible._id = company._id;
                            }
      }));
    }



    // Populate Advisors
    for (let key in this.project.advisor) {
      promises.push(this.employeeService.getEmployee(this.project.advisor[key]._id)
                          .then((employee: Employee) => {
                            if (employee != null) {
                              responsibleFound = true;
                              this.project.advisor[key].role = 'Employee';
                              this.project.advisor[key]._id = employee._id;
                            }
      }));

      if (responsibleFound == false) {
        promises.push(this.companiesService.getCompany(this.project.advisor[key]._id)
                            .then((company: Company) => {
                              if (company != null) {
                                responsibleFound = true;
                                this.project.advisor[key].role = 'Company';
                                this.project.advisor[key]._id = company._id;
                              }
        }));
      }
    }



    // Populate Students
    for (let key in this.project.student) {
      promises.push(this.studentsService.getStudent(this.project.student[key])
                          .then((student: Student) => {
                            if (student != null) {
                              this.project.student[key] = student._id;
                            }
      }));
    }


    // make sure promises finish before creating/POSTing project
    Promise.all(promises).then(() => {
      this.createProject();
    });
    
  }    



  searchProposers = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.proposerNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));

  searchResponsibles = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.responsibleNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));

  searchAdvisors = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.advisorNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));

  searchStudents = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.studentNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));



  addStudent() {
    this.studentCount++;
    if (this.studentCount > 3) {this.studentCount = 3};
  }

  removeStudent() {
    this.studentCount--;
    if (this.studentCount < 1) {this.studentCount = 1};
  }

    addAdvisor() {
    this.advisorCount++;
    if (this.advisorCount > 3) {this.advisorCount = 3};
  }

  removeAdvisor() {
    this.advisorCount--;
    if (this.advisorCount < 1) {this.advisorCount = 1};
  }

}
