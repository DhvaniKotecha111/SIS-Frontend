import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOtpComponent implements OnInit {
  data: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.data = this.fb.group({
      email: [],
      dob: [],
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.data.patchValue({
        email: params['email'],
        dob: params['dob'],
      });
    });
  }

  get formCtrl() {
    return this.data.controls;
  }

  onSubmit() {
    this.loginService.verifyOtp(this.data.value).subscribe({
      next: (res) => {
        if (res == '') {
          this.snackBar.open('Invalid OTP!! Please try again', 'OK', {
            duration: 5000,
          });
        } else if (res == 'OTP is expired!! Please generate it again') {
          this.snackBar.open(res, 'OK', {
            duration: 5000,
          });
          this.router.navigate(['forgot-password']);
        } else {
          this.snackBar.open(res, 'OK', {
            duration: 5000,
          });
          this.router.navigate(['reset-password'], {
            queryParams: {
              email: this.data.value.email,
              dob: this.data.value.dob,
            },
          });
        }
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
