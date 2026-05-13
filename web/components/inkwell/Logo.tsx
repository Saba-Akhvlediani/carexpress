import { ink } from './tokens';

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 6,
          background: ink.text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ink.bg,
          fontFamily: ink.mono,
          fontWeight: 700,
          fontSize: size * 0.55,
        }}
      >
        CX
      </div>
      <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>CarExpress</span>
    </div>
  );
}
