import { type Property, type FaqItem, type MarketOffer, type TransactionHistory, type UserHolding } from './types';

export const APP_NAME = "DecentraEstate";

export const NAV_LINKS = [
  { name: 'My Portfolio', href: '#portfolio' },
  { name: 'Marketplace', href: '#featured-properties' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    name: 'Sunset Villa',
    address: '123 Ocean Drive, Miami, FL',
    price: 1250000,
    yield: 5.5,
    tokensAvailable: 450,
    totalTokens: 1000,
    imageUrl: 'https://picsum.photos/seed/1/800/600',
    beds: 4,
    baths: 3,
    sqft: 2800,
    category: 'Real Estate',
    fractionalHolders: 12,
  },
  {
    id: 2,
    name: 'Mountain Retreat',
    address: '456 Aspen Way, Aspen, CO',
    price: 2800000,
    yield: 4.8,
    tokensAvailable: 800,
    totalTokens: 2500,
    imageUrl: 'https://picsum.photos/seed/2/800/600',
    beds: 6,
    baths: 5,
    sqft: 4500,
    category: 'Real Estate',
    fractionalHolders: 25,
  },
  {
    id: 3,
    name: 'Urban Loft',
    address: '789 Broadway, New York, NY',
    price: 850000,
    yield: 6.2,
    tokensAvailable: 150,
    totalTokens: 850,
    imageUrl: 'https://picsum.photos/seed/3/800/600',
    beds: 2,
    baths: 2,
    sqft: 1500,
    category: 'Real Estate',
    fractionalHolders: 31,
  },
  {
    id: 4,
    name: 'Lakeside Cottage',
    address: '101 Lakeview Rd, Lake Tahoe, CA',
    price: 975000,
    yield: 7.1,
    tokensAvailable: 900,
    totalTokens: 975,
    imageUrl: 'https://picsum.photos/seed/4/800/600',
    beds: 3,
    baths: 2,
    sqft: 1900,
    category: 'Real Estate',
    fractionalHolders: 7,
  },
    {
    id: 5,
    name: 'Desert Oasis',
    address: '210 Cactus Lane, Scottsdale, AZ',
    price: 1500000,
    yield: 5.8,
    tokensAvailable: 600,
    totalTokens: 1500,
    imageUrl: 'https://picsum.photos/seed/5/800/600',
    beds: 5,
    baths: 4,
    sqft: 3500,
    category: 'Real Estate',
    fractionalHolders: 18,
  },
  {
    id: 6,
    name: 'City Center Condo',
    address: '333 Main St, Chicago, IL',
    price: 650000,
    yield: 6.5,
    tokensAvailable: 325,
    totalTokens: 650,
    imageUrl: 'https://picsum.photos/seed/6/800/600',
    beds: 2,
    baths: 2,
    sqft: 1200,
    category: 'Real Estate',
    fractionalHolders: 45,
  },
];

export const FAQ_DATA: FaqItem[] = [
    {
        question: "How do on-chain tokens reflect real legal property ownership?",
        answer: "We treat the on-chain NFT as a digital representation of ownership shares. In practice, the property would be held by a legal entity (like an LLC), and token holders own stakes in that entity. We plan to partner with legal experts to align the smart contracts with local real estate laws. The on-chain transparency complements, but does not replace, necessary off-chain legal processes."
    },
    {
        question: "What's the advantage of building on Andromeda instead of Ethereum?",
        answer: "Andromeda's aOS is built for modularity. ADOs let us plug-and-play marketplace, auction, and splitter components without writing all the code ourselves. This drastically cuts development time and risk. Plus, Andromeda's Cosmos IBC integration means we can tap into other chains (for stablecoins or assets) easily."
    },
    {
        question: "How accurate is the AI valuation, and what if it's wrong?",
        answer: "The AI valuation is a helpful estimate based on comparable data. It's meant to guide users, not guarantee price. We always display it as an estimate. Users can adjust or override the AI's suggestion. For full accuracy, human appraisals or market analysis would complement the AI. Essentially, the AI speeds up data entry and highlights anomalies, but final decisions rely on human review."
    },
    {
        question: "How do you handle security and ensure no bugs in the smart contracts?",
        answer: "We build on audited, battle-tested ADO modules (CW721, CW20, Auction, Splitter) provided by Andromeda. Our team will conduct additional testing of custom logic. Andromeda's framework encourages composability, but we write minimal new code. In production, we plan a formal audit of the final contracts."
    },
    {
        question: "How will you attract users and ensure enough liquidity for property tokens?",
        answer: "Liquidity comes from openness: any investor anywhere can participate. We will target real estate communities and crypto investors by demonstrating ease of entry. The integrated marketplace ensures shares can be bought or sold anytime. As more properties are tokenized, the network effect grows: investors can trade diverse assets, increasing platform attractiveness."
    }
];

export const MOCK_MARKET_OFFERS: { [key: number]: MarketOffer[] } = {
  1: [
    { type: 'Buy', tokens: 10, pricePerToken: 1255.00, user: '0x1A...fE4' },
    { type: 'Buy', tokens: 5, pricePerToken: 1251.50, user: '0x9B...C4a' },
    { type: 'Sell', tokens: 20, pricePerToken: 1260.00, user: '0x4D...aD1' },
  ],
  3: [
    { type: 'Buy', tokens: 25, pricePerToken: 1001.00, user: '0x2C...dE7' },
    { type: 'Sell', tokens: 15, pricePerToken: 1005.00, user: '0x8F...bB2' },
    { type: 'Sell', tokens: 30, pricePerToken: 1008.50, user: '0x5E...fF9' },
  ]
};

export const MOCK_OWNERSHIP_HISTORY: { [key: number]: TransactionHistory[] } = {
  1: [
    { event: 'Mint', from: '0x00...000', to: '0x7A...eB3', tokens: 1000, date: '2023-10-26' },
    { event: 'Sale', from: '0x7A...eB3', to: '0x4D...aD1', tokens: 20, date: '2023-11-15' },
    { event: 'Sale', from: '0x7A...eB3', to: '0x1A...fE4', tokens: 50, date: '2023-12-01' },
    { event: 'Transfer', from: '0x1A...fE4', to: '0x9B...C4a', tokens: 5, date: '2024-01-20' },
  ],
  3: [
     { event: 'Mint', from: '0x00...000', to: '0x3E...cB1', tokens: 850, date: '2023-09-10' },
     { event: 'Sale', from: '0x3E...cB1', to: '0x8F...bB2', tokens: 100, date: '2023-10-05' },
  ]
};

export const MOCK_USER_HOLDINGS: UserHolding[] = [
  {
    propertyId: 1,
    tokensOwned: 50,
    accruedRent: 125.50,
  },
  {
    propertyId: 3,
    tokensOwned: 100,
    accruedRent: 210.75,
  },
  {
    propertyId: 4,
    tokensOwned: 25,
    accruedRent: 0,
  },
];