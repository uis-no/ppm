import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { LoginService } from './services/passport.service';


@Injectable()
export class AuthGuard implements CanActivate {

  myAuth = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.getSamlAuth();
  }

  getSamlAuth() {
    this.loginService.getAuth().then(auth => {
      this.myAuth = auth;
    });
  }

  canActivate() {
    // Check to see if a user has a valid JWT
    if (tokenNotExpired() || this.myAuth == true) {
      // If they do, return true and allow the user to load the home component
      //this.router.navigate(['/projects']);
      return true;
    } else {
      // If not, they redirect them to the login page
      this.router.navigate(['/app-homepage']);
      return false;
    }
  }
}
