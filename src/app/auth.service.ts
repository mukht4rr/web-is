import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './courses/courses.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses/add`, course);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses/get`);
  }
}
