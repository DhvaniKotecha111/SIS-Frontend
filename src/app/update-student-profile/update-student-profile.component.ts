import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-student-profile',
  templateUrl: './update-student-profile.component.html',
  styleUrls: ['./update-student-profile.component.css'],
})
export class UpdateStudentProfileComponent implements OnInit {
  studentDetails: any;

  ngOnInit() {
    this.getStudentDetails();
  }

  constructor(
    private studentService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getStudentDetails() {
    this.studentService
      .getStudentDetails(localStorage.getItem('username'))
      .subscribe({
        next: (res) => {
          this.studentDetails = res;
        },
      });
  }

  updateStudentDetails() {
    this.studentService
      .updateStudent(this.studentDetails.enrollmentNo, this.studentDetails)
      .subscribe({
        next: (res) => {
          this.snackBar.open(res, 'OK', {
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
