import { ink, type Verdict } from './tokens';

const map: Record<Verdict, { color: string; bg: string; dot: string }> = {
  clean: { color: ink.clean, bg: ink.cleanTint, dot: ink.clean },
  salvage: { color: ink.salvage, bg: ink.salvageTint, dot: ink.salvage },
  rebuilt: { color: ink.rebuilt, bg: ink.rebuiltTint, dot: ink.rebuilt },
};

export function VerdictBadge({
  verdict,
  label,
  size = 'md',
}: {
  verdict: Verdict;
  label?: string;
  size?: 'md' | 'lg';
}) {
  const c = map[verdict];
  const padding = size === 'lg' ? '8px 14px' : '4px 10px';
  const fontSize = size === 'lg' ? 13 : 11;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding,
        fontSize,
        fontWeight: 600,
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.color}33`,
        borderRadius: 999,
        fontFamily: ink.mono,
        letterSpacing: '.05em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 99, background: c.dot }} />
      {label || verdict}
    </span>
  );
}
