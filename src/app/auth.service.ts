import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authToken: string | null = null;
  private apiUrl = 'https://localhost:443/api/v1/auth';


  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: username,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/login`, body, { headers: headers });
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/register`, user, { headers: headers });
  }

  logout(): void {
    
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.success("Nastąpiło wylogowanie", "Sukces");
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
