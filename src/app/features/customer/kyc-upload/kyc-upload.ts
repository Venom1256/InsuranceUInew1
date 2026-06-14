import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DocumentService } from '../../../core/services/document.service';
import { CustomerService } from '../../../core/services/customer.service';

import { Document } from '../../../core/models/document.model';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './kyc-upload.html',
  styleUrl: './kyc-upload.scss'
})
export class DocumentUploadComponent implements OnInit {

  selectedFile!: File;
  documentType = '';
  documents: Document[] = [];
  customerId!: number;
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

    this.customerService.getMyProfile().subscribe({

        next: (res: any) => {
          this.customerId = res.data.customerId;
          this.loadDocuments();
          this.cdr.detectChanges();
        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  onFileSelected(event: any) {

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }

  }

  uploadDocument() {

    if (!this.documentType) {

      alert('Please select document type');
      return;

    }

    if (!this.selectedFile) {

      alert('Please select file');
      return;

    }

    const formData = new FormData();

    formData.append('EntityType', 'Customer');
    formData.append('EntityId', this.customerId.toString());
    formData.append('DocumentType', this.documentType);
    formData.append('File', this.selectedFile);

    this.documentService.uploadDocument(formData).subscribe({

        next: (res: any) => {

          alert(res.message);
          this.documentType = '';
          this.loadDocuments();

        },

        error: (err: any) => {

          alert(
            err?.error?.message ||
            'Something went wrong'
          );

        }

      });

  }

loadDocuments() {

  this.documentService.getDocuments( 'Customer', this.customerId )
    .subscribe({

      next: (res: any) => {
        this.documents = res.data || [];

        const uploadedDocs = this.documents
          .filter(doc =>
            doc.status === 'Pending' ||
            doc.status === 'Approved'
          )
          .map(doc => doc.documentType);

        this.availableDocuments = [
          'Aadhaar Card',
          'PAN Card',
          'Health Report'
        ].filter(
          doc => !uploadedDocs.includes(doc)
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