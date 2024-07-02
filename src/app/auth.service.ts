import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Course } from './courses/courses.component';
import { Lecturer } from './lecturers/lecturers.component';
import { Student } from './students/students.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  public baseUrl = 'http://localhost:8080';
  private isLoggedInStatus = false;

  constructor(private http: HttpClient) {}

  register(students: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, students);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, user).pipe(
      tap(response => {
        if (response.message === 'Login successful') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Store user role
          this.isLoggedInStatus = true;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }

  lecturerLogin(lecturer: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/lecturerLogin`, lecturer).pipe(
      tap(response => {
        if (response.message === 'Login successful') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('lecturerId', response.lecturerId); // Store lecturer ID
          this.isLoggedInStatus = true;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }

  studentLogin(student: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/studentLogin`, student).pipe(
      tap(response => {
        if (response.message === 'Login successful') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('lecturerId', response.lecturerId); // Store lecturer ID
          this.isLoggedInStatus = true;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }
  

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.isLoggedInStatus = false;
      })
    );
  }

  checkSession(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/checkSession`).pipe(
      tap(response => {
        this.isLoggedInStatus = response.message === 'User is logged in';
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoggedInStatus = false;
        return throwError(() => new Error(error.error.message || 'Session check failed'));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

//   login(user: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/auth/login`, user).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('Login error:', error);
//         return throwError(() => new Error(error.error.message || 'Login failed'));
//       })
//     );
// }

  

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses/add`, course);
  }

  addLecturer(lecturer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/lecturers/add`, lecturer);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses/get`);
  }

  getAllLecturers(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(`${this.baseUrl}/lecturers/get`);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/auth/get`);
  }

  updateCourseStatus(courseId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/courses/update/${courseId}`, { status });
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/courses/delete/${courseId}`);
  }
  

}
