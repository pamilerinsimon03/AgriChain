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
import { receipts } from '@/lib/data';
import StatCard from './shared/StatCard';
import { Warehouse, Wheat, ShieldCheck, Scale, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DepositFlow } from './warehouse/DepositFlow';
import Link from 'next/link';

export default function WarehouseDashboard() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const warehouseId = 'user-2';
  const warehouseReceipts = receipts.filter(r => r.warehouseId === warehouseId);
  const totalQuantity = warehouseReceipts.reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Inventory" value={`${totalQuantity.toLocaleString()} tons`} icon={Warehouse} description="Total crops stored"/>
            <StatCard title="Receipts Issued" value={warehouseReceipts.length.toString()} icon={ShieldCheck} description="Digital receipts"/>
            <StatCard title="Crop Varieties" value={new Set(warehouseReceipts.map(r => r.cropType)).size.toString()} icon={Wheat} description="Types of crops"/>
            <StatCard title="Avg. Quality" value="A-" icon={Scale} description="Avg. quality grade"/>
        </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <Card>
            <CardHeader>
                <CardTitle>Issue New Receipt</CardTitle>
                <CardDescription>
                Log a new deposit and generate a blockchain-anchored receipt.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DialogTrigger asChild>
                    <Button className="w-full">
                        <PlusCircle className="mr-2" />
                        Start New Deposit
                    </Button>
                </DialogTrigger>
            </CardContent>
            </Card>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>New Warehouse Deposit</DialogTitle>
                    <DialogDescription>
                        Follow the steps to issue a new digital receipt for a crop deposit.
                    </DialogDescription>
                </DialogHeader>
                <DepositFlow closeDialog={() => setIsDepositOpen(false)} />
            </DialogContent>
        </Dialog>
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>
              View all produce currently stored in the warehouse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Quantity (t)</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warehouseReceipts.map(receipt => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">
                        ...{receipt.id.slice(-6)}
                      </TableCell>
                      <TableCell>{receipt.cropType}</TableCell>
                      <TableCell>{receipt.quantity}</TableCell>
                      <TableCell>...{receipt.ownerId.slice(-4)}</TableCell>
                      <TableCell className="text-right">
                         <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/receipt/${receipt.id}`}>View</Link>
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
