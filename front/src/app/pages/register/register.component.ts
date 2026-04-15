import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from 'src/app/core/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
      private router: Router
) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    this.errorMessage = '';

    const request: RegisterRequest = this.registerForm.value;

    this.authService.register(request).subscribe({
      next: (res) => {
        console.log('Token reçu :', res.token);
        localStorage.setItem('token', res.token);
        
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Erreur lors de l\'inscription.';
      }
    });
  }
}
