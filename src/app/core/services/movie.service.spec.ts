import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { ApiService } from './api.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        MovieService,
        ApiService,
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies with correct parameters', () => {
    const dummyMovies = { content: [], totalElements: 0, totalPages: 0 };
    const params = { page: 1, size: 10, year: '2022', winner: 'true' };

    service.getMovies(params).subscribe((data) => {
      expect(data).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne('/api/movies?page=1&size=10&year=2022&winner=true');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should get years with multiple winners', () => {
    const dummyData = { years: [] };

    service.getYearsWithMultipleWinners().subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/movies?projection=years-with-multiple-winners');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should get top studios with win count', () => {
    const dummyData = { studios: [] };

    service.getTopStudiosWithWinCount().subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/movies?projection=studios-with-win-count');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should get producer intervals', () => {
    const dummyData = { max: [], min: [] };

    service.getProducerIntervals().subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/movies?projection=max-min-win-interval-for-producers');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should get winners by year', () => {
    const dummyData: any[] = [];

    service.getWinnersByYear(2022).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/movies?year=2022&winner=true');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
