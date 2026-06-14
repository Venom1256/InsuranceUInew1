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
import { DocumentUploadComponent } from './features/customer/kyc-upload/kyc-upload';
import { HealthClaimUploadComponent } from './features/customer/health-claim-upload/health-claim-upload';
import { LifeClaimUploadComponent } from './features/customer/life-claim-upload/life-claim-upload';
import { AdminKycListComponent } from './features/admin/admin-kyc-list/admin-kyc-list';
import { AdminKycDetailsComponent } from './features/admin/admin-kyc-details/admin-kyc-details';
import { AdminHealthClaimListComponent } from './features/admin/admin-health-claim-list/admin-health-claim-list';
import { AdminLifeClaimListComponent } from './features/admin/admin-life-claim-list/admin-life-claim-list';
import { AdminHealthClaimDetailsComponent } from './features/admin/admin-health-claim-details/admin-health-claim-details';
import { AdminLifeClaimDetailsComponent } from './features/admin/admin-life-claim-details/admin-life-claim-details';
import { AdminClaimInvestigationComponent } from './features/admin/admin-claim-investigation/admin-claim-investigation';
import { AdminClaimApprovalComponent } from './features/admin/admin-claim-approval/admin-claim-approval';
import { AdminClaimSettlementComponent } from './features/admin/admin-claim-settlement/admin-claim-settlement';
import { LifeClaimComponent } from './features/customer/life-claim/life-claim';
import { HealthClaimComponent } from './features/customer/health-claim/health-claim';
import { AgentKycUploadComponent } from './features/agent/agent-kyc-upload/agent-kyc-upload';
import { AgentHealthClaimUploadComponent } from './features/agent/agent-health-claim-upload/agent-health-claim-upload';
import { AgentLifeClaimUploadComponent } from './features/agent/agent-life-claim-upload/agent-life-claim-upload';
import { AgentHealthClaimComponent } from './features/agent/agent-health-claim/agent-health-claim';
import { AgentLifeClaimComponent } from './features/agent/agent-life-claim/agent-life-claim';

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
            { path: 'address', component: AddressAdminComponent },
            { path: 'kyc-list', component: AdminKycListComponent },
            { path: 'kyc-details/:customerId', component: AdminKycDetailsComponent },
            { path: 'health-claims', component: AdminHealthClaimListComponent },
            { path: 'life-claims', component: AdminLifeClaimListComponent },
            { path: 'health-claim-details/:claimId', component: AdminHealthClaimDetailsComponent },
            { path: 'life-claim-details/:claimId', component: AdminLifeClaimDetailsComponent },
            { path: 'claim-investigation', component: AdminClaimInvestigationComponent },
            { path: 'claim-approval', component: AdminClaimApprovalComponent },
            { path: 'claim-settlement', component: AdminClaimSettlementComponent },
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
            { path: 'customers/create', component: AgentCreateCustomerComponent },
            { path: 'kyc-upload', component: AgentKycUploadComponent },
            { path: 'health-claim', component: AgentHealthClaimComponent },
            { path: 'life-claim', component: AgentLifeClaimComponent },
            { path: 'health-claim-upload', component: AgentHealthClaimUploadComponent },

{
  path: 'life-claim-upload',
  component: AgentLifeClaimUploadComponent
},
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
            { path: 'payments', loadComponent: () =>
                    import('./features/customer/payment/payment')
                        .then(m => m.Payment)
            },
            {
                path: 'payments/history', loadComponent: () =>
                    import('./features/customer/payment/payment')
                        .then(m => m.Payment)
            },
            { path: 'payments/premium-schedule', component: PremiumSchedule },
            { path: 'kyc-upload', component: DocumentUploadComponent },
            { path: 'health-claim-upload', component: HealthClaimUploadComponent },
            { path: 'life-claim-upload', component: LifeClaimUploadComponent },
            { path: 'life-claim', component: LifeClaimComponent },
            { path: 'health-claim', component: HealthClaimComponent },
        ]
    },

    // Fallback
    { path: '**', component: Pnf }
];