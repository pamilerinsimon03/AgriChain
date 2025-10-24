

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { farmers, loans, receipts } from '@/lib/data';
import { format } from 'date-fns';
import StatCard from './shared/StatCard';
import { Users, Package, Landmark, FileText, ShoppingCart, ScanLine, PlusCircle } from 'lucide-react';
import type { Receipt } from '@/lib/types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Link from 'next/link';

function getReceiptStatus(receipt: Receipt) {
    if (loans.some(l => l.receiptId === receipt.id && (l.status === 'Approved' || l.status === 'Pending'))) {
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Collateralized</Badge>;
    }
    if (receipt.isTokenized) { 
        const isInMarket = loans.some(l => l.receiptId === receipt.id);
        if (isInMarket) return <Badge variant="outline">In Market</Badge>
        return <Badge variant="outline">Liquidated</Badge>;
    }
    return <Badge>Issued</Badge>;
}

export default function CooperativeDashboard() {
  const cooperativeId = 'user-1';
  const coopFarmers = farmers.filter(f => f.cooperativeId === cooperativeId);
  const coopFarmerIds = coopFarmers.map(f => f.id);
  const coopReceipts = receipts.filter(r => coopFarmerIds.includes(r.ownerId));
  const coopLoans = loans.filter(l => coopFarmerIds.includes(l.farmerId));

  const totalMembers = coopFarmers.length;
  const totalStoredValue = coopReceipts.reduce((acc, r) => acc + r.quantity * 250000, 0); // Assuming avg ₦250,000/ton
  const activeReceipts = coopReceipts.length;

  return (
    <div className="space-y-6">
      {/* Top Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Members" value={totalMembers.toString()} icon={Users} description="Farmers in your cooperative" />
        <StatCard title="Total Stored Value" value={`₦${(totalStoredValue / 1000000).toFixed(1)}M`} icon={Package} description="Estimated value of all crops" />
        <StatCard title="Active Receipts" value={activeReceipts.toString()} icon={FileText} description="Total digital receipts held" />
        <StatCard title="Pending Loans" value={coopLoans.filter(l => l.status === 'Pending').length.toString()} icon={Landmark} description="Awaiting lender approval" />
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
              <CardContent className="p-0">
                  <ScanLine className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold">Record Deposit</h3>
                  <p className="text-xs text-muted-foreground">Scan QR or create new</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record a New Deposit</DialogTitle>
              <DialogDescription>
                Choose to scan a pre-existing QR code from a warehouse or create a new deposit record manually.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-around pt-4">
              <Button variant="outline" size="lg"><ScanLine className="mr-2"/> Scan QR Code</Button>
              <Button size="lg"><PlusCircle className="mr-2"/> Create Manually</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
              <CardContent className="p-0">
                  <Landmark className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold">Request Loan</h3>
                  <p className="text-xs text-muted-foreground">For a cooperative member</p>
              </CardContent>
            </Card>
           </DialogTrigger>
           <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a Loan for a Member</DialogTitle>
              <DialogDescription>
                Select a member's receipt to use as collateral for a loan application.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 py-4" onSubmit={(e) => {
              e.preventDefault();
              alert('Loan application submitted!');
            }}>
              <div className="space-y-2">
                <Label htmlFor="receiptId">Collateral Receipt ID</Label>
                <Input id="receiptId" placeholder="e.g., receipt-001" defaultValue="receipt-005" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (₦)</Label>
                <Input id="loanAmount" type="number" placeholder="e.g., 5000000" defaultValue="18000000" required />
              </div>
              <Button className="w-full" type="submit">Submit Loan Application</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    <CardContent className="p-0">
                        <ShoppingCart className="w-10 h-10 mx-auto mb-2" />
                        <h3 className="font-semibold">View Marketplace</h3>
                        <p className="text-xs text-muted-foreground">See available produce</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Marketplace Access</DialogTitle>
                    <DialogDescription>
                        This would navigate to the marketplace page where users can buy and sell tokenized receipts.
                    </DialogDescription>
                </DialogHeader>
                 <div className="flex justify-center pt-4">
                    <Button size="lg" onClick={() => alert('Navigating to marketplace...')}>Go to Marketplace</Button>
                </div>
            </DialogContent>
        </Dialog>
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Overview of the latest receipts created for your members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead className="text-right">Quantity (t)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coopReceipts.slice(0, 5).map(receipt => {
                  const farmer = farmers.find(f => f.id === receipt.ownerId);
                  return (
                    <TableRow key={receipt.id}>
                        <TableCell className="font-medium">{farmer?.name || 'Unknown Farmer'}</TableCell>
                        <TableCell>{receipt.cropType}</TableCell>
                        <TableCell className="text-right">{receipt.quantity}</TableCell>
                        <TableCell className="text-center">{getReceiptStatus(receipt)}</TableCell>
                        <TableCell>{format(new Date(receipt.creationTimestamp), 'PP')}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                           <Link href={`/dashboard/receipt/${receipt.id}`}>View</Link>
                        </Button>
                        </TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
