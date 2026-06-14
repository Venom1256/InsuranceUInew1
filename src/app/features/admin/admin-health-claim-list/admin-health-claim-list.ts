import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClaimService } from '../../../core/services/claim.service';

@Component({
  selector: 'app-admin-health-claim-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-health-claim-list.html',
  styleUrl: './admin-health-claim-list.scss'
})
export class AdminHealthClaimListComponent implements OnInit {
  claims: any[] = [];

  constructor(
    private claimService: ClaimService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims() {

    this.claimService.getAllClaims().subscribe({

        next: (res: any) => {
          this.claims = (res.data || []).filter(
            (claim: any) =>
              claim.productType?.toLowerCase() === 'health'
          );
          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }
}