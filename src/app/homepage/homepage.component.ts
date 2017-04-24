import { Component, OnInit } from '@angular/core';
import { Auth }              from '../auth.service';
import { LoginService } from '../services/passport.service';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../interfaces/project.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  providers: [ Auth, LoginService, ProjectsService],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  myAuth: boolean = false;
  user: any = {};
  projects: Project[];
  myProject: Project;

  employee: boolean = false;
  student: boolean = false;

  constructor(private auth: Auth, private loginService: LoginService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.loginService.getAuth().then(auth => {
      this.myAuth = auth;
      if (this.myAuth == true){
        this.loginService.getUser().then((user: any) => {
          this.user = user;
          user.eduPersonAffiliation.includes('student') ? this.student = true : this.employee = true;
          if (this.student == true) {
            var tempProject = []
            this.projectsService.getMyProject().then((project: Project) => {
              this.myProject = project;
            });
          }
          if (this.employee == true) {
            this.projectsService.getUnreviewedProjects().then((projects: Project[]) => {
              this.projects = projects.map((project) => {
                return project;
              });
            });
          }
          return this.user;
        });
      }
    });

  }

  notify(id:number) {
    this.projectsService.notifyExaminer(id).then();
  }

  toFeide() {
    window.location.href = 'http://localhost:3000/login';
  }

  logoutFromFeide() {
    window.location.href = 'http://localhost:3000/logout';
  }

}
