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
import { loans, receipts } from '@/lib/data';
import { format } from 'date-fns';
import StatCard from './shared/StatCard';
import { Package, Landmark, DollarSign, HandCoins } from 'lucide-react';

export default function FarmerDashboard() {
  const farmerId = 'user-1';
  const farmerReceipts = receipts.filter(r => r.ownerId === farmerId);
  const farmerLoans = loans.filter(l => l.farmerId === farmerId);

  const totalValue = farmerReceipts.reduce((acc, r) => acc + r.quantity * 300, 0); // Assuming $300/ton

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="My Receipts"
          value={farmerReceipts.length.toString()}
          icon={Package}
          description="Total digital receipts owned"
        />
        <StatCard
          title="Total Stored Value"
          value={`$${(totalValue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          description="Estimated value of stored crops"
        />
        <StatCard
          title="Active Loans"
          value={farmerLoans.filter(l => l.status === 'Approved').length.toString()}
          icon={Landmark}
          description="Loans collateralized with receipts"
        />
        <StatCard
          title="Pending Loans"
          value={farmerLoans.filter(l => l.status === 'Pending').length.toString()}
          icon={HandCoins}
          description="Awaiting lender approval"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Receipts</CardTitle>
            <CardDescription>
              Manage your digital receipts and use them as collateral.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity (t)</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmerReceipts.map(receipt => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">
                      {receipt.cropType}
                    </TableCell>
                    <TableCell>{receipt.quantity}</TableCell>
                    <TableCell>
                      {format(new Date(receipt.creationTimestamp), 'PP')}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Request Loan
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Loans</CardTitle>
            <CardDescription>Track the status of your loan requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmerLoans.map(loan => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">
                      ${loan.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>...{loan.receiptId.slice(-6)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          loan.status === 'Approved'
                            ? 'default'
                            : loan.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={loan.status === 'Approved' ? 'bg-green-600' : ''}
                      >
                        {loan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
