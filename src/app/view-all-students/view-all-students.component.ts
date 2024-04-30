import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Student } from '../Model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { AddFeeDetailsComponent } from '../add-fee-details/add-fee-details.component';
import { ViewFeeDetailsComponent } from '../view-fee-details/view-fee-details.component';

@Component({
  selector: 'app-view-all-students',
  templateUrl: './view-all-students.component.html',
  styleUrls: ['./view-all-students.component.css'],
})
export class ViewAllStudentsComponent implements OnInit {
  studentList!: Student[];
  dataSource: any;
  columns: string[] = [
    'enrollmentNo',
    'name',
    'gender',
    'dob',
    'branch',
    'contact',
    'address',
    'city',
    'pinCode',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.fetchStudentList();
  }

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  filterData(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  fetchStudentList() {
    this.adminService.getAllStudents().subscribe({
      next: (res) => {
        this.studentList = res;
        this.dataSource = new MatTableDataSource<Student>(this.studentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteStudentById(enrollmentNo: any) {
    this.adminService.deleteStudentById(enrollmentNo).subscribe({
      next: (res) => {
        alert(res);
        this.fetchStudentList();
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  editStudent(student: any) {
    const dialogRef = this.dialog.open(UpdateStudentComponent, {
      width: '500px',
      data: { mode: 'edit', student: student },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.fetchStudentList();
      }
    });
  }

  feeDetails(enrollmentNo: any) {
    this.adminService.getFeeDetails(enrollmentNo).subscribe({
      next: (res) => {
        if (res == null) {
          //open dialog box to enter the fee details
          const dialogRef = this.dialog.open(AddFeeDetailsComponent, {
            width: '500px',
            data: { enrollmentNo: enrollmentNo }, // Pass enrollmentNo to the dialog
          });

          //handle dialog close event
          dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
              this.fetchStudentList();
            }
          });
        } else {
          // Open dialog to display fee details
          this.dialog.open(ViewFeeDetailsComponent, {
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
}
