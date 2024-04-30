import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { StudentService } from './services/student.service';
import { AdminService } from './services/admin.service';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { RegistrationComponent } from './registration/registration.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStudentProfileComponent } from './view-student-profile/view-student-profile.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { ViewAdminProfileComponent } from './view-admin-profile/view-admin-profile.component';
import { ViewAllStudentsComponent } from './view-all-students/view-all-students.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AddFeeDetailsComponent } from './add-fee-details/add-fee-details.component';
import { ViewFeeDetailsComponent } from './view-fee-details/view-fee-details.component';
import { DatePipe } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ViewEducationDetailsComponent } from './view-education-details/view-education-details.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';
import { UpdateFeeDetailsComponent } from './update-fee-details/update-fee-details.component';
import { UpdateEducationDetailsComponent } from './update-education-details/update-education-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    AdminRegistrationComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    StudentProfileComponent,
    AdminProfileComponent,
    ViewStudentProfileComponent,
    AddEducationComponent,
    ViewAdminProfileComponent,
    ViewAllStudentsComponent,
    UpdateStudentComponent,
    AddFeeDetailsComponent,
    ViewFeeDetailsComponent,
    AdminSidebarComponent,
    ViewEducationDetailsComponent,
    UpdateStudentProfileComponent,
    UpdateAdminProfileComponent,
    UpdateFeeDetailsComponent,
    UpdateEducationDetailsComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    StudentLoginComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    DatePipe,
    LoginService,
    AuthGuard,
    StudentService,
    AdminService,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
