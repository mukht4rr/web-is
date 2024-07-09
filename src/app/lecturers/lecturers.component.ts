declare var $: any;

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
  editingLecturer: Lecturer | null = null;

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

  openAddLecturerModal() {
    this.editingLecturer = null;
    this.lecturerForm.reset();
    $('#exampleModal').modal('show');
  }

  closeModal() {
    this.lecturerForm.reset(); // Reset the form
    $('#exampleModal').modal('hide');
    $('#editLecturerModal').modal('hide');
  }

  openEditModal(lecturer: Lecturer) {
    console.log('Opening edit modal for lecturer:', lecturer); // Debugging line
    this.editingLecturer = lecturer;
    this.lecturerForm.patchValue({
      lecturerName: lecturer.lecturerName,
      lecturerEmail: lecturer.lecturerEmail,
      lecturerPhone: lecturer.lecturerPhone,
    });
    $('#editLecturerModal').modal('show');
  }

  fetchLecturers() {
    this.authService.getAllLecturers().subscribe(
      (lecturers: Lecturer[]) => {
        this.lecturers = lecturers;
        this.filteredLecturers = lecturers;
      },
      error => {
        console.error('Error fetching lecturers', error);
      }
    );
  }

  // add lecturer method
  onSubmit() {
    if (this.lecturerForm.valid) {
      if (this.editingLecturer) {
        // If editingCourse is set, update the existing course
        this.updateLecturer();
      } else {
        // Otherwise, add a new course
        this.addNewLecturer();
      }
    }
  }

  addNewLecturer() {
    if (this.lecturerForm.valid) {
      const lecturerData = {
        ...this.lecturerForm.value,
        lecturerPassword: '12345678'
      };

      console.log('Sending lecturer data:', lecturerData);

      this.authService.addLecturer(lecturerData).subscribe(
        response => {
          console.log('Lecturer added successfully', response);
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
          this.fetchLecturers();
          this.closeModal();
        },
        error => {
          console.error('Error adding lecturer', error);
          alert(error.message || 'An error occurred while adding the lecturer.');
        }
      );
    }
  }

  updateLecturer() {
    if (!this.editingLecturer) {
      console.error('No course selected for editing');
      return;
    }
    const updatedLecturerData = {
      ...this.editingLecturer,
      ...this.lecturerForm.value
    }; 
    console.log('Updating course data:', updatedLecturerData);
  
    this.authService.updateLecturer(this.editingLecturer.lecturerId, updatedLecturerData).subscribe(
      (response: any) => {
        console.log('Lecturer updated successfully', response);
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
          title: "Lecturer updated successfully"
        });
        this.lecturerForm.reset();
        this.editingLecturer = null;
        this.fetchLecturers(); // Fetch updated list
        this.closeModal(); // Close the modal after updating
      },
      (error: any) => {
        console.error('Error updating course', error);
        // this.showErrorAlert('An error occurred while updating the course.');
      }
    );
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
