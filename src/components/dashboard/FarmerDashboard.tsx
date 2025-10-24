
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
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { farmers, loans, receipts, marketItems, commodityPrices } from '@/lib/data';
import { format } from 'date-fns';
import StatCard from './shared/StatCard';
import { Package, FileText, Landmark, ShoppingCart, MessageSquare, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import type { Receipt } from '@/lib/types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Link from 'next/link';

function getReceiptStatus(receipt: Receipt) {
    if (loans.some(l => l.receiptId === receipt.id && (l.status === 'Approved' || l.status === 'Pending'))) {
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Collateral</Badge>;
    }
    if (marketItems.some(m => m.receiptId === receipt.id)) {
        return <Badge variant="outline">In Market</Badge>;
    }
    if (receipt.isTokenized) { 
        return <Badge variant="secondary" className="bg-blue-500 text-white">Tokenized</Badge>;
    }
    return <Badge>Issued</Badge>;
}

export default function FarmerDashboard() {
  const farmerId = 'farmer-101'; // Assuming we are logged in as Alice Peters
  const farmer = farmers.find(f => f.id === farmerId);
  const farmerReceipts = receipts.filter(r => r.ownerId === farmerId);
  const farmerLoans = loans.filter(l => l.farmerId === farmerId);

  const totalStoredValue = farmerReceipts.reduce((acc, r) => acc + r.quantity * 250000, 0); // Assuming avg ₦250,000/ton
  const activeReceipts = farmerReceipts.length;
  const activeLoans = farmerLoans.filter(l => l.status === 'Approved' || l.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Top Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Stored Value" value={`₦${(totalStoredValue / 1000000).toFixed(1)}M`} icon={Package} description="Estimated value of your crops" />
        <StatCard title="My Receipts" value={activeReceipts.toString()} icon={FileText} description="Digital receipts you own" />
        <StatCard title="My Loans" value={activeLoans.toString()} icon={Landmark} description="Pending or active loans" />
        <StatCard title="My Cooperative" value="Greenfield Coop" icon={Landmark} description="Your registered cooperative" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:order-2">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp />
                        Daily Commodity Prices
                    </CardTitle>
                    <CardDescription>Live market prices per ton.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {commodityPrices.map((item) => (
                            <li key={item.cropType} className="flex items-center justify-between">
                                <span className="font-medium">{item.cropType}</span>
                                <div className="flex items-center gap-2">
                                     <span className={`flex items-center text-sm font-semibold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                                        {item.change.toFixed(1)}%
                                    </span>
                                    <span className="font-semibold text-right w-[100px]">₦{item.price.toLocaleString()}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6 lg:order-1">
            {/* Action Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Dialog>
                <DialogTrigger asChild>
                    <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    <CardContent className="p-0">
                        <Landmark className="w-10 h-10 mx-auto mb-2" />
                        <h3 className="font-semibold">Request a Loan</h3>
                        <p className="text-xs text-muted-foreground">Use a receipt as collateral</p>
                    </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Request a Loan</DialogTitle>
                    <DialogDescription>
                        Select one of your receipts to use as collateral for a loan application.
                    </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4 py-4" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Loan application submitted!');
                    }}>
                    <div className="space-y-2">
                        <Label htmlFor="receiptId">Collateral Receipt ID</Label>
                        <Input id="receiptId" placeholder="e.g., receipt-001" defaultValue="receipt-001" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loanAmount">Loan Amount (₦)</Label>
                        <Input id="loanAmount" type="number" placeholder="e.g., 5000000" defaultValue="15000000" required />
                    </div>
                    <Button className="w-full" type="submit">Submit to Cooperative</Button>
                    </form>
                </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                            <CardContent className="p-0">
                                <ShoppingCart className="w-10 h-10 mx-auto mb-2" />
                                <h3 className="font-semibold">Sell on Marketplace</h3>
                                <p className="text-xs text-muted-foreground">List a receipt for sale</p>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>List Produce on Marketplace</DialogTitle>
                            <DialogDescription>
                                Set a price for your tokenized receipt to sell it to buyers.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4 py-4" onSubmit={(e) => {
                        e.preventDefault();
                        alert('Receipt listed on marketplace!');
                        }}>
                        <div className="space-y-2">
                            <Label htmlFor="receiptId-market">Receipt to Sell</Label>
                            <Input id="receiptId-market" defaultValue="receipt-003" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Asking Price (₦)</Label>
                            <Input id="price" type="number" defaultValue="55000000" required />
                        </div>
                        <Button className="w-full" type="submit">List for Sale</Button>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                            <CardContent className="p-0">
                                <MessageSquare className="w-10 h-10 mx-auto mb-2" />
                                <h3 className="font-semibold">SMS/USSD Help</h3>
                                <p className="text-xs text-muted-foreground">Access services offline</p>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>USSD / SMS Instructions</DialogTitle>
                            <DialogDescription>
                                If you have limited internet, you can use these codes to manage your receipts.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                            <div>
                                <h4 className="font-medium">Check Receipt Status</h4>
                                <p className="text-muted-foreground">Dial <code className="bg-muted px-2 py-1 rounded-md">*347*123*1#</code> and follow the prompts.</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Confirm Loan Disbursement</h4>
                                <p className="text-muted-foreground">Send <code className="bg-muted px-2 py-1 rounded-md">CONFIRM [LoanID]</code> to <code className="bg-muted px-2 py-1 rounded-md">5678</code>.</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Standard network charges may apply. Contact your cooperative leader for assistance.
                            </p>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Recent Activity Feed */}
            <Card>
                <CardHeader>
                <CardTitle>My Digital Receipts</CardTitle>
                <CardDescription>
                    Overview of the latest receipts you own.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Receipt ID</TableHead>
                        <TableHead>Crop</TableHead>
                        <TableHead className="text-right">Quantity (t)</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {farmerReceipts.slice(0, 5).map(receipt => (
                        <TableRow key={receipt.id}>
                            <TableCell className="font-medium">...{receipt.id.slice(-6)}</TableCell>
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
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    