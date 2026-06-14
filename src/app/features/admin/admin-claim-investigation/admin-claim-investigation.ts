import {Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ClaimService} from '../../../core/services/claim.service';

@Component({
  selector: 'app-admin-claim-investigation',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin-claim-investigation.html',
  styleUrl: './admin-claim-investigation.scss'
})

export class AdminClaimInvestigationComponent
  implements OnInit {
  claims: any[] = [];
  investigationData: { [key: number]: any; } = {};

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
                (claim: any) =>
                  claim.status === 'DocumentApproved'
              );
          this.claims.forEach((claim: any) => {
            this.investigationData[
              claim.claimId
            ] = {
              findings: '',
              remark: '',
              recommendation: 'Approve'
            };
          });
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  investigateClaim(claimId: number) {
    const payload = {
      claimId: claimId,
      findings:
        this.investigationData[ claimId ]?.findings || '',
      remark: this.investigationData[ claimId ]?.remark || '',
      recommendation: this.investigationData[ claimId ]?.recommendation || ''
    };

    this.claimService .investigateClaim(payload) .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loadClaims();
        },

        error: (err: any) => {
          console.log(err);
          alert(
            err?.error?.message ||
            'Investigation Failed'
          );
        }
      });
  }
}