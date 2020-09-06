import { Article } from './../../interfaces/article';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  // article: Article;
  article$: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((paramMap) => {
    //   console.log(paramMap.get('id'));
    //   this.postService.getArticle(paramMap.get('id')).subscribe((result) => {
    //     this.article = result.article;
    //     console.log(this.article);
    //   });
    // });

    // this.route.paramMap
    //   .pipe(
    //     map((paramMap) => paramMap.get('id')),
    //     switchMap((id) => this.postService.getArticle(id))
    //   )
    //   .subscribe((result) => {
    //     console.log(result);
    //   });

    this.article$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id) => this.postService.getArticle(id)),
      map((result) => result.article),
     // shareReplay(1)
    );
  }
}
