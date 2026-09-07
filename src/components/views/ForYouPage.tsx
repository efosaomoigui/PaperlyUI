import { useState } from 'react';
import { ArrowLeft, Bookmark, Bell, Check, Radio, Sparkles, ArrowRight, ShieldCheck, Sliders } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface ForYouPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
}

export function ForYouPage({
  onBackToBriefing,
  onOpenDossier,
}: ForYouPageProps) {
  const [selectedPersona, setSelectedPersona] = useState('BUSINESS / ENTERPRISE');
  const [followedTopics, setFollowedTopics] = useState<string[]>([
    'CBN FX Float',
    'NELFUND Student Loans',
    'Band A Tariffs',
  ]);

  const personas = [
    'INDIVIDUAL / CITIZEN',
    'HOUSEHOLD',
    'EMPLOYEE',
    'SME FOUNDER',
    'BUSINESS / ENTERPRISE',
    'INVESTOR',
    'STUDENT',
    'TRAVELLER',
    'DIASPORA',
  ];

  const availableTopics = [
    'CBN FX Float',
    'NELFUND Student Loans',
    'Band A Tariffs',
    'Dangote Refinery',
    'Tax Reform Bill',
    'OPEC+ Quotas',
    'Subsea Cables',
    'Eurobond Yields',
  ];

  const toggleTopic = (t: string) => {
    setFollowedTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

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
            TAILORED INTELLIGENCE RADAR // PROTOCOL 10
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#1E3A8A] uppercase font-bold mb-1">
          <Bookmark className="w-3.5 h-3.5 text-[#1E3A8A]" />
          <span>PERSONALIZED EXECUTIVE BRIEFING</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          For You: Tailored Intelligence & Watchlist
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Paperly filters signal from noise according to your professional persona and active topic watchlist. Stored locally without tracking cookies or algorithmic feeds.
        </p>

        {/* Persona Selector */}
        <div className="mt-4 pt-4 border-t border-[#f1f5f9]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] font-bold mb-2">
            SELECT YOUR ACTIVE ROLE PROFILE:
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {personas.map((p) => {
              const isSelected = selectedPersona === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPersona(p)}
                  className={`text-xs font-inter font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Followed Topics */}
        <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#94a3b8] mb-2 flex items-center space-x-1">
            <Sliders className="w-3 h-3" />
            <span>TOPICS ON YOUR RADAR:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {availableTopics.map((t) => {
              const isFollowed = followedTopics.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTopic(t)}
                  className={`text-xs font-inter px-2.5 py-1 border transition-all flex items-center space-x-1 ${
                    isFollowed
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] font-semibold'
                      : 'bg-[#f8fafc] text-[#64748b] border-[#cbd5e1] hover:text-[#0F172A]'
                  }`}
                >
                  <span>{t}</span>
                  {isFollowed && <Check className="w-3 h-3 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tailored Briefing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left 8 Cols: Personalized Dossiers */}
        <div className="lg:col-span-8 space-y-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
            <span>YOUR TAILORED BRIEFING FOR TODAY</span>
            <span className="text-[10px] text-[#15803d]">3 RELEVANT INFLECTIONS MATCHED</span>
          </div>

          {BRIEFING_CAROUSEL_DOSSIERS.map((dossier) => (
            <article
              key={dossier.id}
              onClick={() => onOpenDossier(dossier)}
              className="p-6 border border-[#e2e8f0] bg-white hover:border-[#0F172A] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b] mb-2">
                <span className="bg-[#0F172A] text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                  {dossier.status}
                </span>
                <span>MATCHED: {selectedPersona}</span>
              </div>

              <h2 className="font-newsreader text-2xl font-bold text-[#0F172A] leading-snug group-hover:text-[#1E3A8A] mb-2">
                {dossier.headline}
              </h2>

              <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed mb-3">
                {dossier.subhead}
              </p>

              <div className="p-3 bg-[#f8fafc] border-l-2 border-[#1E3A8A] text-xs font-inter text-[#334155] mb-3">
                <span className="font-bold text-[#1E3A8A]">DIRECT CONSEQUENCE: </span>
                {dossier.affectedSectors[0]?.description || dossier.whyItMatters[0]}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
                <span className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] flex items-center space-x-1">
                  <span>INSPECT EVIDENCE & ANALYSIS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-mono text-[#94a3b8]">
                  {dossier.sourcesTriangulated} SOURCES
                </span>
              </div>
            </article>
          ))}

          <AdPlacement variant="category-inline" />
        </div>

        {/* Right 4 Cols: Watchlist & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="border border-[#0F172A] p-5 bg-white">
            <div className="flex items-center space-x-2 pb-2 border-b border-[#e2e8f0] mb-3">
              <Bell className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-[11px] font-bold font-inter tracking-wider uppercase text-[#0F172A]">
                ACTIVE WATCHLIST ALERTS
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border-l-2 border-[#DC2626]">
                <div className="text-[10px] font-mono text-[#DC2626] font-bold uppercase">
                  CBN LIQUIDITY
                </div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">
                  NAFEM Spread narrowed under 2.8%
                </div>
                <div className="text-[10px] font-mono text-[#64748b] mt-1">
                  Alert triggered 22m ago
                </div>
              </div>

              <div className="p-3 bg-[#f8fafc] border-l-2 border-[#1E3A8A]">
                <div className="text-[10px] font-mono text-[#1E3A8A] font-bold uppercase">
                  NELFUND AUDIT
                </div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">
                  State institutional verification reports logged
                </div>
                <div className="text-[10px] font-mono text-[#64748b] mt-1">
                  Alert triggered 1h ago
                </div>
              </div>
            </div>
          </div>

          <AdPlacement variant="right-rail" />

        </div>

      </div>

    </div>
  );
}
