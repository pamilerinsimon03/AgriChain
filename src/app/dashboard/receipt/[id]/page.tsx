import { ReceiptDetails } from "@/components/dashboard/receipt/ReceiptDetails";
import { receipts } from "@/lib/data";
import { notFound } from "next/navigation";

export default function ReceiptPage({ params }: { params: { id: string } }) {
  const receipt = receipts.find(r => r.id === params.id);

  if (!receipt) {
    notFound();
  }

  return <ReceiptDetails receipt={receipt} />;
}
