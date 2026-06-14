import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../../../core/services/customer.service';
import { DocumentService } from '../../../core/services/document.service';

import { Document } from '../../../core/models/document.model';

@Component({
  selector: 'app-agent-health-claim-upload',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './agent-health-claim-upload.html',
  styleUrl: './agent-health-claim-upload.scss'
})
export class AgentHealthClaimUploadComponent implements OnInit {

  customers: any[] = [];
  claims: any[] = [];
  documents: Document[] = [];
  selectedCustomerId = 0;
  selectedCustomer: any = null;
  selectedClaimId = 0;
  selectedClaim: any = null;
  selectedFile!: File;
  documentType = '';

  availableDocuments: string[] = [
    'Hospital Bill',
    'Bill Summary',
    'Hospital Report'
  ];

  constructor(
    private customerService: CustomerService,
    private documentService: DocumentService,
    private cdr: ChangeDetectorRef
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

    this.selectedClaimId = 0;
    this.selectedClaim = null;
    this.documents = [];
    this.selectedCustomer =
      this.customers.find(
        x => x.customerId == this.selectedCustomerId
      );

    this.claims =
      this.selectedCustomer?.claims
        ?.filter(
          (x: any) =>
            x.productType === 'Health'
        ) || [];
  }

  selectClaim(claim: any) {
    this.selectedClaim = claim;
    this.selectedClaimId = claim.claimId;
    this.loadDocuments();
  }

  onFileSelected(event: any) {

    if (event.target.files.length > 0) {
      this.selectedFile =
        event.target.files[0];
    }
  }

  uploadDocument() {

    if (this.selectedClaimId === 0) {
      alert('Please Select Claim');
      return;
    }

    if (!this.documentType) {
      alert('Please Select Document Type');
      return;
    }

    if (!this.selectedFile) {
      alert('Please Select File');
      return;
    }

    const formData = new FormData();

    formData.append(
      'EntityType',
      'HealthClaim'
    );

    formData.append(
      'EntityId',
      this.selectedClaimId.toString()
    );

    formData.append(
      'DocumentType',
      this.documentType
    );

    formData.append(
      'File',
      this.selectedFile
    );

    this.documentService.uploadDocument(formData).subscribe({

        next: (res: any) => {
          alert(res.message);
          this.documentType = '';
          this.loadDocuments();
        },

        error: (err: any) => {
          console.log(err);
          alert(
            err?.error?.message ||
            'Upload Failed'
          );

        }

      });

  }

  loadDocuments() {

    if (this.selectedClaimId === 0)
      return;

    this.documentService.getDocuments( 'HealthClaim', this.selectedClaimId ).subscribe({

        next: (res: any) => {
          this.documents = res.data || [];

          const uploadedDocs = this.documents
              .filter(doc =>
                doc.status === 'Pending' ||
                doc.status === 'Approved'
              )
              .map(doc =>
                doc.documentType
              );

          this.availableDocuments = [
            'Hospital Bill',
            'Bill Summary',
            'Hospital Report'
          ].filter(
            doc =>
              !uploadedDocs.includes(doc)
          );

          this.cdr.detectChanges();

        },

        error: (err: any) => {
          console.log(err);
        }

      });

  }

  viewDocument(documentId: number) {

    this.documentService
      .viewDocument(documentId);

  }

  downloadDocument(documentId: number) {

    this.documentService
      .downloadDocument(documentId);

  }

}