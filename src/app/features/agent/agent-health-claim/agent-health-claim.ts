import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClaimService } from '../../../core/services/claim.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-agent-health-claim',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './agent-health-claim.html',
  styleUrl: './agent-health-claim.scss'
})
export class AgentHealthClaimComponent implements OnInit {

  customers: any[] = [];
  selectedCustomerId = 0;
  selectedCustomer: any = null;
  policies: any[] = [];
  selectedPolicy: any = null;
  claim = {
    policyId: 0,
    claimAmount: 0,
    claimReason: '',
    raisedByType: 'Agent'
  };

  constructor(
    private customerService: CustomerService,
    private claimService: ClaimService
  ) { }

  ngOnInit(): void {

    this.loadCustomers();

  }

  loadCustomers() {

    this.customerService.getMyCustomers().subscribe({

        next: (res: any) => {
          this.customers = res.data || [];
        },

        error: (err: any) => {
          console.log(err);
        }

      });

  }

  onCustomerChange() {

    this.selectedCustomer =
      this.customers.find(
        x => x.customerId == this.selectedCustomerId
      );

    this.policies =
      (this.selectedCustomer?.policies || [])
        .filter(
          (p: any) =>
            p.productName ?.toLowerCase().includes('health')
        );

    this.selectedPolicy = null;
    this.claim = {
      policyId: 0,
      claimAmount: 0,
      claimReason: '',
      raisedByType: 'Agent'
    };

  }

  selectPolicy(policy: any) {
    this.selectedPolicy = policy;
    this.claim.policyId = policy.policyId;
  }

  raiseClaim() {

    if (this.claim.policyId === 0) {
      alert('Please Select Policy');
      return;
    }

    if (this.claim.claimAmount <= 0) {
      alert('Enter Valid Claim Amount');
      return;
    }

    if (!this.claim.claimReason.trim()) {
      alert('Enter Claim Reason');
      return;
    }

    this.claimService.raiseClaim(this.claim).subscribe({

        next: (res: any) => {
          alert(res.message);
          this.claim = {
            policyId: 0,
            claimAmount: 0,
            claimReason: '',
            raisedByType: 'Agent'
          };

          this.selectedPolicy = null;
          this.onCustomerChange();
        },

        error: (err: any) => {
          console.log(err);
          alert(
            err?.error?.message || 'Unable To Raise Claim'
          );
        }
      });
  }
}