import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerCoursesComponent } from './lecturer-courses/lecturer-courses.component';
import { LecturerAttendencesComponent } from './lecturer-attendences/lecturer-attendences.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentAttendencesComponent } from './student-attendences/student-attendences.component';
import { AttendanceAnalyticsComponent } from './attendance-analytics/attendance-analytics.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
      {path: 'lecturerHome', component: LecturerHomeComponent, canActivate: [AuthGuard]},
      {path: 'lecturerCourses', component: LecturerCoursesComponent, canActivate: [AuthGuard]},
      {path: 'lecturerAttendence', component: LecturerAttendencesComponent, canActivate: [AuthGuard]},
      {path: 'studentHome', component: StudentHomeComponent, canActivate: [AuthGuard]},
      {path: 'studentAttendence', component: StudentAttendencesComponent, canActivate: [AuthGuard]},
      { path: 'lecturers', component: LecturersComponent, canActivate: [AuthGuard] },
      { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
      { path: 'analytics', component: AttendanceAnalyticsComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
