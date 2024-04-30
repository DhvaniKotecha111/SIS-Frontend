import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(private loginservice: LoginService, private router: Router) {}

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  securityKeyPattern = /^[a-zA-Z0-9]{6}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  message: any = '';
  isNameAvailable: boolean = false;

  checkNameAvailability(name: string) {
    this.loginservice.checkUserNameAvailability(name).subscribe({
      next: (res) => {
        if (res === null) {
          this.isNameAvailable = true;
          console.log(this.isNameAvailable)
        } else {
          this.isNameAvailable = false;
          console.log(this.isNameAvailable)
        }
      },
    });
  }

  onSubmit(userData: any) {
    this.loginservice.studentPartialRegister(userData.value).subscribe(
      (response: any) => {
        this.message = response;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
