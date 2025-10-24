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
  import { Button } from '@/components/ui/button';
  import { loans } from '@/lib/data';
  import { formatDistanceToNow } from 'date-fns';
  import StatCard from './shared/StatCard';
  import { Landmark, PiggyBank, CircleAlert, CircleCheck } from 'lucide-react';
  import Link from 'next/link';
  
  export default function LenderDashboard() {
    const pendingLoans = loans.filter(l => l.status === 'Pending');
    const approvedLoans = loans.filter(l => l.status === 'Approved');
    const totalLoaned = approvedLoans.reduce((sum, l) => sum + l.amount, 0);
  
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pending Requests"
            value={pendingLoans.length.toString()}
            icon={CircleAlert}
            description="Awaiting review"
          />
          <StatCard
            title="Active Loans"
            value={approvedLoans.length.toString()}
            icon={CircleCheck}
            description="Total loans disbursed"
          />
          <StatCard
            title="Total Disbursed"
            value={`₦${(totalLoaned / 1000000).toFixed(1)}M`}
            icon={PiggyBank}
            description="Value of active loans"
          />
          <StatCard
            title="Avg. Interest Rate"
            value="15.5%"
            icon={Landmark}
            description="Average across active loans"
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loan Collateral Queue</CardTitle>
            <CardDescription>
              Review and approve loan requests backed by verifiable digital receipts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farmer ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Collateral (Receipt)</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLoans.map(loan => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">
                      ...{loan.farmerId.slice(-4)}
                    </TableCell>
                    <TableCell>₦{loan.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                        <Link href={`/dashboard/receipt/${loan.receiptId}`}>
                          ...{loan.receiptId.slice(-6)}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(loan.requestTimestamp), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="destructive" size="sm">Reject</Button>
                        <Button size="sm">Approve</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
