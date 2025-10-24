'use server';

import { detectFraud } from '@/ai/flows/fraud-detection';
import { receipts, users } from '@/lib/data';
import type { FraudDetectionOutput } from '@/ai/flows/fraud-detection';

export type FormState = {
    message: string;
    result?: FraudDetectionOutput;
};

export async function checkForFraud(prevState: FormState, formData: FormData): Promise<FormState> {
  const receiptId = formData.get('receiptId');

  if (!receiptId) {
    return { message: 'Please select a receipt.' };
  }

  const receipt = receipts.find(r => r.id === receiptId);
  if (!receipt) {
    return { message: 'Receipt not found.' };
  }

  const owner = users.find(u => u.id === receipt.ownerId);

  // Constructing the input for the AI flow
  const receiptData = `
    ID: ${receipt.id}
    Crop: ${receipt.cropType}
    Quantity: ${receipt.quantity} tons
    Quality: Grade ${receipt.quality}
    Origin: ${receipt.origin}
    Created: ${receipt.creationTimestamp}
    Custody Trail: ${JSON.stringify(receipt.custodyTrail, null, 2)}
  `;

  const userData = `
    Owner ID: ${receipt.ownerId}
    Owner Name: ${owner?.name || 'Unknown'}
    Owner Role: ${owner?.role || 'Unknown'}
  `;
  
  // In a real app, this would come from external APIs (weather data, market prices, etc.)
  const externalSourceData = `
    Market Price for ${receipt.cropType} on ${new Date(receipt.creationTimestamp).toLocaleDateString()}: $280/ton
    Weather at ${receipt.origin} during harvest season: Normal
    Historical yield for ${receipt.origin}: Consistent with declared quantity.
    Reputation of Warehouse ID ${receipt.warehouseId}: Good
  `;

  try {
    const result = await detectFraud({
      receiptData,
      userData,
      externalSourceData,
    });
    return { message: 'Analysis complete.', result };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred during fraud detection.' };
  }
}
