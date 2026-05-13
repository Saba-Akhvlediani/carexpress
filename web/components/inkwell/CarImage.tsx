'use client';

import { useState, type CSSProperties } from 'react';

export function CarImage({
  src,
  label,
  style,
  className,
}: {
  src?: string;
  label: string;
  style?: CSSProperties;
  className?: string;
}) {
  const [ok, setOk] = useState(Boolean(src));
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      {ok && src ? (
        <img
          src={src}
          alt={label}
          onError={() => setOk(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div className="ink-photo-fallback" style={{ width: '100%', height: '100%' }}>
          [ {label} ]
        </div>
      )}
    </div>
  );
}
