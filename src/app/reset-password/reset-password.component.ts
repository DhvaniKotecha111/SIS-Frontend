import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      newPwd: ['', Validators.required], // Validation for required field
      confirmPwd: ['', [Validators.required, this.passwordMatchValidator]], // Validation for required field
      email: [''],
      dob: [''],
      token: [''],
    });

    // Subscribe to valueChanges of newPwd control
    this.resetForm.get('newPwd').valueChanges.subscribe(() => {
      this.resetForm.get('confirmPwd').updateValueAndValidity(); // Trigger validation on confirmPwd
    });

    this.route.queryParams.subscribe((params) => {
      this.resetForm.get('email').setValue(params['email']);
      this.resetForm.get('dob').setValue(params['dob']);
      this.resetForm.get('token').setValue(params['token']);
    });
  }

  get formCtrl() {
    return this.resetForm.controls;
  }

  // Custom validator function to check if passwords match
  passwordMatchValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const newPassword = control.root.get('newPwd');
    const confirmPassword = control.value;

    if (
      newPassword &&
      confirmPassword &&
      newPassword.value !== confirmPassword
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {
    this.loginService.resetPassword(this.resetForm.value).subscribe({
      next: (res) => {
        if (res == 'Your password is changed Successfully') {
          this.snackBar.open('Password changed successfully!', 'OK', {
            duration: 5000,
          });
          this.router.navigate(['login']);
        } else if (
          res == 'New password must be different from the current password'
        ) {
          this.snackBar.open(
            'New password must be different from the current password',
            'OK',
            {
              duration: 5000,
            }
          );
        } else {
          this.snackBar.open('Link is Invalid!! Please try again', 'OK', {
            duration: 5000,
          });
          this.router.navigate(['forgot-password']);
        }
      },
    });
  }
}
