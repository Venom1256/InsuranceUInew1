import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CustomerService } from '../../../core/services/customer.service';
import { DocumentService } from '../../../core/services/document.service';
import { RiskProfileService } from '../../../core/services/risk-profile';

@Component({
  selector: 'app-admin-kyc-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-kyc-details.html',
  styleUrl: './admin-kyc-details.scss'
})
export class AdminKycDetailsComponent implements OnInit {

  customerId!: number;
  customer: any = {};
  documents: any[] = [];
  riskProfile: any = null;
  remarks: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private documentService: DocumentService,
    private riskProfileService: RiskProfileService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.customerId = Number(
      this.route.snapshot.paramMap.get('customerId')
    );

    this.loadCustomer();

    this.loadDocuments();

    this.loadRiskProfile();
  }

  loadCustomer() {

    this.customerService
      .getCustomerById(this.customerId).subscribe({

        next: (res: any) => {
          this.customer = res.data;
          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log(err);
        }
      });

  }

  loadDocuments() {

    this.documentService.getDocuments( 'Customer', this.customerId ).subscribe({

        next: (res: any) => {
          this.documents = res.data || [];
          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

  loadRiskProfile() {

    this.riskProfileService.getRiskProfileByCustomerId(this.customerId).subscribe({

        next: (res: any) => {
          this.riskProfile = res.data;
          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log(err);
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
          this.loadCustomer();

        },

        error: (err: any) => {

          console.log(err);

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
          this.loadCustomer();

        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }
}