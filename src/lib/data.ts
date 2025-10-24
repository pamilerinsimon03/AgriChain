import type { Receipt, Loan, MarketItem, User, CropType, QualityGrade, UserRole } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice (Farmer)', role: 'Farmer' },
  { id: 'user-2', name: 'Bob (Warehouse)', role: 'Warehouse' },
  { id: 'user-3', name: 'Charlie (Buyer)', role: 'Buyer' },
  { id: 'user-4', name: 'Diana (Lender)', role: 'Lender' },
  { id: 'user-5', name: 'Eve (Regulator)', role: 'Regulator' },
];

export const receipts: Receipt[] = [
  {
    id: 'receipt-001',
    cropType: 'Wheat',
    quantity: 150,
    quality: 'A',
    origin: 'Green Valley Farm',
    creationTimestamp: new Date('2024-07-10T09:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Alice (Farmer)', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-09T14:00:00Z').toISOString() },
      { actor: 'Bob (Warehouse)', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-10T09:00:00Z').toISOString() },
    ],
    ownerId: 'user-1',
    warehouseId: 'user-2',
    isTokenized: true,
  },
  {
    id: 'receipt-002',
    cropType: 'Corn',
    quantity: 300,
    quality: 'B',
    origin: 'Sunshine Acres',
    creationTimestamp: new Date('2024-07-11T11:30:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Frank (Farmer)', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-10T18:00:00Z').toISOString() },
      { actor: 'Bob (Warehouse)', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-11T11:30:00Z').toISOString() },
    ],
    ownerId: 'user-6-new', // another farmer
    warehouseId: 'user-2',
    isTokenized: false,
  },
  {
    id: 'receipt-003',
    cropType: 'Soybeans',
    quantity: 220,
    quality: 'A',
    origin: 'Green Valley Farm',
    creationTimestamp: new Date('2024-07-12T14:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Alice (Farmer)', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-12T08:00:00Z').toISOString() },
      { actor: 'Bob (Warehouse)', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-07-12T14:00:00Z').toISOString() },
    ],
    ownerId: 'user-1',
    warehouseId: 'user-2',
    isTokenized: false,
  },
    {
    id: 'receipt-004-fraud',
    cropType: 'Rice',
    quantity: 500,
    quality: 'C',
    origin: 'Imaginary Fields',
    creationTimestamp: new Date('2024-01-01T10:00:00Z').toISOString(),
    custodyTrail: [
      { actor: 'Mallory (Fraudster)', role: 'Farmer', action: 'Harvested', timestamp: new Date('2024-07-13T10:00:00Z').toISOString() }, // Timestamp after deposit
      { actor: 'Shady Storage', role: 'Warehouse', action: 'Deposited & Verified', timestamp: new Date('2024-01-01T10:00:00Z').toISOString() },
    ],
    ownerId: 'user-7-fraud',
    warehouseId: 'fraud-wh',
    isTokenized: true,
  },
];

export const loans: Loan[] = [
  {
    id: 'loan-001',
    farmerId: 'user-1',
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
    farmerId: 'user-6-new',
    receiptId: 'receipt-002',
    amount: 35000,
    interestRate: 5.5,
    status: 'Pending',
    requestTimestamp: new Date('2024-07-11T12:00:00Z').toISOString(),
  },
];

export const marketItems: MarketItem[] = [
  {
    id: 'market-001',
    receiptId: 'receipt-001',
    sellerId: 'user-1',
    price: 30000,
    listTimestamp: new Date('2024-07-10T16:00:00Z').toISOString(),
  },
];
