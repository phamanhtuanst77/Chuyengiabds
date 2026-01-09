
export enum Sender {
  USER = 'USER',
  AGENT = 'AGENT'
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
  insight?: string;
  tip?: string;
  nextStep?: string;
}

export interface MarketMetrics {
  interestRate: number;
  inflation: number;
  liquidity: 'High' | 'Medium' | 'Low';
  trend: 'Upward' | 'Stable' | 'Downward';
}
