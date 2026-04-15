import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true }) post!: Post;

  constructor(private router: Router) { }

  openPost(): void {
    this.router.navigate(['/posts', this.post.id]);
  }
}
