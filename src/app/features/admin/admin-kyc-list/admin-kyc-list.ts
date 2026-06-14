import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-admin-kyc-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-kyc-list.html',
  styleUrl: './admin-kyc-list.scss'
})
export class AdminKycListComponent implements OnInit {

  customers: any[] = [];

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadCustomers();

  }

  loadCustomers() {

    this.customerService
      .getPendingKycCustomers().subscribe({

        next: (res: any) => {
          console.log(res.data);
          this.customers = res.data || [];
          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

  viewCustomer(customerId: number) {
    this.router.navigate([
      '/admin/kyc-details',
      customerId
    ]);
  }
}