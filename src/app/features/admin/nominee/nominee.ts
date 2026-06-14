import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NomineeListDto } from '../../../core/models/nominee';
import { NomineeAdminService } from '../../../core/services/adminnominee';
 

@Component({
  selector: 'app-nominee-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './nominee.html',
  styleUrls: ['./nominee.scss']
})

export class NomineeAdminComponent implements OnInit {
  nominees: NomineeListDto[] = [];
  filteredNominees: NomineeListDto[] = [];
  loading = false;
  message = '';
  isError = false;

  // Filters
  searchText = '';
  selectedCustomerId = '';
  selectedRelationship = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  // Sorting
  sortColumn = 'nomineeId';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Stats
  totalNominees = 0;
  totalCustomers = 0;

  // Dropdown data
  relationships = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'];
  uniqueCustomers: { customerId: number; name: string }[] = [];

  constructor(private nomineeAdminService: NomineeAdminService) {}

  ngOnInit(): void {
    this.loadAllNominees();
  }

  get paginatedNominees(): NomineeListDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredNominees.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  private showMsg(msg: string, error = false): void {
    this.message = msg;
    this.isError = error;
    setTimeout(() => this.message = '', 4000);
  }

  loadAllNominees(): void {
    this.loading = true;
    this.nomineeAdminService.getAllNominees().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.nominees = res.data || [];
          this.calculateStats();
          this.buildCustomerDropdown();
          this.applyFilters();
        }
      },
      error: (err) => {
        this.loading = false;
        this.showMsg(err.error?.message || 'Failed to load.', true);
      }
    });
  }

  calculateStats(): void {
    this.totalNominees = this.nominees.length;
    const uniqueIds = new Set(this.nominees.map(n => n.customerId));
    this.totalCustomers = uniqueIds.size;
  }

  buildCustomerDropdown(): void {
    const map = new Map<number, string>();
    this.nominees.forEach(n => {
      if (!map.has(n.customerId)) {
        map.set(n.customerId, n.name);
      }
    });
    this.uniqueCustomers = Array.from(map.entries()).map(([customerId, name]) => ({
      customerId,
      name
    }));
    this.uniqueCustomers.sort((a, b) => a.customerId - b.customerId);
  }

  applyFilters(): void {
    let result = [...this.nominees];

    // Name search
    if (this.searchText.trim()) {
      const search = this.searchText.trim().toLowerCase();
      result = result.filter(n => n.name.toLowerCase().includes(search));
    }

    // Customer filter
    if (this.selectedCustomerId) {
      const cid = Number(this.selectedCustomerId);
      result = result.filter(n => n.customerId === cid);
    }

    // Relationship filter
    if (this.selectedRelationship) {
      result = result.filter(n => n.relationship === this.selectedRelationship);
    }

    this.filteredNominees = result;
    this.totalItems = result.length;
    this.currentPage = 1;
    this.sortData();
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedCustomerId = '';
    this.selectedRelationship = '';
    this.applyFilters();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

  sortData(): void {
    this.filteredNominees.sort((a, b) => {
      let valA = (a as any)[this.sortColumn];
      let valB = (b as any)[this.sortColumn];
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  viewNominee(nominee: NomineeListDto): void {
    alert(
      `Nominee ID: ${nominee.nomineeId}\n` +
      `Customer ID: ${nominee.customerId}\n` +
      `Name: ${nominee.name}\n` +
      `Relationship: ${nominee.relationship}\n` +
      `Share: ${nominee.sharePercentage}%`
    );
  }
}