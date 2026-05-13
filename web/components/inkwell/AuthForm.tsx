'use client';

import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { ink } from './tokens';
import { CarImage } from './CarImage';
import { Logo } from './Logo';

type Mode = 'signin' | 'register';

export function AuthForm({ initialMode = 'signin' }: { initialMode?: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: wire to backend /api/auth/signin or /api/auth/register
    router.push('/dashboard');
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 720 }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRight: `1px solid ${ink.border}`,
        }}
      >
        <CarImage
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80&auto=format&fit=crop"
          label="GARAGE · NIGHT"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(239,235,224,.15), rgba(239,235,224,.75))',
          }}
        />
        <div
          style={{
            position: 'relative',
            padding: 48,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Logo size={26} />
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                maxWidth: 360,
              }}
            >
              Built for dealers who can't afford a bad buy.
            </h2>
            <p
              style={{
                marginTop: 12,
                color: ink.textDim,
                maxWidth: 380,
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              5 data providers. 1.4s median report time. NMVTIS-licensed. Used by 2,400+ independent
              dealers and lots across North America.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 22 }}>
              {(
                [
                  ['2.4k+', 'dealers'],
                  ['18M+', 'reports'],
                  ['99.97%', 'uptime'],
                ] as const
              ).map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: ink.mono }}>{n}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: ink.muted,
                      marginTop: 2,
                      letterSpacing: '.05em',
                    }}
                  >
                    {l.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: 48,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 480,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 4,
            padding: 3,
            background: ink.panel,
            borderRadius: 8,
            border: `1px solid ${ink.border}`,
            marginBottom: 28,
            width: 'fit-content',
          }}
        >
          {(
            [
              ['signin', 'Sign in'],
              ['register', 'Create account'],
            ] as const
          ).map(([id, l]) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              style={{
                padding: '7px 18px',
                fontSize: 13,
                fontWeight: 500,
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                background: mode === id ? ink.panel3 : 'transparent',
                color: mode === id ? ink.text : ink.muted,
                fontFamily: 'inherit',
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ marginTop: 6, color: ink.muted, fontSize: 14 }}>
          {mode === 'signin'
            ? 'Sign in to access your reports & fleet.'
            : 'Start with 5 free reports, no credit card.'}
        </p>
        <form
          onSubmit={onSubmit}
          style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {mode === 'register' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <AuthInput label="First name" placeholder="Maria" />
              <AuthInput label="Last name" placeholder="Sandoval" />
            </div>
          )}
          <AuthInput label="Work email" placeholder="maria@coastalauto.com" type="email" />
          <AuthInput label="Password" placeholder="••••••••••" type="password" />
          {mode === 'register' && (
            <AuthInput label="Dealer / org name" placeholder="Coastal Auto Group" />
          )}
          <button
            type="submit"
            className="ink-btn-primary"
            style={{ padding: '13px 18px', borderRadius: 8, fontSize: 14, marginTop: 6 }}
          >
            {mode === 'signin' ? 'Sign in →' : 'Create account →'}
          </button>
          <div style={{ marginTop: 6, fontSize: 12, color: ink.muted, textAlign: 'center' }}>
            {mode === 'signin' ? (
              <>
                No account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: ink.accent,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                  }}
                >
                  Create one →
                </button>
              </>
            ) : (
              <>
                Already have one?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: ink.accent,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                  }}
                >
                  Sign in →
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function AuthInput({
  label,
  ...rest
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontFamily: ink.mono,
          fontSize: 10,
          color: ink.muted,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <input
        {...rest}
        className="ink-input"
        style={{
          padding: '11px 14px',
          borderRadius: 7,
          fontSize: 14,
          fontFamily: rest.type === 'password' ? ink.mono : ink.sans,
          letterSpacing: rest.type === 'password' ? '.2em' : 0,
        }}
      />
    </label>
  );
}
