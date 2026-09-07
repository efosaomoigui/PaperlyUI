import { useState } from 'react';
import { Radio, ArrowLeft, Filter, ArrowUpRight, TrendingUp, TrendingDown, Minus, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface ImpactWatchPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
  onSelectPulseNode?: (node: any) => void;
}

type Audience =
  | 'FOR YOU'
  | 'HOUSEHOLDS'
  | 'EMPLOYEES'
  | 'SMEs'
  | 'BUSINESS'
  | 'INVESTORS'
  | 'STUDENTS'
  | 'TRAVELLERS'
  | 'DIASPORA';

type CategoryGrouping =
  | 'ALL'
  | 'MONEY'
  | 'WORK'
  | 'BUSINESS'
  | 'EDUCATION'
  | 'TRAVEL'
  | 'SECURITY'
  | 'HEALTH'
  | 'TECHNOLOGY';

interface ImpactRecord {
  id: string;
  developmentTitle: string;
  dossierId: string;
  audience: Audience[];
  grouping: CategoryGrouping;
  impactMetric: string;
  direction: 'up' | 'down' | 'neutral';
  impactLevel: 'HIGH IMPACT' | 'MODERATE IMPACT' | 'WATCH LIST';
  consequence: string;
  whatToWatch: string;
  evidenceSource: string;
  timeframe: string;
}

const IMPACT_RECORDS: ImpactRecord[] = [
  {
    id: 'imp-1',
    developmentTitle: 'Federal Multi-Tier Electricity Tariff (Band A) Service Rebalancing',
    dossierId: 'dossier-nelfund-01',
    audience: ['HOUSEHOLDS', 'SMEs', 'BUSINESS', 'FOR YOU'],
    grouping: 'MONEY',
    impactMetric: 'Monthly Expenditure',
    direction: 'up',
    impactLevel: 'HIGH IMPACT',
    consequence: 'Expected upward pressure on household utility overheads by up to 28% for consumers receiving 20+ hours daily supply.',
    whatToWatch: 'DisCo feeder audit enforcement by NERC slated for Q3.',
    evidenceSource: 'NERC Regulatory Order 2025/11',
    timeframe: 'Immediate (Active Billing Cycle)',
  },
  {
    id: 'imp-2',
    developmentTitle: 'Central Bank NAFEM Liquidity Injections & Clearing Window Convergence',
    dossierId: 'dossier-cbn-fx-02',
    audience: ['BUSINESS', 'SMEs', 'INVESTORS', 'DIASPORA', 'FOR YOU'],
    grouping: 'MONEY',
    impactMetric: 'Import Procurement Costs',
    direction: 'down',
    impactLevel: 'MODERATE IMPACT',
    consequence: 'Potential relief for import-reliant commercial orders as autonomous invoice settlement lags narrow from 14 days to 48 hours.',
    whatToWatch: 'Gross sovereign external reserves resilience under $38bn threshold.',
    evidenceSource: 'CBN Financial Markets Department Daily Bulletin',
    timeframe: '1–4 Weeks',
  },
  {
    id: 'imp-3',
    developmentTitle: 'NELFUND National Student Loan Portal 1.2M Biometric Validation Rollout',
    dossierId: 'dossier-nelfund-01',
    audience: ['STUDENTS', 'HOUSEHOLDS', 'FOR YOU'],
    grouping: 'EDUCATION',
    impactMetric: 'Tuition Cash Outflow',
    direction: 'down',
    impactLevel: 'HIGH IMPACT',
    consequence: 'Elimination of upfront institutional tuition burdens for verified undergraduates across 126 accredited tertiary institutions.',
    whatToWatch: 'ASUU institutional verification speed and monthly upkeep credit delivery.',
    evidenceSource: 'NELFUND National Executive Report',
    timeframe: 'Active Matriculation Term',
  },
  {
    id: 'imp-4',
    developmentTitle: 'Corporate Minimum Tax Recalibration & Electronic Invoicing Mandate',
    dossierId: 'dossier-cbn-fx-02',
    audience: ['BUSINESS', 'EMPLOYEES', 'SMEs'],
    grouping: 'WORK',
    impactMetric: 'Payroll & Withholding Burden',
    direction: 'up',
    impactLevel: 'MODERATE IMPACT',
    consequence: 'Finance teams must reconfigure enterprise ERP accounting for real-time withholding tax deductions at source.',
    whatToWatch: 'FIRS electronic invoice platform uptime and compliance penalty waivers.',
    evidenceSource: 'Federal Ministry of Finance Advisory 04',
    timeframe: 'Next Fiscal Quarter',
  },
  {
    id: 'imp-5',
    developmentTitle: 'OPEC+ Sovereign Quota Redistribution & Bonny Light Refining Yields',
    dossierId: 'dossier-opec-oil-03',
    audience: ['INVESTORS', 'BUSINESS', 'HOUSEHOLDS'],
    grouping: 'BUSINESS',
    impactMetric: 'Downstream Automotive Gas Oil (Diesel)',
    direction: 'down',
    impactLevel: 'HIGH IMPACT',
    consequence: 'Domestic refining throughput reduces freight-insurance premiums on industrial diesel, stabilizing logistics overhead.',
    whatToWatch: 'Dangote refinery domestic crude supply allocations via NNPCL.',
    evidenceSource: 'OPEC Monthly Oil Market Report & S&P Platts',
    timeframe: 'Ongoing (Bi-weekly pricing review)',
  },
  {
    id: 'imp-6',
    developmentTitle: 'Consular Electronic Travel Authorization & Visa Reciprocity Surcharge',
    dossierId: 'dossier-opec-oil-03',
    audience: ['TRAVELLERS', 'DIASPORA', 'BUSINESS'],
    grouping: 'TRAVEL',
    impactMetric: 'Cross-Border Entry Surcharges',
    direction: 'up',
    impactLevel: 'MODERATE IMPACT',
    consequence: 'Frequent business travellers face mandatory pre-clearance filings and foreign exchange reciprocity levies on bilateral routes.',
    whatToWatch: 'Bilateral diplomatic consultations between Abuja, London, and Washington.',
    evidenceSource: 'Nigeria Immigration Service Circular 08',
    timeframe: 'Effective from next month',
  },
];

export function ImpactWatchPage({
  onBackToBriefing,
  onOpenDossier,
}: ImpactWatchPageProps) {
  const [selectedAudience, setSelectedAudience] = useState<Audience>('FOR YOU');
  const [selectedGrouping, setSelectedGrouping] = useState<CategoryGrouping>('ALL');

  const audiences: Audience[] = [
    'FOR YOU',
    'HOUSEHOLDS',
    'EMPLOYEES',
    'SMEs',
    'BUSINESS',
    'INVESTORS',
    'STUDENTS',
    'TRAVELLERS',
    'DIASPORA',
  ];

  const groupings: CategoryGrouping[] = [
    'ALL',
    'MONEY',
    'WORK',
    'BUSINESS',
    'EDUCATION',
    'TRAVEL',
    'SECURITY',
    'HEALTH',
    'TECHNOLOGY',
  ];

  const filteredRecords = IMPACT_RECORDS.filter((rec) => {
    const audienceMatch =
      selectedAudience === 'FOR YOU'
        ? true
        : rec.audience.includes(selectedAudience);
    const groupMatch =
      selectedGrouping === 'ALL'
        ? true
        : rec.grouping === selectedGrouping;
    return audienceMatch && groupMatch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="border-b border-[#0F172A] pb-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBackToBriefing}
            className="flex items-center space-x-1.5 text-xs font-inter font-bold tracking-wider text-[#64748b] hover:text-[#0F172A] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>RETURN TO THE PAPERLY BRIEFING</span>
          </button>
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#94a3b8]">
            SIGNATURE INTELLIGENCE ENGINE // PROTOCOL 05
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#DC2626] uppercase font-bold mb-1">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>CONSEQUENCE REASONING MATRIX</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Impact Watch: How Today’s Developments Affect You
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Moving beyond passive headlines. Paperly calculates the direct micro and macro consequences on your household expenditure, corporate margins, travel logistics, and liquidity.
        </p>

        {/* 1. Primary Audience Perspective Selector */}
        <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] font-bold mb-2.5">
            STEP 1: SELECT YOUR AUDIENCE PERSPECTIVE
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {audiences.map((aud) => {
              const isSelected = selectedAudience === aud;
              return (
                <button
                  key={aud}
                  onClick={() => setSelectedAudience(aud)}
                  className={`text-xs font-inter font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                      : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc] hover:border-[#0F172A]'
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Secondary Consequence Grouping */}
        <div className="mt-4 pt-3 border-t border-[#f1f5f9]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#94a3b8] mb-2 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>STEP 2: FILTER BY CONSEQUENCE DOMAIN</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {groupings.map((grp) => {
              const isSelected = selectedGrouping === grp;
              return (
                <button
                  key={grp}
                  onClick={() => setSelectedGrouping(grp)}
                  className={`text-[11px] font-inter px-2.5 py-1 border transition-all ${
                    isSelected
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] font-semibold'
                      : 'bg-[#f8fafc] text-[#64748b] border-transparent hover:border-[#cbd5e1]'
                  }`}
                >
                  {grp}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Impact Feed */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b]">
          <span>
            SHOWING <strong className="text-[#0F172A]">{filteredRecords.length}</strong> VERIFIED IMPACT MODELS FOR{' '}
            <strong className="text-[#0F172A]">{selectedAudience}</strong>
          </span>
          <span className="text-[10px]">ALL MODELS CONNECTED TO UNDERLYING EVIDENCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((item) => {
            const matchedDossier =
              BRIEFING_CAROUSEL_DOSSIERS.find((d) => d.id === item.dossierId) ||
              BRIEFING_CAROUSEL_DOSSIERS[0];

            return (
              <div
                key={item.id}
                className="border border-[#e2e8f0] p-5 bg-white hover:border-[#0F172A] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Impact Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#f1f5f9]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] font-semibold">
                      DOMAIN: {item.grouping}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider ${
                        item.impactLevel === 'HIGH IMPACT'
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-[#1E3A8A] text-white'
                      }`}
                    >
                      {item.direction === 'up' && '↑ '}
                      {item.direction === 'down' && '↓ '}
                      {item.impactLevel}
                    </span>
                  </div>

                  {/* Development Anchor Headline */}
                  <div className="text-[11px] font-mono text-[#1E3A8A] font-semibold uppercase tracking-tight mb-1">
                    ROOT DEVELOPMENT:
                  </div>
                  <h3 className="font-newsreader text-lg font-bold text-[#0F172A] leading-snug mb-3">
                    {item.developmentTitle}
                  </h3>

                  {/* Impact Metric & Consequence */}
                  <div className="p-3 bg-[#f8fafc] border-l-2 border-[#0F172A] mb-3">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-[#0F172A] mb-1">
                      {item.direction === 'up' ? (
                        <TrendingUp className="w-3.5 h-3.5 text-[#DC2626]" />
                      ) : item.direction === 'down' ? (
                        <TrendingDown className="w-3.5 h-3.5 text-[#15803d]" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 text-[#64748b]" />
                      )}
                      <span>{item.impactMetric}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-inter">
                      {item.consequence}
                    </p>
                  </div>

                  {/* What to Watch & Evidence */}
                  <div className="text-[11px] font-inter text-[#45464d] space-y-1 mb-4">
                    <div>
                      <span className="font-bold text-[#0F172A]">WHAT TO WATCH: </span>
                      <span>{item.whatToWatch}</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#64748b]">
                      EVIDENCE BASIS: {item.evidenceSource} · {item.timeframe}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA to open complete intelligence dossier */}
                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <button
                    onClick={() => onOpenDossier(matchedDossier)}
                    className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] hover:text-[#0F172A] flex items-center space-x-1 cursor-pointer group"
                  >
                    <span>INSPECT FULL INTELLIGENCE & EVIDENCE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-[#94a3b8]">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ad Placement between complete ideas */}
        <div className="pt-6">
          <AdPlacement variant="section-divider" />
        </div>

      </div>

    </div>
  );
}
