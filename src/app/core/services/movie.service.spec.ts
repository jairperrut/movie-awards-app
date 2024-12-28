import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let apiServiceSpy: jest.Mocked<ApiService>;

  beforeEach(() => {
    const spy = {
      get: jest.fn()
    }

    TestBed.configureTestingModule({
      providers: [
        MovieService,
        provideHttpClientTesting(),
        { provide: ApiService, useValue: spy },
      ],
    });

    service = TestBed.inject(MovieService);
    apiServiceSpy = TestBed.inject(ApiService) as jest.Mocked<ApiService>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch years with multiple winners', (done) => {
    const mockData = { years: [{ year: 1980, winnerCount: 2 }] };
    apiServiceSpy.get.mockReturnValue(of(mockData));

    service.getYearsWithMultipleWinners().subscribe((data: any) => {
      expect(data).toEqual(mockData);
      done();
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('years-with-multiple-winners');
  });
});
