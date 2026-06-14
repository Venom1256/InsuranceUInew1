import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../core/services/token.service';

export const roleGuard: CanActivateFn = (route) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    const userRole = tokenService.getRole();
    const expectedRole = route.data['role'];

    if (userRole !== expectedRole) {
        if (userRole === 'Admin') {
            router.navigate(['/admin/dashboard']);
        } else if (userRole === 'Agent') {
            router.navigate(['/agent/dashboard']);
        } else if (userRole === 'Customer') {
            router.navigate(['/customer/dashboard']);
        } else {
            router.navigate(['/login']);
        }
        return false;
    }

    return true;
};