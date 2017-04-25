import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { FileService } from '../services/file.service';
import { Project } from '../interfaces/project.interface';
import { LoginService } from '../services/passport.service';
import { MarkdownService } from '../services/markdown.service';
import { FileUploader } from 'ng2-file-upload';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

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
  providers: [ProjectsService, FileService, MarkdownService, LoginService, StudentsService]
})




export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private id: number = 0;

  private blob: Blob;

  public uploader:FileUploader = new FileUploader({
    url: '',
    method: 'POST'
  });
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  students: Student[];
  studentNames: string[] = [];
  
  project: Project;
  private sub: any;
  //id: string;

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
    private studentsService: StudentsService) {
    
    this.user = this.loginService.getUser().then((user) => {
      this.user = user;
      console.log(this.user.eduPersonAffiliation[0]);
      if(this.user.eduPersonAffiliation.includes('employee')){
            this.ansatt = true;
      }else if(this.user.eduPersonAffiliation.includes('student')){
            this.student = true;
      } else {

      }
    });
    

    this.sub = this.route.params.subscribe(params =>  {
      this.setid = Number.parseInt(params['id']);
      this.uploader.setOptions({ url: 'http://localhost:3000/api/projects/' + this.getid + '/submission' });
    });
  }

  
  // Reads the url and grabs the id and makes a call to the service to get the project based on id
  ngOnInit() {

      this.projectsService.getProject(this.getid).then((project: Project) => {
        this.project = project;

        this.output = this.md.convert(this.project.description);
      });

      this.fileService.getFile(this.getid).then((blob: Blob) => {
        this.blob = blob;
        console.log(this.blob);
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

  addApplicants(){
    if ((<HTMLInputElement>document.getElementById("textbox")).value != ""){
    this.applicants.push((<HTMLInputElement>document.getElementById("textbox")).value);
    (<HTMLInputElement>document.getElementById("textbox")).value = "";
    }else{}
    console.log(this.applicants)
  }
  
  @ViewChild('modal')
    modal: ModalComponent;
  
  open(){
    this.applicants.push(this.user.eduPersonPrincipalName);
    this.modal.open();
  }

  dismiss(){
    this.applicants = [];
    this.modal.close();
  }
  
  close() {
    var promises: Promise<any>[] = [];
    console.log(this.applicants)
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

    console.log(this.project);

    this.modal.close();
    this.applicants = [];

  }


  
  

  searchStudents = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.studentNames.filter(v => new RegExp(term, 'gi').test(v)).splice(0, 10));
}
