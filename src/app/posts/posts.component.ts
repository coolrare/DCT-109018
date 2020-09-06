import { Article } from './../interfaces/article';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  articles: Article[];

  articles$: Observable<Article[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.articles$ = this.postService
      .getArticles()
      .pipe(map((result) => result.articles));

    this.postService
      .getArticles()
      .pipe(map((result) => result.articles))
      .subscribe((articles) => {
        console.log(articles);
        this.articles = articles;
        // this.articles = result.articles;
      });
  }
}
