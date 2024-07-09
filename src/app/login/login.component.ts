import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  registerModel: any = {}
  loginModel: any = {}
  loginLecturerModel: any = {}
  loginStudentModel: any = {}


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const container = document.getElementById('container');
      const registerBtn = document.getElementById('register');
      const loginBtn = document.getElementById('login');

      registerBtn?.addEventListener('click', () => {
        container?.classList.add('active');
      });

      loginBtn?.addEventListener('click', () => {
        container?.classList.remove('active');
      });
    }
  }

  //student register method
  onRegister() {
    this.authService.register(this.registerModel).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
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
            title: "Registration Successfully"
          });
        this.registerModel = {};
      },
      (error: any) => {
        console.error('Registration failed', error);
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
          icon: "warning",
          title: error.error.message || error.error

        });
      }
    );
  }

  onLogin() {
    // Admin login
    this.authService.login(this.loginModel).subscribe(
        (response: any) => {
            console.log('Admin Login successful', response);
            if (response.message === 'Login successful') {
                this.router.navigate(['/home']);
                this.showToast('success', 'Login successfully');
            } else {
                this.showToast('error', 'Incorrect username or password');
            }
        },
        (error: any) => {
            console.error('Admin Login failed', error);
            this.showToast('warning', 'Incorrect username or password');
        }
    );

    // Lecturer login
    this.authService.lecturerLogin(this.loginLecturerModel).subscribe(
        (response: any) => {
            console.log('Lecturer Login successful', response);
            if (response.message === 'Login successful') {
                this.router.navigate(['/lecturerHome']);
                this.showToast('success', 'Login successfully');
            } else {
                this.showToast('error', 'Incorrect username or password');
            }
        },
        (error: any) => {
            console.error('Lecturer Login failed', error);
            this.showToast('warning', 'Incorrect username or password');
        }
    );

    // Student login
    this.authService.studentLogin(this.loginStudentModel).subscribe(
        (response: any) => {
            console.log('Student Login successful', response);
            if (response.message === 'Login successful') {
                localStorage.setItem('studentId', response.studentId);
                this.router.navigate(['/studentHome']);
                this.showToast('success', 'Login successfully');
            } else {
                this.showToast('error', 'Incorrect username or password');
            }
        },
        (error: any) => {
            console.error('Student Login failed', error);
            this.showToast('warning', 'Incorrect username or password');
        }
    );
}

private showToast(icon: 'success' | 'error' | 'warning' | 'info', title: string) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: icon,
        title: title
    });
}



}
