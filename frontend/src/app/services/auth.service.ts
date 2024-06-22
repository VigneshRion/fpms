// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { loadTokenSuccess, logout } from '../store/actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/user';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(map((response) => response.token));
  }

  register(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/register`, data)
      .pipe(map((response) => response.token));
  }

  logout(): void {
    localStorage.removeItem('user.token');
    this.store.dispatch(logout());
  }

  loadToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(loadTokenSuccess({ token }));
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
}
