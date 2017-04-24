import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Company } from '../interfaces/company.interface';

@Injectable()
export class CompaniesService {

  constructor(private http: Http) { }

  // Get all Companys
  getAllCompanies(): Promise<Company[]> {
        return this.http.get('/api/company')
                        .toPromise()
                        .then(res => res.json() as Company[])
                        .catch(this.handleError);
  }

  //Get a Company by name
  getCompany(name: string): Promise<Company> {
        return this.http.get(`/api/company/${name}`)
                        .toPromise()
                        .then(res => res.json() as Company)
                        .catch(this.handleError);
  }

  // Add new Company
  createCompany(newCompany: Company): Promise<Company> {
        return this.http.post('/api/company', newCompany)
                        .toPromise()
                        .then(res => res.json() as Company)
                        .catch(this.handleError);
  }

  // Update a Company
  updateCompany (putCompany: Company): Promise<Company> {
        return this.http.put(`/api/Company/` + putCompany._id, putCompany)
                        .toPromise()
                        .then(res => res.json() as Company)
                        .catch(this.handleError);
    }

  // Delete a Company
  deleteCompany (delCompanyId: Number): Promise<Number> {
        return this.http.delete(`/api/company/` + delCompanyId)
                        .toPromise()
                        .then(res => res.json() as Number)
                        .catch(this.handleError);
    }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
