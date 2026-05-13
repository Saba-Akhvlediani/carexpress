import type { Verdict } from '@/components/inkwell/tokens';

export type HistoryEvent = {
  date: string;
  type: string;
  desc: string;
  source: string;
  mileage: number;
};

export type AuctionRecord = {
  site: string;
  lot: string;
  date: string;
  salePrice: string;
  damage: string;
  odometer: string;
  condition: string;
};

export type SalvageProfile = {
  primary: string;
  secondary: string;
  severity: string;
  runDrive: boolean;
  keys: boolean;
  airbags: string;
  structuralDamage: string;
  estRepair: string;
};

export type VinReport = {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  style: string;
  body: string;
  color: string;
  interior: string;
  plant: string;
  titleBrand: string;
  engine: string;
  horsepower: string;
  torque: string;
  transmission: string;
  drivetrain: string;
  fuel: string;
  mpg: string;
  msrp: string;
  odometer: string;
  owners: number;
  accidents: number;
  serviceRecords: number;
  estValue: string;
  verdict: Verdict;
  verdictLabel: string;
  image: string;
  gallery: string[];
  history: HistoryEvent[];
  salvage: SalvageProfile | null;
  auctions: AuctionRecord[];
};

export type DashboardRow = {
  vin: string;
  label: string;
  verdict: Verdict;
  date: string;
};

// --- Sample dataset ---------------------------------------------------------

const photoCivic =
  'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80&auto=format&fit=crop';
const photoBmw =
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80&auto=format&fit=crop';

const REPORTS: Record<string, VinReport> = {
  '1HGBH41JXMN109186': {
    vin: '1HGBH41JXMN109186',
    year: 2021,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX-L',
    style: 'Sedan · Premium',
    body: '4-door sedan',
    color: 'Lunar Silver Metallic',
    interior: 'Black leather',
    plant: 'Greensburg, Indiana, USA',
    titleBrand: 'Clean',
    engine: '1.5L Turbo I4',
    horsepower: '174 hp',
    torque: '162 lb-ft',
    transmission: 'CVT automatic',
    drivetrain: 'Front-wheel drive',
    fuel: 'Gasoline',
    mpg: '32 / 42',
    msrp: '$26,450',
    odometer: '38,420 mi',
    owners: 2,
    accidents: 0,
    serviceRecords: 11,
    estValue: '$19,800 – $22,400',
    verdict: 'clean',
    verdictLabel: 'Clean title',
    image: photoCivic,
    gallery: [photoCivic, photoCivic, photoCivic, photoCivic, photoCivic, photoCivic],
    history: [
      {
        date: '2024-11-02',
        type: 'Service',
        desc: 'Oil change & multi-point inspection',
        source: 'Honda dealer · Phoenix, AZ',
        mileage: 38200,
      },
      {
        date: '2024-04-18',
        type: 'Registration',
        desc: 'Annual renewal',
        source: 'Arizona DMV',
        mileage: 33150,
      },
      {
        date: '2023-09-12',
        type: 'Service',
        desc: 'Tire rotation & brake inspection',
        source: 'Honda dealer · Phoenix, AZ',
        mileage: 27890,
      },
      {
        date: '2023-01-05',
        type: 'Sale',
        desc: 'Private sale — title transfer',
        source: 'Arizona DMV',
        mileage: 19500,
      },
      {
        date: '2021-08-22',
        type: 'Sale',
        desc: 'First retail sale — new vehicle',
        source: 'Honda dealer · Phoenix, AZ',
        mileage: 12,
      },
    ],
    salvage: null,
    auctions: [],
  },
  WBA8E9C58HK867891: {
    vin: 'WBA8E9C58HK867891',
    year: 2017,
    make: 'BMW',
    model: '3 Series',
    trim: '330i xDrive',
    style: 'Sedan · Sport',
    body: '4-door sedan',
    color: 'Alpine White',
    interior: 'Black SensaTec',
    plant: 'Munich, Germany',
    titleBrand: 'Salvage',
    engine: '2.0L Turbo I4',
    horsepower: '248 hp',
    torque: '258 lb-ft',
    transmission: '8-speed automatic',
    drivetrain: 'All-wheel drive',
    fuel: 'Gasoline',
    mpg: '23 / 33',
    msrp: '$41,250',
    odometer: '74,108 mi',
    owners: 3,
    accidents: 2,
    serviceRecords: 7,
    estValue: '$11,200 – $14,600',
    verdict: 'salvage',
    verdictLabel: 'Salvage title',
    image: photoBmw,
    gallery: [photoBmw, photoBmw, photoBmw, photoBmw, photoBmw, photoBmw],
    history: [
      {
        date: '2024-08-14',
        type: 'Total loss',
        desc: 'Insurance declared total loss after front-end collision',
        source: 'GEICO claim · Dallas, TX',
        mileage: 74108,
      },
      {
        date: '2024-08-10',
        type: 'Accident',
        desc: 'Front-end collision — moderate damage',
        source: 'Dallas Police Dept',
        mileage: 74100,
      },
      {
        date: '2023-05-30',
        type: 'Service',
        desc: 'Brake pads & rotors replaced',
        source: 'BMW dealer · Dallas, TX',
        mileage: 61240,
      },
      {
        date: '2022-02-11',
        type: 'Accident',
        desc: 'Rear-end collision — minor damage',
        source: 'Texas DPS',
        mileage: 48910,
      },
      {
        date: '2017-06-04',
        type: 'Sale',
        desc: 'First retail sale — new vehicle',
        source: 'BMW dealer · Dallas, TX',
        mileage: 8,
      },
    ],
    salvage: {
      primary: 'Front-end collision',
      secondary: 'Airbag deployment',
      severity: 'Severe',
      runDrive: false,
      keys: true,
      airbags: 'Deployed (front + side)',
      structuralDamage: 'Yes — frame rail bent',
      estRepair: '$18,400',
    },
    auctions: [
      {
        site: 'Copart',
        lot: '#74821903',
        date: '2024-10-02',
        salePrice: '$6,250',
        damage: 'Front-end collision · airbag deployment',
        odometer: '74,108 mi',
        condition: 'Run & drive: NO',
      },
    ],
  },
};

const DASHBOARD: DashboardRow[] = [
  { vin: '1HGBH41JXMN109186', label: '2021 Honda Civic EX-L', verdict: 'clean', date: '2 min ago' },
  {
    vin: 'WBA8E9C58HK867891',
    label: '2017 BMW 330i xDrive',
    verdict: 'salvage',
    date: '14 min ago',
  },
  {
    vin: '5YJ3E1EA7KF317856',
    label: '2019 Tesla Model 3 LR',
    verdict: 'clean',
    date: '1 hour ago',
  },
  {
    vin: '1FTFW1ET5DFC22456',
    label: '2013 Ford F-150 Platinum',
    verdict: 'rebuilt',
    date: '3 hours ago',
  },
  {
    vin: 'JTHBK1GG0F2196814',
    label: '2015 Lexus IS 350',
    verdict: 'clean',
    date: 'Yesterday',
  },
  {
    vin: '3GTU2NEC9HG289341',
    label: '2017 GMC Sierra 1500',
    verdict: 'clean',
    date: 'Yesterday',
  },
  {
    vin: 'KMHCT4AE0CU145982',
    label: '2012 Hyundai Accent',
    verdict: 'salvage',
    date: '2 days ago',
  },
  {
    vin: '2T1BURHE0FC289475',
    label: '2015 Toyota Corolla LE',
    verdict: 'clean',
    date: '2 days ago',
  },
];

function genericReport(vin: string): VinReport {
  const verdict: Verdict = vin.startsWith('W') ? 'salvage' : vin.startsWith('1F') ? 'rebuilt' : 'clean';
  const base = REPORTS['1HGBH41JXMN109186'];
  return {
    ...base,
    vin,
    verdict,
    verdictLabel:
      verdict === 'clean' ? 'Clean title' : verdict === 'salvage' ? 'Salvage title' : 'Rebuilt title',
  };
}

/**
 * Mock VIN resolver. Swap this for a real `fetch('/api/vin/decode/' + vin)`
 * when backend response shapes are finalized.
 */
export function resolveVin(vin: string): VinReport {
  return REPORTS[vin] || genericReport(vin);
}

export function getDashboardRows(): DashboardRow[] {
  return DASHBOARD;
}
