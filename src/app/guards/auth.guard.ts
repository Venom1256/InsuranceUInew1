import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Server: always allow
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    // Client: read token directly from localStorage (no service timing issues)
    const token = localStorage.getItem('token');

    if (!token) {
        return router.createUrlTree(['/login']);
    }

    // Check expiry directly
    try {
        const decoded: any = jwtDecode(token);
        if (decoded?.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            return router.createUrlTree(['/login']);
        }
    } catch {
        return router.createUrlTree(['/login']);
    }

    return true;
};