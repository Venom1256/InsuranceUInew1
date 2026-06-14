import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NomineeCreateDto, NomineeUpdateDto, NomineeListDto } from '../../../core/models/nominee';
import { NomineeService } from '../../../core/services/nominee';

@Component({
  selector: 'app-nominee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nominee.html',
  styleUrls: ['./nominee.scss']
})
export class NomineeComponent implements OnInit {
  nominees: NomineeListDto[] = [];
  loading = false;
  message = '';
  isError = false;
  isEditing = false;
  maxNominees = 3;

  nomineeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private nomineeService: NomineeService
  ) {
    this.nomineeForm = this.fb.group({
      nomineeId: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      relationship: ['', Validators.required],
      sharePercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.loadNominees();
  }

  get canAddMore(): boolean {
    return this.nominees.length < this.maxNominees;
  }

  get totalPercentage(): number {
    return this.nominees.reduce((sum, n) => sum + (n.sharePercentage || 0), 0);
  }

  private showMsg(msg: string, error = false): void {
    this.message = msg;
    this.isError = error;
    setTimeout(() => this.message = '', 4000);
  }

  loadNominees(): void {
    this.loading = true;
    this.nomineeService.getMyNominees().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.nominees = res.data || [];
        }
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Failed to load nominees.', true);
      }
    });
  }

  onSubmit(): void {
    if (this.nomineeForm.invalid) return;

    this.loading = true;
    const formValue = this.nomineeForm.value;

    if (this.isEditing) {
      const dto: NomineeUpdateDto = {
        nomineeId: formValue.nomineeId,
        name: formValue.name,
        relationship: formValue.relationship,
        sharePercentage: Number(formValue.sharePercentage)
      };

      this.nomineeService.updateNominee(dto).subscribe({
        next: (res) => {
          this.loading = false;
          this.showMsg(res.message);
          this.resetForm();
          this.loadNominees();
        },
        error: (err) => {
          this.loading = false;
          this.showMsg(err.error?.message || 'Update failed.', true);
        }
      });
    } else {
      const dto: NomineeCreateDto = {
        name: formValue.name,
        relationship: formValue.relationship,
        sharePercentage: Number(formValue.sharePercentage)
      };

      this.nomineeService.createNominee(dto).subscribe({
        next: (res) => {
          this.loading = false;
          this.showMsg(res.message);
          this.resetForm();
          this.loadNominees();
        },
        error: (err) => {
          this.loading = false;
          this.showMsg(err.error?.message || 'Failed to add nominee.', true);
        }
      });
    }
  }

  onEdit(nominee: NomineeListDto): void {
    this.isEditing = true;
    this.nomineeForm.patchValue({
      nomineeId: nominee.nomineeId,
      name: nominee.name,
      relationship: nominee.relationship,
      sharePercentage: nominee.sharePercentage
    });
  }

  onDelete(nomineeId: number): void {
    if (!confirm('Are you sure you want to delete this nominee?')) return;

    this.loading = true;
    this.nomineeService.deleteNominee(nomineeId).subscribe({
      next: (res) => {
        this.loading = false;
        this.showMsg(res.message);
        this.loadNominees();
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Delete failed.', true);
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.isEditing = false;
    this.nomineeForm.reset({
      nomineeId: 0,
      name: '',
      relationship: '',
      sharePercentage: 0
    });
  }
}