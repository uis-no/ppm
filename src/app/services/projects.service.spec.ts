/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectsService } from './services/projects.service';

describe('Service: This', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsService]
    });
  });

  it('should get all projects', inject([ProjectsService], (service: ProjectsService) => {
    expect(this.service.getAllProjects().toEqual([]));
  }));
});
