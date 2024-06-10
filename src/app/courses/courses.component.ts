// At the top of courses.component.ts
export interface Course {
  courseId: number;
  courseTitle: string;
  courseCode: string;
  status: string;
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courseForm: FormGroup;
  courses: Course[] = []; // Define an array to store courses

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      courseTitle: ['', Validators.required],
      courseCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Fetch courses when component initializes
    this.fetchCourses();
  }

  fetchCourses() {
    this.authService.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      },
      (      error: any) => {
        console.error('Error fetching courses', error);
      }
    );
  }

  onSubmit() {
    // Your existing onSubmit() method
    if (this.courseForm.valid) {
      const courseData = {
        ...this.courseForm.value,
        status: 'ACTIVE'
      };

      console.log('Sending course data:', courseData);

      this.authService.addCourse(courseData).subscribe(
        response => {
          console.log('Course added successfully', response);
          alert('Course Added Successfully');
          this.courseForm.reset();
          // After successfully adding the course, fetch courses again to update the list
          this.fetchCourses();
        },
        error => {
          console.error('Error adding course', error); // Log the full error response
          alert(error.message || 'An error occurred while adding the course.');
        }
      );
    }
  }
}
