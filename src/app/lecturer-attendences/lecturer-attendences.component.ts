import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

export interface Course{
  courseId: number;
  courseTitle: string;
  courseCode: string;
}

export interface Student{
  student_id: number;
  fullname: string;
}

export interface Enrolls{
  enrollId: number;
}

@Component({
  selector: 'app-lecturer-attendences',
  templateUrl: './lecturer-attendences.component.html',
  styleUrl: './lecturer-attendences.component.css'
})
export class LecturerAttendencesComponent implements OnInit{
  enrolls: Enrolls[] = [];
  student: Student[]= [];
  courses: Course[] = [];
  lecturerAttendances: any[] = []; 

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLecturerAttendances();
  }

  loadLecturerAttendances(): void {
    const lecturerId = localStorage.getItem('lecturerId');
    console.log('Retrieved lecturer from localStorage:', lecturerId);
    
    if (lecturerId) {
      this.http.get<any[]>(`${this.authService.baseUrl}/api/attendance/lecturer/${lecturerId}`)
        .subscribe(
          courses => {
            console.log('Courses fetched from API:', courses); // Log the fetched courses
            this.lecturerAttendances = courses;
          },
          error => {
            console.error('Error fetching courses:', error);
          }
        );
    } else {
      console.error('Student ID not found in localStorage');
    }
  }   


}
