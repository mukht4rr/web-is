import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

export interface Course {
courseCode: any;
  courseId: number;
  courseTitle: string;
  status: string;
}

export interface Lecturer {
  lecturerId: number;
  lecturerName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private baseUrl = 'http://localhost:8080';
  totalLecturers: number = 0;
  totalCourses: number = 0;
  totalStudents: number = 0;
  lecturerCourses: any[] = [];

  //arrays
  courses: Course[] = [];
  lecturers: Lecturer[] = [];
  selectedLecturerId: any;
  selectedCourseId: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTotalLecturers();
    this.fetchTotalCourses();
    this.fetchTotalStudents();
    this.fetchCourses();
    this.fetchLecturers();
    this.fetchLecturerCourses();
  }

  //fetch lecturer and course together from relations
  fetchLecturerCourses() {
    this.http.get<any[]>(`${this.baseUrl}/lecturer-course/getLecturerCourses`).subscribe(
      data => {
        this.lecturerCourses = data;
        console.log(data); // Check the structure of data in browser console
      },
      error => {
        console.error('Error fetching lecturer courses with details', error);
      }
    );
  }

  //fetch all courses
  fetchCourses() {
    this.http.get<Course[]>(`${this.baseUrl}/courses/get`).subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }

  //fetch all lecturers
  fetchLecturers() {
    this.http.get<Lecturer[]>(`${this.baseUrl}/lecturers/get`).subscribe(
      (data: Lecturer[]) => {
        this.lecturers = data;
      },
      error => {
        console.error('Error fetching lecturers', error);
      }
    );
  }

  //count all lecturers
  fetchTotalLecturers() {
    this.http.get<number>(`${this.baseUrl}/lecturers/count`).subscribe(
      (count: number) => {
        this.totalLecturers = count;
      },
      error => {
        console.error('Error fetching total lecturers', error);
      }
    );
  }

  //count all courses
  fetchTotalCourses() {
    this.http.get<number>(`${this.baseUrl}/courses/count`).subscribe(
      (count: number) => {
        this.totalCourses = count;
      },
      error => {
        console.error('Error fetching total courses', error);
      }
    );
  }

  //count all students
  fetchTotalStudents(){
    this.http.get<number>(`${this.baseUrl}/auth/count`).subscribe(
      (count: number) => {
        this.totalStudents = count;
      },
      error => {
        console.error('Error fetching total students', error);
      }
    );
  }

  // Assign course to lecturer
  assignCourseToLecturer() {
    if (this.selectedLecturerId && this.selectedCourseId) {
      const assignment = {
        lecturerId: this.selectedLecturerId,
        courseId: this.selectedCourseId
      };

      this.http.post(`${this.baseUrl}/lecturer-course/assign`, assignment).subscribe(
        response => {
          console.log('Assignment successful', response);
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
            title: "Course assigned successfully"
          });
        },
        error => {
          console.error('Error assigning course to lecturer', error);
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Failed to Assign Course",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }
  }

}
