import { Component, OnInit } from '@angular/core';
import { partition } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-realworld-advanced-starter';

  ngOnInit(): void {
    console.log($('body'));
    console.log(partition([1, 2, 3, 4], n => n % 2));
  }
}


