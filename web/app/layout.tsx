import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/components/inkwell/NavBar';

export const metadata: Metadata = {
  title: { default: 'CarExpress — VIN Decoder & Vehicle Reports', template: '%s · CarExpress' },
  description:
    'Decode any VIN and pull a full vehicle report: specs, history, auction & salvage records, images.',
  openGraph: { type: 'website', siteName: 'CarExpress' },
  robots: { index: true, follow: true },
};

const demoUser = { name: 'Maria Sandoval', org: 'Coastal Auto', initials: 'MS' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="ink-root">
        <NavBar user={demoUser} />
        <main>{children}</main>
      </body>
    </html>
  );
}
