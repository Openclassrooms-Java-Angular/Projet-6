import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from 'src/app/core/navbar/navbar.component';
import { TopicProfileComponent } from 'src/app/core/topic-profile/topic-profile.component';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TopicProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  topics: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
  }

  initForm() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  loadProfile() {
    this.userService.getProfile().subscribe(user => {
      this.profileForm.patchValue({
        username: user.username,
        email: user.email
      });
      this.topics = user.subscriptions || [];
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    this.userService.updateProfile(this.profileForm.value)
      .subscribe(() => {
        console.log('Profil mis à jour');
      });
  }

  unsubscribe(topicId: number) {
    this.topics = this.topics.filter(t => t.id !== topicId);
  }
}