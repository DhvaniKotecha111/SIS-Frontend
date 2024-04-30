import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UpdateEducationDetailsComponent } from '../update-education-details/update-education-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-education-details',
  templateUrl: './view-education-details.component.html',
  styleUrls: ['./view-education-details.component.css'],
})
export class ViewEducationDetailsComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private dialogRef: MatDialogRef<ViewEducationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    const dialogref = this.dialog.open(UpdateEducationDetailsComponent, {
      width: '500px',
      data: { mode: 'edit', educationDetails: this.data },
    });

    dialogref.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['view-education-details'])
      }
    });
  }
}
