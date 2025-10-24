import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { receipts, loans, marketItems } from '@/lib/data';
import StatCard from './shared/StatCard';
import { Scale, Users, ShoppingCart, Landmark } from 'lucide-react';
import FraudDetectionTool from './shared/FraudDetectionTool';

export default function RegulatorDashboard() {
  const totalReceipts = receipts.length;
  const totalLoans = loans.length;
  const totalMarketItems = marketItems.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Receipts"
          value={totalReceipts.toString()}
          icon={Scale}
          description="Total digital receipts in the system"
        />
        <StatCard
          title="Active Loans"
          value={totalLoans.toString()}
          icon={Landmark}
          description="Total loans collateralized"
        />
        <StatCard
          title="Market Listings"
          value={totalMarketItems.toString()}
          icon={ShoppingCart}
          description="Produce currently for sale"
        />
        <StatCard
          title="Participants"
          value="5"
          icon={Users}
          description="Stakeholders in the ecosystem"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fraud Detection Tool</CardTitle>
          <CardDescription>
            Leverage AI to analyze receipt data and identify potential inconsistencies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FraudDetectionTool />
        </CardContent>
      </Card>
    </div>
  );
}
