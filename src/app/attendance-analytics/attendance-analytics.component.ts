import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-attendance-analytics',
  templateUrl: './attendance-analytics.component.html',
  styleUrl: './attendance-analytics.component.css'
})
export class AttendanceAnalyticsComponent implements OnInit{

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const xValues = ["ERP", "DATABASES", "IT INNOVATION", "NETWORK", "LINUX"];
    const yValues = [55, 49, 44, 24, 15];
    const barColors = ["lightblue", "green", "blue", "orange", "brown"];

    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'STUDENT ATTENDANCES'
          }
        }
      }
    });
  }

}
