import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.interface';
// 3rd party js library
//import * as marked from 'marked';

//import { MarkdownService } from '../markdown.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ProjectsService]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  public uploader:FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/projects/1',
    method: 'PUT'
  });
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  project: Project;
  private sub: any;
  //id: string;
  id: number;
  output: string;
  filesToUpload: Array<File>;

  private md: MarkedStatic;

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.filesToUpload = [];
  }

  // Reads the url and grabs the id and makes a call to the service to get the project based on id
  ngOnInit() {
    //this.md.setOptions({});
    this.sub = this.route.params.subscribe(params =>  {
      this.id = Number.parseInt(params['id']);
      //this.id = params['id'];
      this.projectsService.getProject(this.id).then((project: Project) => {
        this.project = project;
        console.log(this.project);
        //console.log("course id is: " + this.project.proposer.name);
        //this.output = this.md.parse("## Markdown works!");
        //this.output = this.md.parse(this.project.description);
        //this.output = this.md.convert(this.project.description);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
/*
  upload() {
    console.log("output of this.project._id is: " + this.project._id);
    this.makeFileRequest("http://localhost:3000/api/projects/" + this.project._id, [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }


  // TODO: extract method to its own service or to the project service
  makeFileRequest (url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append("Uploads[]", files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        console.log("xhr initiated");
        if(xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
        console.log("Attempting to put and send the file");
        xhr.open("PUT", url, true);
        xhr.send(formData);
      }
    });
  }*/
}
