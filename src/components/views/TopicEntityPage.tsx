import { useState } from 'react';
import { ArrowLeft, Database, ShieldCheck, ArrowRight, Clock, Network, TrendingUp } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface TopicEntityPageProps {
  entityId: string;
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
}

interface EntityData {
  name: string;
  type: string;
  status: string;
  overview: string;
  keyFacts: string[];
  timeline: { date: string; event: string }[];
  relatedEntities: string[];
  leadDossier: IntelligenceDossier;
}

const ENTITY_REGISTRY: Record<string, EntityData> = {
  cbn: {
    name: 'Central Bank of Nigeria (CBN)',
    type: 'SOVEREIGN MONETARY AUTHORITY',
    status: 'ACTIVE MONETARY TIGHTENING & FX UNIFICATION',
    overview: 'Nigeria’s apex monetary and banking regulatory body, responsible for currency issuance, exchange rate governance, price stability, and systemic financial reserves.',
    keyFacts: [
      'Monetary Policy Rate (MPR) raised to 27.25% to curb persistent inflation.',
      'Gross foreign reserves stand at $38.2B, backed by crude inflows and non-oil receipts.',
      'Operates the NAFEM willing-buyer/willing-seller interbank FX order matching system.',
    ],
    timeline: [
      { date: 'June 2023', event: 'Unification of multiple foreign exchange windows.' },
      { date: 'Feb 2024', event: 'Clearance of $7B verified commercial trade forward backlogs.' },
      { date: 'Jan 2025', event: 'Enforcement of tiered capitalization benchmarks for BDCs.' },
    ],
    relatedEntities: ['Ministry of Finance', 'FIRS', 'Commercial Banks', 'NAFEM'],
    leadDossier: BRIEFING_CAROUSEL_DOSSIERS[1],
  },
  nelfund: {
    name: 'Nigerian Education Loan Fund (NELFUND)',
    type: 'SOVEREIGN DIRECT BENEFIT INSTITUTION',
    status: 'ROLLING OUT NATIONWIDE STUDENT ACCREDITATION',
    overview: 'Statutory body established by the Student Loans (Access to Higher Education) Act, tasked with administering zero-interest student loans for tuition and upkeep to low-income undergraduates.',
    keyFacts: [
      '₦150B initial seed tranche disbursed via Federation Account allocations.',
      '1.2M validated biometric registrations logged across 126 universities.',
      'Repayment begins 2 years post-NYSC, deducted at 10% of gross salary.',
    ],
    timeline: [
      { date: 'April 2024', event: 'Passage of Student Loans Repeal & Re-enactment Act.' },
      { date: 'May 2024', event: 'Central verification portal launched for public federal tertiary schools.' },
      { date: 'March 2025', event: 'Extension of portal to accredited state university cohorts.' },
    ],
    relatedEntities: ['JAMB', 'ASUU', 'Federal Ministry of Education', 'Central Bank'],
    leadDossier: BRIEFING_CAROUSEL_DOSSIERS[0],
  },
};

export function TopicEntityPage({
  entityId,
  onBackToBriefing,
  onOpenDossier,
}: TopicEntityPageProps) {
  const entity = ENTITY_REGISTRY[entityId.toLowerCase()] || ENTITY_REGISTRY.nelfund;

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
            KNOWLEDGE NETWORK DOSSIER // ENTITY PROFILE
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#1E3A8A] uppercase font-bold mb-1">
          <Network className="w-3.5 h-3.5 text-[#1E3A8A]" />
          <span>{entity.type}</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          {entity.name}
        </h1>
        <p className="font-inter text-sm sm:text-base text-[#45464d] max-w-3xl leading-relaxed">
          {entity.overview}
        </p>

        <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="bg-[#0F172A] text-white px-2.5 py-1 uppercase font-bold tracking-wider">
            STATUS: {entity.status}
          </span>
          <span className="text-[#64748b]">
            CONNECTED IN {entity.relatedEntities.length} ACTIVE INTELLIGENCE DOSSIERS
          </span>
        </div>
      </div>

      {/* Grid: Latest Intelligence + Network Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left 8 Cols: Latest Active Development */}
        <div className="lg:col-span-8 space-y-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            CURRENT HIGH-IMPACT DEVELOPMENT INVOLVING THIS ENTITY
          </div>

          <article
            onClick={() => onOpenDossier(entity.leadDossier)}
            className="p-6 border border-[#e2e8f0] bg-white hover:border-[#0F172A] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b] mb-2">
              <span className="bg-[#DC2626] text-white px-2 py-0.5 font-bold uppercase">
                {entity.leadDossier.status}
              </span>
              <span>UPDATED {entity.leadDossier.updatedTime}</span>
            </div>

            <h2 className="font-newsreader text-2xl font-bold text-[#0F172A] leading-snug group-hover:text-[#1E3A8A] mb-3">
              {entity.leadDossier.headline}
            </h2>

            <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed mb-4">
              {entity.leadDossier.subhead}
            </p>

            <div className="p-3 bg-[#f8fafc] border-l-2 border-[#1E3A8A] text-xs font-inter text-[#334155] mb-3">
              <span className="font-bold text-[#1E3A8A]">WHY IT MATTERS: </span>
              {entity.leadDossier.whyItMatters[0]}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
              <span className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] flex items-center space-x-1">
                <span>INSPECT FULL DOSSIER & CITATIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10px] font-mono text-[#94a3b8]">
                {entity.leadDossier.sourcesTriangulated} SOURCES TRIANGULATED
              </span>
            </div>
          </article>

          {/* Key Facts */}
          <div className="border border-[#e2e8f0] p-6 bg-white space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] mb-2">
              KEY VERIFIED INSTITUTIONAL FACTS
            </div>
            {entity.keyFacts.map((fact, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs font-inter text-[#334155] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-1.5 shrink-0" />
                <span>{fact}</span>
              </div>
            ))}
          </div>

          <AdPlacement variant="category-inline" />
        </div>

        {/* Right 4 Cols: Timeline & Related Entities */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Timeline */}
          <div className="border border-[#e2e8f0] p-5 bg-white space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#f1f5f9]">
              HISTORICAL INFLECTION TIMELINE
            </div>
            <div className="space-y-3">
              {entity.timeline.map((t, idx) => (
                <div key={idx} className="border-l-2 border-[#cbd5e1] pl-3 py-0.5">
                  <div className="text-[10px] font-mono text-[#1E3A8A] font-bold">
                    {t.date}
                  </div>
                  <div className="text-xs font-inter text-[#334155] mt-0.5">
                    {t.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Entities */}
          <div className="border border-[#e2e8f0] p-5 bg-white space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#f1f5f9]">
              CONNECTED ENTITIES IN GRAPH
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entity.relatedEntities.map((ent, idx) => (
                <span key={idx} className="px-2 py-1 bg-[#f8fafc] border border-[#cbd5e1] text-xs font-inter text-[#334155]">
                  {ent}
                </span>
              ))}
            </div>
          </div>

          <AdPlacement variant="right-rail" />

        </div>

      </div>

    </div>
  );
}
