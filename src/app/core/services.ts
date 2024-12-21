import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Movie,
  YearWithMultipleWinners,
  StudioWinCount,
  ProducerWinInterval,
} from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(page = 0, size = 10, winner?: boolean, year?: number): Observable<Movie[]> {
    let params = `?page=${page}&size=${size}`;
    if (winner !== undefined) params += `&winner=${winner}`;
    if (year) params += `&year=${year}`;
    return this.http.get<Movie[]>(`${this.baseUrl}${params}`);
  }

  getYearsWithMultipleWinners(): Observable<YearWithMultipleWinners[]> {
    return this.http.get<YearWithMultipleWinners[]>(
      `${this.baseUrl}?projection=years-with-multiple-winners`
    );
  }

  getStudiosWithWinCount(): Observable<StudioWinCount[]> {
    return this.http.get<StudioWinCount[]>(
      `${this.baseUrl}?projection=studios-with-win-count`
    );
  }

  getProducersWinIntervals(): Observable<{
    min: ProducerWinInterval[];
    max: ProducerWinInterval[];
  }> {
    return this.http.get<{ min: ProducerWinInterval[]; max: ProducerWinInterval[] }>(
      `${this.baseUrl}?projection=max-min-win-interval-for-producers`
    );
  }
}
