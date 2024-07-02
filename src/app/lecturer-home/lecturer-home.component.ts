import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
  selector: 'app-lecturer-home',
  templateUrl: './lecturer-home.component.html',
  styleUrl: './lecturer-home.component.css'
})
export class LecturerHomeComponent implements OnInit{
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
