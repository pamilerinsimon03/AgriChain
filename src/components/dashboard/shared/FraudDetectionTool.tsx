'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { checkForFraud, type FormState } from '@/app/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { receipts } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldAlert, ShieldCheck, Terminal } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Receipt'
      )}
    </Button>
  );
}

export default function FraudDetectionTool() {
  const [state, formAction] = useFormState(checkForFraud, initialState);

  return (
    <div className="space-y-4">
      <form action={formAction} className="flex flex-col md:flex-row gap-4 items-center">
        <Select name="receiptId" required>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a receipt to analyze..." />
          </SelectTrigger>
          <SelectContent>
            {receipts.map(receipt => (
              <SelectItem key={receipt.id} value={receipt.id}>
                ID: {receipt.id} ({receipt.cropType}, {receipt.quantity}t)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SubmitButton />
      </form>

      {state.message && state.result && (
        <Alert variant={state.result.isFraudulent ? "destructive" : "default"} className={!state.result.isFraudulent ? 'border-green-500' : ''}>
           {state.result.isFraudulent ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4 text-green-600" />}
          <AlertTitle className="flex items-center gap-2">
            Analysis Result
            <Badge variant={state.result.isFraudulent ? 'destructive' : 'default'} className={!state.result.isFraudulent ? 'bg-green-600' : ''}>
              {state.result.isFraudulent ? 'Potential Fraud Detected' : 'Looks Good'}
            </Badge>
          </AlertTitle>
          <AlertDescription className="mt-2">
            <strong>Reasoning:</strong> {state.result.fraudExplanation}
          </AlertDescription>
        </Alert>
      )}

      {state.message && !state.result && (
         <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
         </Alert>
      )}

    </div>
  );
}
