import { Component, OnInit } from '@angular/core';
import { Auth }              from '../auth.service';
import { LoginService } from '../services/passport.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  providers: [ Auth, LoginService],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  myAuth: boolean = false;

  constructor(private auth: Auth, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getAuth().then(auth => {
      this.myAuth = auth;
    });
  }

}
