import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {

  dashboardData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (res: any) => {
        this.dashboardData = res.data;
        console.log('Dashboard Response:', this.dashboardData);
      },
      error: (err: any) => {
        console.error('Dashboard Error:', err);
      }
    });
  }
}