import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ViewStudentProfileComponent } from './view-student-profile/view-student-profile.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { ViewAdminProfileComponent } from './view-admin-profile/view-admin-profile.component';
import { ViewAllStudentsComponent } from './view-all-students/view-all-students.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'student-login',
    component: StudentLoginComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'student-register',
    component: RegistrationComponent,
  },
  {
    path: 'admin-register',
    component: AdminRegistrationComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify-otp',
    component: VerifyOtpComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view-student-profile', component: ViewStudentProfileComponent },
      { path: 'add-education', component: AddEducationComponent },
    ],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view-admin-profile', component: ViewAdminProfileComponent },
      { path: 'view-all-students', component: ViewAllStudentsComponent },
    ],
  },
  {
    path: 'student-profile',
    component: StudentProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-admin-profile',
    component: UpdateAdminProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-student-profile',
    component: UpdateStudentProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
