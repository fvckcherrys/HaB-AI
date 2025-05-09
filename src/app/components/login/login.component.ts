import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoggedIn = false;
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // TODO: Implement actual authentication
    if (this.username && this.password) {
      this.isLoggedIn = true;
      const user = {
        username: this.username,
        password: this.password,
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/home']);
    }
  }
}
