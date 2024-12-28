import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClientTesting(), // Substitui HttpClientTestingModule
      ],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET requests to the correct URL', () => {
    const dummyData = { key: 'value' };

    service.get('endpoint').subscribe((data: any) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/endpoint');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
