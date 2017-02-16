import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
var profile = require('passport-saml').SAML.prototype.processValidlySignedAssertion;
//var user = System.import('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/passport-saml.js');

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty object
  projects: any = [];
  user: any = profile.profile;
  

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  submitForm() {
    document.forms[0].submit();
  };

  spInitSSO(binding) {
    window.location.href = '/sso/spinitsso-' + (binding === 0 ? 'redirect' : 'post');
  }

}
