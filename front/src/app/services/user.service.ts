import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users';
    private headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
    );

    constructor(private http: HttpClient) { }

    getProfile() {
        return this.http.get<any>(`${this.apiUrl}/me`, { headers: this.headers });
    }

    updateProfile(data: any) {
        return this.http.put(`${this.apiUrl}/me`, data, { headers: this.headers });
    }

    /*getSubscriptions() {
        return this.http.get<any[]>(`${this.apiUrl}/me/subscriptions`, { headers: this.headers });
    }*/
}