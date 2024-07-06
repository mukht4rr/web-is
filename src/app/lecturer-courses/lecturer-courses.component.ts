import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Course, Lecturer } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lecturer-courses',
  templateUrl: './lecturer-courses.component.html',
  styleUrls: ['./lecturer-courses.component.css']
})
export class LecturerCoursesComponent {

  loading = false;

  generateAttendanceCode(courseId: number): void {
    this.loading = true;

    // Generate random code
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    // Update the attendance code in the backend
    this.http.put(`${this.authService.baseUrl}/courses/updateAttendanceCode/${courseId}`, { attendanceCode: randomCode })
      .subscribe(
        response => {
          // Update the local course list
          this.loginLecturerCourses = this.loginLecturerCourses.map(course => {
            if (course.course.courseId === courseId) {
              course.course.attendanceCode = randomCode;
              course.course.attendanceCodeStatus = 'ACTIVE';
              course.course.date = new Date();
            }
            return course;
          });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "New code generated"
          });
          this.loading = false;
        },
        error => {
          console.error('Error updating attendance code:', error);
          this.loading = false;
        }
      );
}


  loginLecturerCourses: any[] = [];
  totalCourses: number = 0;
  courses: Course[] = [];
  lecturers: Lecturer[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLecturerCourses();
  }

  loadLecturerCourses(): void {
    const lecturerId = localStorage.getItem('lecturerId');
    if (lecturerId) {
      this.http.get<any[]>(`${this.authService.baseUrl}/lecturer-course/getLecturerCoursesById/${lecturerId}`)
        .subscribe(courses => {
          this.loginLecturerCourses = courses;
        }, error => {
          console.error('Error fetching courses:', error);
        });
    }
  }
}
