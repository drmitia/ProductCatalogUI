import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = signal<string | null>(null);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.errorMessage.set(null);

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.authService.fetchCurrentUser().subscribe({
          next: () => {
            this.router.navigate(['/']);
          }
        });
      },
      error: () => {
        this.errorMessage.set('Невірний email або пароль');
      }
    });
  }
}