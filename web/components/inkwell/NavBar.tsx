'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ink } from './tokens';
import { Logo } from './Logo';

type User = { name: string; org: string; initials: string } | null;

const items: Array<{ id: string; label: string; href: string; disabled?: boolean }> = [
  { id: 'home', label: 'Decode', href: '/' },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'reports', label: 'Reports', href: '#', disabled: true },
  { id: 'fleet', label: 'Fleet', href: '#', disabled: true },
  { id: 'api', label: 'API', href: '#', disabled: true },
];

export function NavBar({ user }: { user?: User }) {
  const pathname = usePathname() || '/';
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <header
      style={{
        borderBottom: `1px solid ${ink.border}`,
        background: 'rgba(239,235,224,.92)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 32px', gap: 32 }}>
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: ink.text }}
        >
          <Logo />
        </Link>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          {items.map((item) => {
            const active =
              item.href !== '#' &&
              (pathname === item.href ||
                (item.id === 'home' && pathname.startsWith('/vehicle')));
            const content = (
              <span
                style={{
                  padding: '7px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  background: active ? ink.panel2 : 'transparent',
                  color: item.disabled ? ink.mutedDim : active ? ink.text : ink.textDim,
                  borderRadius: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: item.disabled ? 'default' : 'pointer',
                }}
              >
                {item.label}
                {item.disabled && (
                  <span
                    style={{
                      fontFamily: ink.mono,
                      fontSize: 9,
                      color: ink.mutedDim,
                      letterSpacing: '.1em',
                    }}
                  >
                    SOON
                  </span>
                )}
              </span>
            );
            if (item.disabled) return <div key={item.id}>{content}</div>;
            return (
              <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
                {content}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              fontFamily: ink.mono,
              fontSize: 11,
              color: ink.muted,
              background: ink.panel,
              borderRadius: 6,
              border: `1px solid ${ink.border}`,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 99, background: ink.clean }} />
            API · 142ms
          </div>
          {user && !isAuthPage ? (
            <Link
              href="/login"
              title="Account"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '4px 6px',
                borderRadius: 8,
                textDecoration: 'none',
                color: ink.text,
              }}
            >
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{user.name}</div>
                <div style={{ fontFamily: ink.mono, fontSize: 10, color: ink.muted }}>
                  {user.org}
                </div>
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: ink.text,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ink.bg,
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {user.initials}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="ink-btn-primary"
              style={{
                padding: '7px 16px',
                borderRadius: 6,
                fontSize: 13,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
