import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from 'src/app/core/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    const request: LoginRequest = this.loginForm.value;

    this.authService.login(request).subscribe({
      next: (res) => {
        console.log('Token reçu :', res.token);
        localStorage.setItem('token', res.token);
        
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Erreur de connexion';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
