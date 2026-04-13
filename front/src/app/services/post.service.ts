import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../models/Post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:8080/api';
  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );

  constructor(private http: HttpClient) { }

  getFeed(asc: boolean): Observable<Post[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/feed?sort=${asc ? 'asc' : 'desc'}`, { headers: this.headers }).pipe(
      map(items =>
        items.map(item => new Post(
          item.id,
          item.title,
          item.createdAt,
          item.authorUsername,
          item.content,
          item.topicTitle,
          item.comments
        ))
      )
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`, { headers: this.headers }).pipe(
      map(data => new Post(
        data.id,
        data.title,
        data.createdAt,
        data.authorUsername,
        data.content,
        data.topicTitle,
        data.comments
      ))
    );
  }

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${id}/comments`, { headers: this.headers });
  }

  addComment(postId: number, payload: { content: string | null }): Observable<any> {
    console.log(this.headers);
    return this.http.post(`${this.apiUrl}/posts/${postId}/comments`, payload, { headers: this.headers });
  }

  create(post: any) {
    return this.http.post<Post>(
      `${this.apiUrl}/posts`, 
      {
        topicId: post.topic,
        title: post.title,
        content: post.content
      },
      { headers: this.headers }
    );
  }
}