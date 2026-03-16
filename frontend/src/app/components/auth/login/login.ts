import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    private router: Router
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
          localStorage.setItem('user', JSON.stringify({
            name: response.name,
            email: response.email,
            role: response.role
          }));
          this.isLoading.set(false);
          this.router.navigate(['/acontecendo']);
        },
        error: () => {
          this.errorMessage.set('Email ou senha incorretos.');
          this.isLoading.set(false);
        }
      });
  }
}
