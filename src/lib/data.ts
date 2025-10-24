
import type { Receipt, Loan, MarketItem, User, Farmer } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Greenfield Coop', role: 'Cooperative' },
  { id: 'user-2', name: 'Secure Barns Inc.', role: 'Warehouse' },
  { id: 'user-3', name: 'Global Provisions', role: 'Buyer' },
  { id: 'user-4', name: 'AgriBank', role: 'Lender' },
  { id: 'user-5', name: 'National Produce Board', role: 'Regulator' },
];

export const farmers: Farmer[] = [
    { id: 'farmer-101', name: 'Alice Peters', cooperativeId: 'user-1', rating: 4.8, ratingsCount: 25 },
    { id: 'farmer-102', name: 'Benard Eze', cooperativeId: 'user-1', rating: 4.6, ratingsCount: 18 },
    { id: 'farmer-103', name: 'Chidinma Okoro', cooperativeId: 'user-1', rating: 4.9, ratingsCount: 32 },
    { id: 'farmer-104', name: 'David Musa', cooperativeId: 'user-1', rating: 4.5, ratingsCount: 12 },
    { id: 'farmer-105', name: 'Frank Haruna', cooperativeId: 'coop-2', rating: 4.7, ratingsCount: 41 },
    { id: 'farmer-106', name: 'Grace Adebayo', cooperativeId: 'coop-2', rating: 4.8, ratingsCount: 22 },
    { id: 'farmer-107', name: 'Hassan Bello', cooperativeId: 'user-1', rating: 4.7, ratingsCount: 19 },
    { id: 'farmer-108', name: 'Ibrahim Sani', cooperativeId: 'coop-2', rating: 4.6, ratingsCount: 28 },
]

export const receipts: Receipt[] = [
  {
    id: 'receipt-001',
    cropType: 'Wheat',
    quantity: 150,
    quality: 'A',
    origin: 'Green Valley Farm',
    creationTimestamp: new Date('2024-07-10T09:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Alice Peters', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-09T14:00:00Z').toISOString() },
      { actor: 'Secure Barns Inc.', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-10T09:00:00Z').toISOString() },
    ],
    ownerId: 'farmer-101',
    warehouseId: 'user-2',
    isTokenized: true,
    cooperativeId: 'user-1'
  },
  {
    id: 'receipt-002',
    cropType: 'Corn',
    quantity: 300,
    quality: 'B',
    origin: 'Sunshine Acres',
    creationTimestamp: new Date('2024-07-11T11:30:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Frank Haruna', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-10T18:00:00Z').toISOString() },
      { actor: 'Secure Barns Inc.', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-11T11:30:00Z').toISOString() },
    ],
    ownerId: 'farmer-105',
    warehouseId: 'user-2',
    isTokenized: true,
    cooperativeId: 'coop-2'
  },
  {
    id: 'receipt-003',
    cropType: 'Soybeans',
    quantity: 220,
    quality: 'A',
    origin: 'Green Valley Farm',
    creationTimestamp: new Date('2024-07-12T14:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Alice Peters', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-12T08:00:00Z').toISOString() },
      { actor: 'Secure Barns Inc.', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-12T14:00:00Z').toISOString() },
    ],
    ownerId: 'farmer-101',
    warehouseId: 'user-2',
    isTokenized: true,
    cooperativeId: 'user-1'
  },
    {
    id: 'receipt-004-fraud',
    cropType: 'Rice',
    quantity: 500,
    quality: 'C',
    origin: 'Imaginary Fields',
    creationTimestamp: new Date('2024-01-01T10:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Mallory (Fraudster)', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-13T10:00:00Z').toISOString() },
      { actor: 'Shady Storage', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-01-01T10:00:00Z').toISOString() },
    ],
    ownerId: 'user-7-fraud',
    warehouseId: 'fraud-wh',
    isTokenized: true,
    cooperativeId: 'fraud-coop',
  },
   {
    id: 'receipt-005',
    cropType: 'Corn',
    quantity: 180,
    quality: 'A',
    origin: 'Upland Farms',
    creationTimestamp: new Date('2024-07-14T10:00:00Z').toISOString(),
    custodyTrail: [
        { actor: 'Benard Eze', role: 'Farmer', action: 'Harvested', timestamp: '2024-07-13T12:00:00Z' },
        { actor: 'Secure Barns Inc.', role: 'Warehouse', action: 'Deposited & Verified', timestamp: '2024-07-14T10:00:00Z' },
    ],
    ownerId: 'farmer-102',
    warehouseId: 'user-2',
    isTokenized: true,
    cooperativeId: 'user-1'
  },
  {
    id: 'receipt-006',
    cropType: 'Soybeans',
    quantity: 250,
    quality: 'B',
    origin: 'Riverbend Fields',
    creationTimestamp: new Date('2024-07-15T15:00:00Z').toISOString(),
    custodyTrail: [
        { actor: 'Chidinma Okoro', role: 'Farmer', action: 'Harvested', timestamp: '2024-07-15T09:00:00Z' },
        { actor: 'AgroWarehouse Ltd', role: 'Warehouse', action: 'Deposited & Verified', timestamp: '2024-07-15T15:00:00Z' },
    ],
    ownerId: 'farmer-103',
    warehouseId: 'wh-2',
    isTokenized: true,
    cooperativeId: 'user-1'
  },
   {
    id: 'receipt-007',
    cropType: 'Corn',
    quantity: 120,
    quality: 'B',
    origin: 'Upland Farms',
    creationTimestamp: new Date().toISOString(),
    custodyTrail: [
        { actor: 'farmer-101', role: 'Farmer', action: 'Harvested', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { actor: 'Secure Barns Inc.', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date().toISOString() },
    ],
    ownerId: 'farmer-101',
    warehouseId: 'user-2',
    isTokenized: false,
    cooperativeId: 'user-1'
  },
  {
    id: 'receipt-008',
    cropType: 'Rice',
    quantity: 400,
    quality: 'A',
    origin: 'Delta Plains',
    creationTimestamp: new Date('2024-07-19T09:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Hassan Bello', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-18T14:00:00Z').toISOString() },
      { actor: 'Secure Barns Inc.', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-19T09:00:00Z').toISOString() },
    ],
    ownerId: 'farmer-107',
    warehouseId: 'user-2',
    isTokenized: true,
    cooperativeId: 'user-1'
  },
  {
    id: 'receipt-009',
    cropType: 'Barley',
    quantity: 180,
    quality: 'A',
    origin: 'Northern Fields',
    creationTimestamp: new Date('2024-07-20T11:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Ibrahim Sani', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-20T08:00:00Z').toISOString() },
      { actor: 'AgroWarehouse Ltd', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-20T11:00:00Z').toISOString() },
    ],
    ownerId: 'farmer-108',
    warehouseId: 'wh-2',
    isTokenized: true,
    cooperativeId: 'coop-2'
  }
];

export const loans: Loan[] = [
  {
    id: 'loan-001',
    farmerId: 'farmer-101',
    receiptId: 'receipt-001',
    amount: 15000000,
    interestRate: 15,
    status: 'Approved',
    requestTimestamp: new Date('2024-07-10T10:00:00Z').toISOString(),
    lenderId: 'user-4',
    approvalTimestamp: new Date('2024-07-10T15:00:00Z').toISOString(),
  },
  {
    id: 'loan-002',
    farmerId: 'farmer-105',
    receiptId: 'receipt-002',
    amount: 25000000,
    interestRate: 15.5,
    status: 'Pending',
    requestTimestamp: new Date('2024-07-11T12:00:00Z').toISOString(),
  },
    {
    id: 'loan-003',
    farmerId: 'farmer-102',
    receiptId: 'receipt-005',
    amount: 18000000,
    interestRate: 16.0,
    status: 'Pending',
    requestTimestamp: new Date('2024-07-18T11:00:00Z').toISOString(),
    lenderId: 'user-4'
  },
  {
    id: 'loan-004',
    farmerId: 'farmer-107',
    receiptId: 'receipt-008',
    amount: 40000000,
    interestRate: 14.5,
    status: 'Pending',
    requestTimestamp: new Date('2024-07-22T09:30:00Z').toISOString(),
    lenderId: 'user-4'
  },
  {
    id: 'loan-005',
    farmerId: 'farmer-103',
    receiptId: 'receipt-006',
    amount: 22000000,
    interestRate: 15.2,
    status: 'Rejected',
    requestTimestamp: new Date('2024-07-19T16:00:00Z').toISOString(),
    lenderId: 'user-4'
  },
];

export const marketItems: MarketItem[] = [
  {
    id: 'market-001',
    receiptId: 'receipt-001',
    sellerId: 'farmer-101',
    price: 37500000, // price for 150 tons
    listTimestamp: new Date('2024-07-16T16:00:00Z').toISOString(),
  },
  {
    id: 'market-002',
    receiptId: 'receipt-003',
    sellerId: 'farmer-101',
    price: 55000000, // price for 220 tons
    listTimestamp: new Date('2024-07-17T10:00:00Z').toISOString(),
  },
  {
    id: 'market-003',
    receiptId: 'receipt-005',
    sellerId: 'farmer-102',
    price: 45000000, // price for 180 tons
    listTimestamp: new Date('2024-07-18T14:00:00Z').toISOString(),
  },
  {
    id: 'market-004',
    receiptId: 'receipt-002',
    sellerId: 'farmer-105',
    price: 75000000, // price for 300 tons
    listTimestamp: new Date('2024-07-19T11:00:00Z').toISOString(),
  },
  {
    id: 'market-005',
    receiptId: 'receipt-006',
    sellerId: 'farmer-103',
    price: 62500000, // price for 250 tons
    listTimestamp: new Date('2024-07-20T12:00:00Z').toISOString(),
  },
  {
    id: 'market-006',
    receiptId: 'receipt-008',
    sellerId: 'farmer-107',
    price: 100000000, // price for 400 tons
    listTimestamp: new Date('2024-07-21T13:00:00Z').toISOString(),
  },
  {
    id: 'market-007',
    receiptId: 'receipt-009',
    sellerId: 'farmer-108',
    price: 48000000, // price for 180 tons
    listTimestamp: new Date('2024-07-22T14:00:00Z').toISOString(),
  }
];

    
