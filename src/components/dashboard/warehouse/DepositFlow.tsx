"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
    Loader2,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    UploadCloud,
    Camera,
    ClipboardSignature,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "details" | "photos" | "confirm" | "complete";

const steps = [
    { id: "details", name: "Deposit Details" },
    { id: "photos", name: "Upload Photos" },
    { id: "confirm", name: "Confirm & Sign" },
    { id: "complete", name: "Complete" },
];

const newReceiptId = 'receipt-007';

export function DepositFlow({ closeDialog }: { closeDialog: () => void }) {
    const [step, setStep] = useState<Step>("details");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const currentStepIndex = steps.findIndex((s) => s.id === step);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

    const goToNextStep = () => {
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < steps.length) {
            setStep(steps[nextStepIndex].id as Step);
        }
    };

    const goToPrevStep = () => {
        const prevStepIndex = currentStepIndex - 1;
        if (prevStepIndex >= 0) {
            setStep(steps[prevStepIndex].id as Step);
        }
    };
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "Processing...",
          description: "Submitting deposit details.",
        });

        goToNextStep();
        setIsLoading(false);
    }

    const handleSignature = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
          title: "Receipt Generated!",
          description: "The digital receipt has been created and anchored.",
        });
        goToNextStep();
        setIsLoading(false);
    }

    const handleViewReceipt = () => {
        closeDialog();
        router.push(`/dashboard/receipt/${newReceiptId}`);
    }

    return (
        <div className="space-y-6">
            <div>
                <Label className="text-sm text-muted-foreground">{`Step ${currentStepIndex + 1} of ${steps.length}: ${steps[currentStepIndex].name}`}</Label>
                <Progress value={progressValue} className="mt-1 h-2" />
            </div>

            <div className="py-4 min-h-[300px]">
                {step === "details" && (
                    <form id="deposit-details-form" onSubmit={handleFormSubmit} className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="farmerId">Farmer ID</Label>
                            <Input id="farmerId" placeholder="e.g., user-1" defaultValue="farmer-101" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cropType">Crop Type</Label>
                                <Select required name="cropType" defaultValue="Corn">
                                    <SelectTrigger id="cropType"><SelectValue placeholder="Select crop" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Wheat">Wheat</SelectItem>
                                        <SelectItem value="Corn">Corn</SelectItem>
                                        <SelectItem value="Soybeans">Soybeans</SelectItem>
                                        <SelectItem value="Rice">Rice</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity (tons)</Label>
                                <Input id="quantity" type="number" placeholder="e.g., 150" defaultValue="120" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quality">Quality Grade</Label>
                                <Select required name="quality" defaultValue="B">
                                    <SelectTrigger id="quality"><SelectValue placeholder="Select grade" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Grade A</SelectItem>
                                        <SelectItem value="B">Grade B</SelectItem>
                                        <SelectItem value="C">Grade C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="origin">Origin Farm</Label>
                                <Input id="origin" placeholder="e.g., Green Valley Farm" defaultValue="Upland Farms" />
                            </div>
                        </div>
                    </form>
                )}

                 {step === "photos" && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Upload photos of the deposit and any quality certificates.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-12 text-center">
                                <Camera className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 font-semibold">Use Device Camera</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Capture live photos
                                </p>
                            </div>
                            <label htmlFor="photo-upload" className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-12 text-center cursor-pointer hover:bg-accent">
                                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 font-semibold">Upload Files</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    PNG, JPG, PDF up to 10MB
                                </p>
                                <Input id="photo-upload" type="file" className="sr-only" multiple />
                            </label>
                        </div>
                    </div>
                 )}

                 {step === "confirm" && (
                     <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Confirm and Sign</h3>
                        <div className="p-4 rounded-md border bg-muted/50 space-y-2 text-sm">
                            <p><strong>Crop:</strong> Corn</p>
                            <p><strong>Quantity:</strong> 120 tons</p>
                            <p><strong>Quality:</strong> Grade B</p>
                            <p><strong>Farmer:</strong> farmer-101</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Warehouse Clerk Signature</Label>
                            <div className="h-24 rounded-md border flex items-center justify-center text-muted-foreground">
                                <ClipboardSignature className="mr-2" />
                                Click to sign
                            </div>
                        </div>
                    </div>
                 )}

                 {step === "complete" && (
                    <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Receipt Issued</h3>
                        <p className="text-muted-foreground mt-2">Receipt ID: {newReceiptId} has been created and sent to the farmer.</p>
                         <div className="mt-6 flex justify-center gap-2">
                           <Button variant="outline" onClick={handleViewReceipt}>View Receipt</Button>
                           <Button onClick={closeDialog}>Done</Button>
                        </div>
                    </div>
                 )}
            </div>
            
            <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={goToPrevStep} disabled={currentStepIndex === 0 || isLoading || step === 'complete'}>
                    <ArrowLeft className="mr-2" />
                    Previous
                </Button>

                {step === 'details' && (
                    <Button type="submit" form="deposit-details-form" disabled={isLoading}>
                         {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next"}
                         <ArrowRight className="ml-2" />
                    </Button>
                )}

                {step === 'photos' && (
                    <Button onClick={goToNextStep} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next"}
                        <ArrowRight className="ml-2" />
                    </Button>
                )}
                 
                 {step === "confirm" && (
                    <Button onClick={handleSignature} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign & Generate Receipt"}
                        {!isLoading && <CheckCircle className="ml-2"/>}
                    </Button>
                 )}
            </div>
        </div>
    );
}
