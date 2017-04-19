
import { ProjectsService } from './services/projects.service';
import { Project } from './interfaces/project.interface';
import { LoginService } from './services/passport.service';
import { Component, OnInit } from '@angular/core';
import { Auth }              from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectsService, LoginService, Auth]
})
export class AppComponent implements OnInit {

  title = 'JARIDA Thesis Manager';
  myAuth = false;

  constructor (private loginService: LoginService, private auth: Auth) {
  }

  ngOnInit () {
    this.isAuthenticated();
  }

  public isAuthenticated(){
    this.loginService.getAuth().then(auth => {
      this.myAuth = auth;
    });
  }

}
