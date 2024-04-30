import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {
  updatedStudent: any; // Variable to hold the updated student data

  constructor(
    private dialogRef: MatDialogRef<UpdateStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Copy the student data to updatedStudent variable to maintain changes locally
    this.updatedStudent = { ...this.data.student };
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    console.log(this.updatedStudent);
    this.adminService.updateStudent(this.updatedStudent).subscribe({
      next: (res) => {
        this.snackBar.open(res, 'Ok', {
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
