import { Component, OnInit } from '@angular/core';
import { Auth }              from '../auth.service';

@Component({
  selector: 'app-display-project',
  providers: [ Auth ],
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
