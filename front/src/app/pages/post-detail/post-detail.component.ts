import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from 'src/app/core/navbar/navbar.component';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];

  commentForm: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPost(id);
    this.loadComments(id);
  }

  loadPost(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: data => {
        console.log('Données reçues =', data);
        this.post = data;
      },
      error: err => console.error(err)
    });
  }

  loadComments(id: number): void {
    this.postService.getCommentsByPostId(id).subscribe({
      next: data => {
        this.comments = data;
      },
      error: err => console.error(err)
    });
  }

  addComment(): void {
    if (this.commentForm.invalid || !this.post?.id) return;

    this.postService.addComment(this.post.id, this.commentForm.value).subscribe({
      next: (newComment) => {
        this.commentForm.reset();

        // Ajout direct dans la liste affichée
      this.comments.push(newComment);
      },
      error: err => console.error(err)
    });
  }
}