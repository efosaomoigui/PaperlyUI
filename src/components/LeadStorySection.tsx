import { useState, useEffect, type TouchEvent } from 'react';
import { Camera, FileText, ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../data/mockData';
import { IntelligenceDossier } from '../types';

interface LeadStorySectionProps {
  onOpenDossier: (dossier: IntelligenceDossier) => void;
  onSelectSector: (sectorId: string) => void;
  onOpenTimelineEvent: (eventId: string) => void;
  onOpenMethodology?: () => void;
}

export function LeadStorySection({
  onOpenDossier,
  onSelectSector,
  onOpenTimelineEvent,
  onOpenMethodology,
}: LeadStorySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isProgressiveOpen, setIsProgressiveOpen] = useState(false);

  const dossiers = BRIEFING_CAROUSEL_DOSSIERS;
  const currentDossier = dossiers[currentIndex];

  // Mobile touch swipe handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -45) {
      // Swiped right -> prev
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Gentle automatic rotation with 8.5s interval
  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) return;

    const timer = setInterval(() => {
      switchSlide((currentIndex + 1) % dossiers.length);
    }, 8500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, dossiers.length]);

  const switchSlide = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 180);
  };

  const handlePrev = () => {
    switchSlide((currentIndex - 1 + dossiers.length) % dossiers.length);
  };

  const handleNext = () => {
    switchSlide((currentIndex + 1) % dossiers.length);
  };

  return (
    <div
      id="hero-paperly-briefing"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6 touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="The Paperly Briefing Lead Carousel"
    >
      {/* ----------------- Clean Briefing Introduction Section ----------------- */}
      <div className="pt-2 pb-4">
        {/* Eyebrow */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#94a3b8] mb-2.5">
          <span className="font-semibold text-[#64748b]">PAPERLY BRIEFING · MIDDAY EDITION</span>
          <span className="hidden sm:inline text-[9.5px] text-[#cbd5e1]">
            VOL. 04 · ED. 182 // LAGOS · LONDON · WASHINGTON DC
          </span>
        </div>

        {/* Main Title Row with Quiet Carousel Controls: 01 / 03 ‹ › */}
        <div className="flex items-baseline justify-between gap-4 pb-2">
          <h1 className="font-newsreader text-[36px] sm:text-[46px] lg:text-[52px] font-normal tracking-tight text-[#0F172A] leading-none">
            The Paperly Briefing
          </h1>

          {/* Quiet & Elegant Carousel Controls: 01 / 03 ‹ › */}
          <div className="flex items-center space-x-2.5 font-mono text-[11px] text-[#45464d] select-none shrink-0 pl-2">
            <span className="font-semibold text-[#0F172A] tracking-wider text-[11px]">
              0{currentIndex + 1} <span className="text-[#94a3b8] font-normal">/ 0{dossiers.length}</span>
            </span>
            <div className="flex items-center border border-[#cbd5e1] bg-white">
              <button
                id="btn-lead-carousel-prev"
                onClick={handlePrev}
                aria-label="Previous development"
                className="p-1 text-[#45464d] hover:bg-[#0F172A] hover:text-white transition-colors border-r border-[#cbd5e1] cursor-pointer"
                title="Previous development"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-lead-carousel-next"
                onClick={handleNext}
                aria-label="Next development"
                className="p-1 text-[#45464d] hover:bg-[#0F172A] hover:text-white transition-colors cursor-pointer"
                title="Next development"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Single Clean Metadata Row with Progressive Disclosure Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 pt-1.5 pb-3 border-b border-[#e2e8f0] text-[11px] font-inter text-[#64748b]">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <span className="font-bold text-[#DC2626] uppercase text-[10px] tracking-wider">
              {currentDossier.status}
            </span>
            <span className="text-[#cbd5e1]">·</span>
            <span>Updated {currentDossier.updatedTime}</span>
            <span className="text-[#cbd5e1]">·</span>
            <span className="text-[#0F172A] font-medium">{currentDossier.sourcesTriangulated} sources</span>
            <span className="text-[#cbd5e1]">·</span>
            <span className="text-[#15803d] font-semibold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] inline-block" />
              <span>High confidence</span>
            </span>
          </div>

          {/* Progressive Disclosure Button */}
          <button
            id="btn-toggle-verified-intelligence"
            onClick={() => setIsProgressiveOpen((prev) => !prev)}
            className="inline-flex items-center space-x-1 text-[10.5px] font-mono font-bold tracking-wider text-[#1E3A8A] hover:text-[#0F172A] transition-colors cursor-pointer"
            title="Toggle full triangulation verification protocol and source telemetry"
          >
            <ShieldCheck className="w-3 h-3 text-[#1E3A8A]" />
            <span>VERIFIED INTELLIGENCE</span>
            <ChevronDown className={`w-3 h-3 text-[#64748b] transition-transform duration-200 ${isProgressiveOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Progressive Disclosure Expandable Intelligence Drawer */}
        {isProgressiveOpen && (
          <div className="bg-[#f8fafc] border-x border-b border-[#cbd5e1] p-4 mb-4 text-xs font-inter transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-3 border-b border-[#e2e8f0]">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b]">
                  SYSTEM PROVENANCE &amp; VERIFICATION TELEMETRY
                </div>
                <div className="font-newsreader text-base font-bold text-[#0F172A]">
                  6-Node Asymmetric Corroboration Architecture (Protocol v4.12-PROV)
                </div>
                <p className="text-[#45464d] text-xs max-w-2xl">
                  Synthesized across independent institutional ledgers, direct API telemetry, and corroborated regulatory registers. No anonymous or uncorroborated sourcing permitted.
                </p>
              </div>

              <div className="flex flex-wrap md:flex-col gap-2 shrink-0 text-[11px] font-mono">
                <div>
                  <span className="text-[#64748b]">CONFIDENCE:</span> <strong className="text-[#15803d]">94.8%</strong>
                </div>
                <div>
                  <span className="text-[#64748b]">CYCLE:</span> <strong className="text-[#0F172A]">15:00 UTC (HOURLY)</strong>
                </div>
                <div>
                  <span className="text-[#64748b]">RECORD:</span> <span className="text-[#45464d]">VOL. 04 · ED. 182</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] text-[#45464d]">
                <strong className="text-[#0F172A]">6 Primary Data Feeds:</strong> NELFUND Biometric Telemetry, JAMB CAPS, NIBSS Mandate Clearing, ASUU Policy Registry, MoE Budgetary Ledger, NBS Deflator.
              </div>
              {onOpenMethodology && (
                <button
                  onClick={onOpenMethodology}
                  className="text-[10.5px] font-mono font-bold text-[#1E3A8A] hover:underline uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  INSPECT METHODOLOGY &rarr;
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#e2e8f0]">
        
        {/* Left 8 Columns: Main Dossier Analysis */}
        <div
          className={`lg:col-span-8 lg:pr-8 pb-8 transition-opacity duration-200 ${
            isFading ? 'opacity-30' : 'opacity-100'
          }`}
        >
          {/* Lead Headline */}
          <h2 className="font-newsreader text-[30px] sm:text-[36px] lg:text-[40px] font-medium leading-[1.12] text-[#0F172A] tracking-tight mb-3">
            {currentDossier.headline}
          </h2>

          {/* Subheading */}
          <p className="font-sourceserif text-[17px] sm:text-[19px] leading-[1.45] text-[#45464d] font-normal mb-5">
            {currentDossier.subhead}
          </p>

          {/* Featured Image with Institutional Archive Metadata */}
          <div className="relative border border-[#e2e8f0] bg-[#eeeeec] mb-6 overflow-hidden">
            <img
              src={currentDossier.imageUrl}
              alt={currentDossier.imageCaption}
              className="w-full h-[320px] sm:h-[400px] object-cover filter contrast-[1.02] brightness-[0.98]"
              loading="lazy"
            />
            {/* Caption bar anchored to photo bottom */}
            <div className="bg-[#0F172A]/90 text-white px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-inter">
              <div className="flex items-center space-x-2">
                <Camera className="w-3.5 h-3.5 text-[#cbd5e1] shrink-0" />
                <span className="text-[#f1f1ef] truncate">
                  {currentDossier.imageCaption}
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase shrink-0">
                {currentDossier.imageArchive}
              </span>
            </div>
          </div>

          {/* 01 What Happened & 02 Why It Matters Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#e2e8f0]">
            {/* 01 / WHAT HAPPENED */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#45464d]">
                01 / WHAT HAPPENED
              </div>
              <div className="font-sourceserif text-[14px] leading-[1.65] text-[#1a1c1b] space-y-2">
                {currentDossier.whatHappened.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* 02 / WHY IT MATTERS */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#45464d]">
                02 / WHY IT MATTERS
              </div>
              <div className="font-sourceserif text-[14px] leading-[1.65] text-[#1a1c1b] space-y-2">
                {currentDossier.whyItMatters.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Dossier Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-[12px] font-sourceserif text-[#45464d]">
              <FileText className="w-3.5 h-3.5 text-[#76777d] shrink-0" />
              <span>
                Primary sources: <strong className="font-medium text-[#1a1c1b]">{currentDossier.primarySources.join(', ')}.</strong>
              </span>
            </div>

            <button
              id="btn-open-lead-dossier"
              onClick={() => onOpenDossier(currentDossier)}
              className="w-full sm:w-auto bg-[#0F172A] text-white px-4 py-2.5 text-[11px] font-inter font-bold tracking-wider uppercase hover:bg-[#1E3A8A] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>OPEN FULL INTELLIGENCE DOSSIER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right 4 Columns: Sector Nodes, Chronology & Synthesis */}
        <div
          className={`lg:col-span-4 lg:pl-8 lg:border-l border-[#e2e8f0] pt-6 lg:pt-0 pb-8 space-y-6 transition-opacity duration-200 ${
            isFading ? 'opacity-30' : 'opacity-100'
          }`}
        >
          
          {/* 03 / WHO IS AFFECTED */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#45464d]">
                03 / WHO IS AFFECTED
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#76777d]">
                {currentDossier.affectedSectors.length} SECTOR NODES
              </span>
            </div>

            <div className="divide-y divide-[#e2e8f0]">
              {currentDossier.affectedSectors.map((sec) => (
                <button
                  key={sec.id}
                  id={`btn-affected-sector-${sec.id}`}
                  onClick={() => onSelectSector(sec.id)}
                  className="w-full text-left py-2.5 group cursor-pointer hover:bg-[#f4f4f2] transition-colors px-1"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-inter font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                      {sec.sector}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 uppercase ${
                        sec.tagVariant === 'high'
                          ? 'bg-[#fee2e2] text-[#DC2626] border border-[#fecaca]'
                          : sec.tagVariant === 'inflow'
                          ? 'bg-[#e0e7ff] text-[#1E3A8A] border border-[#c7d2fe]'
                          : 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]'
                      }`}
                    >
                      {sec.tag}
                    </span>
                  </div>
                  <p className="font-sourceserif text-[12px] leading-[1.5] text-[#45464d]">
                    {sec.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 04 / WHAT TO WATCH NEXT */}
          <div className="pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#45464d]">
                04 / WHAT TO WATCH NEXT
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#76777d]">
                CHRONOLOGY
              </span>
            </div>

            <div className="relative pl-3 border-l-2 border-[#0F172A] space-y-4">
              {currentDossier.chronology.map((event) => (
                <button
                  key={event.id}
                  id={`btn-chronology-${event.id}`}
                  onClick={() => onOpenTimelineEvent(event.id)}
                  className="w-full text-left group cursor-pointer hover:opacity-85 transition-opacity"
                >
                  <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#1E3A8A]">
                    {event.timestamp}
                  </div>
                  <div className="font-newsreader text-[16px] font-semibold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-tight my-0.5">
                    {event.title}
                  </div>
                  <p className="font-sourceserif text-[12px] leading-[1.5] text-[#45464d]">
                    {event.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Synthesis Assessment Callout Box */}
          <div className="bg-[#f4f4f2] border border-[#cbd5e1] p-3.5 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-[#1E3A8A]">
              <Sparkles className="w-3 h-3 text-[#1E3A8A]" />
              <span>SYNTHESIS ASSESSMENT</span>
            </div>
            <p className="font-sourceserif text-[12px] leading-[1.5] text-[#1a1c1b]">
              {currentDossier.synthesisAssessment}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

