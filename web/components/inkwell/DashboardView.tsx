'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ink } from './tokens';
import { VerdictBadge } from './VerdictBadge';
import type { DashboardRow } from '@/lib/vin-data';

export function DashboardView({ rows }: { rows: DashboardRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    const f = filter.trim().toUpperCase();
    if (!f) return rows;
    return rows.filter((r) => r.vin.toUpperCase().includes(f) || r.label.toUpperCase().includes(f));
  }, [filter, rows]);

  return (
    <div style={{ padding: '32px 64px 64px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: ink.mono,
              fontSize: 11,
              color: ink.muted,
              letterSpacing: '.15em',
              marginBottom: 6,
            }}
          >
            DEALER · COASTAL AUTO GROUP
          </div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Recent reports
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="ink-input"
            placeholder="Filter by VIN…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '9px 14px', borderRadius: 6, fontSize: 13, width: 220 }}
          />
          <button
            className="ink-btn-ghost"
            style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12 }}
          >
            Export CSV
          </button>
          <button
            className="ink-btn-primary"
            style={{ padding: '8px 16px', borderRadius: 6, fontSize: 13 }}
            onClick={() => router.push('/')}
          >
            + New report
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 28,
        }}
      >
        {[
          { k: 'Reports this month', v: '127', d: '+18% vs Oct', mono: false },
          { k: 'Clean titles', v: '94', d: '74% of all', mono: false },
          { k: 'Salvage flagged', v: '12', d: '9.4% of all', mono: false },
          { k: 'Avg. report time', v: '1.4s', d: 'P95: 2.1s', mono: true },
        ].map((s) => (
          <div
            key={s.k}
            style={{
              padding: 18,
              background: ink.panel,
              borderRadius: 10,
              border: `1px solid ${ink.border}`,
            }}
          >
            <div
              style={{
                fontFamily: ink.mono,
                fontSize: 10,
                color: ink.muted,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}
            >
              {s.k}
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 28,
                fontWeight: 700,
                fontFamily: s.mono ? ink.mono : ink.sans,
              }}
            >
              {s.v}
            </div>
            <div style={{ marginTop: 4, fontFamily: ink.mono, fontSize: 11, color: ink.muted }}>
              {s.d}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: ink.panel,
          borderRadius: 10,
          border: `1px solid ${ink.border}`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 130px 110px 80px',
            padding: '12px 18px',
            borderBottom: `1px solid ${ink.border}`,
            background: ink.panel2,
            fontFamily: ink.mono,
            fontSize: 10,
            color: ink.muted,
            letterSpacing: '.15em',
            textTransform: 'uppercase',
          }}
        >
          <span>VIN</span>
          <span>Vehicle</span>
          <span>Verdict</span>
          <span>Run</span>
          <span />
        </div>
        {filtered.map((r, i) => (
          <button
            key={r.vin}
            onClick={() => router.push(`/vehicle/${r.vin}`)}
            className="ink-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr 130px 110px 80px',
              padding: '13px 18px',
              alignItems: 'center',
              textAlign: 'left',
              borderTop: i ? `1px solid ${ink.border}` : 'none',
              background: 'transparent',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: ink.text,
              transition: 'background .12s',
            }}
          >
            <span style={{ fontFamily: ink.mono, fontSize: 12, color: ink.textDim }}>{r.vin}</span>
            <span style={{ fontSize: 13 }}>{r.label}</span>
            <span>
              <VerdictBadge verdict={r.verdict} label={r.verdict} />
            </span>
            <span style={{ fontFamily: ink.mono, fontSize: 11, color: ink.muted }}>{r.date}</span>
            <span style={{ textAlign: 'right', color: ink.muted, fontSize: 16 }}>→</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '28px 18px', textAlign: 'center', color: ink.muted, fontSize: 13 }}>
            No reports match "{filter}".
          </div>
        )}
      </div>
    </div>
  );
}
