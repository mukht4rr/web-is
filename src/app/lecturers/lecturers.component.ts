import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

export interface Lecturer {
  lecturerId: number;
  lecturerName: string;
  lecturerEmail: string;
  lecturerPhone: number;
  lecturerPassword: string;
}

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit {
  lecturerForm: FormGroup;
  lecturers: Lecturer[] = [];
  filteredLecturers: Lecturer[] = [];
  searchText: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.lecturerForm = this.fb.group({
      lecturerName: ['', Validators.required],
      lecturerEmail: ['', Validators.required],
      lecturerPhone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchLecturers();
  }

  fetchLecturers() {
    this.authService.getAllLecturers().subscribe(
      (lecturers: Lecturer[]) => {
        this.lecturers = lecturers;
        this.filteredLecturers = lecturers; // Initialize filteredLecturers with all lecturers
      },
      error => {
        console.error('Error fetching lecturers', error);
      }
    );
  }

  onSubmit() {
    if (this.lecturerForm.valid) {
      const lecturerData = {
        ...this.lecturerForm.value,
        lecturerPassword: '12345678' // Hardcoded password for demonstration
      };

      console.log('Sending lecturer data:', lecturerData);

      this.authService.addLecturer(lecturerData).subscribe(
        response => {
          console.log('Lecturer added successfully', response);
          // alert('Lecturer Added Successfully');
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
            title: "Lecturer added successfully"
          });
          this.lecturerForm.reset();
          this.fetchLecturers(); // Fetch updated list
        },
        error => {
          console.error('Error adding lecturer', error);
          alert(error.message || 'An error occurred while adding the lecturer.');
        }
      );
    }
  }

  onSearch() {
    if (this.searchText) {
      this.filteredLecturers = this.lecturers.filter(lecturer =>
        lecturer.lecturerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        lecturer.lecturerEmail.toLowerCase().includes(this.searchText.toLowerCase()) ||
        lecturer.lecturerPhone.toString().includes(this.searchText)
      );
    } else {
      this.filteredLecturers = this.lecturers;
    }
  }
}
