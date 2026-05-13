import { notFound } from 'next/navigation';
import { ReportView } from '@/components/inkwell/ReportView';
import { resolveVin } from '@/lib/vin-data';

export function generateMetadata({ params }: { params: { vin: string } }) {
  return { title: `Report · ${params.vin}` };
}

export default function VehiclePage({ params }: { params: { vin: string } }) {
  const vin = params.vin.toUpperCase();
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) notFound();
  const data = resolveVin(vin);
  return <ReportView data={data} />;
}
