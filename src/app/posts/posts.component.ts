import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
var SAML = require('passport-saml').SAML;
//var SAML = require('passport-saml').Strategy;
//var SAML = require('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/passport-saml.js').router;
//var user = System.import('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/passport-saml.js');

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty object
  projects: any = [];
  saml: any = SAML;
  profile: any;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
    //this.saml.prototype.processValidlySignedAssertion({}, {}, this.callback);
    //this.profile = this.saml.profile.email;
    //this.profile = this.saml.profile;
  }

  callback(err: any, profile: any) {
    if (!err) {
      this.profile = profile;
    } else {
        alert(err);
    }
  }

  submitForm() {
    document.forms[0].submit();
  };

  spInitSSO(binding) {
    window.location.href = '/sso/spinitsso-' + (binding === 0 ? 'redirect' : 'post');
  }

}
