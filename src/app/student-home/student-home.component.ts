import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
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
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  enrolls: Enrolls[] = [];
  student: Student[]= [];
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  loginStudentEnrolledCourses: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.loadStudentEnrolledCourses();
    this.fetchCourses();
    this.openCourse(new Event('click'), 'Enrolled');
  }
  
  loadStudentEnrolledCourses(): void {
    const studentId = localStorage.getItem('studentId');
    console.log('Retrieved studentId from localStorage:', studentId);
    
    if (studentId) {
      this.http.get<any[]>(`${this.authService.baseUrl}/api/enrolledCourses/${studentId}`)
        .subscribe(
          courses => {
            console.log('Courses fetched from API:', courses); // Log the fetched courses
            this.loginStudentEnrolledCourses = courses;
          },
          error => {
            console.error('Error fetching courses:', error);
          }
        );
    } else {
      console.error('Student ID not found in localStorage');
    }
  }   

  fetchCourses() {
    this.authService.getAllActiveCourses().subscribe(
      (courses: any[]) => {
        this.courses = courses;
        this.filteredCourses = courses; // Initialize filteredCourses with all courses
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }

  openCourse(evt: Event, tabName: string) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    (document.getElementById(tabName) as HTMLElement).style.display = "block";
    (evt.currentTarget as HTMLElement).className += " active";
  }

  async enroll(courseId: number) {
    console.log('Enrolling in course with ID:', courseId);
    const { value: key } = await Swal.fire({
      title: "Enter enrollment key",
      input: "text",
      inputPlaceholder: "Enter enrollment key",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });

    if (key) {
      const studentId = localStorage.getItem('studentId');

      if (studentId) {
        this.authService.enrollCourse({ courseId, studentId, enrollmentKey: key }).subscribe(
          (response: any) => {
            Swal.fire('Success!', 'You have successfully enrolled in the course.', 'success');
            console.log('Enrollment successful', response);
          },
          (error: any) => {
            console.error('Enrollment failed', error);
            if (error.status === 400) {
              Swal.fire('Error!', 'Invalid enrollment key.', 'error');
            } else if (error.status === 404) {
              Swal.fire('Error!', 'Course not found.', 'error');
            } else {
              Swal.fire('Error!', 'Failed to enroll in the course.', 'error');
            }
          }
        );
      } else {
        Swal.fire('Error!', 'Student ID not found. Please log in again.', 'error');
      }
    }
  }

  async attend(courseId: number, enrollId: number) {
    const studentId = localStorage.getItem('studentId');
    console.log('Attending with ENROLL ID:', enrollId);
  
    console.log('Attend in course with ID:', courseId);
    console.log('With student id', studentId);
    const { value: code } = await Swal.fire({
      title: "Enter attendance code",
      input: "text",
      inputPlaceholder: "Enter attendance code",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });
  
    if (code) {
      const studentId = localStorage.getItem('studentId');
      if (studentId) {
        const attendanceData = {
          enroll: { enrollId },
          student_id: +studentId, // ensure this is a number
          course_id: courseId,
          attendanceCode: code
        };
        this.authService.attendCourse(attendanceData).subscribe(
          (response: any) => {
            Swal.fire('Success!', 'You have successfully attended the course.', 'success');
            console.log('Attendance successful', response);
          },
          (error: any) => {
            console.error('Attendance failed', error);
            if (error.status === 400) {
              Swal.fire('Error!', 'Invalid attendance code or course has expired.', 'error');
            } else if (error.status === 409) {
              Swal.fire('Error!', 'You have already attended this course.', 'error');
            } else if (error.status === 404) {
              Swal.fire('Error!', 'Course not found.', 'error');
            } else {
              Swal.fire('Error!', 'Failed to attend the course.', 'error');
              console.log(error);
            }
          }
        );
      } else {
        Swal.fire('Error!', 'Student ID not found. Please log in again.', 'error');
      }
    }
  }
  
  

}
