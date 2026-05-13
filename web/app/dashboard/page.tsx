import { DashboardView } from '@/components/inkwell/DashboardView';
import { getDashboardRows } from '@/lib/vin-data';

export const metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  const rows = getDashboardRows();
  return <DashboardView rows={rows} />;
}
