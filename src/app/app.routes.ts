import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AgentLayoutComponent } from './layouts/agent-layout/agent-layout';
import { AgentDashboard } from './features/agent/agent-dashboard/agent-dashboard';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout';
import { CustomerDashboard } from './features/customer/customer-dashboard/customer-dashboard';
import { CreateAgentComponent } from './features/admin/create-agent/create-agent';
import { Pnf } from './pnf/pnf';
import { AgentCreateCustomerComponent } from './features/agent/create-customer/create-customer';
import { CustomerAddressComponent } from './features/customer/address/address';
import { SelfRegisterComponent } from './features/auth/register/register';
import { CustomerProfileComponent } from './features/customer/profile/profile';
import { NomineeComponent } from './features/customer/nominee/nominee';
import { NomineeAdminComponent } from './features/admin/nominee/nominee';
import { CustomerAdminComponent } from './features/admin/customer-list/customer-list';
import { AddressAdminComponent } from './features/admin/address/address';
import { PremiumSchedule } from './features/customer/payment/premium-schedule/premium-schedule';

export const routes: Routes = [

    // Auth Routes
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: SelfRegisterComponent }
        ]
    },

    // Admin Routes
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Admin' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboard },
            { path: 'agents/create', component: CreateAgentComponent },
            { path: 'customers', component: CustomerAdminComponent },
            { path: 'nominees', component: NomineeAdminComponent },
            { path: 'address', component: AddressAdminComponent }
        ]
    },

    // Agent Routes
    {
        path: 'agent',
        component: AgentLayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Agent' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AgentDashboard },
            { path: 'customers/create', component: AgentCreateCustomerComponent }
        ]
    },

    // Customer Routes
    {
        path: 'customer',
        component: CustomerLayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Customer' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: CustomerDashboard },

            { path: 'address', component: CustomerAddressComponent },
            { path: 'profile', component: CustomerProfileComponent },
            { path: 'nominee', component: NomineeComponent },

            // Payment Routes
            {
                path: 'payments',
                loadComponent: () =>
                    import('./features/customer/payment/payment')
                        .then(m => m.Payment)
            },

            {
                path: 'payments/history',
                loadComponent: () =>
                    import('./features/customer/payment/payment')
                        .then(m => m.Payment)
            },

            {
                path: 'payments/premium-schedule',
                component: PremiumSchedule
            }
        ]
    },

    // Fallback
    { path: '**', component: Pnf }
];