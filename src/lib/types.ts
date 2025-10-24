export type UserRole = 'Cooperative' | 'Warehouse' | 'Buyer' | 'Lender' | 'Regulator' | 'Farmer';

export type CropType = 'Wheat' | 'Corn' | 'Soybeans' | 'Rice' | 'Barley';

export type QualityGrade = 'A' | 'B' | 'C';

export type CustodyEvent = {
  actor: string;
  role: UserRole | 'Farmer'; // Farmer can be part of the trail but not a primary user role
  action: string;
  timestamp: string;
};

export type Receipt = {
  id: string;
  cropType: CropType;
  quantity: number; // in metric tons
  quality: QualityGrade;
  origin: string; // farm location
  creationTimestamp: string;
  custodyTrail: CustodyEvent[];
  ownerId: string; // Farmer's ID
  warehouseId: string;
  isTokenized: boolean;
  cooperativeId: string;
};

export type LoanStatus = 'Pending' | 'Approved' | 'Rejected' | 'Repaid';

export type Loan = {
  id: string;
  farmerId: string;
  receiptId: string;
  amount: number;
  interestRate: number; // percentage
  status: LoanStatus;
  requestTimestamp: string;
  lenderId?: string;
  approvalTimestamp?: string;
};

export type MarketItem = {
  id: string;
  receiptId: string;
  sellerId: string;
  price: number;
  listTimestamp: string;
};

export type TransactionStatus = 'Escrow' | 'Completed' | 'Cancelled';

export type Transaction = {
    id: string;
    marketItemId: string;
    buyerId: string;
    quantity: number; // can be partial
    totalPrice: number;
    status: TransactionStatus;
    transactionTimestamp: string;
}

export type User = {
    id: string;
    name: string;
    role: UserRole;
};

export type Farmer = {
  id: string;
  name: string;
  cooperativeId: string;
  rating: number;
  ratingsCount: number;
}

export type CommodityPrice = {
  cropType: CropType;
  price: number;
  change: number; // percentage change
}

    