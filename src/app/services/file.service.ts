import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FileService {

  constructor(private http: Http) { }

  getFile(projectId: number): Promise<Blob> {
    return this.http.get(`/api/projects/${projectId}/submission`,{ responseType: ResponseContentType.Blob })
                    .toPromise()
                    .then(res => new Blob([res], { type: 'application/pdf'} as Blob))
                    .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
