import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DocumentService } from '../../../core/services/document.service';
import { ClaimService } from '../../../core/services/claim.service';

import { Document } from '../../../core/models/document.model';

@Component({
  selector: 'app-life-claim-upload',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './life-claim-upload.html',
  styleUrl: './life-claim-upload.scss'
})
export class LifeClaimUploadComponent implements OnInit {

  selectedFile!: File;
  documentType = '';
  documents: Document[] = [];
  claims: any[] = [];
  selectedClaimId = 0;
  selectedClaim: any = null;
  availableDocuments: string[] = [
    'Death Certificate'
  ];

  constructor(
    private documentService: DocumentService,
    private claimService: ClaimService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadClaims();

  }

  loadClaims() {

    this.claimService.getMyClaims().subscribe({

        next: (res: any) => {

          this.claims = (res.data || res)
            .filter(
              (x: any) =>
                x.productType === 'Life'
            );

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  onClaimChange() {

    this.selectedClaim =
      this.claims.find(
        x => x.claimId == this.selectedClaimId
      );

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
      'LifeClaim'
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

    this.documentService
      .uploadDocument(formData)
      .subscribe({

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

    this.documentService
      .getDocuments(
        'LifeClaim',
        this.selectedClaimId
      )
      .subscribe({

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
                doc.documentType
              );

          this.availableDocuments = [
            'Death Certificate'
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