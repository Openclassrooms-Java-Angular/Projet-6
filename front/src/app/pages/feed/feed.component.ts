import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/Post.model';
import { PostService } from 'src/app/services/post.service';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PostComponent } from 'src/app/core/post/post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PostComponent, RouterLink, RouterModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  sortAsc = true;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getFeed(this.sortAsc).subscribe({
      next: (data) => {this.posts = data;console.log('Posts chargés :', this.posts)},
      error: (err) => console.error(err)
    });
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
    this.loadPosts();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  goToCreatePost() {
    this.router.navigate(['/create-post']);
  }

    navigateToCreatePost() {
    // forcer la navigation avec navigateByUrl
    this.router.navigateByUrl('/create-post');
  }
}