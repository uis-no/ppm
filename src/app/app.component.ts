import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { Project } from './interfaces/project.interface';
import { LoginService } from './services/passport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectsService, LoginService]
})
export class AppComponent implements OnInit {
  title = 'JARIDA Thesis Manager';
  auth = false;

  constructor (private loginService: LoginService) {
  }

  ngOnInit () {
    this.isAuthenticated();
  }

  public isAuthenticated(){
    this.loginService.getAuth().then(auth => {
      this.auth = auth;
    });
  }

}
