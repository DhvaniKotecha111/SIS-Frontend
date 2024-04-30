import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],
})
export class AdminRegistrationComponent {
  constructor(private loginservice: LoginService, private router: Router) {}

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  securityKeyPattern = /^[a-zA-Z0-9]{6}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  message: any = '';
  isNameAvailable: boolean = false;

  checkNameAvailability(name: string) {
    this.loginservice.checkUserNameAvailability(name).subscribe({
      next: (res) => {
        if (res === null) {
          this.isNameAvailable = true;
        } else {
          this.isNameAvailable = false;
        }
      },
    });
  }

  onSubmit(userData: any) {
    this.loginservice.adminPartialRegister(userData.value).subscribe(
      (response: any) => {
        this.message = response;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1000);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
