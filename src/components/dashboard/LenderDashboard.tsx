
'use client';

import { useState } from 'react';
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
  import { loans, receipts, farmers } from '@/lib/data';
  import { formatDistanceToNow } from 'date-fns';
  import StatCard from './shared/StatCard';
  import { Landmark, PiggyBank, CircleAlert, CircleCheck, FileText, BadgePercent } from 'lucide-react';
  import Link from 'next/link';
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog';
  import { Badge } from '../ui/badge';
  import type { Loan } from '@/lib/types';


  export default function LenderDashboard() {
    const [loanList, setLoanList] = useState<Loan[]>(loans);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

    const handleApproveClick = (loan: Loan) => {
        setSelectedLoan(loan);
        setIsApproveModalOpen(true);
    };

    const handleRejectClick = (loanId: string) => {
        setLoanList(prevLoans => prevLoans.map(l => l.id === loanId ? {...l, status: 'Rejected'} : l));
    }
    
    const confirmApprove = () => {
        if (!selectedLoan) return;
        setLoanList(prevLoans => prevLoans.map(l => l.id === selectedLoan.id ? {...l, status: 'Approved'} : l));
        setIsApproveModalOpen(false);
        setSelectedLoan(null);
    }
    
    const pendingLoans = loanList.filter(l => l.status === 'Pending');
    const approvedLoans = loanList.filter(l => l.status === 'Approved');
    const totalLoaned = approvedLoans.reduce((sum, l) => sum + l.amount, 0);

    const selectedReceipt = selectedLoan ? receipts.find(r => r.id === selectedLoan.receiptId) : null;
    const selectedFarmer = selectedLoan ? farmers.find(f => f.id === selectedLoan.farmerId) : null;
  
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
            icon={BadgePercent}
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
                  <TableHead>Farmer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-center">Risk Score</TableHead>
                  <TableHead>Collateral (Receipt)</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLoans.map(loan => {
                  const farmer = farmers.find(f => f.id === loan.farmerId);
                  const riskScore = Math.floor(Math.random() * 40) + 55; // Mock score 55-94
                  let riskColor = "bg-green-500";
                  if (riskScore < 70) riskColor = "bg-yellow-500";
                  if (riskScore < 60) riskColor = "bg-red-500";
                  
                  return (
                    <TableRow key={loan.id}>
                        <TableCell className="font-medium">
                        {farmer?.name || '...'+loan.farmerId.slice(-4)}
                        </TableCell>
                        <TableCell>₦{loan.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                            <Badge className={`${riskColor} text-white`}>{riskScore}</Badge>
                        </TableCell>
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
                            <Button variant="destructive" size="sm" onClick={() => handleRejectClick(loan.id)}>Reject</Button>
                            <Button size="sm" onClick={() => handleApproveClick(loan)}>Approve</Button>
                        </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AlertDialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Loan Approval</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to approve a loan of <span className="font-bold">₦{selectedLoan?.amount.toLocaleString()}</span> for <span className="font-bold">{selectedFarmer?.name}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 my-4">
                     <p>This action will disburse the funds and place a lien on the collateral receipt via smart contract. The receipt will be locked until the loan is repaid.</p>
                     <Card>
                        <CardHeader className="pb-2">
                             <CardTitle className="text-base flex items-center gap-2"><FileText />Collateral Details</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p><strong>Receipt ID:</strong> {selectedReceipt?.id}</p>
                            <p><strong>Asset:</strong> {selectedReceipt?.quantity} tons of {selectedReceipt?.cropType}</p>
                            <p><strong>Warehouse:</strong> {selectedReceipt?.warehouseId}</p>
                        </CardContent>
                     </Card>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmApprove}>Approve & Disburse Funds</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
