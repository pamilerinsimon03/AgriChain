import { Logo } from '@/components/icons/Logo';
import Link from 'next/link';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-8 sm:px-10 lg:px-12">
          <Link href="/" className="mr-4 flex items-center">
            <Logo className="w-8 h-8 mr-2 text-primary" />
            <span className="font-bold">AgriChain</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-secondary">
        <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight text-primary">
                    {title}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    {subtitle}
                  </p>
              </div>
              <Card className="mt-8">
                <CardContent className="p-6">
                  {children}
                </CardContent>
              </Card>
            </div>
        </div>
      </main>
    </div>
  );
}

// Minimal card component styling for auth pages
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
    {...props}
  />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
);
