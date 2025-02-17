import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';

@Component({
  standalone: true,
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [FormsModule, CommonModule]
  
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 15;
  filters = { year: '', winner: '' };

  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Carrega os filmes da API com base na página e filtros aplicados.
   */
  loadMovies(): void {
    const params = {
      page: this.currentPage,
      size: this.pageSize,
      year: this.filters.year || undefined,
      winner: this.filters.winner || undefined,
    };

    this.moviesService.getMovies(params).subscribe((response) => {
      this.movies = response.content;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  /**
   * Aplica os filtros e carrega a página 0 com os novos critérios.
   */
  applyFilters(): void {
    this.currentPage = 0;
    this.loadMovies();
  }
  
  /**
   * Altera a página atual e recarrega os filmes.
   * @param page Número da página
   */
  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
    }
  }
}
