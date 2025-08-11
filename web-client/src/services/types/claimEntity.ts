export interface ClaimEntity {
  id: number;
  claimType: string;
  claimValue: string;
  canBeDeleted?: boolean;
}
