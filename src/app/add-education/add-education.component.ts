import { Component, Inject, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
})
export class AddEducationComponent implements OnInit {
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  ngOnInit() {
    this.educationDetails = this.fb.group({
      studentEnrollmentNo: [this.data.enrollmentNo, Validators.required],
      educationType: ['', Validators.required],
      percentage: ['', Validators.required],
      qualified: ['', Validators.required],
      updatedBy: [localStorage.getItem('username'), Validators.required],
      updatedDate: [this.currentDate, Validators.required],
    });
  }

  get formCtrl() {
    return this.educationDetails.controls;
  }

  educationDetails: any;

  constructor(
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onAddClick() {
    this.studentService
      .addEducationDetails(this.educationDetails.value)
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
