import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-view-admin-profile',
  templateUrl: './view-admin-profile.component.html',
  styleUrls: ['./view-admin-profile.component.css'],
})
export class ViewAdminProfileComponent implements OnInit {
  admin: any;

  ngOnInit() {
    this.adminService
      .getAdminDetails(localStorage.getItem('username'))
      .subscribe({
        next: (response) => {
          this.admin = response;
        },
        error: (err) => {
          alert(err);
        },
      });
  }

  constructor(private adminService: AdminService) {}
}
