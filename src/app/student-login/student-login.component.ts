import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  ngOnInit() {}

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {} 
  
  onSubmit(credentials: any) {
    const headers = new HttpHeaders().set('Role', 'ROLE_USER');
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
