import { ArrowLeft, Check, Sparkles, Radio, ShieldCheck, ArrowRight, Layers, Eye } from 'lucide-react';
import { AdPlacement } from '../AdPlacement';

interface DesignSystemPageProps {
  onBackToBriefing: () => void;
}

export function DesignSystemPage({ onBackToBriefing }: DesignSystemPageProps) {
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
            ENGINEERING HANDOFF // DESIGN SYSTEM MASTER
          </div>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Paperly Design System & Specification
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Complete engineering reference for the Paperly visual language: typography tokens, color standards, mathematical spacing, component states, and data-driven edge cases.
        </p>
      </div>

      {/* Design System Sections */}
      <div className="space-y-12 mb-16">
        
        {/* 1. Typography Hierarchy */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            01. TYPOGRAPHIC PAIRING & MATHEMATICAL SCALE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 border border-[#e2e8f0]">
            <div>
              <div className="text-[10px] font-mono text-[#1E3A8A] font-bold uppercase mb-1">
                DISPLAY FONT: NEWSREADER
              </div>
              <p className="font-newsreader text-3xl font-bold text-[#0F172A] leading-tight">
                The Paperly Briefing
              </p>
              <p className="font-newsreader text-xl italic text-[#64748b] mt-1">
                Make sense of what is happening.
              </p>
              <p className="text-xs font-inter text-[#64748b] mt-2">
                Used for editorial headlines, lead titles, quotes, and philosophical epigraphs.
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono text-[#1E3A8A] font-bold uppercase mb-1">
                BODY FONT: INTER
              </div>
              <p className="font-inter text-sm text-[#1a1c1b] leading-relaxed">
                With headline inflation exceeding 33%, loan accessibility directly dictates matriculation retention rates for over 640,000 households.
              </p>
              <p className="text-xs font-inter text-[#64748b] mt-2">
                High-contrast geometric sans-serif tuned for dense analytical legibility at 12–16px.
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono text-[#1E3A8A] font-bold uppercase mb-1">
                TELEMETRY & CODE: MONO
              </div>
              <p className="font-mono text-xs text-[#0F172A]">
                CONFIDENCE: 94.8% · 6 SOURCES TRIANGULATED · UPDATED 14M AGO
              </p>
              <p className="text-xs font-inter text-[#64748b] mt-2">
                Monospaced font for timestamps, source counts, ticker symbols, and telemetry tags.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Color Palette */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            02. COLOR PALETTE & FUNCTIONAL SEMANTICS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Pure White Canvas', hex: '#FFFFFF', bg: 'bg-white', text: 'text-black', border: 'border border-[#cbd5e1]' },
              { name: 'Paperly Slate Black', hex: '#0F172A', bg: 'bg-[#0F172A]', text: 'text-white' },
              { name: 'Cobalt Triangulation', hex: '#1E3A8A', bg: 'bg-[#1E3A8A]', text: 'text-white' },
              { name: 'Paperly Alert Crimson', hex: '#DC2626', bg: 'bg-[#DC2626]', text: 'text-white' },
              { name: 'Verified Emerald', hex: '#15803D', bg: 'bg-[#15803D]', text: 'text-white' },
              { name: 'Muted Slate Border', hex: '#E2E8F0', bg: 'bg-[#E2E8F0]', text: 'text-[#0F172A]' },
            ].map((col, idx) => (
              <div key={idx} className="p-3 bg-white border border-[#e2e8f0] space-y-2">
                <div className={`h-12 w-full ${col.bg} ${col.border || ''}`} />
                <div className="text-xs font-bold font-inter text-[#0F172A]">{col.name}</div>
                <div className="text-[10px] font-mono text-[#64748b]">{col.hex}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Reusable Component States */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            03. REUSABLE INTELLIGENCE ATOMS & STATUS BADGES
          </div>

          <div className="p-6 bg-white border border-[#e2e8f0] space-y-6">
            
            {/* Statuses */}
            <div>
              <div className="text-[10px] font-mono uppercase text-[#64748b] mb-2 font-bold">
                DEVELOPMENT STATUS PILLS:
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#DC2626] text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-widest">
                  DEVELOPING
                </span>
                <span className="bg-[#1E3A8A] text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-widest">
                  UPDATED
                </span>
                <span className="bg-[#15803d] text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-widest">
                  STABLE
                </span>
                <span className="bg-[#0F172A] text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-widest">
                  NEW
                </span>
              </div>
            </div>

            {/* Impact Badges */}
            <div>
              <div className="text-[10px] font-mono uppercase text-[#64748b] mb-2 font-bold">
                IMPACT DIRECTION INDICATORS:
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#DC2626] text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider">
                  ↑ HIGH IMPACT
                </span>
                <span className="bg-[#1E3A8A] text-white text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider">
                  ↓ MODERATE IMPACT
                </span>
                <span className="bg-[#f1f5f9] text-[#0F172A] text-[10px] font-bold font-mono px-2 py-0.5 uppercase tracking-wider border border-[#cbd5e1]">
                  → WATCH LIST
                </span>
              </div>
            </div>

            {/* Carousel Controls */}
            <div>
              <div className="text-[10px] font-mono uppercase text-[#64748b] mb-2 font-bold">
                EDITORIAL CAROUSEL TELEMETRY:
              </div>
              <div className="flex items-center space-x-2 bg-[#f4f4f2] px-3 py-1 border border-[#e2e8f0] w-fit font-mono text-xs">
                <span className="font-bold text-[#0F172A]">01</span>
                <span className="text-[#94a3b8]">/</span>
                <span className="text-[#64748b]">03</span>
                <span className="text-[#94a3b8] mx-2">|</span>
                <span className="text-[10px] text-[#15803d]">AUTO-ROTATING (8.5S)</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Advertising Separation Standard */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            04. THE CRITICAL ADVERTISING SEPARATION STANDARD
          </div>
          <div className="p-6 bg-white border border-[#e2e8f0] space-y-4">
            <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed">
              <strong>Mandatory Rule:</strong> Never interrupt an ongoing intelligence explanation. Advertisements sit strictly between complete editorial modules and are framed by crisp rules and explicit "ADVERTISEMENT" labels.
            </p>
            <AdPlacement variant="section-divider" />
          </div>
        </section>

      </div>

    </div>
  );
}
