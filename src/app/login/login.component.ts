import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  login(event): void {
    console.log(event);
    this.loginService
      .login(this.user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(error.error.body[0]);
          return throwError(error);
        })
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          const token = result.user.token;
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }
}
