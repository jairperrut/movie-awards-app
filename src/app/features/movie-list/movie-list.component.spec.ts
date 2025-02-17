import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../core/services/movie.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceStub: Partial<MovieService>;

  beforeEach(async () => {
    movieServiceStub = {
      getMovies: (params: any) => of({
        content: [],
        totalElements: 0,
        totalPages: 1
      })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, MovieListComponent],
      providers: [{ provide: MovieService, useValue: movieServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    spyOn(component, 'loadMovies').and.callThrough();
    component.ngOnInit();
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should apply filters and load movies', () => {
    spyOn(component, 'loadMovies').and.callThrough();
    component.applyFilters();
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should change page and load movies', () => {
    spyOn(component, 'loadMovies').and.callThrough();
    component.currentPage = 0;
    component.totalPages = 2;
    component.onPageChange(1);
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should not change page if out of bounds', () => {
    spyOn(component, 'loadMovies').and.callThrough();
    component.currentPage = 0;
    component.totalPages = 2;
    component.onPageChange(2);
    expect(component.loadMovies).not.toHaveBeenCalled();
  });

});
