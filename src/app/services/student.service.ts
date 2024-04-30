import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  private profileCreatedSubject: Subject<void> = new Subject<void>();
  baseUrl = 'http://localhost:8092/user';

  saveStudent(student: any) {
    return this.http.post(this.baseUrl + '/register', student, {
      responseType: 'text',
    });
  }

  get profileCreated(): Observable<void> {
    return this.profileCreatedSubject.asObservable();
  }

  profileCreationSuccess() {
    this.profileCreatedSubject.next();
  }

  getStudentDetails(stdName: any) {
    return this.http.get(this.baseUrl + '/getUser/' + stdName);
  }

  updateStudent(enrollmentNo: any, studentDetails: any) {
    return this.http.post(
      this.baseUrl + '/updateUser/' + enrollmentNo,
      studentDetails,
      { responseType: 'text' }
    );
  }

  getEducationDetails(enrollmentNo: any) {
    return this.http.get(this.baseUrl + '/getEducationDetails/' + enrollmentNo);
  }

  addEducationDetails(educationDetails: any) {
    return this.http.post(
      this.baseUrl + '/addEducationDetails',
      educationDetails,
      { responseType: 'text' }
    );
  }

  updateEducationDetails(enrollmentNo: any, educationDetails: any) {
    return this.http.post(
      this.baseUrl + '/updateEducationDetails/' + enrollmentNo,
      educationDetails,
      { responseType: 'text' }
    );
  }
}
