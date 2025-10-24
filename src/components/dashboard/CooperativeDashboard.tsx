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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { farmers, loans, receipts } from '@/lib/data';
import { format } from 'date-fns';
import StatCard from './shared/StatCard';
import { Users, Package, Landmark, FileText, ShoppingCart, ScanLine, PlusCircle } from 'lucide-react';
import type { Receipt } from '@/lib/types';

function getReceiptStatus(receipt: Receipt) {
    if (loans.some(l => l.receiptId === receipt.id && (l.status === 'Approved' || l.status === 'Pending'))) {
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Collateralized</Badge>;
    }
    if (receipt.isTokenized) { // Assuming liquidated means sold/tokenized for market
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
  const totalStoredValue = coopReceipts.reduce((acc, r) => acc + r.quantity * 280, 0); // Assuming avg $280/ton
  const activeReceipts = coopReceipts.length;

  return (
    <div className="space-y-6">
      {/* Top Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Members" value={totalMembers.toString()} icon={Users} description="Farmers in your cooperative" />
        <StatCard title="Total Stored Value" value={`$${(totalStoredValue / 1000).toFixed(1)}k`} icon={Package} description="Estimated value of all crops" />
        <StatCard title="Active Receipts" value={activeReceipts.toString()} icon={FileText} description="Total digital receipts held" />
        <StatCard title="Pending Loans" value={coopLoans.filter(l => l.status === 'Pending').length.toString()} icon={Landmark} description="Awaiting lender approval" />
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
            <CardContent className="p-0">
                <ScanLine className="w-10 h-10 mx-auto mb-2" />
                <h3 className="font-semibold">Record Deposit</h3>
                <p className="text-xs text-muted-foreground">Scan QR or create new</p>
            </CardContent>
         </Card>
         <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
            <CardContent className="p-0">
                <PlusCircle className="w-10 h-10 mx-auto mb-2" />
                <h3 className="font-semibold">Issue Receipt</h3>
                <p className="text-xs text-muted-foreground">For a new member deposit</p>
            </CardContent>
         </Card>
         <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
            <CardContent className="p-0">
                <Landmark className="w-10 h-10 mx-auto mb-2" />
                <h3 className="font-semibold">Request Loan</h3>
                <p className="text-xs text-muted-foreground">For a cooperative member</p>
            </CardContent>
         </Card>
         <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
            <CardContent className="p-0">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2" />
                <h3 className="font-semibold">View Marketplace</h3>
                <p className="text-xs text-muted-foreground">See available produce</p>
            </CardContent>
         </Card>
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
                        <Button variant="outline" size="sm">
                            View
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
