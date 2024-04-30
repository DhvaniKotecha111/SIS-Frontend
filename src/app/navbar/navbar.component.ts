import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { StudentService } from '../services/student.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('adminSideBar') adminSideBar!: AdminSidebarComponent;

  constructor(
    private loginservice: LoginService,
    private studentService: StudentService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  toggleSidebar() {
    this.adminSideBar.toggleSidebar();
  }

  loggedIn: boolean = false;
  role: string | null = null;
  profileStatus: boolean = false;

  ngOnInit() {
    this.loginservice.getAuthChanged().subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
      if (this.loggedIn) {
        this.updateProfileStatus();
      }
      this.cdr.detectChanges();
    });

    this.loginservice.getRoleChanged().subscribe((role: string | null) => {
      this.role = role;
      if (this.loggedIn && this.role) {
        this.updateProfileStatus();
      }
      this.cdr.detectChanges();
    });

    this.loggedIn = this.loginservice.isLoggedIn();
    this.role = localStorage.getItem('role');

    if (this.loggedIn && this.role) {
      this.updateProfileStatus();
    }

    this.studentService.profileCreated.subscribe(() => {
      this.updateProfileStatus();
    });

    this.adminService.profileCreated.subscribe(() => {
      this.updateProfileStatus();
    });
  }

  updateProfileStatus() {
    if (this.role === 'ROLE_USER') {
      this.studentService
        .getStudentDetails(localStorage.getItem('username'))
        .subscribe({
          next: (res) => {
            this.profileStatus = !!res;
          },
        });
    }
    if (this.role === 'ROLE_ADMIN') {
      this.adminService
        .getAdminDetails(localStorage.getItem('username'))
        .subscribe({
          next: (res) => {
            this.profileStatus = !!res;
          },
        });
    }
  }

  logoutUser() {
    if (this.role === 'ROLE_USER') {
      this.loginservice.logout();
      this.router.navigate(['student-login']);
    }
    if (this.role === 'ROLE_ADMIN') {
      this.loginservice.logout();
      this.router.navigate(['admin-login']);
    }
  }
}
