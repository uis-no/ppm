import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.interface';
import { LoginService } from './passport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectsService, LoginService]
})
export class AppComponent implements OnInit {
  title = 'Thesis Manager';
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
