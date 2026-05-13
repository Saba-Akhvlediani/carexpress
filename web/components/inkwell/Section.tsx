import type { CSSProperties, ReactNode } from 'react';
import { ink } from './tokens';

export function Section({
  title,
  eyebrow,
  action,
  children,
  style,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section style={{ marginBottom: 24, ...style }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <div>
          {eyebrow && (
            <div
              style={{
                fontFamily: ink.mono,
                fontSize: 10,
                letterSpacing: '.15em',
                color: ink.muted,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              {eyebrow}
            </div>
          )}
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: ink.text }}>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatRow({
  rows,
}: {
  rows: Array<{ k: string; v: string | number; mono?: boolean }>;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 1,
        background: ink.border,
        borderRadius: 8,
        overflow: 'hidden',
        border: `1px solid ${ink.border}`,
      }}
    >
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            background: ink.panel,
            padding: '11px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span style={{ fontSize: 12, color: ink.muted }}>{r.k}</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: ink.text,
              fontFamily: r.mono ? ink.mono : ink.sans,
              textAlign: 'right',
            }}
          >
            {r.v}
          </span>
        </div>
      ))}
    </div>
  );
}
