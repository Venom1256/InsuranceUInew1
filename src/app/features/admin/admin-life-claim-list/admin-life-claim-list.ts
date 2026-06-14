import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClaimService } from '../../../core/services/claim.service';

@Component({
  selector: 'app-admin-life-claim-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-life-claim-list.html',
  styleUrl: './admin-life-claim-list.scss'
})
export class AdminLifeClaimListComponent implements OnInit {

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
              claim.productType?.toLowerCase() === 'life'
          );
          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

}