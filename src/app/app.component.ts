import { PostService } from './post.service';
import { delay, shareReplay, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { partition } from 'lodash';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-realworld-advanced-starter';

  constructor() {}

  ngOnInit(): void {
    // console.log($('body'));
    // console.log(partition([1, 2, 3, 4], n => n % 2));

    const source$ = from([1, 2, 3, 4]).pipe(
      tap((data) => console.log(`source: ${data}`))
    );
    source$.subscribe((data) => console.log(`沒 shareReplay, 第 1 次 subscribe: ${data}`));
    source$.subscribe((data) => console.log(`沒 shareReplay, 第 2 次 subscribe: ${data}`));

    const source2$ = from([1, 2, 3, 4]).pipe(
      tap((data) => console.log(`source2: ${data}`)),
      shareReplay(3) // cache 最後三次發生的值
    );
    // 還沒 subscribe 的時候，不會執行整個 stream
    source2$.subscribe((data) => console.log(`有 shareReplay, 第 1 次 subscribe: ${data}`));
    source2$.subscribe((data) => console.log(`有 shareReplay, 第 2 次 subscribe: ${data}`));
  }
}
