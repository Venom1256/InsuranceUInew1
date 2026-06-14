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
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.scss']
})
export class AdminSidebarComponent {

  menuItems: MenuItem[] = [

    {
      name: 'Dashboard',
      route: '/admin/dashboard',
      icon: 'bi-speedometer2'
    },

    {
      name: 'Agents',
      route: '/admin/agents',
      icon: 'bi-people-fill',
      children: [
        {
          name: 'Create Agent',
          route: '/admin/agents/create',
          icon: 'bi-person-plus'
        },
        {
          name: 'Agent List',
          route: '/admin/agents/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Customers',
      route: '/admin/customers',
      icon: 'bi-person-lines-fill',
      children: [
        {
          name: 'Customer List',
          route: '/admin/customers',
          icon: 'bi-list'
        },
        {
          name: 'Nominee List',
          route: '/admin/nominees',
          icon: 'bi-list'
        },
        {
          name: 'Address List',
          route: '/admin/address',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'KYC',
      route: '/admin/kyc',
      icon: 'bi-file-earmark-check',
      children: [
        {
          name: 'KYC List',
          route: '/admin/kyc-list',
          icon: 'bi-list-check'
        }
      ]
    },

    {
      name: 'Products',
      route: '/admin/products',
      icon: 'bi-box-seam',
      children: [
        {
          name: 'Add Product',
          route: '/admin/products/create',
          icon: 'bi-plus-circle'
        },
        {
          name: 'Product List',
          route: '/admin/products/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Policies',
      route: '/admin/policies',
      icon: 'bi-file-earmark-text',
      children: [
        {
          name: 'Policy List',
          route: '/admin/policies/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Claims',
      route: '/admin/claims',
      icon: 'bi-exclamation-triangle',
      children: [
        {
          name: 'All Claims',
          route: '/admin/claims/list',
          icon: 'bi-list'
        },
        {
          name: 'Health Claims',
          route: '/admin/health-claims',
          icon: 'bi-heart-pulse'
        },
        {
          name: 'Life Claims',
          route: '/admin/life-claims',
          icon: 'bi-heart-pulse'
        },
        {
          name: 'Claim Investigation',
          route: '/admin/claim-investigation',
          icon: 'bi-search'
        },
        {
          name: 'Claim Approval',
          route: '/admin/claim-approval',
          icon: 'bi-check-circle'
        },
        {
          name: 'Claim Settlement',
          route: '/admin/claim-settlement',
          icon: 'bi-cash-stack'
        }
      ]
    }

  ];

  expandedMenu: string | null = null;

  toggleMenu(name: string): void {
    this.expandedMenu = this.expandedMenu === name ? null : name;
  }

  isExpanded(name: string): boolean {
    return this.expandedMenu === name;
  }
}