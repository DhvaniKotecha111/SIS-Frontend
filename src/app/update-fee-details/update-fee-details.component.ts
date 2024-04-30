import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewFeeDetailsComponent } from '../view-fee-details/view-fee-details.component';
import { AdminService } from '../services/admin.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-fee-details',
  templateUrl: './update-fee-details.component.html',
  styleUrls: ['./update-fee-details.component.css'],
})
export class UpdateFeeDetailsComponent implements OnInit {
  ngOnInit() {
    this.data.feeDetails.updatedBy = localStorage.getItem('username');
    this.data.feeDetails.updatedDate = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd'
    );
  }

  constructor(
    private dialogRef: MatDialogRef<ViewFeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    this.adminService
      .updateFeeDetails(
        this.data.feeDetails.studentEnrollmentNo,
        this.data.feeDetails
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
