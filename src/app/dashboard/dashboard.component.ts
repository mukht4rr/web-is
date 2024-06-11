import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private baseUrl = 'http://localhost:8080';
  totalLecturers: number = 0;
  totalCourses: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTotalLecturers();
    this.fetchTotalCourses();
  }

  fetchTotalLecturers() {
    this.http.get<number>(`${this.baseUrl}/lecturers/count`).subscribe(
      (count: number) => {
        this.totalLecturers = count;
      },
      error => {
        console.error('Error fetching total lecturers', error);
      }
    );
  }

  fetchTotalCourses() {
    this.http.get<number>(`${this.baseUrl}/courses/count`).subscribe(
      (count: number) => {
        this.totalCourses = count;
      },
      error => {
        console.error('Error fetching total courses', error);
      }
    );
  }
}
