import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.css'],
})
export class ViewStudentProfileComponent implements OnInit {
  student: any;

  ngOnInit() {
    this.studentService
      .getStudentDetails(localStorage.getItem('username'))
      .subscribe({
        next: (response) => {
          this.student = response;
        },
        error: (err) => {
          alert(err);
        },
      });
  }

  constructor(private studentService: StudentService) {}
}
