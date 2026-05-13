'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ink } from './tokens';
import { CarImage } from './CarImage';

export function HomeHero() {
  const router = useRouter();
  const [vin, setVin] = useState('');
  const [err, setErr] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = vin.trim().toUpperCase();
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(v)) {
      setErr('VIN must be 17 characters (letters & numbers, no I O Q).');
      return;
    }
    setErr('');
    router.push(`/vehicle/${v}`);
  }

  return (
    <div style={{ position: 'relative' }}>
      <section style={{ position: 'relative', minHeight: 560, overflow: 'hidden' }}>
        <CarImage
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=2000&q=80&auto=format&fit=crop"
          label="HERO · DARK GARAGE SHOT"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, rgba(239,235,224,.1) 0%, rgba(239,235,224,.65) 55%, ${ink.bg} 100%),
                         linear-gradient(90deg, rgba(239,235,224,.85) 0%, rgba(239,235,224,.15) 100%)`,
          }}
        />
        <div style={{ position: 'relative', padding: '88px 64px 64px', maxWidth: 1120 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 12px',
              borderRadius: 999,
              border: `1px solid ${ink.border}`,
              background: 'rgba(255,255,255,.85)',
              fontFamily: ink.mono,
              fontSize: 11,
              color: ink.muted,
              letterSpacing: '.05em',
              marginBottom: 24,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 99, background: ink.accent }} />
            v3.2 · NMVTIS + AUCTION FEEDS LIVE
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              maxWidth: 820,
            }}
          >
            Decode any VIN.
            <br />
            <span style={{ color: ink.accent }}>Know the full story.</span>
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 17,
              color: ink.textDim,
              maxWidth: 580,
              lineHeight: 1.55,
            }}
          >
            Specs, history, auction & salvage records, and photos — pulled from five providers and
            merged into a single dealer-grade report.
          </p>

          <form onSubmit={onSubmit} style={{ marginTop: 36, maxWidth: 720 }}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                padding: 8,
                background: 'rgba(255,255,255,.92)',
                borderRadius: 12,
                border: `1px solid ${ink.borderStrong}`,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 24px rgba(0,0,0,.06)',
              }}
            >
              <input
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="Enter 17-character VIN"
                maxLength={17}
                className="ink-input"
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: 8,
                  fontSize: 17,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                }}
              />
              <button
                type="submit"
                className="ink-btn-primary"
                style={{ padding: '0 28px', borderRadius: 8, fontSize: 15 }}
              >
                Run report →
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 14,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: ink.mono,
                  fontSize: 11,
                  color: ink.muted,
                  letterSpacing: '.05em',
                }}
              >
                SAMPLES:
              </span>
              <button
                type="button"
                onClick={() => setVin('1HGBH41JXMN109186')}
                style={{
                  background: 'none',
                  border: `1px solid ${ink.border}`,
                  color: ink.textDim,
                  fontFamily: ink.mono,
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
              >
                1HGBH41JXMN109186 · clean
              </button>
              <button
                type="button"
                onClick={() => setVin('WBA8E9C58HK867891')}
                style={{
                  background: 'none',
                  border: `1px solid ${ink.border}`,
                  color: ink.textDim,
                  fontFamily: ink.mono,
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
              >
                WBA8E9C58HK867891 · salvage
              </button>
              {err && <span style={{ color: ink.salvage, fontSize: 12 }}>{err}</span>}
            </div>
          </form>
        </div>
      </section>

      <section style={{ padding: '56px 64px', borderTop: `1px solid ${ink.border}` }}>
        <div
          style={{
            fontFamily: ink.mono,
            fontSize: 11,
            color: ink.muted,
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          What every report contains
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: '01', t: 'Spec sheet', d: 'Engine, drivetrain, body, plant, trim, build options.' },
            { n: '02', t: 'History timeline', d: 'Sales, registrations, mileage, accidents, service.' },
            { n: '03', t: 'Auction & salvage', d: 'Damage codes, sale prices, condition reports.' },
            { n: '04', t: 'Auction photos', d: 'High-res imagery from Copart, IAA, dealer auctions.' },
          ].map((c) => (
            <div
              key={c.n}
              style={{
                padding: 22,
                background: ink.panel,
                borderRadius: 10,
                border: `1px solid ${ink.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: ink.mono,
                  fontSize: 10,
                  color: ink.accent,
                  letterSpacing: '.15em',
                  marginBottom: 14,
                }}
              >
                {c.n}
              </div>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{c.t}</h3>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: ink.muted, lineHeight: 1.5 }}>
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: '32px 64px',
          borderTop: `1px solid ${ink.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: ink.mono,
            fontSize: 11,
            color: ink.muted,
            letterSpacing: '.15em',
          }}
        >
          DATA PROVIDERS
        </div>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center', color: ink.muted }}>
          {['NMVTIS', 'NHTSA', 'COPART', 'IAA', 'NICB', 'AUTOCHECK'].map((p) => (
            <span
              key={p}
              style={{
                fontFamily: ink.mono,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '.08em',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
