import { ShieldCheck, Clock } from 'lucide-react';

interface ExecutiveDossierHeaderProps {
  onOpenMethodology: () => void;
}

export function ExecutiveDossierHeader({ onOpenMethodology }: ExecutiveDossierHeaderProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 border-b border-[#e2e8f0]">
      {/* Top kicker meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono tracking-widest uppercase text-[#45464d] mb-1.5">
        <div>
          PAPERLY EXECUTIVE DOSSIER <span className="text-[#cbd5e1]">//</span> VOL. 04 · EDITION 182 <span className="text-[#cbd5e1]">//</span> LAGOS · LONDON · WASHINGTON DC
        </div>
      </div>

      {/* Main Title & Protocol Badge */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h1 className="font-newsreader text-[36px] sm:text-[44px] lg:text-[52px] font-normal tracking-tight text-[#0F172A] leading-none">
            The Paperly Briefing
          </h1>
          <span className="text-[13px] sm:text-[15px] font-newsreader italic text-[#64748b] tracking-normal">
            Midday Edition
          </span>
        </div>

        {/* Verification & Next Protocol info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-inter text-[#45464d]">
          <button
            id="btn-protocol-triangulated"
            onClick={onOpenMethodology}
            className="flex items-center space-x-1.5 hover:text-[#1E3A8A] transition-colors cursor-pointer group"
            title="View Triangulation Methodology"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A] group-hover:scale-110 transition-transform" />
            <span>
              Verification Protocol: <strong className="font-semibold text-[#0F172A]">Triangulated (6x)</strong>
            </span>
          </button>

          <span className="text-[#cbd5e1] hidden sm:inline">/</span>

          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#76777d]" />
            <span>
              Next Protocol Cycle: <strong className="font-semibold text-[#0F172A]">15:00 UTC</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
