import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DocumentService } from '../../../core/services/document.service';
import { CustomerService } from '../../../core/services/customer.service';

import { Document } from '../../../core/models/document.model';

@Component({
  selector: 'app-agent-kyc-upload',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './agent-kyc-upload.html',
  styleUrl: './agent-kyc-upload.scss'
})
export class AgentKycUploadComponent implements OnInit {
  customers: any[] = [];
  selectedCustomerId = 0;
  selectedCustomer: any = null;
  selectedFile!: File;
  documentType = '';
  documents: Document[] = [];
  availableDocuments: string[] = [
    'Aadhaar Card',
    'PAN Card',
    'Health Report'
  ];

  constructor(
    private documentService: DocumentService,
    private customerService: CustomerService,
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

    this.selectedCustomer =
      this.customers.find(
        x => x.customerId == this.selectedCustomerId
      );

    if (this.selectedCustomerId > 0) {
      this.loadDocuments();
    }

  }

  onFileSelected(event: any) {

    if (event.target.files.length > 0) {
      this.selectedFile =
        event.target.files[0];
    }

  }

  uploadDocument() {

    if (this.selectedCustomerId === 0) {
      alert('Please Select Customer');
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
      'Customer'
    );

    formData.append(
      'EntityId',
      this.selectedCustomerId.toString()
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
          alert(
            err?.error?.message ||
            'Upload Failed'
          );
        }
      });
  }

  loadDocuments() {

    if (this.selectedCustomerId === 0)
      return;

    this.documentService.getDocuments( 'Customer', this.selectedCustomerId ).subscribe({

        next: (res: any) => {
          this.documents =
            res.data || [];

          const uploadedDocs =
            this.documents
              .filter(doc =>
                doc.status === 'Pending' ||
                doc.status === 'Approved'
              )
              .map(doc =>
                doc.documentType);

          this.availableDocuments = [
            'Aadhaar Card',
            'PAN Card',
            'Health Report'
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

    this.documentService.viewDocument(documentId);

  }

  downloadDocument(documentId: number) {

    this.documentService.downloadDocument(documentId);

  }

}