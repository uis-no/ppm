import { Component, OnInit } from '@angular/core';
import { Auth }              from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  providers: [ Auth ],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
