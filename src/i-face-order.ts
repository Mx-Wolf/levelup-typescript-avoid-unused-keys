export interface Order{
  orderId: number;
  datePlaced: string;
  customerId: string;
  itemsCount: number;
  amountTotal: number;
  taxTotal: number;
  includeHandling: boolean;
  includeShipping: boolean;
}
