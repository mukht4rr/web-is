import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

export interface Course {
  courseId: number;
  courseTitle: string;
  courseCode: string;
  status: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courseForm: FormGroup;
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchText: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      courseTitle: ['', Validators.required],
      courseCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchCourses();
  }

  // fetch courses method
  fetchCourses() {
    this.authService.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        this.filteredCourses = courses; // Initialize filteredCourses with all courses
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }


  // add courses method
  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = {
        ...this.courseForm.value,
        status: 'ACTIVE'
      };

      console.log('Sending course data:', courseData);

      this.authService.addCourse(courseData).subscribe(
        response => {
          console.log('Course added successfully', response);
          // alert('Course Added Successfully');
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
            title: "Course added successfully"
          });
          this.courseForm.reset();
          this.fetchCourses(); // Fetch updated list
        },
        error => {
          console.error('Error adding course', error);
          alert(error.message || 'An error occurred while adding the course.');
        }
      );
    }
  }

  // search courses method
  onSearch() {
    if (this.searchText) {
      this.filteredCourses = this.courses.filter(course =>
        course.courseTitle.toLowerCase().includes(this.searchText.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredCourses = this.courses;
    }
  }

  // check box to update status of the course whether active or not active
  toggleCourseStatus(course: Course) {
    if (course.status === 'ACTIVE') {
      course.status = 'NOT ACTIVE';
    } else {
      course.status = 'ACTIVE';
    }
    this.authService.updateCourseStatus(course.courseId, course.status).subscribe(
      response => {
        console.log('Course status updated successfully', response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course status updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.error('Error updating course status', error);
      }
    );
  }


  // delete course with embedded sweetalert
  confirmDelete(courseId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCourse(courseId);
      }
    });
  }

  deleteCourse(courseId: number) {
    this.authService.deleteCourse(courseId).subscribe(
      response => {
        Swal.fire({
          title: "Deleted!",
          text: "Course has been deleted.",
          icon: "success"
        });
        this.fetchCourses(); // Refresh the course list after deletion
      },
      error => {
        console.error('Error deleting course', error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the course.",
          icon: "error"
        });
      }
    );
  }
  

}
