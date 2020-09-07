import { LoginService } from './../login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('tForm') form: NgForm;

  user = {
    email: '',
    password: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(event): void {
    console.log(event);
    this.loginService
      .login(this.user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(error.error.body[0]);
          return throwError(error);
        }),
        tap(data => {
          const token = data.user.token;
          localStorage.setItem('token', token);
        }),
        switchMap(data => this.route.queryParamMap),
        map(queryParamMap => queryParamMap.get('redirect'))
      )
      .subscribe({
        next: (redirect) => {
          console.log(redirect);
          this.router.navigateByUrl(redirect);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
