import { shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { partition } from 'lodash';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-realworld-advanced-starter';

  ngOnInit(): void {
    // console.log($('body'));
    // console.log(partition([1, 2, 3, 4], n => n % 2));

    const source$ = from([1, 2, 3, 4]).pipe(
      shareReplay(3) // cache 最後三次發生的值
    );

    source$.subscribe(data => console.log(data));
    // from([1, 2, 3, 4]).subscribe(data => console.log(data));



  }
}


