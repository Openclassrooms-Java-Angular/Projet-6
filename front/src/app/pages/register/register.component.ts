import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const request: RegisterRequest = this.registerForm.value;

    this.authService.register(request).subscribe({
      next: () => alert('Inscription réussie !'),
      error: (err) => {
        console.error(err);
        alert('Erreur d\'inscription');
      }
    });
  }
}
