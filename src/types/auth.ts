// src/types/auth.ts
export type AccountType = 'gym' | 'trainer';

export interface UserProfile {
  id: string;
  email: string;
  account_type: AccountType;
  created_at: string;
  updated_at: string;
}