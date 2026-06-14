import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  name: string;
  route: string;
  icon: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './customer-sidebar.html',
  styleUrls: ['./customer-sidebar.scss']
})
export class CustomerSidebarComponent {

  menuItems: MenuItem[] = [

    {
      name: 'Dashboard',
      route: '/customer/dashboard',
      icon: 'bi-speedometer2'
    },

    {
      name: 'Profile',
      route: '/customer/profile',
      icon: 'bi-person-circle',
      children: [
        {
          name: 'Profile',
          route: '/customer/profile',
          icon: 'bi-person-circle'
        },
        {
          name: 'Address',
          route: '/customer/address',
          icon: 'bi-geo-alt'
        },
        {
          name: 'Nominee',
          route: '/customer/nominee',
          icon: 'bi-people'
        }
      ]
    },

    {
      name: 'Policies',
      route: '/customer/policies',
      icon: 'bi-file-earmark-text',
      children: [
        {
          name: 'My Policies',
          route: '/customer/policies/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Payments',
      route: '/customer/payments',
      icon: 'bi-credit-card',
      children: [
        {
          name: 'Payment History',
          route: '/customer/payments/history',
          icon: 'bi-clock-history'
        },
        {
          name: 'Premium Schedule',
          route: '/customer/payments/premium-schedule',
          icon: 'bi-calendar-check'
        }
      ]
    },

    {
      name: 'KYC',
      route: '/customer/kyc-upload',
      icon: 'bi-person-vcard',
      children: [
        {
          name: 'Upload KYC',
          route: '/customer/kyc-upload',
          icon: 'bi-upload'
        }
      ]
    },

    {
      name: 'Claims',
      route: '/customer/claims',
      icon: 'bi-exclamation-triangle',
      children: [
        {
          name: 'Health Claim',
          route: '/customer/health-claim',
          icon: 'bi-heart-pulse'
        },
        {
          name: 'Health Claim Upload',
          route: '/customer/health-claim-upload',
          icon: 'bi-upload'
        },
        {
          name: 'Life Claim',
          route: '/customer/life-claim',
          icon: 'bi-shield-heart'
        },
        {
          name: 'Life Claim Upload',
          route: '/customer/life-claim-upload',
          icon: 'bi-upload'
        }
      ]
    }

  ];

  expandedMenu: string | null = null;

  toggleMenu(name: string): void {
    this.expandedMenu =
      this.expandedMenu === name
        ? null
        : name;
  }

  isExpanded(name: string): boolean {
    return this.expandedMenu === name;
  }
}