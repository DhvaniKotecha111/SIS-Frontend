import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-admin-profile',
  templateUrl: './update-admin-profile.component.html',
  styleUrls: ['./update-admin-profile.component.css'],
})
export class UpdateAdminProfileComponent implements OnInit {
  adminDetails: any;

  ngOnInit() {
    this.getAdminDetails();
  }

  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getAdminDetails() {
    this.adminService
      .getAdminDetails(localStorage.getItem('username'))
      .subscribe({
        next: (res) => {
          this.adminDetails = res;
        },
      });
  }

  updateAdminDetails() {
    this.adminService
      .updateAdmin(this.adminDetails.adminid, this.adminDetails)
      .subscribe({
        next: (res) => {
          this.snackBar.open(res, 'Ok', {
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
