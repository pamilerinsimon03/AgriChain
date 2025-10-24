// This file uses server-side code.
'use server';

/**
 * @fileOverview Fraud detection AI agent.
 *
 * - detectFraud - A function that detects potential fraud in receipt data.
 * - FraudDetectionInput - The input type for the detectFraud function.
 * - FraudDetectionOutput - The return type for the detectFraud function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  receiptData: z.string().describe('The receipt data to analyze.'),
  userData: z.string().describe('The user data associated with the receipt.'),
  externalSourceData: z.string().describe('Data from external sources for validation.'),
});
export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the receipt is potentially fraudulent.'),
  fraudExplanation: z.string().describe('Explanation of why the receipt is potentially fraudulent.'),
});
export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return detectFraudFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fraudDetectionPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an expert in fraud detection, specializing in agricultural receipts.

You will analyze receipt data, user data, and external data sources to identify potentially fraudulent records.

Receipt Data: {{{receiptData}}}
User Data: {{{userData}}}
External Source Data: {{{externalSourceData}}}

Based on these data points, determine if the receipt is potentially fraudulent. Explain your reasoning in detail, highlighting any inconsistencies or red flags.

Set the isFraudulent output field to true if there are strong indicators of fraud, otherwise false.
`,
});

const detectFraudFlow = ai.defineFlow(
  {
    name: 'detectFraudFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
