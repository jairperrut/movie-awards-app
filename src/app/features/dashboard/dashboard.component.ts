import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProducerInterval } from '../../core/models/producer-interval.model';
import { StudioWithWinCount, YearWithMultipleWinners } from '../../core/models/dashboard.model';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = [];
  topStudios: StudioWithWinCount[] = [];
  maxProducerIntervals: ProducerInterval[] = [];
  minProducerIntervals: ProducerInterval[] = [];
  winnersByYear: any[] = [];
  searchYear: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadYearsWithMultipleWinners();
    this.loadTopStudios();
    this.loadProducerIntervals();
  }

  loadYearsWithMultipleWinners(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe((data: any) => {
      this.yearsWithMultipleWinners = data.years;
    });
  }

  loadTopStudios(): void {
    this.movieService.getTopStudiosWithWinCount().subscribe((data: any) => {
      this.topStudios = data.studios.slice(0, 3);
    });
  }

  loadProducerIntervals(): void {
    this.movieService.getProducerIntervals().subscribe((data: any) => {
      this.maxProducerIntervals = data.max;
      this.minProducerIntervals = data.min;
    });
  }

  searchWinnersByYear(): void {
    if (this.searchYear) {
      this.movieService.getWinnersByYear(+this.searchYear).subscribe((data: any) => {
        this.winnersByYear = data;
      });
    }
  }
}
