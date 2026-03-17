import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.http.post<any>('http://localhost:8080/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          const user = {
            name: response.name,
            email: response.email,
            role: response.role
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.currentUser.set(user);
          this.isLoading.set(false);
          this.router.navigate(['/acontecendo']);
        },
        error: () => {
          this.errorMessage.set('Credenciais inválidas.');
          this.isLoading.set(false);
        }
      });
  }
}
