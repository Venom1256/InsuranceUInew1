import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {

  selectedPolicyId: number = 0;

  policies: any[] = [];
  duePremiums: any[] = [];
  paymentHistory: any[] = [];

  message: string = '';
  payingPremiumId: number = 0;

  constructor(
    private paymentService: PaymentService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMyPolicies();
  }

  loadMyPolicies() {
    this.paymentService.getMyPolicies().subscribe({
      next: (res: any) => {
        this.policies = res.data || [];

        if (this.policies.length > 0) {
          this.selectedPolicyId = Number(this.policies[0].policyId);

          this.loadDuePremium();
          this.loadPaymentHistory();
        }

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Policy Load Error', err);
        this.message = 'Policies not loaded';
        this.cdr.detectChanges();
      }
    });
  }

  onPolicyChange() {
    this.selectedPolicyId = Number(this.selectedPolicyId);

    this.duePremiums = [];
    this.paymentHistory = [];
    this.message = '';

    if (this.selectedPolicyId === 0) {
      return;
    }

    this.loadDuePremium();
    this.loadPaymentHistory();
  }

  loadDuePremium() {
    if (this.selectedPolicyId === 0) {
      return;
    }

    this.paymentService.getDuePremium(this.selectedPolicyId).subscribe({
      next: (res: any) => {
        console.log('Due Premium Response', res);

        this.duePremiums = res.data || [];

        if (this.duePremiums.length === 0) {
          this.message = 'No premium due today';
        }

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Due Premium Error', err);

        this.duePremiums = [];
        this.message = 'No premium due today';

        this.cdr.detectChanges();
      }
    });
  }

  loadPaymentHistory() {
    if (this.selectedPolicyId === 0) {
      return;
    }

    console.log('Selected Policy Id For History:', this.selectedPolicyId);

    this.paymentService.getPaymentHistory(this.selectedPolicyId).subscribe({
      next: (res: any) => {
        console.log('Payment History Response', res);

        this.paymentHistory = res.data || [];

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Payment History Error', err);

        this.paymentHistory = [];

        this.cdr.detectChanges();
      }
    });
  }

  payNow(premium: any) {
    const premiumId = premium.premiumId;
    const amount = premium.amount || premium.premiumAmount;

    if (!premiumId || !amount) {
      alert('Premium details not found');
      return;
    }

    const options = {
      key: 'rzp_test_SguRsFLUPmLB46',
      amount: amount * 100,
      currency: 'INR',
      name: 'Insurance Premium',
      description: 'Premium Payment',

      handler: (response: any) => {
        this.ngZone.run(() => {
          console.log('Razorpay Success Response', response);

          this.payingPremiumId = premiumId;
          this.cdr.detectChanges();

          this.paymentService.payPremium(
            premiumId,
            response.razorpay_payment_id
          ).subscribe({
            next: (res: any) => {
              console.log('Pay Premium API Response', res);

              this.message = res.message || 'Payment successful';

              this.duePremiums = this.duePremiums.filter(
                x => Number(x.premiumId) !== Number(premiumId)
              );

              this.payingPremiumId = 0;

              this.loadDuePremium();
              this.loadPaymentHistory();

              this.cdr.detectChanges();
            },
            error: (err: any) => {
              console.log('Pay Premium API Error', err);

              this.payingPremiumId = 0;
              this.message = 'Payment done but API save failed';

              this.cdr.detectChanges();
            }
          });
        });
      },

      modal: {
        ondismiss: () => {
          this.ngZone.run(() => {
            console.log('Payment popup closed');

            this.payingPremiumId = 0;

            this.cdr.detectChanges();
          });
        }
      }
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      this.ngZone.run(() => {
        console.log('Razorpay Payment Failed', response);

        this.payingPremiumId = 0;

        alert(response.error.description);

        this.cdr.detectChanges();
      });
    });

    rzp.open();
  }
}