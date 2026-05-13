import Link from 'next/link';
import { ink } from '@/components/inkwell/tokens';

export default function NotFound() {
  return (
    <div
      style={{
        padding: 64,
        textAlign: 'center',
        maxWidth: 560,
        margin: '64px auto',
        background: ink.panel,
        borderRadius: 12,
        border: `1px solid ${ink.border}`,
      }}
    >
      <div
        style={{
          fontFamily: ink.mono,
          fontSize: 11,
          color: ink.salvage,
          letterSpacing: '.15em',
          marginBottom: 14,
        }}
      >
        VIN NOT FOUND
      </div>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
        No data for that VIN
      </h1>
      <p style={{ marginTop: 10, color: ink.muted, fontSize: 14 }}>
        Double-check the 17-character format and try again.
      </p>
      <Link
        href="/"
        className="ink-btn-primary"
        style={{
          marginTop: 24,
          display: 'inline-block',
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: 14,
          textDecoration: 'none',
        }}
      >
        Back to search
      </Link>
    </div>
  );
}
