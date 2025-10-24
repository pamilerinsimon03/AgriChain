'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, UploadCloud } from 'lucide-react';
import Link from 'next/link';

type Step = 'phone' | 'otp' | 'coop-profile' | 'upload-members';

export function SignupFlow() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [coopName, setCoopName] = useState('');
  const [coopLocation, setCoopLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call to request OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Requesting OTP for:', phone);
    toast({
      title: 'OTP Sent',
      description: `An OTP has been sent to ${phone}.`,
    });
    setIsLoading(false);
    setStep('otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call to verify OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Verifying OTP:', otp);
    if (otp === '123456') { // Mock OTP
      toast({
        title: 'Phone Verified',
        description: 'Please complete your cooperative profile.',
      });
      setIsLoading(false);
      setStep('coop-profile');
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'The OTP you entered is incorrect. Please try again.',
      });
      setIsLoading(false);
    }
  };
  
  const handleCoopSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
          title: "Profile Created",
          description: "Next, upload your cooperative's member list.",
      });
      setIsLoading(false);
      setStep('upload-members');
  }

  const handleUploadSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
          title: "Members Uploaded",
          description: "Your account is ready. Redirecting to dashboard...",
      });
      setIsLoading(false);
      router.push('/dashboard');
  }


  const renderStep = () => {
    switch (step) {
      case 'phone':
        return (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue with Phone
            </Button>
          </form>
        );
      case 'otp':
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                placeholder="123456"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="text-xs text-muted-foreground pt-1">We've sent a 6-digit code to {phone}.</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Account
            </Button>
          </form>
        );
      case 'coop-profile':
        return (
            <form onSubmit={handleCoopSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="coop-name">Cooperative Name</Label>
                    <Input id="coop-name" required placeholder="e.g., Greenfield Farmers Coop" value={coopName} onChange={(e) => setCoopName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="coop-location">Location</Label>
                    <Input id="coop-location" required placeholder="e.g., Oyo State, Nigeria" value={coopLocation} onChange={(e) => setCoopLocation(e.target.value)} />
                </div>
                <div className="flex items-start space-x-3 pt-2">
                    <ShieldCheck className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                    <div className="text-xs text-muted-foreground">
                        Optionally, you can verify your cooperative's identity (e.g., with a CAC document) later for enhanced trust and access to more features. Your data is protected under NDPR.
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Profile
                </Button>
            </form>
        );
      case 'upload-members':
          return (
            <form onSubmit={handleUploadSubmit} className="space-y-6 text-center">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-12">
                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">Upload Member CSV</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Drag & drop your file here, or click to browse.
                    </p>
                    <Button variant="link" size="sm" className="mt-2 text-primary">Download template</Button>
                    <Input id="csv-upload" type="file" className="sr-only" accept=".csv"/>
                </div>

                 <div className="flex items-center space-x-2">
                    <div className="flex-1 border-t"></div>
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="flex-1 border-t"></div>
                </div>
                
                <Button variant="secondary" className="w-full" onClick={() => router.push('/dashboard')}>
                    Skip and Add Members Later
                </Button>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Finish Onboarding
                </Button>
            </form>
          )
    }
  };

  return (
    <div className="space-y-4">
      {renderStep()}
      {step !== 'upload-members' && (
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
