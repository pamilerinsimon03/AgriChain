import { ReceiptDetails } from "@/components/dashboard/receipt/ReceiptDetails";
import { receipts } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const receipt = receipts.find(r => r.id === id);

  if (!receipt) {
    notFound();
  }

  return <ReceiptDetails receipt={receipt} />;
}
