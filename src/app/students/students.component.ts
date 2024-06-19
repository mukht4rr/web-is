import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 

export interface Student {
  studentId: number;
  fullname: string;
  registrationNumber: string;
}


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'] // Use styleUrls instead of styleUrl
})
export class StudentsComponent implements OnInit {
  
  students: Student[] = [];
  filteredStudents: Student[] = [];

  // Inject AuthService in the constructor
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchStudents();
  }

  // Fetch students method
  fetchStudents() {
    this.authService.getAllStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        this.filteredStudents = students; // Initialize filteredStudents with all students
      },
      (error: any) => {
        console.error('Error fetching students', error);
      }
    );
  }
}

