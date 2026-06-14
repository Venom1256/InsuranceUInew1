import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClaimService } from '../../../core/services/claim.service';

@Component({
  selector: 'app-admin-claim-approval',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin-claim-approval.html',
  styleUrl: './admin-claim-approval.scss'
})
export class AdminClaimApprovalComponent implements OnInit {

  claims: any[] = [];
  selectedClaim: any = null;
  approvedAmount = 0;
  rejectReason = '';

  constructor( private claimService: ClaimService ) { }

  ngOnInit(): void { this.loadClaims(); }

  loadClaims() {

    this.claimService
      .getAllClaims().subscribe({
        next: (res: any) => {
          this.claims =
            (res.data || [])
              .filter(
                (x: any) =>
                  x.status === 'Under Investigation'
              );
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

  openApproveModal(claim: any) {
    this.selectedClaim = claim;
    this.approvedAmount =
      claim.claimAmount;
  }

  approveClaim() {
    const payload = {
      claimId: this.selectedClaim.claimId,
      approvedAmount: this.approvedAmount,
      approvedBy: 1
    };

    this.claimService
      .approveClaim(payload).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loadClaims();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  openRejectModal(claim: any) {
    this.selectedClaim = claim;
    this.rejectReason = '';
  }

  rejectClaim() {
    const payload = {
      claimId: this.selectedClaim.claimId,
      reason: this.rejectReason
    };

    this.claimService.rejectClaim(payload).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loadClaims();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

}