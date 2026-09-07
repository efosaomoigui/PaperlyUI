import { useState } from 'react';
import { X, Radio, Filter, ExternalLink, ArrowRight } from 'lucide-react';
import { NEWS_WIRE_DISPATCHES } from '../data/mockData';
import { NewsWireItem } from '../types';

interface WireFeedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDispatch: (item: NewsWireItem) => void;
}

export function WireFeedDrawer({ isOpen, onClose, onSelectDispatch }: WireFeedDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', 'NIGERIA', 'MARKETS', 'POLICY', 'AGRI-TRADE', 'MARITIME', 'CENTRAL BANK', 'RENEWABLES'];

  const filteredDispatches = selectedCategory === 'ALL'
    ? NEWS_WIRE_DISPATCHES
    : NEWS_WIRE_DISPATCHES.filter((d) => d.category.toUpperCase() === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#f9f9f7] border-l-2 border-[#0F172A] shadow-2xl h-full flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#DC2626] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-white">
              REAL-TIME WIRE FEED // 24/7 CHRONOLOGY
            </span>
          </div>
          <button
            id="btn-close-wire-drawer"
            onClick={onClose}
            className="p-1 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="bg-[#f4f4f2] border-b border-[#cbd5e1] px-4 py-2.5 overflow-x-auto scrollbar-none flex items-center space-x-1.5 text-[10px] font-mono font-bold uppercase">
          <span className="text-[#64748b] mr-1 flex items-center">
            <Filter className="w-3 h-3 mr-1" />
            FILTER:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`btn-wire-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 whitespace-nowrap cursor-pointer transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-[#45464d] border-[#cbd5e1] hover:border-[#0F172A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dispatches List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#e2e8f0]">
          {filteredDispatches.map((item) => (
            <button
              key={item.id}
              id={`btn-drawer-dispatch-${item.id}`}
              onClick={() => onSelectDispatch(item)}
              className="w-full text-left p-4 hover:bg-[#f4f4f2] transition-colors cursor-pointer group space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#64748b]">{item.time}</span>
                  <span className="bg-[#f1f5f9] text-[#1E3A8A] font-bold px-1.5 py-0.5 border border-[#cbd5e1] uppercase">
                    {item.category}
                  </span>
                </div>
                <span className="text-[#76777d] uppercase">{item.desk}</span>
              </div>

              <h4 className="font-newsreader text-[16px] font-semibold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                {item.headline}
              </h4>

              <div className="flex items-center space-x-2 text-[11px] font-sourceserif text-[#64748b]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />
                <span>Source: <strong className="text-[#45464d]">{item.source}</strong></span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-5 py-3 flex items-center justify-between text-[10px] font-mono text-[#76777d]">
          <span>Showing {filteredDispatches.length} dispatches</span>
          <button
            onClick={onClose}
            className="font-bold text-[#0F172A] hover:text-[#1E3A8A] uppercase cursor-pointer"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}
