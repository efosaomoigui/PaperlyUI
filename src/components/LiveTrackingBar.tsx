import { SlidersHorizontal } from 'lucide-react';

interface LiveTrackingBarProps {
  onSelectTopic: (topic: string) => void;
  onOpenWireFilter: () => void;
}

export function LiveTrackingBar({ onSelectTopic, onOpenWireFilter }: LiveTrackingBarProps) {
  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] font-inter">
        
        {/* Compact Live Intelligence Wire */}
        <div className="flex items-center flex-wrap gap-x-2.5 gap-y-0.5">
          <div className="flex items-center space-x-1.5 font-bold text-[#0F172A] tracking-wider text-[9.5px] uppercase shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] inline-block" />
            <span>NOW TRACKING</span>
          </div>

          <span className="text-[#cbd5e1] hidden sm:inline">|</span>

          <button
            id="btn-track-naira"
            onClick={() => onSelectTopic('naira')}
            className="inline-flex items-baseline space-x-1 hover:text-[#1E3A8A] transition-colors cursor-pointer text-left"
          >
            <span className="text-[10px] font-mono font-bold text-[#DC2626]">Developing:</span>
            <span className="text-[#1a1c1b] hover:underline underline-offset-2 font-medium">
              Naira Liquidity &amp; Parallel Margins
            </span>
          </button>

          <span className="text-[#cbd5e1] hidden sm:inline">·</span>

          <button
            id="btn-track-nelfund"
            onClick={() => onSelectTopic('nelfund')}
            className="inline-flex items-baseline space-x-1 hover:text-[#1E3A8A] transition-colors cursor-pointer text-left"
          >
            <span className="text-[10px] font-mono font-bold text-[#1E3A8A]">New:</span>
            <span className="text-[#1a1c1b] hover:underline underline-offset-2 font-medium">
              NELFUND Higher Education Disbursement
            </span>
          </button>

          <span className="text-[#cbd5e1] hidden md:inline">·</span>

          <button
            id="btn-track-opec"
            onClick={() => onSelectTopic('opec')}
            className="hidden md:inline-flex items-baseline space-x-1 hover:text-[#1E3A8A] transition-colors cursor-pointer text-left"
          >
            <span className="text-[10px] font-mono font-bold text-[#64748b]">Updated:</span>
            <span className="text-[#1a1c1b] hover:underline underline-offset-2 font-medium">
              OPEC+ Voluntary Quota
            </span>
          </button>
        </div>

        {/* Right Wire Filter Trigger */}
        <div className="flex items-center space-x-2 text-[#64748b] shrink-0">
          <button
            id="btn-filter-wire-feeds"
            onClick={onOpenWireFilter}
            className="flex items-center space-x-1.5 text-[10.5px] text-[#64748b] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#94a3b8]" />
            <span>Filter Wire: <strong className="font-semibold text-[#0F172A]">All Feeds</strong></span>
          </button>
        </div>

      </div>
    </div>
  );
}
