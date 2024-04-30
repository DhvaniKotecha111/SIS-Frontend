import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  mailSend: boolean = false;

  ngOnInit() {}

  constructor(
    private loginService: LoginService,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(forgotPasswordData: any) {
    forgotPasswordData.value.dob = this.datePipe.transform(
      forgotPasswordData.value.dob,
      'YYYY-MM-dd'
    );
    this.loginService.forgotPassword(forgotPasswordData.value).subscribe({
      next: (res) => {
        if (res == '') {
          this.snackBar.open('Invalid Email or Date Of Birth', 'OK', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(res, 'OK', {
            duration: 5000,
          });
          this.mailSend = true;
          this.router.navigate(['/verify-otp'], {
            queryParams: {
              email: forgotPasswordData.value.email,
              dob: forgotPasswordData.value.dob,
            },
          });
        }
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  isFormDataValid(formData: any): boolean {
    return formData.invalid || this.mailSend;
  }
}
