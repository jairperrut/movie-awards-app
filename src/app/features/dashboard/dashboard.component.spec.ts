import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../core/services/movie.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceStub: Partial<MovieService>;

  beforeEach(async () => {
    movieServiceStub = {
      getYearsWithMultipleWinners: () => of({ years: [
        { year: 2022, winnerCount: 2 },
        { year: 2021, winnerCount: 3 },
        { year: 2020, winnerCount: 4 }
      ] }),
      getTopStudiosWithWinCount: () => of({ studios: [
        { studio: 'Studio 1', winCount: 2 },
        { studio: 'Studio 2', winCount: 3 },
        { studio: 'Studio 3', winCount: 4 }
      ] }),
      getProducerIntervals: () => of({ 
        max: [
          { producer: 'Producer 1', interval: 2, previousWin: 2020, followingWin: 2022 },
          { producer: 'Producer 3', interval: 4, previousWin: 2018, followingWin: 2022 }
        ], 
        min: [] 
      }),
      getWinnersByYear: (year: number) => of([
        { title: 'Movie 1', year: 2022, winner: true },
        { title: 'Movie 2', year: 2022, winner: false },
        { title: 'Movie 3', year: 2022, winner: true },
        { title: 'Movie 4', year: 2021, winner: true }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, DashboardComponent],
      providers: [{ provide: MovieService, useValue: movieServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load years with multiple winners on init', () => {
    spyOn(component, 'loadYearsWithMultipleWinners').and.callThrough();
    component.ngOnInit();
    expect(component.loadYearsWithMultipleWinners).toHaveBeenCalled();
  });

  it('should load top studios on init', () => {
    spyOn(component, 'loadTopStudios').and.callThrough();
    component.ngOnInit();
    expect(component.loadTopStudios).toHaveBeenCalled();
  });

  it('should load producer intervals on init', () => {
    spyOn(component, 'loadProducerIntervals').and.callThrough();
    component.ngOnInit();
    expect(component.loadProducerIntervals).toHaveBeenCalled();
  });

  it('should search winners by year', () => {
    component.searchYear = '2022';
    spyOn(component, 'searchWinnersByYear').and.callThrough();
    component.searchWinnersByYear();
    expect(component.searchWinnersByYear).toHaveBeenCalled();
  });
});
