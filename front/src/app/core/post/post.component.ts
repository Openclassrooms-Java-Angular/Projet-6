import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true }) post!: Post;

  constructor(private router: Router) { }

  truncateText(text: string, maxLines: number = 5): string {
    // limite à environ 5 lignes (environ 300 caractères, ajustable)
    const limit = maxLines * 60;
    return text.length > limit ? text.substring(0, limit) + '…' : text;
  }

  openPost(): void {
    //alert('Ouverture de l\'article : ' + this.post.id);
    this.router.navigate(['/posts', this.post.id]);
  }
}
