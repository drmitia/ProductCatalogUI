import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentUser, LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';

const TOKEN_KEY = 'accessToken';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isAdmin$ = this.currentUser$.pipe(
    map((user) => user !== null && user.roles.includes('Admin'))
  );

  constructor(private http: HttpClient) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request).pipe(
      tap((response) => {
        this.setToken(response.accessToken);
      })
    );
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/register`, request);
  }

  fetchCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${environment.apiUrl}/auth/me`).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    if (user === null) {
      return false;
    }

    return user.roles.includes('Admin');
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }
}