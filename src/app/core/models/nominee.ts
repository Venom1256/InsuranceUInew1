// ========== NOMINEE CREATE DTO ==========
export interface NomineeCreateDto {
  name: string;
  relationship: string;
  sharePercentage: number;
}

// ========== NOMINEE UPDATE DTO ==========
export interface NomineeUpdateDto {
  nomineeId: number;
  name: string;
  relationship: string;
  sharePercentage: number;
}

// ========== NOMINEE LIST RESPONSE ==========
export interface NomineeListDto {
  nomineeId: number;
  customerId: number;
  name: string;
  relationship: string;
  sharePercentage: number;
}

// ========== API RESPONSE (reuse if you have separate file) ==========
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ========== ADMIN FILTER DTO ==========
export interface NomineeFilterDto {
  customerId?: number;
  customerName?: string;
  relationship?: string;
  minSharePercentage?: number;
  maxSharePercentage?: number;
}

// ========== PAGINATED RESULT ==========
export interface PagedNomineeResult {
  items: NomineeListDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Reuse from customer model
export interface NomineeListDto {
  nomineeId: number;
  customerId: number;
  name: string;
  relationship: string;
  sharePercentage: number;
}

export interface NomineeCreateDto {
  name: string;
  relationship: string;
  sharePercentage: number;
}

export interface NomineeUpdateDto {
  nomineeId: number;
  name: string;
  relationship: string;
  sharePercentage: number;
}