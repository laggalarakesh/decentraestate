export interface Property {
  id: number;
  name: string;
  address: string;
  price: number;
  yield: number;
  tokensAvailable: number;
  totalTokens: number;
  imageUrl: string;
  beds: number;
  baths: number;
  sqft: number;
  category: string;
  fractionalHolders: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AIEvaluation {
    estimatedValue: number;
    confidence: string;
    comparables: { address: string; salePrice: number; }[];
}

export interface AIDocumentVerification {
    ownerName: string;
    propertyAddress: string;
    registrationDate: string;
    isValid: boolean;
    issues: string[];
}

export interface MarketOffer {
  type: 'Buy' | 'Sell';
  tokens: number;
  pricePerToken: number;
  user: string;
}

export interface TransactionHistory {
  event: 'Mint' | 'Transfer' | 'Sale';
  from: string;
  to: string;
  tokens: number;
  date: string;
}

export interface UserHolding {
  propertyId: number;
  tokensOwned: number;
  accruedRent: number;
}