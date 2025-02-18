import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = '/api';
  constructor(private http: HttpClient) {}

  /**
   * Executa uma requisição GET para a API.
   * @param endpoint Endpoint relativo, sem incluir a base URL.
   * @param params Parâmetros opcionais para a query string.
   * @returns Observable com a resposta da API.
   */
  get<T>(endpoint: string = '', params?: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { params });
  }
 
}
