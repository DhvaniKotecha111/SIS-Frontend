import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8091/auth';
  private authChanged = new BehaviorSubject<boolean>(this.isLoggedIn());
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  jwtHelper = new JwtHelperService();

  studentPartialRegister(std: any) {
    return this.http.post(`${this.baseUrl}/student/partialRegister`, std, {
      responseType: 'text',
    });
  }

  adminPartialRegister(admin: any) {
    return this.http.post(`${this.baseUrl}/admin/partialRegister`, admin, {
      responseType: 'text',
    });
  }

  doLogin(credentials: any, headers: HttpHeaders) {
    return this.http.post(`${this.baseUrl}/login`, credentials, { headers });
  }

  loginUser(token: any) {
    localStorage.setItem('token', token);
    let decodedToken = this.jwtHelper.decodeToken(token);
    const username = decodedToken.user_name;
    const authAuthorities = decodedToken.authorities;
    localStorage.setItem('username', username);
    localStorage.setItem('role', authAuthorities);
    this.authChanged.next(true); // Update authChanged
    this.roleSubject.next(localStorage.getItem('role')); // Update roleSubject
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.authChanged.next(false); // Update authChanged
    this.roleSubject.next(null); // Clear roleSubject
  }

  generateToken() {
    return localStorage.getItem('token');
  }

  getAuthChanged() {
    return this.authChanged.asObservable();
  }

  getRoleChanged() {
    return this.roleSubject.asObservable();
  }

  getUserDetails() {
    let username = localStorage.getItem('username');
    return this.http.get(this.baseUrl + '/getUserDetails/' + username);
  }

  checkUserNameAvailability(name: any) {
    return this.http.get(this.baseUrl + '/getUserDetails/' + name);
  }

  forgotPassword(forgotPasswordData: any) {
    return this.http.post(
      this.baseUrl + '/forgotPassword',
      forgotPasswordData,
      { responseType: 'text' }
    );
  }

  verifyOtp(data: any) {
    return this.http.post(this.baseUrl + '/verifyOtp', data, {
      responseType: 'text',
    });
  }

  resetPassword(data: any) {
    return this.http.post(this.baseUrl + '/resetPassword', data, {
      responseType: 'text',
    });
  }
}
