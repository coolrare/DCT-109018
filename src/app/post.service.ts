import { SingleArticle } from './interfaces/single-article';
import { environment } from './../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles } from './interfaces/articles';
import { CreateArticle } from './interfaces/create-article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Articles> {
    return this.httpClient.get<Articles>(`${environment.apiUrl}/api/articles`);
  }

  getArticle(id: string): Observable<SingleArticle> {
    return this.httpClient.get<SingleArticle>(`${environment.apiUrl}/api/articles/${id}`);
  }

  createArticle(article: CreateArticle): Observable<SingleArticle> {
    return this.httpClient.post<SingleArticle>(`${environment.apiUrl}/api/articles`, { article });
  }
}
