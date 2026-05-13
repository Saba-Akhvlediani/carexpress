'use client';

import { useState } from 'react';
import { ink } from './tokens';
import { CarImage } from './CarImage';
import { VerdictBadge } from './VerdictBadge';
import { Section, StatRow } from './Section';
import type { VinReport } from '@/lib/vin-data';

type TabId = 'overview' | 'specs' | 'history' | 'photos' | 'salvage';

export function ReportView({ data }: { data: VinReport }) {
  const [tab, setTab] = useState<TabId>('overview');
  const tabs: Array<{ id: TabId; label: string; count?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specs' },
    { id: 'history', label: 'History', count: data.history.length },
    { id: 'photos', label: 'Photos', count: data.gallery.length },
    { id: 'salvage', label: data.salvage ? 'Salvage' : 'Auction & salvage' },
  ];

  return (
    <div>
      <div
        style={{
          position: 'relative',
          borderBottom: `1px solid ${ink.border}`,
          padding: '32px 64px 28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: ink.mono,
            fontSize: 11,
            color: ink.muted,
            marginBottom: 16,
            gap: 8,
          }}
        >
          <span>DASHBOARD</span>
          <span>/</span>
          <span>VIN</span>
          <span>/</span>
          <span style={{ color: ink.textDim }}>{data.vin}</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '420px 1fr',
            gap: 36,
            alignItems: 'center',
          }}
        >
          <CarImage
            src={data.image}
            label={`${data.year} ${data.make} ${data.model}`}
            style={{ aspectRatio: '16/10', borderRadius: 10, border: `1px solid ${ink.border}` }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <VerdictBadge verdict={data.verdict} label={data.verdictLabel} size="lg" />
              <span style={{ fontFamily: ink.mono, fontSize: 11, color: ink.muted }}>
                REPORT #CX-{data.vin.slice(-8)} · GENERATED JUST NOW
              </span>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              {data.year} {data.make} {data.model}
            </h1>
            <div style={{ marginTop: 6, fontSize: 17, color: ink.textDim }}>
              {data.trim} · {data.style}
            </div>
            <div
              style={{
                marginTop: 18,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                background: ink.border,
                borderRadius: 10,
                overflow: 'hidden',
                border: `1px solid ${ink.border}`,
              }}
            >
              {[
                { k: 'Odometer', v: data.odometer, alert: false },
                { k: 'Owners', v: data.owners, alert: false },
                { k: 'Accidents', v: data.accidents, alert: data.accidents > 0 },
                { k: 'Est. value', v: data.estValue.split('–')[0].trim(), alert: false },
              ].map((cell) => (
                <div key={cell.k} style={{ background: ink.panel, padding: '12px 16px' }}>
                  <div
                    style={{
                      fontFamily: ink.mono,
                      fontSize: 10,
                      color: ink.muted,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {cell.k}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 18,
                      fontWeight: 600,
                      color: cell.alert ? ink.salvage : ink.text,
                    }}
                  >
                    {cell.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 24, right: 32, display: 'flex', gap: 8 }}>
          <button
            className="ink-btn-ghost"
            style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12 }}
          >
            Share
          </button>
          <button
            className="ink-btn-ghost"
            style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12 }}
          >
            Export PDF
          </button>
          <button
            className="ink-btn-primary"
            style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12 }}
          >
            Save to fleet
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: '0 64px',
          borderBottom: `1px solid ${ink.border}`,
          position: 'sticky',
          top: 56,
          background: 'rgba(239,235,224,.92)',
          backdropFilter: 'blur(8px)',
          zIndex: 5,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={tab === t.id ? 'ink-tab-active' : 'ink-tab-inactive'}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '2px solid',
              padding: '14px 18px',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: -1,
            }}
          >
            {t.label}
            {typeof t.count === 'number' && (
              <span
                style={{
                  fontFamily: ink.mono,
                  fontSize: 10,
                  padding: '1px 6px',
                  borderRadius: 99,
                  background: ink.panel2,
                  color: ink.muted,
                }}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: '32px 64px 64px' }}>
        {tab === 'overview' && <OverviewTab data={data} onTab={setTab} />}
        {tab === 'specs' && <SpecsTab data={data} />}
        {tab === 'history' && <HistoryTab data={data} />}
        {tab === 'photos' && <PhotosTab data={data} />}
        {tab === 'salvage' && <SalvageTab data={data} />}
      </div>
    </div>
  );
}

function OverviewTab({ data, onTab }: { data: VinReport; onTab: (t: TabId) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
      <div>
        <Section eyebrow="01 · Identity" title="Vehicle identity">
          <StatRow
            rows={[
              { k: 'VIN', v: data.vin, mono: true },
              { k: 'Year', v: data.year, mono: true },
              { k: 'Make', v: data.make },
              { k: 'Model', v: data.model },
              { k: 'Trim', v: data.trim },
              { k: 'Body', v: data.body },
              { k: 'Plant', v: data.plant },
              { k: 'Title brand', v: data.titleBrand },
            ]}
          />
        </Section>
        <Section eyebrow="02 · Powertrain" title="Engine & drivetrain">
          <StatRow
            rows={[
              { k: 'Engine', v: data.engine },
              { k: 'Horsepower', v: data.horsepower, mono: true },
              { k: 'Torque', v: data.torque, mono: true },
              { k: 'Transmission', v: data.transmission },
              { k: 'Drivetrain', v: data.drivetrain },
              { k: 'Fuel', v: data.fuel },
              { k: 'MPG (city/hwy)', v: data.mpg, mono: true },
              { k: 'MSRP', v: data.msrp, mono: true },
            ]}
          />
        </Section>
        <Section
          eyebrow="03 · Recent history"
          title="Last events"
          action={
            <button
              onClick={() => onTab('history')}
              className="ink-btn-ghost"
              style={{ padding: '5px 10px', borderRadius: 5, fontSize: 11 }}
            >
              View all →
            </button>
          }
        >
          <div
            style={{
              background: ink.panel,
              borderRadius: 8,
              border: `1px solid ${ink.border}`,
              overflow: 'hidden',
            }}
          >
            {data.history.slice(0, 4).map((e, i) => (
              <div
                key={i}
                className="ink-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 130px 1fr 120px',
                  padding: '13px 16px',
                  borderTop: i ? `1px solid ${ink.border}` : 'none',
                  fontSize: 13,
                  alignItems: 'center',
                  gap: 12,
                  transition: 'background .12s',
                }}
              >
                <span style={{ fontFamily: ink.mono, fontSize: 11, color: ink.muted }}>
                  {e.date}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: ink.mono,
                    color: ink.accent,
                    letterSpacing: '.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {e.type}
                </span>
                <span style={{ color: ink.text }}>{e.desc}</span>
                <span
                  style={{
                    fontFamily: ink.mono,
                    fontSize: 11,
                    color: ink.muted,
                    textAlign: 'right',
                  }}
                >
                  {e.mileage.toLocaleString()} mi
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <aside>
        <Section eyebrow="Market" title="Estimated value">
          <div
            style={{
              padding: 20,
              background: ink.panel,
              borderRadius: 10,
              border: `1px solid ${ink.border}`,
            }}
          >
            <div
              style={{
                fontFamily: ink.mono,
                fontSize: 11,
                color: ink.muted,
                letterSpacing: '.05em',
              }}
            >
              RETAIL · {data.year}
            </div>
            <div style={{ marginTop: 8, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>
              {data.estValue}
            </div>
            <div
              style={{
                marginTop: 14,
                height: 6,
                borderRadius: 4,
                background: ink.panel3,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '20%',
                  right: '32%',
                  top: 0,
                  bottom: 0,
                  background: `linear-gradient(90deg, ${ink.accent}, ${ink.clean})`,
                  borderRadius: 4,
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 8,
                fontFamily: ink.mono,
                fontSize: 10,
                color: ink.muted,
              }}
            >
              <span>$8k</span>
              <span>$25k</span>
              <span>$45k</span>
            </div>
          </div>
        </Section>
        <Section eyebrow="Risk" title="Report flags">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                ok: data.verdict === 'clean',
                label:
                  data.verdict === 'clean'
                    ? 'Clean title — no brands'
                    : 'Title branded — review carefully',
              },
              {
                ok: data.accidents === 0,
                label:
                  data.accidents === 0
                    ? 'No reported accidents'
                    : `${data.accidents} reported accident${data.accidents === 1 ? '' : 's'}`,
              },
              { ok: true, label: `${data.serviceRecords} service records` },
              {
                ok: data.owners <= 2,
                label: `${data.owners} owner${data.owners === 1 ? '' : 's'}`,
              },
              {
                ok: !data.salvage,
                label: data.salvage ? 'Auction salvage on record' : 'No salvage records',
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: ink.panel,
                  borderRadius: 8,
                  border: `1px solid ${ink.border}`,
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 99,
                    background: f.ok ? ink.cleanTint : ink.salvageTint,
                    color: f.ok ? ink.clean : ink.salvage,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {f.ok ? '✓' : '!'}
                </span>
                <span style={{ color: ink.textDim }}>{f.label}</span>
              </div>
            ))}
          </div>
        </Section>
      </aside>
    </div>
  );
}

function SpecsTab({ data }: { data: VinReport }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <Section eyebrow="Identity" title="Vehicle">
        <StatRow
          rows={[
            { k: 'VIN', v: data.vin, mono: true },
            { k: 'Year', v: data.year, mono: true },
            { k: 'Make', v: data.make },
            { k: 'Model', v: data.model },
            { k: 'Trim', v: data.trim },
            { k: 'Body style', v: data.body },
            { k: 'Color', v: data.color },
            { k: 'Interior', v: data.interior },
            { k: 'Manufacturing plant', v: data.plant },
            { k: 'MSRP', v: data.msrp, mono: true },
          ]}
        />
      </Section>
      <Section eyebrow="Powertrain" title="Engine & drivetrain">
        <StatRow
          rows={[
            { k: 'Engine', v: data.engine },
            { k: 'Horsepower', v: data.horsepower, mono: true },
            { k: 'Torque', v: data.torque, mono: true },
            { k: 'Transmission', v: data.transmission },
            { k: 'Drivetrain', v: data.drivetrain },
            { k: 'Fuel type', v: data.fuel },
            { k: 'MPG (city/hwy)', v: data.mpg, mono: true },
            { k: 'Estimated value', v: data.estValue, mono: true },
            { k: 'Title brand', v: data.titleBrand },
            { k: 'Build style', v: data.style },
          ]}
        />
      </Section>
    </div>
  );
}

function HistoryTab({ data }: { data: VinReport }) {
  const sorted = [...data.history].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <div style={{ maxWidth: 880 }}>
      <Section eyebrow={`${data.history.length} events on file`} title="Vehicle history timeline">
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 11,
              top: 8,
              bottom: 8,
              width: 1,
              background: ink.border,
            }}
          />
          {sorted.map((e, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 110px 1fr 120px',
                gap: 16,
                padding: '10px 0',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 99,
                  marginTop: 5,
                  background:
                    e.type === 'Accident' || e.type === 'Total loss' ? ink.salvage : ink.accent,
                  boxShadow: `0 0 0 4px ${ink.bg}`,
                }}
              />
              <span
                style={{ fontFamily: ink.mono, fontSize: 12, color: ink.muted, paddingTop: 2 }}
              >
                {e.date}
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: ink.text }}>
                  {e.type} — {e.desc}
                </div>
                <div style={{ marginTop: 3, fontSize: 12, color: ink.muted }}>{e.source}</div>
              </div>
              <span
                style={{
                  fontFamily: ink.mono,
                  fontSize: 12,
                  color: ink.textDim,
                  textAlign: 'right',
                  paddingTop: 2,
                }}
              >
                {e.mileage.toLocaleString()} mi
              </span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function PhotosTab({ data }: { data: VinReport }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Section
        eyebrow={`${data.gallery.length} images · auction & dealer sources`}
        title="Photo gallery"
      >
        <CarImage
          src={data.gallery[active]}
          label={`PHOTO ${active + 1}`}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: 10,
            border: `1px solid ${ink.border}`,
            marginBottom: 12,
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {data.gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: 0,
                border: `2px solid ${active === i ? ink.accent : ink.border}`,
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'none',
              }}
            >
              <CarImage src={src} label={`P${i + 1}`} style={{ aspectRatio: '4/3', display: 'block' }} />
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SalvageTab({ data }: { data: VinReport }) {
  if (!data.salvage) {
    return (
      <div
        style={{
          padding: 48,
          background: ink.panel,
          borderRadius: 12,
          border: `1px solid ${ink.border}`,
          textAlign: 'center',
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 99,
            background: ink.cleanTint,
            color: ink.clean,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 18,
          }}
        >
          ✓
        </div>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
          No salvage or auction records
        </h3>
        <p style={{ margin: '8px 0 0', color: ink.muted, fontSize: 14 }}>
          This vehicle has not appeared in any of our auction or salvage databases.
        </p>
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <Section eyebrow="Salvage record" title="Damage profile">
        <div
          style={{
            padding: 22,
            background: ink.panel,
            borderRadius: 10,
            border: `1px solid ${ink.salvage}55`,
          }}
        >
          <VerdictBadge verdict="salvage" label="Heavy damage" />
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Primary damage', data.salvage.primary],
              ['Secondary damage', data.salvage.secondary],
              ['Severity', data.salvage.severity],
              ['Run & drive', data.salvage.runDrive ? 'Yes' : 'No'],
              ['Keys', data.salvage.keys ? 'Yes' : 'No'],
              ['Airbags', data.salvage.airbags],
              ['Structural damage', data.salvage.structuralDamage],
              ['Est. repair', data.salvage.estRepair],
            ].map(([k, v]) => (
              <div
                key={k as string}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  borderBottom: `1px solid ${ink.border}`,
                  fontSize: 13,
                }}
              >
                <span style={{ color: ink.muted }}>{k}</span>
                <span style={{ color: ink.text, textAlign: 'right' }}>{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section eyebrow="Auction history" title="Sale records">
        {data.auctions.map((a, i) => (
          <div
            key={i}
            style={{
              padding: 22,
              background: ink.panel,
              borderRadius: 10,
              border: `1px solid ${ink.border}`,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: ink.mono,
                  fontSize: 11,
                  color: ink.muted,
                  letterSpacing: '.1em',
                }}
              >
                {a.site.toUpperCase()} · {a.lot}
              </span>
              <span style={{ fontFamily: ink.mono, fontSize: 12, color: ink.textDim }}>
                {a.date}
              </span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: ink.mono, color: ink.accent }}>
              {a.salePrice}
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: ink.textDim }}>{a.damage}</div>
            <div
              style={{
                marginTop: 12,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                fontSize: 12,
              }}
            >
              <div>
                <span style={{ color: ink.muted }}>Odometer · </span>
                <span style={{ fontFamily: ink.mono }}>{a.odometer}</span>
              </div>
              <div>
                <span style={{ color: ink.muted }}>Condition · </span>
                <span>{a.condition}</span>
              </div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
