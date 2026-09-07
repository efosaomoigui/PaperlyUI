import { SlidersHorizontal } from 'lucide-react';

interface LiveTrackingBarProps {
  onSelectTopic: (topic: string) => void;
  onOpenWireFilter: () => void;
}

export function LiveTrackingBar({ onSelectTopic, onOpenWireFilter }: LiveTrackingBarProps) {
  return (
    <div className="border-y border-[#e2e8f0] bg-white my-3">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-inter">
        
        {/* Left Ticker items */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-[#0F172A] tracking-wider text-[10px] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse inline-block" />
            <span>NOW TRACKING</span>
          </div>

          <span className="text-[#cbd5e1] hidden sm:inline">•</span>

          <button
            id="btn-track-naira"
            onClick={() => onSelectTopic('naira')}
            className="flex items-center space-x-1 hover:text-[#1E3A8A] transition-colors cursor-pointer text-left"
          >
            <span className="text-[10px] font-bold text-[#DC2626] tracking-wider uppercase">
              DEVELOPING
            </span>
            <span className="text-[#1a1c1b] hover:underline underline-offset-2">
              Naira Liquidity & Parallel Margins
            </span>
          </button>

          <span className="text-[#cbd5e1] hidden sm:inline">•</span>

          <button
            id="btn-track-nelfund"
            onClick={() => onSelectTopic('nelfund')}
            className="flex items-center space-x-1 hover:text-[#1E3A8A] transition-colors cursor-pointer text-left"
          >
            <span className="text-[10px] font-bold text-[#1E3A8A] tracking-wider uppercase">
              NEW
            </span>
            <span className="text-[#1a1c1b] hover:underline underline-offset-2">
              NELFUND Higher Education Disbursement
            </span>
          </button>

          <span className="text-[#cbd5e1] hidden md:inline">•</span>

          <button
            id="btn-track-opec"
            onClick={() => onSelectTopic('opec')}
            className="hidden md:flex items-center space-x-1 hover:text-[#1E3A8A] transition-colors cursor-pointer text-left"
          >
            <span className="text-[10px] font-bold text-[#45464d] tracking-wider uppercase">
              UPDATED
            </span>
            <span className="text-[#1a1c1b] hover:underline underline-offset-2">
              OPEC+ Voluntary Quota
            </span>
          </button>
        </div>

        {/* Right Wire Filter Trigger */}
        <div className="flex items-center space-x-2 text-[#45464d]">
          <span className="text-[#cbd5e1] hidden sm:inline">|</span>
          <button
            id="btn-filter-wire-feeds"
            onClick={onOpenWireFilter}
            className="flex items-center space-x-1.5 text-[11px] font-medium text-[#45464d] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#76777d]" />
            <span className="font-inter text-[11px]">Filter Wire: <strong className="font-semibold text-[#0F172A]">All Feeds</strong></span>
          </button>
        </div>

      </div>
    </div>
  );
}
