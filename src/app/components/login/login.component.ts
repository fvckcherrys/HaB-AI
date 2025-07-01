import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoggedIn = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoggedIn = true;
      const user = {
        username: this.email?.value,
        password: this.password?.value,
      };
      this.loginService.login(user).subscribe((res) => {
        console.log(res);
        sessionStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
