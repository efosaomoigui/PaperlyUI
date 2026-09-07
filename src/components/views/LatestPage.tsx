import { useState } from 'react';
import { ArrowLeft, Clock, Filter, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { IntelligenceDossier, NewsWireItem } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS, NEWS_WIRE_ITEMS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface LatestPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
  onSelectDispatch: (item: NewsWireItem) => void;
}

export function LatestPage({
  onBackToBriefing,
  onOpenDossier,
  onSelectDispatch,
}: LatestPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'SOVEREIGN FINANCE', 'INSTITUTIONS', 'MARKETS', 'TRADE & MARITIME', 'INFRASTRUCTURE'];

  const filteredItems = NEWS_WIRE_ITEMS.filter((item) => {
    const catMatch = selectedCategory === 'ALL' ? true : item.category.toUpperCase() === selectedCategory;
    const queryMatch = searchQuery === '' ? true : item.headline.toLowerCase().includes(searchQuery.toLowerCase()) || item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && queryMatch;
  });

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
            CHRONOLOGICAL DISPATCH WIRE // PROTOCOL 08
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#0F172A] uppercase font-bold mb-1">
          <Clock className="w-3.5 h-3.5 text-[#0F172A]" />
          <span>REAL-TIME MULTI-SOURCE FEED</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Latest: Chronological News Wire
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          What has just been reported across over 40+ verified institutions, regulatory gazettes, and verified media feeds. Connecting raw dispatches to Paperly’s synthesis engine.
        </p>

        {/* Search and Category Filter */}
        <div className="mt-4 pt-4 border-t border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-inter font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Filter dispatches by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-inter border border-[#cbd5e1] focus:border-[#0F172A] focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Wire Stream */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b] pb-2 border-b border-[#e2e8f0]">
          <span>
            SHOWING <strong className="text-[#0F172A]">{filteredItems.length}</strong> DISPATCHES IN CHRONOLOGICAL SEQUENCE
          </span>
          <span className="text-[10px]">VERIFIED TIME STAMP PROTOCOL</span>
        </div>

        <div className="divide-y divide-[#e2e8f0] bg-white border border-[#e2e8f0]">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectDispatch({
                id: item.id,
                time: item.timestamp,
                category: item.category,
                headline: item.headline,
                source: item.source,
                desk: item.category,
              })}
              className="p-4 hover:bg-[#f8fafc] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#64748b] mb-1">
                  <span className="font-bold text-[#0F172A]">{item.timestamp}</span>
                  <span>•</span>
                  <span className="text-[#1E3A8A] font-semibold">{item.source}</span>
                  <span>•</span>
                  <span className="uppercase">{item.category}</span>
                </div>
                <h3 className="font-newsreader text-lg font-bold text-[#1a1c1b] group-hover:text-[#1E3A8A] leading-snug">
                  {item.headline}
                </h3>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                {item.verified && (
                  <span className="flex items-center space-x-1 text-[10px] font-mono text-[#15803d]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDossier(BRIEFING_CAROUSEL_DOSSIERS[0]);
                  }}
                  className="text-[11px] font-bold font-inter text-[#1E3A8A] hover:underline flex items-center space-x-0.5"
                >
                  <span>ANALYSIS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <AdPlacement variant="latest-inline" />
      </div>

    </div>
  );
}
