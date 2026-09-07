import { Newspaper, ArrowRight, Radio } from 'lucide-react';
import { NEWS_WIRE_DISPATCHES } from '../data/mockData';
import { NewsWireItem } from '../types';

interface NewsWireSectionProps {
  onOpenFullWire: () => void;
  onSelectDispatch: (item: NewsWireItem) => void;
}

export function NewsWireSection({ onOpenFullWire, onSelectDispatch }: NewsWireSectionProps) {
  // Show first 4 items as in the screenshot
  const dispatches = NEWS_WIRE_DISPATCHES.slice(0, 4);

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#e2e8f0]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#0F172A] mb-4">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-4 h-4 text-[#0F172A]" />
          <h2 className="font-newsreader text-[22px] font-semibold text-[#0F172A] tracking-tight">
            Latest News Wire
          </h2>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#76777d]">
            · 24/7 VERIFIED CHRONOLOGY
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] font-inter text-[#45464d]">
          <Radio className="w-3 h-3 text-[#DC2626] animate-pulse" />
          <span>Showing latest verified dispatches</span>
        </div>
      </div>

      {/* Dispatches List */}
      <div className="divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
        {dispatches.map((item) => (
          <button
            key={item.id}
            id={`btn-wire-item-${item.id}`}
            onClick={() => onSelectDispatch(item)}
            className="w-full text-left py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f4f4f2] transition-colors cursor-pointer group"
          >
            {/* Timestamp & Category Badge & Headline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
              <span className="text-[11px] font-mono text-[#64748b] shrink-0 font-medium">
                {item.time}
              </span>

              <span className="inline-block text-[9px] font-mono font-bold tracking-widest uppercase bg-[#f1f5f9] text-[#1E3A8A] border border-[#cbd5e1] px-2 py-0.5 shrink-0 self-start sm:self-auto">
                {item.category}
              </span>

              <span className="font-newsreader text-[16px] font-semibold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                {item.headline}
              </span>
            </div>

            {/* Source & Desk */}
            <div className="flex items-center space-x-3 text-[11px] font-inter text-[#64748b] shrink-0 sm:pl-4">
              <span className="font-medium text-[#45464d] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] mr-1.5" />
                {item.source}
              </span>
              <span className="text-[#cbd5e1]">|</span>
              <span className="font-mono text-[10px] uppercase text-[#76777d]">
                {item.desk}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Queue Status & Action Link */}
      <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono tracking-wider uppercase text-[#64748b]">
        <div>SHOWING 4 OF 128 ITEMS FROM TODAY&apos;S SYNTHESIS QUEUE</div>

        <button
          id="btn-open-realtime-wire"
          onClick={onOpenFullWire}
          className="flex items-center space-x-1 font-bold text-[#0F172A] hover:text-[#1E3A8A] transition-colors cursor-pointer group"
        >
          <span>OPEN REAL-TIME WIRE FEED</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
