import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { marketItems, receipts } from '@/lib/data';
import StatCard from './shared/StatCard';
import { ShoppingCart, FileCheck, Truck, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BuyerDashboard() {
  const activeListings = marketItems.length;
  const totalAvailableQuantity = marketItems.reduce((sum, item) => {
    const receipt = receipts.find(r => r.id === item.receiptId);
    return sum + (receipt?.quantity || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Listings" value={activeListings.toString()} icon={ShoppingCart} description="Tokenized receipts for sale"/>
        <StatCard title="Total Quantity" value={`${totalAvailableQuantity.toLocaleString()} tons`} icon={BarChart} description="Total available produce"/>
        <StatCard title="My Purchases" value="0" icon={FileCheck} description="Completed transactions"/>
        <StatCard title="In Escrow" value="$0" icon={Truck} description="Payments pending delivery"/>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Digital Marketplace</CardTitle>
          <CardDescription>
            Purchase tokenized receipts for high-quality, traceable produce directly from farmers.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {marketItems.map(item => {
            const receipt = receipts.find(r => r.id === item.receiptId);
            if (!receipt) return null;
            return (
              <Card key={item.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{receipt.cropType}</CardTitle>
                      <CardDescription>from {receipt.origin}</CardDescription>
                    </div>
                    <Badge variant="outline">Quality: {receipt.quality}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <p className="text-2xl font-bold">${item.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {receipt.quantity} tons available
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now (Escrow)
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
