
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { marketItems, receipts, farmers } from '@/lib/data';
import StatCard from './shared/StatCard';
import { ShoppingCart, FileCheck, Truck, BarChart, Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';

export default function BuyerDashboard() {
  const [filters, setFilters] = useState({ cropType: 'all', quality: 'all' });
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [escrowStep, setEscrowStep] = useState(0);

  const activeListings = marketItems.length;
  const totalAvailableQuantity = marketItems.reduce((sum, item) => {
    const receipt = receipts.find(r => r.id === item.receiptId);
    return sum + (receipt?.quantity || 0);
  }, 0);

  const filteredMarketItems = marketItems.filter(item => {
    const receipt = receipts.find(r => r.id === item.receiptId);
    if (!receipt) return false;
    const cropMatch = filters.cropType === 'all' || receipt.cropType === filters.cropType;
    const qualityMatch = filters.quality === 'all' || receipt.quality === filters.quality;
    return cropMatch && qualityMatch;
  });

  const handleBuyClick = (item: any) => {
    const receipt = receipts.find(r => r.id === item.receiptId);
    const seller = farmers.find(f => f.id === receipt?.ownerId);
    setSelectedItem({ ...item, receipt, seller });
    setEscrowStep(0);
    setIsEscrowModalOpen(true);
  };

  const nextEscrowStep = async () => {
    setEscrowStep(s => s + 1);
    if (escrowStep === 1) { // After "Confirm Payment"
        await new Promise(resolve => setTimeout(resolve, 1500));
        setEscrowStep(s => s + 1); // Auto-advance to "Completed"
    }
  };
  
  const escrowProgress = (escrowStep / 3) * 100;
  const escrowSteps = ["Confirm Purchase", "Awaiting Payment", "Awaiting Warehouse Release", "Completed"];


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
        <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <Input placeholder="Search by region or farmer..." className="flex-1" />
                 <Select value={filters.cropType} onValueChange={(value) => setFilters(prev => ({...prev, cropType: value}))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by Crop" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Crops</SelectItem>
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Corn">Corn</SelectItem>
                        <SelectItem value="Soybeans">Soybeans</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={filters.quality} onValueChange={(value) => setFilters(prev => ({...prev, quality: value}))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by Quality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="A">Grade A</SelectItem>
                        <SelectItem value="B">Grade B</SelectItem>
                        <SelectItem value="C">Grade C</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMarketItems.map(item => {
                const receipt = receipts.find(r => r.id === item.receiptId);
                const seller = farmers.find(f => f.id === receipt?.ownerId);
                if (!receipt || !seller) return null;
                return (
                  <Card key={item.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{receipt.cropType}</CardTitle>
                          <CardDescription>from {receipt.origin}</CardDescription>
                        </div>
                        <Badge variant="outline">Grade {receipt.quality}</Badge>
                      </div>
                       <div className="flex items-center gap-1 text-sm pt-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{seller.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({seller.ratingsCount} ratings)</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2">
                      <p className="text-2xl font-bold">${item.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {receipt.quantity} tons available
                      </p>
                      <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                        <Link href={`/dashboard/receipt/${receipt.id}`}>View Receipt Details</Link>
                      </Button>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => handleBuyClick(item)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now (Escrow)
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
        </CardContent>
      </Card>
      
      <Dialog open={isEscrowModalOpen} onOpenChange={setIsEscrowModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Secure Escrow Purchase</DialogTitle>
                <DialogDescription>
                    You are purchasing {selectedItem?.receipt.quantity} tons of {selectedItem?.receipt.cropType} for ${selectedItem?.price.toLocaleString()}.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div>
                    <Label className="text-sm text-muted-foreground">Progress</Label>
                    <Progress value={escrowProgress} className="mt-1 h-2" />
                    <p className="text-center text-sm font-medium mt-2">{escrowSteps[escrowStep]}</p>
                </div>

                {escrowStep === 0 && (
                    <div className="text-center space-y-4">
                        <p>Your funds will be held securely in escrow until the warehouse confirms the release of the goods.</p>
                        <Button size="lg" onClick={nextEscrowStep}>Confirm Purchase</Button>
                    </div>
                )}
                {escrowStep === 1 && (
                     <div className="text-center space-y-4 pt-4">
                        <p className="font-semibold">Action Required: Confirm Payment</p>
                        <p className="text-muted-foreground text-sm">Please confirm you have sent the payment to the designated escrow account.</p>
                        <Button size="lg" onClick={nextEscrowStep}>I have sent the payment</Button>
                    </div>
                )}
                 {escrowStep === 2 && (
                     <div className="text-center space-y-4 pt-4">
                        <div className="flex justify-center items-center">
                            <Truck className="w-8 h-8 mr-2 animate-pulse" />
                            <p className="font-semibold">Awaiting warehouse release...</p>
                        </div>
                        <p className="text-muted-foreground text-sm">We have notified the warehouse. Payment will be released to the seller upon confirmation.</p>
                    </div>
                )}
                {escrowStep === 3 && (
                     <div className="text-center space-y-4 pt-4">
                        <FileCheck className="w-12 h-12 text-green-500 mx-auto" />
                        <p className="font-semibold text-lg">Purchase Complete!</p>
                        <p className="text-muted-foreground text-sm">The receipt has been transferred to your account.</p>
                        <Button onClick={() => setIsEscrowModalOpen(false)}>Close</Button>
                    </div>
                )}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
