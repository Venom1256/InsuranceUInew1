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
      route: '/customer/policies',
      icon: 'bi-file-earmark-text',
      children: [
        {
          name: 'Profile',
          route: 'profile',
          icon: 'bi-person-circle'
        },
        {
          name: 'Address',
          route: 'address',
          icon: 'bi-person-circle'
        },
        {
          name: 'Nominee',
          route: 'nominee',
          icon: 'bi-person-circle'
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
          name: 'My Premium Schedule',
          route: '/customer/payments/premium-schedule',
          icon: 'bi-calendar-check'
        }
      ]
    },

    {
      name: 'Claims',
      route: '/customer/claims',
      icon: 'bi-exclamation-triangle',
      children: [
        {
          name: 'Create Claim',
          route: '/customer/claims/create',
          icon: 'bi-plus-circle'
        },
        {
          name: 'My Claims',
          route: '/customer/claims/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Documents',
      route: '/customer/documents',
      icon: 'bi-folder',
      children: [
        {
          name: 'Upload Documents',
          route: '/customer/documents/upload',
          icon: 'bi-upload'
        },
        {
          name: 'My Documents',
          route: '/customer/documents/list',
          icon: 'bi-list'
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