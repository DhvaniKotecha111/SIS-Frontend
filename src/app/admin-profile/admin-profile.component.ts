import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent {
  admin: any;

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.admin = this.fb.group({
      adminid: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  get formCtrl() {
    return this.admin.controls;
  }

  ngOnInit() {
    this.getUserDetails();
  }

  userDetails: any;

  getUserDetails() {
    this.loginservice.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        this.admin.patchValue({
          adminid: this.userDetails.userid,
          name: this.userDetails.name,
        });
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  saveAdmin() {
    this.adminService.saveAdmin(this.admin.value).subscribe({
      next: (response) => {
        this.adminService.profileCreationSuccess();
        this.snackBar.open(response, 'OK', {
          duration: 5000,
        });
        this.router.navigate(['admin-dashboard/view-admin-profile']);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
