import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(credentials: any) {
    const role = credentials.role;
    const headers = new HttpHeaders().set('Role', role);
    // call the login service
    this.loginservice.doLogin(credentials.value, headers).subscribe({
      next: (response: any) => {
        if (response == null) {
          this.snackBar.open('Invalid Credentials', 'OK', {
            duration: 5000,
          });
        } 
        else {
          this.snackBar.open('Login Successful', 'OK', {
            duration: 5000,
          });
          this.loginservice.loginUser(response.jwttoken);
          if (localStorage.getItem('role') === 'ROLE_USER') {
            this.router.navigate(['student-dashboard']);
          }
          if (localStorage.getItem('role') === 'ROLE_ADMIN') {
            this.router.navigate(['admin-dashboard']);
          }
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
