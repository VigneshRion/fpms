export interface Investment {
  id?: string;
  assetType: string;
  quantity: number;
  purchasePrice: number;
  date: Date | string;
  userId?: string;
}
