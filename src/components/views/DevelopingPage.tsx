import { useState } from 'react';
import { ArrowLeft, Sparkles, Clock, ShieldCheck, ArrowRight, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface DevelopingPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
}

interface DevelopingSituation {
  id: string;
  state: 'NEW' | 'DEVELOPING' | 'UPDATED' | 'STABLE';
  title: string;
  category: string;
  whatChanged: string;
  whenChanged: string;
  latestConfirmed: string;
  sourceCount: number;
  lastAnalysed: string;
  impact: string;
  watchingNext: string;
  dossierId: string;
}

const DEVELOPING_SITUATIONS: DevelopingSituation[] = [
  {
    id: 'dev-1',
    state: 'DEVELOPING',
    title: 'NELFUND Verification Parity & Tertiary Institution Portal Access Inquiries',
    category: 'EDUCATION & FISCAL',
    whatChanged: 'State-by-state submission records published showing 1.2M validated applicants across 126 institutions.',
    whenChanged: '18 minutes ago',
    latestConfirmed: 'ASUU and NELFUND joint verification desk activated in 14 state universities.',
    sourceCount: 6,
    lastAnalysed: '6m ago',
    impact: 'Direct tuition remittal to bursaries preventing undergraduate matriculation forfeitures.',
    watchingNext: 'Federal audit panel oversight session scheduled for Thursday 10:00 UTC.',
    dossierId: 'dossier-nelfund-01',
  },
  {
    id: 'dev-2',
    state: 'UPDATED',
    title: 'CBN Foreign Exchange Window Convergence & Autonomous Inflow Windows',
    category: 'MACROECONOMICS',
    whatChanged: 'Central Bank cleared $180M in verified commercial trade backlogs; parallel spread narrows to 2.8%.',
    whenChanged: '42 minutes ago',
    latestConfirmed: 'NAFEM reference rate settled at ₦1,492.50/$; gross reserves stabilized at $38.2B.',
    sourceCount: 8,
    lastAnalysed: '12m ago',
    impact: 'Immediate relief for enterprise letters of credit and imported component replenishment.',
    watchingNext: 'Bi-weekly Monetary Policy Committee inter-bank liquidity mop-up auction.',
    dossierId: 'dossier-cbn-fx-02',
  },
  {
    id: 'dev-3',
    state: 'NEW',
    title: 'National Grid Band A Feeder Audits & Service-Reflective Compliance Sanctions',
    category: 'INFRASTRUCTURE',
    whatChanged: 'NERC issues formal breach notices to three electricity distribution firms for unmetered load shedding.',
    whenChanged: '1 hour ago',
    latestConfirmed: 'Over ₦450M in consumer refunds ordered for customers receiving under 18 hours daily power.',
    sourceCount: 5,
    lastAnalysed: '24m ago',
    impact: 'Commercial and residential users on disputed feeders eligible for billing credit adjustments.',
    watchingNext: 'DisCo executive response filings before the regulatory enforcement commissioner.',
    dossierId: 'dossier-nelfund-01',
  },
  {
    id: 'dev-4',
    state: 'STABLE',
    title: 'OPEC+ Crude Production Quotas & Bonny Light Refining Deliveries',
    category: 'ENERGY & SOVEREIGN COMMODITIES',
    whatChanged: 'Bilateral supply volume verified at 1.5M bpd; domestic crude-for-naira settlement mechanisms active.',
    whenChanged: '3 hours ago',
    latestConfirmed: 'Local diesel ex-depot pricing benchmarks established at ₦1,050/L.',
    sourceCount: 7,
    lastAnalysed: '45m ago',
    impact: 'Downstream freight transport inflation moderating across interstate logistics routes.',
    watchingNext: 'OPEC Ministerial Monitoring Committee quarterly baseline review.',
    dossierId: 'dossier-opec-oil-03',
  },
];

export function DevelopingPage({
  onBackToBriefing,
  onOpenDossier,
}: DevelopingPageProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'NEW' | 'DEVELOPING' | 'UPDATED' | 'STABLE'>('ALL');

  const filteredSituations = DEVELOPING_SITUATIONS.filter((sit) =>
    activeFilter === 'ALL' ? true : sit.state === activeFilter
  );

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
            ACTIVE SURVEILLANCE RADAR // PROTOCOL 04
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#DC2626] uppercase font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
          <span>REAL-TIME FACTUAL INFLECTION MONITORING</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Developing: Situations Under Active Investigation
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Not merely a news feed. This radar tracks ongoing sovereign, economic, and institutional situations where the facts are actively shifting and triangulation is continuously updating.
        </p>

        {/* State Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[#f1f5f9]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8] mr-2">
            FILTER BY STATE:
          </span>
          {(['ALL', 'DEVELOPING', 'NEW', 'UPDATED', 'STABLE'] as const).map((st) => {
            const isSelected = activeFilter === st;
            return (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`text-xs font-inter font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Situations List */}
      <div className="space-y-6 mb-10">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b]">
          <span>
            MONITORING <strong className="text-[#0F172A]">{filteredSituations.length}</strong> ACTIVE SITUATIONS
          </span>
          <span className="flex items-center space-x-1.5">
            <RefreshCw className="w-3 h-3 text-[#15803d]" />
            <span>ALGORITHMIC RADAR CYCLING EVERY 300S</span>
          </span>
        </div>

        <div className="space-y-4">
          {filteredSituations.map((sit) => {
            const matchedDossier =
              BRIEFING_CAROUSEL_DOSSIERS.find((d) => d.id === sit.dossierId) ||
              BRIEFING_CAROUSEL_DOSSIERS[0];

            return (
              <article
                key={sit.id}
                className="border border-[#e2e8f0] p-6 bg-white hover:border-[#0F172A] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#f1f5f9]">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-widest text-white ${
                        sit.state === 'DEVELOPING'
                          ? 'bg-[#DC2626]'
                          : sit.state === 'NEW'
                          ? 'bg-[#1E3A8A]'
                          : sit.state === 'UPDATED'
                          ? 'bg-[#B45309]'
                          : 'bg-[#15803d]'
                      }`}
                    >
                      {sit.state}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">
                      {sit.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[10px] font-mono text-[#64748b]">
                    <span>CHANGED: <strong className="text-[#0F172A]">{sit.whenChanged}</strong></span>
                    <span>•</span>
                    <span>TRIANGULATED: <strong className="text-[#0F172A]">{sit.sourceCount} SOURCES</strong></span>
                    <span>•</span>
                    <span>LAST ANALYSED: <strong className="text-[#0F172A]">{sit.lastAnalysed}</strong></span>
                  </div>
                </div>

                <h2 className="font-newsreader text-2xl font-bold text-[#0F172A] leading-snug mb-3">
                  {sit.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-[#f8fafc] border-l-2 border-[#1E3A8A]">
                    <div className="text-[10px] font-mono text-[#1E3A8A] font-bold uppercase mb-1">
                      WHAT CHANGED
                    </div>
                    <p className="text-xs font-inter text-[#334155] leading-relaxed">
                      {sit.whatChanged}
                    </p>
                  </div>

                  <div className="p-3 bg-[#f8fafc] border-l-2 border-[#15803d]">
                    <div className="text-[10px] font-mono text-[#15803d] font-bold uppercase mb-1">
                      LATEST CONFIRMED DEVELOPMENT
                    </div>
                    <p className="text-xs font-inter text-[#334155] leading-relaxed">
                      {sit.latestConfirmed}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-inter text-[#45464d] mb-4 pb-3 border-b border-[#f1f5f9]">
                  <div>
                    <span className="font-bold text-[#0F172A]">PRIMARY IMPACT: </span>
                    <span>{sit.impact}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#DC2626]">WHAT PAPERLY IS WATCHING NEXT: </span>
                    <span>{sit.watchingNext}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => onOpenDossier(matchedDossier)}
                    className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] hover:text-[#0F172A] flex items-center space-x-1.5 cursor-pointer group"
                  >
                    <span>OPEN COMPLETE INVESTIGATION DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-[#94a3b8]">EVIDENCE LOCKED</span>
                </div>
              </article>
            );
          })}
        </div>

        <AdPlacement variant="section-divider" />
      </div>

    </div>
  );
}
