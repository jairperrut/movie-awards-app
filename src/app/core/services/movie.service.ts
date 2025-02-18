import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({ providedIn: 'root' })
export class MovieService {

    constructor(private apiService: ApiService) {}

    getMovies(params: any): Observable<any> {
        let httpParams = new HttpParams();
        if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
        if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
        if (params.year) httpParams = httpParams.set('year', params.year);
        if (params.winner) httpParams = httpParams.set('winner', params.winner);
    
        return this.apiService.get<any>('movies' , httpParams);
      }

    getYearsWithMultipleWinners(): Observable<any> {
        return this.apiService.get('movies', {'projection': 'years-with-multiple-winners'});
    }

    getTopStudiosWithWinCount(): Observable<any> {
        return this.apiService.get('movies', {'projection': 'studios-with-win-count'});
    }

    getProducerIntervals(): Observable<any> {
        return this.apiService.get('movies', {'projection': 'max-min-win-interval-for-producers'});
    }

    getWinnersByYear(year: number): Observable<any[]> {
        return this.apiService.get('movies', {'year':year, 'winner': true});
    }
}
