// ========== REGISTRATION DTO ==========
export interface CustomerRegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
}

export interface CustomerResponse {
  customerId: number;
  customerCode: string;
  email: string;
}

// ========== PROFILE UPDATE DTO ==========
export interface CustomerProfileUpdateDto {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  panNumber: string;
  aadhaarNumber: string;
}

// ========== KYC UPDATE DTO ==========
export interface CustomerKycUpdateDto {
  dateOfBirth: string;
  gender: string;
  panNumber: string;
  aadhaarNumber: string;
}

// ========== FULL CUSTOMER PROFILE ==========
export interface CustomerProfile {
  customerId: number;
  customerCode: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  panNumber: string;
  aadhaarNumber: string;
  agentId?: number;
  isActive: boolean;
  kycStatus: string;        // <-- ADD THIS
  createdAt: string;
  modifiedAt: string;
}

// ========== ADDRESS DTOs ==========
export interface CustomerAddressCreateDto {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CustomerAddressListDto {
  addressId: number;
  customerId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CustomerListDto {
  customerId: number;
  customerCode: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  panNumber: string;
  aadhaarNumber: string;
  agentId?: number;
  isActive: boolean;
  kycStatus: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PagedCustomerResult {
  items: CustomerListDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CustomerAddressListDto {
  addressId: number;
  customerId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}