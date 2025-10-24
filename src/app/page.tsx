import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/Logo';
import { ArrowRight, University, Milestone, Bot } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-8 sm:px-10 lg:px-12">
          <div className="mr-4 flex items-center">
            <Logo className="w-8 h-8 mr-2 text-primary" />
            <span className="font-bold">AgriChain</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium flex-1">
            {/* Future nav links can go here */}
          </nav>
          <div className="flex items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-8 sm:px-10 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 lg:col-span-7">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                  Revolutionizing Agricultural Finance with Trust and Transparency.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We bridge the financing gap for farmers by transforming harvested crops into bankable assets through blockchain technology.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Request a Pilot
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 flex items-center justify-center">
                 <img
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop"
                  alt="Happy Farmer"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="w-full py-12 md:py-24 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-8 sm:px-10 lg:px-12 text-center md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">$32B</h3>
              <p className="mx-auto max-w-[200px] text-muted-foreground">
                Financing gap for smallholder farmers in Africa.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">50%</h3>
              <p className="mx-auto max-w-[200px] text-muted-foreground">
                Post-harvest loss due to inefficient supply chains.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">10x</h3>
              <p className="mx-auto max-w-[200px] text-muted-foreground">
                Potential for growth with access to fair credit.
              </p>
            </div>
          </div>
        </section>

        {/* Credibility Logos */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-8 sm:px-10 lg:px-12">
            <h2 className="text-center text-2xl font-semibold text-muted-foreground mb-10">
              Trusted by Industry Leaders and Innovators
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                <Milestone className="w-10 h-10 text-gray-500" />
                <span className="text-xl font-semibold text-gray-500">AFEX</span>
              </div>
               <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                <Bot className="w-10 h-10 text-gray-500" />
                <span className="text-xl font-semibold text-gray-500">Bank of Agriculture</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4 px-8 sm:px-10 lg:px-12">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AgriChain. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Legal</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Pitch Deck</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
