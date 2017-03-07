import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Auth }              from '../auth.service';

@Component({
  selector: 'app-posts',
  providers: [ Auth ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty object
  projects: any = [];

  constructor(private postsService: PostsService, private auth: Auth) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
