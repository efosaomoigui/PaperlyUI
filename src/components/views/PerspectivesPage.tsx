import { useState } from 'react';
import { ArrowLeft, Layers, CheckCircle2, AlertTriangle, Building, Newspaper, Briefcase, HelpCircle, ArrowRight } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface PerspectivesPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
  onOpenClaimsModal?: () => void;
}

export function PerspectivesPage({
  onBackToBriefing,
  onOpenDossier,
}: PerspectivesPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<'nelfund' | 'cbn' | 'opec'>('nelfund');

  const topicData = {
    nelfund: {
      headline: 'NELFUND National Student Loan Distribution & Governance Scrutiny',
      dossier: BRIEFING_CAROUSEL_DOSSIERS[0],
      agreed: [
        'Over 1.2 million undergraduates have initiated biometric identity registration on the centralized NELFUND portal.',
        'Institutional tuition disbursements will be settled electronically directly to accredited university bursary accounts.',
        'Initial ₦150bn capitalization is actively committed via the Federation Account allocation.',
      ],
      disputed: [
        'Whether southern state institutional verification delays stem from IT infrastructure lags or administrative compliance inertia.',
        'Adequacy of the ₦20,000 monthly student upkeep stipend against ongoing 33%+ headline consumer inflation.',
      ],
      officialPerspective: {
        source: 'Executive Management / Presidency',
        quote: 'Disbursements are executed purely on verified matriculation submission speed with complete geo-neutrality verified by BVN and JAMB registries.',
      },
      mediaPerspective: {
        source: 'Investigative Editorial Consensus (Punch, Premium Times, Daily Trust)',
        quote: 'While access parity exists on paper, state-owned university students face administrative bottlenecks compared to federal institutions.',
      },
      expertPerspective: {
        source: 'Centre for Fiscal Governance & ASUU Economics Council',
        quote: 'Long-term sustainability hinges on loan recovery frameworks post-NYSC and preventing tertiary fee hyperinflation.',
      },
      currentEvidenceSupports:
        'Official audit logs show over 68% of verified disbursement delays correlate directly to state university registrars failing to upload authenticated student lists.',
      remainsUncertain:
        'The exact default rate modeling once the inaugural cohort enters the formal labor market in 2027.',
    },
    cbn: {
      headline: 'CBN Foreign Exchange Unification & NAFEM Market-Clearing Rate Dynamics',
      dossier: BRIEFING_CAROUSEL_DOSSIERS[1],
      agreed: [
        'Central Bank has cleared verified commercial bank FX forward backlogs.',
        'Bureaux De Change (BDC) operators are subject to new tiered minimum capitalization benchmarks.',
        'Official NAFEM turnover exceeds $180M daily volume.',
      ],
      disputed: [
        'The degree to which autonomous parallel market premiums reflect speculative hoarders versus structural import demand.',
        'Whether the current Monetary Policy Rate (27.25%) is suppressing real-sector capital investment.',
      ],
      officialPerspective: {
        source: 'Central Bank of Nigeria Monetary Policy Committee',
        quote: 'Price discovery must remain market-driven to restore genuine foreign portfolio investment and eliminate arbitrage rent-seeking.',
      },
      mediaPerspective: {
        source: 'Financial Press & BusinessDay Macro Desk',
        quote: 'Rate stability has improved predictability for multinationals, but domestic manufacturers struggle with ballooning working capital requirements.',
      },
      expertPerspective: {
        source: 'Nigerian Economic Summit Group (NESG) & Fitch Ratings',
        quote: 'Orthodox monetary policy has stabilized reserve depletion; fiscal coordination is now mandatory to curb food supply transport bottlenecks.',
      },
      currentEvidenceSupports:
        'The spread between official NAFEM and parallel street rates has compressed to under 2.8%, down from 42% twelve months prior.',
      remainsUncertain:
        'Long-term durability of portfolio inflows without a sustained expansion in domestic non-oil export volumes.',
    },
    opec: {
      headline: 'OPEC+ Crude Production Quotas vs. Domestic Refining Feedstock Requirements',
      dossier: BRIEFING_CAROUSEL_DOSSIERS[2],
      agreed: [
        'Nigeria is committed to an OPEC+ reference allocation of 1.5M bpd for the current quota cycle.',
        'Domestic private refineries require minimum daily crude feedstock delivery to sustain operations.',
      ],
      disputed: [
        'The proportion of domestic crude to be settled in local currency (Naira) versus USD export earnings.',
        'Upstream pipeline crude theft volume calculations between security contractors and regulators.',
      ],
      officialPerspective: {
        source: 'NNPCL & Ministry of Petroleum Resources',
        quote: 'Strategic crude supply agreements are operationalized to guarantee energy security while honoring sovereign export treaties.',
      },
      mediaPerspective: {
        source: 'Petroleum Argus & S&P Global Commodity Insights',
        quote: 'Tension remains between immediate sovereign foreign exchange needs from exports and supporting local value addition.',
      },
      expertPerspective: {
        source: 'Major Oil Marketers Association & Energy Institute',
        quote: 'Domestic refining significantly compresses diesel freight premiums, but sustainable upstream investment requires regulatory contract sanctity.',
      },
      currentEvidenceSupports:
        'Domestic diesel wholesale pricing has dropped from ₦1,700/L to ₦1,050/L following initial refinery output.',
      remainsUncertain:
        'Long-term compliance of crude producers with domestic supply obligations without sovereign escrow guarantees.',
    },
  };

  const current = topicData[selectedTopic];

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
            DIALECTICAL DISSECTION ENGINE // PROTOCOL 06
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#1E3A8A] uppercase font-bold mb-1">
          <Layers className="w-3.5 h-3.5 text-[#1E3A8A]" />
          <span>EVIDENCE-LED DEBATE MAPPING</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Perspectives: What Is Agreed, Disputed & Uncertain
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Paperly does not manufacture artificial balance or amplify noise. We separate documented consensus from active institutional friction, highlighting what current empirical evidence validates.
        </p>

        {/* Topic Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#f1f5f9]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8]">
            SELECT DEVELOPMENT:
          </span>
          {[
            { id: 'nelfund', label: 'NELFUND Student Loans' },
            { id: 'cbn', label: 'CBN FX Unification' },
            { id: 'opec', label: 'OPEC+ Crude & Refining' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id as any)}
              className={`text-xs font-inter font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                selectedTopic === t.id
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dialectical Analysis Content */}
      <div className="space-y-8 mb-10">
        
        {/* Development Title */}
        <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold">
              ACTIVE INTELLIGENCE DOSSIER
            </div>
            <h2 className="font-newsreader text-2xl font-bold text-[#0F172A] mt-1">
              {current.headline}
            </h2>
          </div>
          <button
            onClick={() => onOpenDossier(current.dossier)}
            className="self-start md:self-auto text-xs font-inter font-bold tracking-wider uppercase text-white bg-[#0F172A] hover:bg-[#1E3A8A] px-3.5 py-2 transition-colors flex items-center space-x-1.5 shrink-0"
          >
            <span>VIEW COMPLETE DOSSIER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. What Is Agreed vs What Is Disputed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Agreed */}
          <div className="border border-[#e2e8f0] p-6 bg-white">
            <div className="flex items-center space-x-2 text-[11px] font-mono font-bold text-[#15803d] uppercase tracking-wider mb-4 pb-2 border-b border-[#f1f5f9]">
              <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
              <span>WHAT IS VERIFIED & MUTUALLY AGREED</span>
            </div>
            <ul className="space-y-3 font-inter text-xs sm:text-sm text-[#334155] leading-relaxed">
              {current.agreed.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disputed */}
          <div className="border border-[#e2e8f0] p-6 bg-white">
            <div className="flex items-center space-x-2 text-[11px] font-mono font-bold text-[#DC2626] uppercase tracking-wider mb-4 pb-2 border-b border-[#f1f5f9]">
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
              <span>WHAT IS CONTESTED OR ACTIVELY DISPUTED</span>
            </div>
            <ul className="space-y-3 font-inter text-xs sm:text-sm text-[#334155] leading-relaxed">
              {current.disputed.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 2. Triangulated Perspectives (Official, Media, Industry/Expert) */}
        <div className="border border-[#e2e8f0] p-6 bg-white">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] mb-4 pb-2 border-b border-[#e2e8f0]">
            PRIMARY INSTITUTIONAL PERSPECTIVES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Official */}
            <div className="p-4 bg-[#f8fafc] border-t-2 border-[#0F172A] flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-[#0F172A] uppercase mb-2">
                  <Building className="w-3.5 h-3.5 text-[#64748b]" />
                  <span>OFFICIAL STATE POSITION</span>
                </div>
                <div className="text-[11px] font-mono text-[#64748b] mb-2 font-semibold">
                  {current.officialPerspective.source}
                </div>
                <blockquote className="font-newsreader text-sm sm:text-base text-[#1a1c1b] italic leading-relaxed">
                  "{current.officialPerspective.quote}"
                </blockquote>
              </div>
            </div>

            {/* Media */}
            <div className="p-4 bg-[#f8fafc] border-t-2 border-[#1E3A8A] flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-[#1E3A8A] uppercase mb-2">
                  <Newspaper className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>INDEPENDENT MEDIA SCRUTINY</span>
                </div>
                <div className="text-[11px] font-mono text-[#64748b] mb-2 font-semibold">
                  {current.mediaPerspective.source}
                </div>
                <blockquote className="font-newsreader text-sm sm:text-base text-[#1a1c1b] italic leading-relaxed">
                  "{current.mediaPerspective.quote}"
                </blockquote>
              </div>
            </div>

            {/* Expert */}
            <div className="p-4 bg-[#f8fafc] border-t-2 border-[#64748b] flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-[#45464d] uppercase mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#64748b]" />
                  <span>INDUSTRY & ECONOMIC EXPERTS</span>
                </div>
                <div className="text-[11px] font-mono text-[#64748b] mb-2 font-semibold">
                  {current.expertPerspective.source}
                </div>
                <blockquote className="font-newsreader text-sm sm:text-base text-[#1a1c1b] italic leading-relaxed">
                  "{current.expertPerspective.quote}"
                </blockquote>
              </div>
            </div>

          </div>
        </div>

        {/* 3. What Current Evidence Supports vs What Remains Uncertain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="border border-[#1E3A8A] p-6 bg-white">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-2">
              PAPERLY EVIDENCE SYNTHESIS
            </div>
            <h3 className="font-newsreader text-lg font-bold text-[#0F172A] mb-2">
              What the Current Empirical Evidence Validates
            </h3>
            <p className="font-inter text-xs sm:text-sm text-[#334155] leading-relaxed">
              {current.currentEvidenceSupports}
            </p>
          </div>

          <div className="border border-[#cbd5e1] p-6 bg-[#f8fafc]">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-[#64748b] font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#94a3b8]" />
              <span>METHODOLOGICAL UNCERTAINTY</span>
            </div>
            <h3 className="font-newsreader text-lg font-bold text-[#0F172A] mb-2">
              What Still Remains Unproven or Ambiguous
            </h3>
            <p className="font-inter text-xs sm:text-sm text-[#45464d] leading-relaxed">
              {current.remainsUncertain}
            </p>
          </div>

        </div>

        {/* Reusable Sponsorship Placement */}
        <AdPlacement variant="section-divider" />

      </div>

    </div>
  );
}
