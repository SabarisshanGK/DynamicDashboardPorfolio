export type Stock = {
    id: number;
    particulars: string;
    purchasePrice: number;
    quantity: number;
    portfolioPercentage?: number;
    sector: string;
    totalInvestment?:number;
    exchange: string; // NSE/BSE
    yahooFinance: {
            price: number;
            changePercent: number;
            marketCap?: number;
            peRatio?: number;
    };
  investment?: number; 
  presentValue?: number; 
  gainLossPercent?: number; 
  gainLoss?:number;
  revenue?: number;
  priceToBook?: number;
  bookValue?: number;
  priceToSales?: number;
  cfo?: number;
}