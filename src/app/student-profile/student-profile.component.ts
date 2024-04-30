import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent {
  student: any;

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.student = this.fb.group({
      enrollmentNo: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      branch: ['', Validators.required],
      city: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  get formCtrl() {
    return this.student.controls;
  }

  ngOnInit() {
    this.getUserDetails();
  }

  userDetails: any;

  getUserDetails() {
    this.loginservice.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        this.student.patchValue({
          enrollmentNo: this.userDetails.userid,
          name: this.userDetails.name,
          dob: this.userDetails.dob,
        });
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  saveStudent() {
    this.studentService.saveStudent(this.student.value).subscribe({
      next: (response) => {
        this.studentService.profileCreationSuccess();
        this.snackBar.open(response, 'OK', {
          duration: 5000,
        });
        this.router.navigate(['student-dashboard/view-student-profile']);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
