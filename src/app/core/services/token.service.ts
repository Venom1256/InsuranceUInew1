import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_KEY = 'role';
  private readonly EMAIL_KEY = 'email';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  saveRole(role: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.ROLE_KEY, role);
    }
  }

  getRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.ROLE_KEY) || '';
    }
    return '';
  }

  saveEmail(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.EMAIL_KEY, email);
    }
  }

  getEmail(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.EMAIL_KEY) || '';
    }
    return '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.ROLE_KEY);
      localStorage.removeItem(this.EMAIL_KEY);
    }
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded || !decoded.exp) return true;
    return decoded.exp < Math.floor(Date.now() / 1000);
  }
}