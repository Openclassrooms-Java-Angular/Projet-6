import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-create-post',
  standalone: true,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarComponent
  ],
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  topics: any[] = [];

  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private postService: PostService,
    private router: Router,
  ) {
    this.createPostForm = this.fb.group({
      topic: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.topicService.getAll().subscribe({
      next: data => this.topics = data,
      error: err => console.error(err)
    });
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      console.log('Form values:', this.createPostForm.value);
      this.postService.create(this.createPostForm.value).subscribe({
        next: (newPost: Post) => {
          console.log('Post créé avec succès :', newPost);
          // 🔥 redirection vers le post
          this.router.navigate(['/posts', newPost.id]);
        },
        error: err => console.error(err)
      });

    }
  }
}