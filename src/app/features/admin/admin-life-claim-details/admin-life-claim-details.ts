import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ClaimService } from '../../../core/services/claim.service';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-admin-life-claim-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-life-claim-details.html',
  styleUrl: './admin-life-claim-details.scss'
})
export class AdminLifeClaimDetailsComponent implements OnInit {
  claimId!: number;
  claim: any = {};
  documents: any[] = [];
  remarks: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimService,
    private documentService: DocumentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.claimId = Number(
      this.route.snapshot.paramMap.get('claimId')
    );
    this.loadClaim();
    this.loadDocuments();

  }

  loadClaim() {

    this.claimService.getClaimById(this.claimId).subscribe({

        next: (res: any) => {
          this.claim = res.data;
          this.cdr.detectChanges();
        }
      });

  }

  loadDocuments() {

    this.documentService.getDocuments('LifeClaim', this.claimId).subscribe({

        next: (res: any) => {
          this.documents = res.data || [];
          this.cdr.detectChanges();
        }

      });

  }

  viewDocument(documentId: number) {

    this.documentService.viewDocument(documentId);

  }

  approveDocument(documentId: number) {

    const payload = {

      documentId: documentId,
      verifiedBy: 1,
      remark: this.remarks[documentId] || ''

    };

    this.documentService.approveDocument(payload).subscribe({

        next: (res: any) => {
          alert(res.message);
          this.loadDocuments();
        }

      });

  }

  rejectDocument(documentId: number) {

    const payload = {

      documentId: documentId,
      verifiedBy: 1,
      remark: this.remarks[documentId] || ''

    };

    this.documentService.rejectDocument(payload).subscribe({

        next: (res: any) => {
          alert(res.message);
          this.loadDocuments();
        }

      });

  }

}