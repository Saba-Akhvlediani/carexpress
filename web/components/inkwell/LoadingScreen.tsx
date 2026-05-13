'use client';

import { useEffect, useState } from 'react';
import { ink } from './tokens';

const stages = [
  'Decoding VIN structure',
  'Querying NMVTIS · NHTSA',
  'Cross-referencing auction feeds',
  'Pulling history & registration',
  'Merging report',
];

export function LoadingScreen({ vin }: { vin: string }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= stages.length - 1) return;
    const t = setTimeout(() => setStep(step + 1), 320);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div
      className="ink-grid-bg"
      style={{
        minHeight: 720,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 64,
      }}
    >
      <div
        style={{
          width: 560,
          padding: 36,
          background: ink.panel,
          borderRadius: 12,
          border: `1px solid ${ink.border}`,
          boxShadow: '0 20px 60px rgba(0,0,0,.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div
            className="ink-spin"
            style={{
              width: 18,
              height: 18,
              borderRadius: 99,
              border: `2px solid ${ink.border}`,
              borderTopColor: ink.accent,
            }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Building report</div>
            <div style={{ fontFamily: ink.mono, fontSize: 11, color: ink.muted, marginTop: 2 }}>
              {vin}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {stages.map((s, i) => {
            const state = i < step ? 'done' : i === step ? 'active' : 'pending';
            return (
              <div
                key={s}
                style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 99,
                    background:
                      state === 'done' ? ink.clean : state === 'active' ? ink.accent : ink.panel3,
                    border: `1px solid ${state === 'pending' ? ink.border : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {state === 'done' ? '✓' : ''}
                </span>
                <span
                  className={state === 'active' ? 'ink-pulse' : ''}
                  style={{ color: state === 'pending' ? ink.muted : ink.text }}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
