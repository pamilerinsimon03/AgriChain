import type { Receipt, Loan, MarketItem, User, Farmer } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Greenfield Coop', role: 'Cooperative' },
  { id: 'user-2', name: 'Secure Barns Inc.', role: 'Warehouse' },
  { id: 'user-3', name: 'Global Provisions', role: 'Buyer' },
  { id: 'user-4', name: 'AgriBank', role: 'Lender' },
  { id: 'user-5', name: 'National Produce Board', role: 'Regulator' },
];

export const farmers: Farmer[] = [
    { id: 'farmer-101', name: 'Alice Peters', cooperativeId: 'user-1' },
    { id: 'farmer-102', name: 'Benard Eze', cooperativeId: 'user-1' },
    { id: 'farmer-103', name: 'Chidinma Okoro', cooperativeId: 'user-1' },
    { id: 'farmer-104', name: 'David Musa', cooperativeId: 'user-1' },
    { id: 'farmer-105', name: 'Frank Haruna', cooperativeId: 'coop-2' },
    { id: 'farmer-106', name: 'Grace Adebayo', cooperativeId: 'coop-2' },
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
    isTokenized: false,
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
    isTokenized: false,
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
  }
];

export const loans: Loan[] = [
  {
    id: 'loan-001',
    farmerId: 'farmer-101',
    receiptId: 'receipt-001',
    amount: 20000,
    interestRate: 5,
    status: 'Approved',
    requestTimestamp: new Date('2024-07-10T10:00:00Z').toISOString(),
    lenderId: 'user-4',
    approvalTimestamp: new Date('2024-07-10T15:00:00Z').toISOString(),
  },
  {
    id: 'loan-002',
    farmerId: 'farmer-105',
    receiptId: 'receipt-002',
    amount: 35000,
    interestRate: 5.5,
    status: 'Pending',
    requestTimestamp: new Date('2024-07-11T12:00:00Z').toISOString(),
  },
    {
    id: 'loan-003',
    farmerId: 'farmer-102',
    receiptId: 'receipt-005',
    amount: 25000,
    interestRate: 6.0,
    status: 'Pending',
    requestTimestamp: new Date('2024-07-18T11:00:00Z').toISOString(),
    lenderId: 'user-4'
  },
];

export const marketItems: MarketItem[] = [
  {
    id: 'market-001',
    receiptId: 'receipt-001',
    sellerId: 'farmer-101',
    price: 45000, // price for 150 tons
    listTimestamp: new Date('2024-07-16T16:00:00Z').toISOString(),
  },
  {
    id: 'market-002',
    receiptId: 'receipt-003',
    sellerId: 'farmer-101',
    price: 66000, // price for 220 tons
    listTimestamp: new Date('2024-07-17T10:00:00Z').toISOString(),
  },
  {
    id: 'market-003',
    receiptId: 'receipt-005',
    sellerId: 'farmer-102',
    price: 54000, // price for 180 tons
    listTimestamp: new Date('2024-07-18T14:00:00Z').toISOString(),
  }
];
