import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from '../Model/Student';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private profileCreatedSubject: Subject<void> = new Subject<void>();
  baseUrl = 'http://localhost:8093/admin';

  saveAdmin(admin: any) {
    return this.http.post(this.baseUrl + '/register', admin, {
      responseType: 'text',
    });
  }

  get profileCreated(): Observable<void> {
    return this.profileCreatedSubject.asObservable();
  }

  profileCreationSuccess() {
    this.profileCreatedSubject.next();
  }

  getAdminDetails(username: any) {
    return this.http.get(this.baseUrl + '/getAdmin/' + username);
  }

  updateAdmin(adminid: any, adminDetails: any) {
    return this.http.post(
      this.baseUrl + '/updateAdmin/' + adminid,
      adminDetails,
      { responseType: 'text' }
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + '/getAllUsers');
  }

  deleteStudentById(enrollmentNo: any) {
    return this.http.get(this.baseUrl + '/deleteUser/' + enrollmentNo, {
      responseType: 'text',
    });
  }

  updateStudent(student: Student) {
    return this.http.post(
      this.baseUrl + '/updateUser/' + student.enrollmentNo,
      student,
      { responseType: 'text' }
    );
  }

  getFeeDetails(enrollmentNo: any) {
    return this.http.get(this.baseUrl + '/getFeeDetails/' + enrollmentNo);
  }

  addFeeDetails(feeDetails: any) {
    return this.http.post(this.baseUrl + '/addFeeDetails', feeDetails, {
      responseType: 'text',
    });
  }

  updateFeeDetails(enrollmentNo: any, feeDetails: any) {
    return this.http.post(
      this.baseUrl + '/updateFeeDetails/' + enrollmentNo,
      feeDetails,
      { responseType: 'text' }
    );
  }
}
