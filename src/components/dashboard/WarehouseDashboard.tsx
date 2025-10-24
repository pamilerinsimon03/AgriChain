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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { receipts } from '@/lib/data';
import StatCard from './shared/StatCard';
import { Warehouse, Wheat, ShieldCheck, Scale } from 'lucide-react';

export default function WarehouseDashboard() {
  const warehouseId = 'user-2';
  const warehouseReceipts = receipts.filter(r => r.warehouseId === warehouseId);
  const totalQuantity = warehouseReceipts.reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Inventory" value={`${totalQuantity.toLocaleString()} tons`} icon={Warehouse} description="Total crops stored"/>
            <StatCard title="Receipts Issued" value={warehouseReceipts.length.toString()} icon={ShieldCheck} description="Immutable digital receipts"/>
            <StatCard title="Crop Varieties" value={new Set(warehouseReceipts.map(r => r.cropType)).size.toString()} icon={Wheat} description="Different types of crops"/>
            <StatCard title="Average Quality" value="A-" icon={Scale} description="Average quality grade of inventory"/>
        </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Issue New Receipt</CardTitle>
            <CardDescription>
              Log a new deposit and generate a blockchain-anchored receipt.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farmerId">Farmer ID</Label>
              <Input id="farmerId" placeholder="e.g., user-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select>
                  <SelectTrigger id="cropType">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wheat">Wheat</SelectItem>
                    <SelectItem value="Corn">Corn</SelectItem>
                    <SelectItem value="Soybeans">Soybeans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (tons)</Label>
                <Input id="quantity" type="number" placeholder="e.g., 150" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="quality">Quality Grade</Label>
                    <Select>
                    <SelectTrigger id="quality">
                        <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="origin">Origin Farm</Label>
                    <Input id="origin" placeholder="e.g., Green Valley Farm" />
                </div>
            </div>
            <Button className="w-full">Generate Receipt</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>
              View all produce currently stored in the warehouse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity (t)</TableHead>
                  <TableHead>Owner</TableHead>
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
