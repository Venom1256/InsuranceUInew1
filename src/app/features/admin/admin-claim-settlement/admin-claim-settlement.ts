import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClaimService } from '../../../core/services/claim.service';

@Component({
  selector: 'app-admin-claim-settlement',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin-claim-settlement.html',
  styleUrl: './admin-claim-settlement.scss'
})
export class AdminClaimSettlementComponent
  implements OnInit {
  claims: any[] = [];
  selectedClaim: any = null;
  paymentReference = '';

  constructor( private claimService: ClaimService ) { }

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims() {
    this.claimService .getAllClaims() .subscribe({
        next: (res: any) => {
          this.claims =
            (res.data || [])
              .filter(
                (x: any) =>
                  x.status === 'Approved'
              );
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

  openSettlementModal(claim: any) {
    this.selectedClaim = claim;
    this.paymentReference = '';
  }

  settleClaim() {
    const payload = {
      claimId: this.selectedClaim.claimId,
      paymentReference: this.paymentReference
    };

    this.claimService.settleClaim(payload).subscribe({
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