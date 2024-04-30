import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewFeeDetailsComponent } from '../view-fee-details/view-fee-details.component';
import { StudentService } from '../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-education-details',
  templateUrl: './update-education-details.component.html',
  styleUrls: ['./update-education-details.component.css'],
})
export class UpdateEducationDetailsComponent implements OnInit {
  ngOnInit() {
    this.data.educationDetails.updatedBy = localStorage.getItem('username');
    this.data.educationDetails.updatedDate = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd'
    );

    console.log(this.data.educationDetails.qualified)
  }

  constructor(
    private dialogRef: MatDialogRef<ViewFeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    this.studentService
      .updateEducationDetails(
        this.data.educationDetails.studentEnrollmentNo,
        this.data.educationDetails
      )
      .subscribe({
        next: (res) => {
          this.snackBar.open(res, 'OK', {
            duration: 5000,
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err);
        },
      });
  }
}
