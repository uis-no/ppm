import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { FileService } from '../services/file.service';
import { Project } from '../interfaces/project.interface';
import { LoginService } from '../services/passport.service';
import { MarkdownService } from '../services/markdown.service';
import { FileUploader } from 'ng2-file-upload';
import { MailService } from '../services/mail.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CompaniesService} from '../services/companies.service';
import { Company } from '../interfaces/company.interface';
import { EmployeesService } from '../services/employee.service';
import { Employee } from '../interfaces/employee.interface';
import { StudentsService } from '../services/students.service';
import { Student } from '../interfaces/student.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ProjectsService, FileService, MarkdownService, LoginService, StudentsService, MailService, EmployeesService, CompaniesService]
})




export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private id: number = 0;
  private mailFormat: any = {};
  private isNotified: boolean = false;
  private isExaminerNotified: boolean = false;
  private isAssigned: boolean = false;

  private blob: any;

  public uploader:FileUploader = new FileUploader({
    url: '',
    method: 'POST'
  });
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  companies: Company[];
  employees: Employee[];
  responsibleNames: string[] = [];
  advisorNames: string[] = [];
  students: Student[];
  studentNames: string[] = [];
  employeeNames: string[] = [];

  project: Project;
  private sub: any;

  private get getid(): number {
    return this.id;
  }
  private set setid(id: number) {
    this.id = id;
  }
  output: string;

  user: any = {};
  student: boolean = false;
  ansatt: boolean = false;
  applicants: any = [];


  constructor(private projectsService: ProjectsService, private fileService: FileService,
    private md: MarkdownService, private route: ActivatedRoute, private loginService: LoginService,
    private studentsService: StudentsService, private mailService: MailService,
    private employeeService: EmployeesService, private companiesService: CompaniesService) {

    this.user = this.loginService.getUser().then((user) => {
      this.user = user;
      if(this.user.eduPersonAffiliation.includes('employee')){
            this.ansatt = true;
      }else if(this.user.eduPersonAffiliation.includes('student')){
            this.student = true;
      } else {

      }
    });


    this.sub = this.route.params.subscribe(params =>  {
      this.setid = Number.parseInt(params['id']);
      this.uploader.setOptions({ url: 'https://fast-beyond-86797.herokuapp.com/api/projects/' + this.getid + '/submission' });
    });
  }

  private groups: any[] = [];
  //private studs: any[] = [];

  // Reads the url and grabs the id and makes a call to the service to get the project based on id
  ngOnInit() {
      this.projectsService.getProject(this.getid).then((project: Project) => {
        this.project = project;
        this.output = this.md.convert(this.project.description);
        this.project.applied.forEach((idx)=>{
          var studs: Student[] = [];
            idx.forEach((student)=>{

              this.studentsService.getStudentByID(student).then((stud: Student) => {

                if (stud){
                  studs.push(stud);
                }

              });
            });
            this.groups.push(studs);

        });

        // displays file dropzone if user is assigned to the project
        this.project.assigned.forEach((s) => {
          if (s['mail'] == this.user.mail ) {
            this.isAssigned = true;
          }
        });
      });

      this.companiesService
      .getAllCompanies()
      .then((companies: Company[]) => {
        this.companies = companies.map((company) => {
          this.responsibleNames.push(company.name);
          this.advisorNames.push(company.name);
          return company;
        })
      })

      this.employeeService
      .getAllEmployees()
      .then((employees: Employee[]) => {
        this.employees = employees.map((employee) => {
          this.employeeNames.push(employee.name);
          this.responsibleNames.push(employee.name);
          this.advisorNames.push(employee.name);
          return employee;
        });
      });


      this.studentsService
      .getAllStudents()
      .then((students: Student[]) => {
        this.students = students.map((student) => {
          this.studentNames.push(student.name);
          return student;
          });
        });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  downloadSubmission(id) {
    window.location.href = 'https://fast-beyond-86797.herokuapp.com/api/projects/' + id + '/submission';
  }

  notifyExaminer(id: number) {
    this.projectsService.notifyExaminer(this.project._id).then(()=> {
      this.isNotified == true;
      this.isExaminerNotified == true;
    });
  }

  assign(group: any[]){
    for(var stud in group){
      this.project.assigned.push(group[stud])
    }
    this.project.status = 'assigned';
    this.projectsService.updateProject(this.project);

  }

  addApplicants(){
    if ((<HTMLInputElement>document.getElementById("textbox")).value != ""){
    this.applicants.push((<HTMLInputElement>document.getElementById("textbox")).value);
    (<HTMLInputElement>document.getElementById("textbox")).value = "";
    }else{}

  }

  @ViewChild('modal')
    modal: ModalComponent;

  open(){
    this.studentsService.getStudentByID(this.user.mail).then((student: Student) => {
        this.applicants.push(student.name);
        this.modal.open();
    });
  }

  dismiss(){
    this.applicants = [];
    this.modal.close();
  }

  close() {
    var promises: Promise<any>[] = [];

    this.project.applied.push(this.applicants);
    for (let key1 in this.project.applied) {
      for (let key in this.project.applied[key1]) {
        promises.push(this.studentsService.getStudent(this.project.applied[key1][key])
          .then((student: Student) => {
            if (student != null) {
              this.project.applied[key1][key] = student._id;
            }
          }));
      }
    }
    Promise.all(promises).then(() => {
      this.projectsService.updateProject(this.project);
    });



    this.modal.close();
    this.applicants = [];

  }


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

  searchEmployees = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.employeeNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));

  searchStudents = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.studentNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));


  @ViewChild('mailToModal')
    mailToModal: ModalComponent;

  mail: String;

  mailOpen(mail){
    this.mail = mail;
    (<HTMLInputElement>document.getElementById("mailfield")).value = mail;
    this.mailToModal.open();
  }

  sendMail(){
    this.mail = (<HTMLInputElement>document.getElementById("mailfield")).value;
    var subject = (<HTMLInputElement>document.getElementById("subject")).value;
    var text = (<HTMLInputElement>document.getElementById("mailtext")).value;
    this.mailService.sendMail(this.mail, subject, text);
    this.isNotified = true;
    this.mailToModal.close();
  }


  approveProject(){
    this.project.status = 'unassigned';
    this.projectsService.updateProject(this.project);
  }

  @ViewChild('rejectModal')
    rejectModal: ModalComponent;


    rejectProject(){
      (<HTMLInputElement>document.getElementById("mailfield")).value = this.project.proposer[0]._id.mail;
      this.rejectModal.open();
    }

    rejectClose(){
      this.project.status = 'rejected';
      this.projectsService.updateProject(this.project);
      this.mail = (<HTMLInputElement>document.getElementById("mailfield")).value;
      var subject = (<HTMLInputElement>document.getElementById("subject")).value;
      var text = (<HTMLInputElement>document.getElementById("mailtext")).value;
      this.mailService.sendMail(this.mail, subject, text);
      this.projectsService.updateProject(this.project);
      this.rejectModal.close()
    }

    cancel(){
      (<HTMLInputElement>document.getElementById("mailfield")).value = "";
      (<HTMLInputElement>document.getElementById("subject")).value = "";
      (<HTMLInputElement>document.getElementById("mailtext")).value = "";
      this.modal.close();
    }


    responsibleFound = false;


    @ViewChild('addPeopleModal')
      addPeopleModal: ModalComponent;

    addResp() {
      this.project.responsible = {role: null, _id: null};
      var promises: Promise<any>[] = [];
      var resps: string;
      if ((<HTMLInputElement>document.getElementById("respText")).value != "") {
        resps = (<HTMLInputElement>document.getElementById("respText")).value;
        (<HTMLInputElement>document.getElementById("respText")).value = "";


        this.project.responsible._id = resps;
        promises.push(this.employeeService.getEmployee(this.project.responsible._id)
          .then((employee: Employee) => {
            if (employee != null) {
              this.responsibleFound = true;
              this.project.responsible.role = 'Employee';
              this.project.responsible._id = employee._id;

            }
          }));

        if (this.responsibleFound == false) {
          promises.push(this.companiesService.getCompany(this.project.responsible._id)
            .then((company: Company) => {
              if (company != null) {
                this.responsibleFound = true;
                this.project.responsible.role = 'Company';
                this.project.responsible._id = company._id;

              }
            }));


        }

      } else {  }

    }

    addAdvisor(){
      this.project.advisor[0] = {role: null, _id: null};
      var promises: Promise<any>[] = [];
      var advisors: string;
      if ((<HTMLInputElement>document.getElementById("advisortext")).value != ""){
        advisors = ((<HTMLInputElement>document.getElementById("advisortext")).value);
        (<HTMLInputElement>document.getElementById("advisortext")).value = "";
      }else{}


      this.project.advisor[0]._id = advisors;
      for (let key in this.project.advisor) {
      promises.push(this.employeeService.getEmployee(this.project.advisor[key]._id)
                          .then((employee: Employee) => {
                            if (employee != null) {
                              this.responsibleFound = true;
                              this.project.advisor[key].role = 'Employee';
                              this.project.advisor[key]._id = employee._id;

                            }
      }));

      if (this.responsibleFound == false) {
        promises.push(this.companiesService.getCompany(this.project.advisor[key]._id)
                            .then((company: Company) => {
                              if (company != null) {
                                this.responsibleFound = true;
                                this.project.advisor[key].role = 'Company';
                                this.project.advisor[key]._id = company._id;

                              }
        }));
      }

    }
    }

    addExaminer(){
      this.project.examiner[0] = {role: null, _id: null};
      var promises: Promise<any>[] = [];
      var advisors: string;
      if ((<HTMLInputElement>document.getElementById("examinertext")).value != ""){
        advisors = ((<HTMLInputElement>document.getElementById("examinertext")).value);
        (<HTMLInputElement>document.getElementById("examinertext")).value = "";
      }else{}


      this.project.examiner[0]._id = advisors;
      for (let key in this.project.examiner) {
      promises.push(this.employeeService.getEmployee(this.project.examiner[key]._id)
                          .then((employee: Employee) => {
                            if (employee != null) {
                              this.responsibleFound = true;
                              this.project.examiner[key].role = 'Employee';
                              this.project.examiner[key]._id = employee._id;

                            }
      }));


    }
    }

    submit(){
      this.projectsService.updateProject(this.project);
      this.addPeopleModal.close();
    }

    addPeopleCancel(){
        this.addPeopleModal.close();
    }

}
