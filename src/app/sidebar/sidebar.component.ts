import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userRole: string | null = '';
  userName: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.userName = localStorage.getItem('username');
    console.log('User role:', this.userRole);
    console.log('User Name', this.userName);
    // Ensure you handle cases where userRole might not be immediately available
    if (!this.userRole) {
      // Example fallback logic if role is not set
      this.userRole = 'student'; // Default to 'student' or handle as per your app logic
    }
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.error('Logout failed', error);
    });
  }
}
