import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Course {
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

  courses: Course[] = [];
  lecturers: Lecturer[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTotalLecturers();
    this.fetchTotalCourses();
    this.fetchTotalStudents();
    this.fetchCourses();
    this.fetchLecturers();
  }

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
}
