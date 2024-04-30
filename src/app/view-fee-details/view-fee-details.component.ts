import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { UpdateFeeDetailsComponent } from '../update-fee-details/update-fee-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-fee-details',
  templateUrl: './view-fee-details.component.html',
  styleUrls: ['./view-fee-details.component.css'],
})
export class ViewFeeDetailsComponent implements OnInit {
  role: any;

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  constructor(
    private dialogRef: MatDialogRef<ViewFeeDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    const dialogref = this.dialog.open(UpdateFeeDetailsComponent, {
      width: '500px',
      data: { mode: 'edit', feeDetails: this.data },
    });

    dialogref.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['view-fee-details']);
      }
    });
  }
}
