import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = 'https://localhost:44393/api/v1/Payment';

  constructor(private http: HttpClient) {}

  getMyPolicies() {
    return this.http.get(
      `${this.baseUrl}/my-policies?pageNo=1&pageSize=10`
    );
  }

  getPaymentHistory(policyId: number) {
    return this.http.get(
      `${this.baseUrl}/my-payment-history/${policyId}?pageNo=1&pageSize=10`
    );
  }

  getDuePremium(policyId: number) {
    return this.http.get(
      `${this.baseUrl}/due-premiums-today/${policyId}?pageNo=1&pageSize=10`
    );
  }

  getMyPremiumSchedules(policyId: number) {
    return this.http.get(
      `${this.baseUrl}/my-premium-schedules/${policyId}?pageNo=1&pageSize=10`
    );
  }

  payPremium(premiumId: number, transactionId: string) {
    const data = {
      premiumId: premiumId,
      transactionReference: transactionId,
      paymentMode: 'Online'
    };

    return this.http.post(
      `${this.baseUrl}/pay-premium`,
      data
    );
  }
}