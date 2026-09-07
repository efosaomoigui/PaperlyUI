import { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  FileCheck,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { BRIEFING_CAROUSEL_DOSSIERS, DOSSIER_METHODOLOGY } from '../data/mockData';
import { IntelligenceDossier } from '../types';
import { AdPlacement } from './AdPlacement';

interface DossierDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier?: IntelligenceDossier | null;
}

export function DossierDetailModal({ isOpen, onClose, dossier: propDossier }: DossierDetailModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeTab, setActiveTab] = useState<'narrative' | 'geo-telemetry' | 'audit-ledger'>('narrative');

  if (!isOpen) return null;

  const currentDossier = propDossier || BRIEFING_CAROUSEL_DOSSIERS[0];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(DOSSIER_METHODOLOGY.dataIntegrityHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Geo-distribution breakdown telemetry
  const geoBreakdown = [
    { zone: 'South West', applications: '342,100', percentage: '28.5%', speedIndex: '98.4', color: '#1E3A8A' },
    { zone: 'North West', applications: '298,400', percentage: '24.9%', speedIndex: '91.2', color: '#3b82f6' },
    { zone: 'North Central', applications: '214,300', percentage: '17.9%', speedIndex: '88.6', color: '#60a5fa' },
    { zone: 'South South', applications: '158,200', percentage: '13.2%', speedIndex: '82.1', color: '#93c5fd' },
    { zone: 'South East', applications: '124,500', percentage: '10.4%', speedIndex: '76.8', color: '#bfdbfe' },
    { zone: 'North East', applications: '62,500', percentage: '5.1%', speedIndex: '71.4', color: '#dbeafe' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[8px_8px_0px_0px_#0F172A] max-h-[92vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Top Header Bar */}
        <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between border-b border-[#0F172A]">
          <div className="flex items-center space-x-3">
            <span
              className={`text-white text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 uppercase ${
                currentDossier.status === 'DEVELOPING' ? 'bg-[#DC2626]' : 'bg-[#1E3A8A]'
              }`}
            >
              {currentDossier.status} DOSSIER
            </span>
            <span className="text-[11px] font-mono tracking-wider text-[#cbd5e1] uppercase hidden sm:inline">
              PAPERLY EXECUTIVE INTELLIGENCE // DOSSIER #{currentDossier.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-print-dossier"
              onClick={handlePrint}
              className="p-1.5 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Print Broadside Dossier"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="btn-close-dossier-modal"
              onClick={onClose}
              className="p-1.5 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Protocol & Verification Sub-Header */}
        <div className="bg-[#f4f4f2] border-b border-[#cbd5e1] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-[#15803d] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
              <span>CONFIDENCE: {currentDossier.confidenceScore}% (HIGH)</span>
            </span>
            <span className="text-[#cbd5e1]">|</span>
            <span className="text-[#45464d]">
              TRIANGULATION: <strong>{currentDossier.sourcesTriangulated} INDEPENDENT NODES</strong>
            </span>
            <span className="text-[#cbd5e1] hidden sm:inline">|</span>
            <span className="text-[#45464d] hidden sm:inline">
              LAST UPDATE: <strong>{currentDossier.updatedTime}</strong>
            </span>
          </div>

          {/* Cryptographic hash snippet */}
          <button
            id="btn-copy-dossier-hash"
            onClick={handleCopyHash}
            className="flex items-center space-x-1.5 text-[#64748b] hover:text-[#0F172A] transition-colors cursor-pointer"
            title="Copy verification hash"
          >
            <span>HASH: {DOSSIER_METHODOLOGY.dataIntegrityHash.slice(0, 12)}...</span>
            {copiedHash ? <Check className="w-3 h-3 text-[#15803d]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#cbd5e1] bg-white px-4 sm:px-6 flex space-x-6 text-[11px] font-inter font-bold tracking-wider uppercase overflow-x-auto">
          <button
            id="tab-dossier-narrative"
            onClick={() => setActiveTab('narrative')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'narrative'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            Synthesis Narrative &amp; Strategic Depth
          </button>
          <button
            id="tab-dossier-geo"
            onClick={() => setActiveTab('geo-telemetry')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'geo-telemetry'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            Sector Impact &amp; Scenario Vectors
          </button>
          <button
            id="tab-dossier-audit"
            onClick={() => setActiveTab('audit-ledger')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'audit-ledger'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            Corroborated Ledger ({currentDossier.sourcesTriangulated} Sources)
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {activeTab === 'narrative' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 8 Cols: Main Intelligence Depth */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#DC2626] mb-1">
                    EXECUTIVE INTELLIGENCE MEMORANDUM // VOL. 04
                  </div>
                  <h1 className="font-newsreader text-[26px] sm:text-[32px] font-semibold leading-[1.18] text-[#0F172A] tracking-tight">
                    {currentDossier.headline}
                  </h1>
                  <p className="font-sourceserif text-[16px] leading-relaxed text-[#45464d] mt-2">
                    {currentDossier.subhead}
                  </p>
                </div>

                {/* Analytical Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-[#e2e8f0] p-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-[#1E3A8A]">
                      PRIMARY POLICY VECTOR
                    </span>
                    <div className="font-newsreader text-[22px] font-bold text-[#0F172A]">
                      {currentDossier.affectedSectors[0]?.sector || 'Sovereign Liquidity'}
                    </div>
                    <p className="font-sourceserif text-[12px] text-[#45464d]">
                      {currentDossier.affectedSectors[0]?.description || 'Direct impact on domestic market liquidity.'}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-[#e2e8f0] pt-3 md:pt-0 md:pl-4">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-[#15803d]">
                      CONFIDENCE INDEX
                    </span>
                    <div className="font-newsreader text-[22px] font-bold text-[#0F172A]">
                      {currentDossier.confidenceScore}% Triangulated
                    </div>
                    <p className="font-sourceserif text-[12px] text-[#45464d]">
                      Corroborated across primary ministerial and institutional transaction ledgers.
                    </p>
                  </div>
                </div>

                {/* Extended Narrative Paragraphs */}
                <div className="space-y-4 font-sourceserif text-[15px] leading-[1.7] text-[#1a1c1b]">
                  {currentDossier.extendedNarrative ? (
                    currentDossier.extendedNarrative.map((p, i) => <p key={i}>{p}</p>)
                  ) : (
                    <>
                      {currentDossier.whatHappened.map((p, i) => <p key={`wh-${i}`}>{p}</p>)}
                      {currentDossier.whyItMatters.map((p, i) => <p key={`wm-${i}`}>{p}</p>)}
                    </>
                  )}
                </div>

                {/* Subtle Inline Sponsored Intelligence Unit */}
                <AdPlacement variant="inline-sponsored" sponsorName="FBNQuest Merchant Bank" />

                {/* Key Actors If Available */}
                {currentDossier.keyActors && currentDossier.keyActors.length > 0 && (
                  <div className="border-t border-[#e2e8f0] pt-4 space-y-3">
                    <div className="flex items-center space-x-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#0F172A]">
                      <Users className="w-3.5 h-3.5 text-[#1E3A8A]" />
                      <span>KEY INSTITUTIONAL ACTORS & DECISION MAKERS</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentDossier.keyActors.map((actor, i) => (
                        <div key={i} className="bg-white border border-[#e2e8f0] p-3 space-y-1">
                          <div className="font-newsreader font-bold text-[14px] text-[#0F172A]">
                            {actor.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#64748b]">
                            {actor.role} · {actor.organization}
                          </div>
                          <p className="font-sourceserif text-[12px] text-[#475569] mt-1">
                            {actor.stance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Synthesis Assessment Callout */}
                <div className="bg-[#f4f4f2] border-l-4 border-[#1E3A8A] p-4">
                  <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase font-bold text-[#1E3A8A] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>COMPUTATIONAL MODEL FINDINGS</span>
                  </div>
                  <p className="font-sourceserif text-[13px] text-[#0F172A] leading-relaxed">
                    {currentDossier.synthesisAssessment}
                  </p>
                </div>
              </div>

              {/* Right 4 Cols: Sector Sidebar & Right-Rail Ad Placement */}
              <div className="lg:col-span-4 space-y-6">
                {/* Sector impact sidebar */}
                <div className="border border-[#e2e8f0] bg-white p-4 space-y-3">
                  <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
                    SECTOR IMPACT OVERVIEW
                  </div>
                  <div className="space-y-3">
                    {currentDossier.affectedSectors.map((sec) => (
                      <div key={sec.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-inter font-bold text-[#0F172A]">
                            {sec.sector}
                          </span>
                          <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.2 bg-[#f1f5f9] text-[#475569]">
                            {sec.tag}
                          </span>
                        </div>
                        <p className="font-sourceserif text-[12px] text-[#45464d] leading-snug">
                          {sec.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right-Rail Advertisement Placement */}
                <AdPlacement variant="right-rail" />

                {/* What to watch next chronology */}
                <div className="border border-[#e2e8f0] bg-white p-4 space-y-3">
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
                    <Compass className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>WHAT TO WATCH NEXT</span>
                  </div>
                  <div className="space-y-3">
                    {currentDossier.chronology.map((c) => (
                      <div key={c.id} className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-[#1E3A8A] uppercase">
                          {c.timestamp}
                        </span>
                        <h4 className="font-newsreader font-semibold text-[14px] text-[#0F172A] leading-tight">
                          {c.title}
                        </h4>
                        <p className="font-sourceserif text-[11px] text-[#64748b]">
                          {c.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'geo-telemetry' && (
            <div className="space-y-6">
              {currentDossier.scenarioModel ? (
                <div className="space-y-4">
                  <div className="border-b border-[#0F172A] pb-2">
                    <h3 className="font-newsreader text-[20px] font-bold text-[#0F172A]">
                      Strategic Scenario Modeling
                    </h3>
                    <p className="font-sourceserif text-[13px] text-[#45464d] mt-1">
                      Probability distributions calibrated on econometric simulations and high-frequency settlement data.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border-t-4 border-[#15803d] border-x border-b border-[#e2e8f0] p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#15803d]">BEST CASE</span>
                        <span className="text-[11px] font-mono font-bold text-[#0F172A]">{currentDossier.scenarioModel.bestCase.probability} PROB</span>
                      </div>
                      <p className="font-sourceserif text-[13px] text-[#334155] leading-relaxed">
                        {currentDossier.scenarioModel.bestCase.description}
                      </p>
                    </div>

                    <div className="bg-white border-t-4 border-[#1E3A8A] border-x border-b border-[#e2e8f0] p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A]">BASE CASE</span>
                        <span className="text-[11px] font-mono font-bold text-[#0F172A]">{currentDossier.scenarioModel.baseCase.probability} PROB</span>
                      </div>
                      <p className="font-sourceserif text-[13px] text-[#334155] leading-relaxed">
                        {currentDossier.scenarioModel.baseCase.description}
                      </p>
                    </div>

                    <div className="bg-white border-t-4 border-[#DC2626] border-x border-b border-[#e2e8f0] p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#DC2626]">STRESS CASE</span>
                        <span className="text-[11px] font-mono font-bold text-[#0F172A]">{currentDossier.scenarioModel.stressCase.probability} PROB</span>
                      </div>
                      <p className="font-sourceserif text-[13px] text-[#334155] leading-relaxed">
                        {currentDossier.scenarioModel.stressCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div>
                <h3 className="font-newsreader text-[20px] font-bold text-[#0F172A]">
                  Geopolitical Zone Distribution Breakdown
                </h3>
                <p className="font-sourceserif text-[13px] text-[#45464d] mt-1">
                  Comparative telemetry of biometric inquiries, total student cohort volume, and institutional registrar submission velocity.
                </p>
              </div>

              <div className="border border-[#e2e8f0] bg-white divide-y divide-[#e2e8f0]">
                {geoBreakdown.map((item) => (
                  <div key={item.zone} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-newsreader text-[16px] font-bold text-[#0F172A]">
                        {item.zone}
                      </span>
                      <div className="text-right">
                        <span className="font-mono text-[13px] font-bold text-[#0F172A]">
                          {item.applications}
                        </span>
                        <span className="text-[11px] font-mono text-[#64748b] ml-1.5">
                          ({item.percentage})
                        </span>
                      </div>
                    </div>

                    {/* Progress visual bar */}
                    <div className="w-full h-2.5 bg-[#f1f5f9] overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: item.percentage,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#76777d]">
                      <span>Registrar Speed Index: <strong>{item.speedIndex} / 100</strong></span>
                      <span>Verified Cohort Parity: <strong>Standard</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f4f4f2] p-4 text-[12px] font-sourceserif text-[#45464d] border border-[#cbd5e1]">
                <strong>Methodology Note:</strong> Geo-distribution percentages mirror tertiary enrollment density across federal institutions. No statistical bias was detected after adjusting for institutional registrar processing latency (p &gt; 0.45).
              </div>
            </div>
          )}

          {activeTab === 'audit-ledger' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-newsreader text-[20px] font-bold text-[#0F172A]">
                  Triangulated Sourcing &amp; Provenance Ledger
                </h3>
                <p className="font-sourceserif text-[13px] text-[#45464d] mt-1">
                  Corroborated across primary sources: {currentDossier.primarySources.join(', ')}.
                </p>
              </div>

              <div className="space-y-3">
                {DOSSIER_METHODOLOGY.sources.map((src, index) => (
                  <div
                    key={index}
                    className="p-3.5 bg-white border border-[#e2e8f0] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-[#1E3A8A]" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
                          {src.type}
                        </span>
                      </div>
                      <div className="font-newsreader text-[15px] font-semibold text-[#0F172A]">
                        {src.title}
                      </div>
                      <div className="text-[10px] font-mono text-[#76777d]">
                        Synchronized: {src.date}
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-[#f1f5f9] text-[#15803d] px-2 py-0.5 border border-[#e2e8f0]">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-inter">
          <span className="text-[10px] font-mono text-[#76777d]">
            Paperly Cryptographic Provenance: verified hash #0x8f7c9e · {currentDossier.sourcesTriangulated} Sources
          </span>

          <div className="flex items-center space-x-2">
            <button
              id="btn-close-dossier-bottom"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors font-mono uppercase text-[10px] font-bold tracking-wider cursor-pointer"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

