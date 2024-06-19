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
  registerModel: any = {};
  loginModel: any = {};

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

  onRegister() {
    this.authService.register(this.registerModel).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Registered',
          showConfirmButton: false,
          timer: 1500
        });
        this.registerModel = {};
      },
      (error: any) => {
        console.error('Registration failed', error);
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Registration Failed',
          text: error.error.message || error.error,
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
  

  onLogin() {
    this.authService.login(this.loginModel).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        console.error('Login failed', error);
        if (error.message === 'User not found' || error.message === 'Invalid credentials') {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Incoreect username or password!",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          alert('Login failed. Please try again later.');
        }
      }
    );
  }
}
