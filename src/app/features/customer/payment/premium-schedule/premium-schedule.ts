import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../../core/services/payment';

@Component({
  selector: 'app-premium-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './premium-schedule.html',
  styleUrl: './premium-schedule.scss'
})
export class PremiumSchedule implements OnInit {

  policies: any[] = [];
  schedules: any[] = [];

  selectedPolicyId: number = 0;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.paymentService.getMyPolicies().subscribe({
      next: (res: any) => {
        this.policies = res.data;

        if (this.policies.length > 0) {
          this.selectedPolicyId = this.policies[0].policyId;
          this.loadPremiumSchedules();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onPolicyChange(): void {
    this.loadPremiumSchedules();
  }

  loadPremiumSchedules(): void {
    if (!this.selectedPolicyId) {
      return;
    }

    this.paymentService
      .getMyPremiumSchedules(this.selectedPolicyId)
      .subscribe({
        next: (res: any) => {
          this.schedules = res.data;
        },
        error: (err:any) => {
          console.log(err);
          this.schedules = [];
        }
      });
  }
}

// Aniket 