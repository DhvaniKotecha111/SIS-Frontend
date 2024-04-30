import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEducationComponent } from '../add-education/add-education.component';
import { ViewEducationDetailsComponent } from '../view-education-details/view-education-details.component';
import { AdminService } from '../services/admin.service';
import { ViewFeeDetailsComponent } from '../view-fee-details/view-fee-details.component';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  userid: any;
  studentData: any;
  ngOnInit(): void {
    this.studentService
      .getStudentDetails(localStorage.getItem('username'))
      .subscribe({
        next: (res) => {
          this.studentData = res;
        },
      });
  }

  constructor(
    private studentService: StudentService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  educationDetails() {
    this.studentService
      .getEducationDetails(this.studentData.enrollmentNo)
      .subscribe({
        next: (res) => {
          if (res == null) {
            const dialogRef = this.dialog.open(AddEducationComponent, {
              width: '500px',
              data: { enrollmentNo: this.studentData.enrollmentNo }, // Pass enrollmentNo to the dialog
            });

            dialogRef.afterClosed().subscribe((result) => {});
          } else {
            this.dialog.open(ViewEducationDetailsComponent, {
              width: '500px',
              data: res, // Pass fee details to the dialog
            });
          }
        },
        error: (err) => {
          alert(err);
        },
      });
  }

  feeDetails() {
    this.adminService.getFeeDetails(this.studentData.enrollmentNo).subscribe({
      next: (res) => {
        this.dialog.open(ViewFeeDetailsComponent, {
          width: '500px',
          data: res, // Pass fee details to the dialog
        });
      },
    });
  }
}
