import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  generos = [
    'Romance', 'Ficção Científica', 'Fantasia', 'Terror', 'Poesia',
    'Ensaio', 'Biografia', 'Conto', 'Crônica', 'Literatura Estrangeira',
    'Literatura Brasileira', 'Psicanálise', 'Antropologia', 'Filosofia'
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      profession: [''],
      preferredGenre: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      birthDate: this.registerForm.value.birthDate,
      profession: this.registerForm.value.profession,
      preferredGenre: this.registerForm.value.preferredGenre,
      password: this.registerForm.value.password
    };

    this.http.post<any>('http://localhost:8080/api/auth/register', payload)
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
          this.errorMessage.set('Não foi possível completar o cadastro.');
          this.isLoading.set(false);
        }
      });
  }
}
