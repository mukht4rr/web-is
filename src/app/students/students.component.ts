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
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  searchText: string = '';
  students: Student[] = [];
  filteredStudents: Student[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.authService.getAllStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        this.filteredStudents = students;
      },
      (error: any) => {
        console.error('Error fetching students', error);
      }
    );
  }

  onSearch() {
    if (this.searchText) {
      this.filteredStudents = this.students.filter(student =>
        student.fullname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredStudents = this.students;
    }
  }
}
