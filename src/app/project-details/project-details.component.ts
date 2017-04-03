import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { FileService } from '../services/file.service';
import { Project } from '../interfaces/project.interface';

import { MarkdownService } from '../services/markdown.service';

import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ProjectsService, FileService, MarkdownService]
})



export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private id: number = 0;

  private blob: Blob;

  public uploader:FileUploader = new FileUploader({
    url: '',
    method: 'POST'
  });
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  project: Project;
  private sub: any;
  //id: string;


  private get getid(): number {
    return this.id;
  }
  private set setid(id: number) {
    this.id = id;
  }
  output: string;

  constructor(private projectsService: ProjectsService, private fileService: FileService,
    private md: MarkdownService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params =>  {
      this.setid = Number.parseInt(params['id']);
      this.uploader.setOptions({ url: 'http://localhost:3000/api/projects/' + this.getid + '/submission' });
    });
  }

  // Reads the url and grabs the id and makes a call to the service to get the project based on id
  ngOnInit() {
      this.projectsService.getProject(this.getid).then((project: Project) => {
        this.project = project;

        this.output = this.md.convert(this.project.description);
      });

      this.fileService.getFile(this.getid).then((blob: Blob) => {
        this.blob = blob;
        console.log(this.blob);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
