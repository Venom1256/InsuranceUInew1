import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClaimService } from '../../../core/services/claim.service';
import { PolicyService } from '../../../core/services/policy.service';

@Component({
  selector: 'app-health-claim',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './life-claim.html',
  styleUrl: './life-claim.scss'
})
export class LifeClaimComponent implements OnInit {

  policies: any[] = [];

  selectedPolicy: any = null;

  claim = {

    policyId: 0,

    claimAmount: 0,

    claimReason: '',

    raisedByType: 'Customer'

  };

  constructor(
    private claimService: ClaimService,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {

    this.loadPolicies();

  }

  loadPolicies() {

    this.policyService
      .getMyPolicies()
      .subscribe({

        next: (res: any) => {

          this.policies =
            (res.data || []).filter(
              (x: any) =>
                x.productName
                  .toLowerCase()
                  .includes('life')
            );

        },

        error: (err: any) => {

          console.log(err);

          alert('Unable to load policies');

        }

      });

  }

  onPolicyChange() {

    this.selectedPolicy =
      this.policies.find(
        p => p.policyId == this.claim.policyId
      );

    if (this.selectedPolicy) {

      this.claim.claimAmount =
        this.selectedPolicy.coverageAmount;

    } else {

      this.claim.claimAmount = 0;

    }

  }

  raiseClaim() {

    if (this.claim.policyId === 0) {

      alert('Please select a policy');

      return;

    }

    if (!this.claim.claimReason?.trim()) {

      alert('Please enter claim reason');

      return;

    }

    this.claimService
      .raiseClaim(this.claim)
      .subscribe({

        next: (res: any) => {

          alert(res.message);

          this.claim = {

            policyId: 0,

            claimAmount: 0,

            claimReason: '',

            raisedByType: 'Customer'

          };

          this.selectedPolicy = null;

        },

        error: (err: any) => {

          console.log(err);

          alert(
            err?.error?.message ||
            err?.error?.Message ||
            'Unable to raise claim'
          );

        }

      });

  }

}