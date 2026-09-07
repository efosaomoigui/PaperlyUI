import { useState } from 'react';
import { ArrowLeft, Clock, ShieldCheck, ArrowRight, Radio, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS, WHAT_MATTERS_ITEMS, NEWS_WIRE_ITEMS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface CategoryViewProps {
  categoryId: string;
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
  onSelectDispatch?: (dispatch: any) => void;
  onOpenTopic?: (topic: string) => void;
}

const CATEGORY_META: Record<string, {
  title: string;
  kicker: string;
  description: string;
  leadDossierIndex: number;
  topics: string[];
}> = {
  nigeria: {
    title: 'Nigeria Desk',
    kicker: 'SOVEREIGN GOVERNANCE · FISCAL INFLECTION · INSTITUTIONAL STATECRAFT',
    description: 'Verifiable synthesis of Nigeria’s macroeconomic restructuring, judicial precedent, and infrastructural execution.',
    leadDossierIndex: 0,
    topics: ['NELFUND', 'CBN FX Float', 'Band A Tariffs', 'Tax Reform Bill', 'Dangote Refinery'],
  },
  world: {
    title: 'World Desk',
    kicker: 'GEOPOLITICAL REALIGNMENT · SOVEREIGN DEBT · GLOBAL SUPPLY CHAINS',
    description: 'Cross-border intelligence assessing multi-polar diplomacy, trade sanctions, and strategic maritime choke points.',
    leadDossierIndex: 2,
    topics: ['OPEC+ Quotas', 'US Treasury Yields', 'Red Sea Shipping', 'African Union Free Trade', 'BRICS Expansion'],
  },
  business: {
    title: 'Business Desk',
    kicker: 'CORPORATE BALANCE SHEETS · PRIVATE CAPITAL · SECTOR DISRUPTION',
    description: 'Computational tracking of corporate solvency, merger clearances, capital expenditure, and sovereign procurement.',
    leadDossierIndex: 1,
    topics: ['Commercial Paper', 'FMCG Margin Squeeze', 'Fintech Licensing', 'Agribusiness Inputs', 'Industrial Gas'],
  },
  technology: {
    title: 'Technology Desk',
    kicker: 'ARTIFICIAL INTELLIGENCE · DIGITAL SOVEREIGNTY · TELECOMS ARCHITECTURE',
    description: 'Independent evaluation of algorithmic governance, subsea fiber connectivity, digital public infrastructure, and venture liquidity.',
    leadDossierIndex: 0,
    topics: ['Subsea Cables', 'AI Model Governance', 'NIN-SIM Compliance', 'Mobile Money Volume', 'Data Protection'],
  },
  markets: {
    title: 'Markets Desk',
    kicker: 'FX LIQUIDITY · SOVEREIGN YIELD CURVES · COMMODITY CLEARING',
    description: 'High-frequency telemetry tracking parallel exchange rates, treasury bill auctions, and domestic equity valuation multiples.',
    leadDossierIndex: 1,
    topics: ['NAFEM Spread', 'Treasury Bill Stop Rates', 'NGX All-Share', 'Bonny Light Crude', 'Eurobond Yields'],
  },
};

export function CategoryView({
  categoryId,
  onBackToBriefing,
  onOpenDossier,
  onSelectDispatch,
  onOpenTopic,
}: CategoryViewProps) {
  const meta = CATEGORY_META[categoryId.toLowerCase()] || CATEGORY_META.nigeria;
  const leadDossier = BRIEFING_CAROUSEL_DOSSIERS[meta.leadDossierIndex] || BRIEFING_CAROUSEL_DOSSIERS[0];
  const [activeSubFilter, setActiveSubFilter] = useState('ALL');

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Category Masthead Header */}
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
            CATEGORY INTELLIGENCE DOSSIER // {categoryId.toUpperCase()}
          </div>
        </div>

        <div className="text-[11px] font-mono tracking-widest text-[#1E3A8A] uppercase font-bold mb-1">
          {meta.kicker}
        </div>
        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          {meta.title}
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          {meta.description}
        </p>

        {/* Topic Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#f1f5f9]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8] flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>DESK STREAMS:</span>
          </span>
          {meta.topics.map((t) => (
            <button
              key={t}
              onClick={() => onOpenTopic(t.toLowerCase())}
              className="text-[11px] font-inter px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] text-[#334155] hover:text-[#0F172A] transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Consequential Lead & Right Rail Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left 8 Cols: Consequential Lead Briefing */}
        <div className="lg:col-span-8 space-y-6">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#DC2626] font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
            <span>MOST CONSEQUENTIAL DEVELOPMENT IN THIS VERTICAL</span>
          </div>

          <article
            onClick={() => onOpenDossier(leadDossier)}
            className="group cursor-pointer border border-[#e2e8f0] p-6 hover:border-[#0F172A] transition-all bg-white"
          >
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-inter mb-3">
              <span className="bg-[#0F172A] text-white text-[10px] font-bold tracking-widest px-2 py-0.5 uppercase">
                {leadDossier.status}
              </span>
              <span className="text-[#64748b] font-mono text-[10px]">
                UPDATED {leadDossier.updatedTime}
              </span>
              <span className="text-[#cbd5e1]">•</span>
              <span className="font-semibold text-[#0F172A]">
                {leadDossier.sourcesTriangulated} SOURCES TRIANGULATED
              </span>
              <span className="text-[#cbd5e1]">•</span>
              <span className="text-[#15803d] font-mono font-semibold">
                CONFIDENCE: {leadDossier.confidenceScore}%
              </span>
            </div>

            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A] leading-snug group-hover:text-[#1E3A8A] transition-colors mb-3">
              {leadDossier.headline}
            </h2>

            <p className="font-inter text-sm text-[#45464d] leading-relaxed mb-4">
              {leadDossier.subhead}
            </p>

            {leadDossier.imageUrl && (
              <div className="relative aspect-16/9 overflow-hidden mb-4 border border-[#e2e8f0]">
                <img
                  src={leadDossier.imageUrl}
                  alt={leadDossier.headline}
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                />
                <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs p-2 text-[10px] font-mono text-[#64748b] border-t border-[#e2e8f0]">
                  {leadDossier.imageCaption}
                </div>
              </div>
            )}

            {/* Why It Matters */}
            <div className="bg-[#f8fafc] border-l-2 border-[#1E3A8A] p-4 mb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-1.5">
                WHY IT MATTERS TO THIS DESK
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-inter">
                {leadDossier.whyItMatters[0]}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
              <span className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>OPEN FULL INTELLIGENCE DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-mono text-[#94a3b8]">
                {leadDossier.primarySources.slice(0, 2).join(' · ')}
              </span>
            </div>
          </article>

          {/* Inline Advertisement between complete ideas */}
          <AdPlacement variant="category-inline" />

          {/* Vertical What Matters Now */}
          <div className="pt-6 border-t border-[#e2e8f0]">
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#0F172A] font-bold mb-4">
              WHAT MATTERS NOW IN {categoryId.toUpperCase()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHAT_MATTERS_ITEMS.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenDossier(leadDossier)}
                  className="border border-[#e2e8f0] p-4 hover:border-[#0F172A] transition-all cursor-pointer bg-white"
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#DC2626] font-bold mb-1">
                    {item.tag} · {item.timeAgo}
                  </div>
                  <h3 className="font-newsreader text-lg font-bold text-[#0F172A] leading-snug mb-2 hover:text-[#1E3A8A]">
                    {item.headline}
                  </h3>
                  <p className="text-xs font-inter text-[#45464d] leading-relaxed mb-3">
                    {item.summary}
                  </p>
                  <div className="text-[10px] font-mono text-[#64748b]">
                    IMPACT: <strong className="text-[#0F172A]">{item.whyItMatters}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Live Vertical Stream & Dialectic */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Vertical Impact Telemetry */}
          <div className="border border-[#0F172A] p-4 bg-white">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] mb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-3.5 h-3.5 text-[#DC2626] animate-pulse" />
                <span className="text-[11px] font-bold font-inter tracking-wider uppercase text-[#0F172A]">
                  DESK IMPACT WATCH
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#64748b]">REAL-TIME</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border-l-2 border-[#DC2626]">
                <div className="text-[10px] font-mono text-[#DC2626] font-bold uppercase">
                  ENTERPRISE CAPEX
                </div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">
                  High sensitivity to sovereign treasury auctions
                </div>
                <div className="text-[11px] text-[#45464d] mt-1 font-inter">
                  Corporate borrowing spreads widen 45 bps as primary market absorptions peak.
                </div>
              </div>

              <div className="p-3 bg-[#f8fafc] border-l-2 border-[#1E3A8A]">
                <div className="text-[10px] font-mono text-[#1E3A8A] font-bold uppercase">
                  INSTITUTIONAL LIQUIDITY
                </div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">
                  Foreign portfolio inflows concentrate in short paper
                </div>
                <div className="text-[11px] text-[#45464d] mt-1 font-inter">
                  CBN circular enforces strict settlement window discipline.
                </div>
              </div>
            </div>
          </div>

          {/* Latest Dispatches in this Vertical */}
          <div className="border border-[#e2e8f0] p-4 bg-white">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#0F172A]" />
                <span className="text-[11px] font-bold font-inter tracking-wider uppercase text-[#0F172A]">
                  LATEST {categoryId.toUpperCase()} DISPATCHES
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#64748b]">WIRE</span>
            </div>

            <div className="divide-y divide-[#f1f5f9]">
              {NEWS_WIRE_ITEMS.slice(0, 5).map((item) => (
                <div key={item.id} className="py-2.5 group cursor-pointer">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94a3b8] mb-1">
                    <span>{item.timestamp}</span>
                    <span className="text-[#1E3A8A] font-semibold">{item.source}</span>
                  </div>
                  <h4 className="text-xs font-inter font-semibold text-[#1a1c1b] group-hover:text-[#1E3A8A] leading-snug">
                    {item.headline}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Rail Sponsorship */}
          <AdPlacement variant="right-rail" />

        </aside>

      </div>

    </div>
  );
}
