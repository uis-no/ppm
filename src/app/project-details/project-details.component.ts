import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.interface';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ProjectsService]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {


  public uploader:FileUploader = new FileUploader({
    url: '',
    method: 'PUT'
  });
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  project: Project;
  private sub: any;
  //id: string;
  private id: number;

  private get getid(): number {
    return this.id;
  }
  private set setid(id: number) {
    this.id = id;
  }

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params =>  {
      this.setid = Number.parseInt(params['id']);
      this.uploader.setOptions({ url: 'http://localhost:3000/api/projects/' + this.getid });
    });
  }

  // Reads the url and grabs the id and makes a call to the service to get the project based on id
  ngOnInit() {
      this.projectsService.getProject(this.getid).then((project: Project) => {
        this.project = project;
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
