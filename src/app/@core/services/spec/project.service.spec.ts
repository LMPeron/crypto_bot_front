import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectService } from '../project.service';
import { IProject } from '../../data/project';

describe('ProjectService', () => {
  let service: ProjectService;

  let httpMock: HttpTestingController;
  let saveResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Error', () => {
      const projectData = {
        name: 'sdfsdf',
        description: 'sdfsdf',
        company: null,
        companyClient: null,
        clientName: null,
        usersInvolved: [],
      } as IProject;

      service.save(projectData).subscribe((response) => {
        saveResponse = response;
      });

      // const req = httpMock.expectOne(`${service.apiUrl}`);
      // expect(req.request.method).toBe('POST');
      // req.flush(projectData);
      httpMock
        .expectOne({
          url: service.apiUrl,
          method: 'POST',
        })
        .flush(responseForm);
      expect(loginResponse).toEqual(responseForm);
    });
  });
});
