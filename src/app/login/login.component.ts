import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
        // Reset the register form
        this.registerModel = {};
        // Optionally, redirect to login or another page
      },
      (error: any) => {
        console.error('Registration failed', error);
        // Show error message to the user
        alert(error.error);
      }
    );
  }
  
  onLogin() {
    this.authService.login(this.loginModel).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Login failed', error);
        // Show error message to the user
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}