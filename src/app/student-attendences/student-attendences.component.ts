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
  selector: 'app-student-attendences',
  templateUrl: './student-attendences.component.html',
  styleUrl: './student-attendences.component.css'
})
export class StudentAttendencesComponent implements OnInit{
  enrolls: Enrolls[] = [];
  student: Student[]= [];
  courses: Course[] = [];
  studentAttendances: any[] = []; 

  constructor(private authService: AuthService, private http: HttpClient) {}


  ngOnInit(): void {
    this.loadStudentAttendances();
  }

  loadStudentAttendances(): void {
    const studentId = localStorage.getItem('studentId');
    console.log('Retrieved studentId from localStorage:', studentId);
    
    if (studentId) {
      this.http.get<any[]>(`${this.authService.baseUrl}/api/attendance/student/${studentId}`)
        .subscribe(
          courses => {
            console.log('Courses fetched from API:', courses); // Log the fetched courses
            this.studentAttendances = courses;
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
