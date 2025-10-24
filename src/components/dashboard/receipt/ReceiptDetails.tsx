
"use client";

import { useState, useEffect } from 'react';
import type { Receipt } from "@/lib/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import Image from 'next/image';
import { 
    Share2, 
    Landmark, 
    ShoppingCart, 
    ShieldAlert, 
    CheckCircle, 
    FileText, 
    Warehouse, 
    MapPin,
    Calendar,
    Hash,
    Camera,
    Truck,
    User
} from "lucide-react";
import { placeholderImages } from '@/lib/placeholder-images.json';

export function ReceiptDetails({ receipt }: { receipt: Receipt }) {
  const [creationDate, setCreationDate] = useState<string | null>(null);

  useEffect(() => {
    // This will only run on the client, after hydration
    setCreationDate(format(new Date(receipt.creationTimestamp), "PPP p"));
  }, [receipt.creationTimestamp]);


  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Receipt Details</h1>
                    <p className="text-muted-foreground text-sm truncate">ID: {receipt.id}</p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm"><Share2 className="mr-2"/> Share</Button>
                <Button variant="outline" size="sm"><Landmark className="mr-2"/> Use as Collateral</Button>
                <Button><ShoppingCart className="mr-2"/> List on Marketplace</Button>
                <Button variant="destructive" size="sm"><ShieldAlert className="mr-2"/> Dispute</Button>
            </div>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                            <span>{receipt.quantity} tons of {receipt.cropType}</span>
                             <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge variant="outline" className="border-green-500 text-green-600 cursor-pointer">
                                            <CheckCircle className="w-3 h-3 mr-1.5" />
                                            Verified
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>This receipt is anchored on the ledger and cannot be altered.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription>Quality Grade: {receipt.quality}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center"><MapPin className="mr-2 w-4 h-4"/> Origin & Storage</h3>
                            <div className="text-sm">
                                <p><strong>Origin:</strong> {receipt.origin}</p>
                                <p><strong>Warehouse:</strong> {receipt.warehouseId} (Agro-Protect Ltd)</p>
                            </div>
                        </div>
                        <Separator />
                        <div>
                             <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center"><Calendar className="mr-2 w-4 h-4"/> Key Dates</h3>
                             <div className="text-sm">
                                <p><strong>Created:</strong> {creationDate || 'Loading...'}</p>
                             </div>
                        </div>
                         <Separator />
                         <div>
                             <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center"><Hash className="mr-2 w-4 h-4"/> Ledger Anchor</h3>
                             <p className="text-sm font-mono bg-muted p-2 rounded-md break-all">
                                0x{Buffer.from(receipt.id).toString('hex')}...
                             </p>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Custody Chain</CardTitle>
                        <CardDescription>Immutable log of this receipt's history.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="relative pl-6">
                            <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
                            {receipt.custodyTrail.map((event, index) => (
                                <div key={index} className="relative flex items-start gap-4 mb-6 last:mb-0">
                                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary -translate-x-1/2 ml-3"></div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{event.action}</p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <User className="w-3 h-3"/> {event.actor} ({event.role})
                                        </p>
                                        {creationDate && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {format(new Date(event.timestamp), "PPP p")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                       </div>
                    </CardContent>
                </Card>

            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Camera className="mr-2"/>Attached Media</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                        {placeholderImages.slice(0, 3).map((img) => (
                            <Image 
                                key={img.src}
                                src={img.src} 
                                alt={img.alt} 
                                width={200}
                                height={200}
                                data-ai-hint={img.aiHint}
                                className="rounded-md aspect-square object-cover" 
                            />
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Truck className="mr-2"/>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-muted-foreground text-center py-4">No transactions yet.</p>
                    </CardContent>
                </Card>
            </div>

        </main>
    </div>
  );
}
