import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-fee-details',
  templateUrl: './add-fee-details.component.html',
  styleUrls: ['./add-fee-details.component.css'],
})
export class AddFeeDetailsComponent implements OnInit {
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  ngOnInit() {
    this.feeDetails = this.fb.group({
      studentEnrollmentNo: [this.data.enrollmentNo, Validators.required],
      feeAmount: ['', Validators.required],
      dueDate: ['', Validators.required],
      updatedBy: [localStorage.getItem('username'), Validators.required],
      updatedDate: [this.currentDate, Validators.required],
    });
  }

  feeDetails: any;

  constructor(
    private dialogRef: MatDialogRef<AddFeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onAddClick() {
    this.adminService.addFeeDetails(this.feeDetails.value).subscribe({
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
