import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:8080/api';
  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topics`, { headers: this.headers });
  }

  subscribe(topicId: number) {
    return this.http.post(`${this.apiUrl}/topics/${topicId}/subscribe`, {}, { headers: this.headers });
  }

  unsubscribe(topicId: number) {
    return this.http.delete(`${this.apiUrl}/topics/${topicId}/unsubscribe`, { headers: this.headers });
  }
}