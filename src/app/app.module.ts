import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { StudentsComponent } from './students/students.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerCoursesComponent } from './lecturer-courses/lecturer-courses.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentAttendencesComponent } from './student-attendences/student-attendences.component';
import { LecturerAttendencesComponent } from './lecturer-attendences/lecturer-attendences.component';
import { AttendanceAnalyticsComponent } from './attendance-analytics/attendance-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    LecturersComponent,
    StudentsComponent,
    SettingsComponent,
    LoginComponent,
    CoursesComponent,
    DashboardComponent,
    SidebarComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    LecturerHomeComponent,
    LecturerCoursesComponent,
    StudentHomeComponent,
    StudentAttendencesComponent,
    LecturerAttendencesComponent,
    AttendanceAnalyticsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
