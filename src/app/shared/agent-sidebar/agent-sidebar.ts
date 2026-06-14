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
  selector: 'app-agent-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './agent-sidebar.html',
  styleUrls: ['./agent-sidebar.scss']
})
export class AgentSidebarComponent {

  menuItems: MenuItem[] = [

    {
      name: 'Dashboard',
      route: '/agent/dashboard',
      icon: 'bi-speedometer2'
    },

    {
      name: 'Customers',
      route: '/agent/customers',
      icon: 'bi-people-fill',
      children: [
        {
          name: 'Create Customer',
          route: '/agent/customers/create',
          icon: 'bi-person-plus'
        },
        {
          name: 'My Customers',
          route: '/agent/customers/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'KYC',
      route: '/agent/kyc',
      icon: 'bi-file-earmark-check',
      children: [
        {
          name: 'Upload KYC',
          route: '/agent/kyc-upload',
          icon: 'bi-cloud-upload'
        }
      ]
    },

    {
      name: 'Claims',
      route: '/agent/claims',
      icon: 'bi-file-medical',
      children: [
        {
          name: 'Health Claim',
          route: '/agent/health-claim',
          icon: 'bi-heart-pulse'
        },
        {
          name: 'Life Claim',
          route: '/agent/life-claim',
          icon: 'bi-shield-check'
        },
        {
          name: 'Upload Health Claim Docs',
          route: '/agent/health-claim-upload',
          icon: 'bi-upload'
        },
        {
          name: 'Upload Life Claim Docs',
          route: '/agent/life-claim-upload',
          icon: 'bi-upload'
        }
      ]
    },

    {
      name: 'Quotes',
      route: '/agent/quotes',
      icon: 'bi-calculator',
      children: [
        {
          name: 'Create Quote',
          route: '/agent/quotes/create',
          icon: 'bi-plus-circle'
        },
        {
          name: 'Quote List',
          route: '/agent/quotes/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Policies',
      route: '/agent/policies',
      icon: 'bi-file-earmark-text',
      children: [
        {
          name: 'My Policies',
          route: '/agent/policies/list',
          icon: 'bi-list'
        }
      ]
    },

    {
      name: 'Commissions',
      route: '/agent/commissions',
      icon: 'bi-cash-stack',
      children: [
        {
          name: 'Commission History',
          route: '/agent/commissions/history',
          icon: 'bi-clock-history'
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