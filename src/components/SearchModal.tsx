import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Activity, AlertCircle, Newspaper } from 'lucide-react';
import { LEAD_DOSSIER, WHAT_MATTERS_ITEMS, IMPACT_WATCH_DATA, NEWS_WIRE_DISPATCHES } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: string, id: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelectResult }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Can be toggled from App
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items based on query
  const q = query.toLowerCase();

  const filteredDossier = (
    LEAD_DOSSIER.headline.toLowerCase().includes(q) ||
    LEAD_DOSSIER.subhead.toLowerCase().includes(q) ||
    LEAD_DOSSIER.primarySources.some((s) => s.toLowerCase().includes(q))
  );

  const filteredWhatMatters = WHAT_MATTERS_ITEMS.filter(
    (item) =>
      item.headline.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
  );

  const filteredImpact = IMPACT_WATCH_DATA.filter(
    (item) =>
      item.headline.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.label.toLowerCase().includes(q)
  );

  const filteredWire = NEWS_WIRE_DISPATCHES.filter(
    (item) =>
      item.headline.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#cbd5e1] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0F172A]" />
          <input
            ref={inputRef}
            id="input-computational-dossiers-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search computational dossiers, entities, policy indices..."
            className="flex-1 text-[15px] font-newsreader font-medium text-[#0F172A] outline-none placeholder:text-[#94a3b8] placeholder:font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#94a3b8] hover:text-[#0F172A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            id="btn-close-search"
            onClick={onClose}
            className="text-[10px] font-mono uppercase font-bold text-[#64748b] hover:text-[#0F172A] px-1.5 py-0.5 border border-[#cbd5e1] hover:border-[#0F172A]"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          
          {/* Lead Dossiers Result */}
          {filteredDossier && (
            <div>
              <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#1E3A8A] mb-2 flex items-center space-x-1.5">
                <FileText className="w-3 h-3" />
                <span>EXECUTIVE DOSSIERS</span>
              </div>
              <button
                id="search-res-lead-dossier"
                onClick={() => {
                  onSelectResult('dossier', LEAD_DOSSIER.id);
                  onClose();
                }}
                className="w-full text-left p-3 bg-white border border-[#e2e8f0] hover:border-[#0F172A] transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#DC2626] font-bold uppercase mb-1">
                  <span>{LEAD_DOSSIER.status}</span>
                  <span>•</span>
                  <span>94.8% CONFIDENCE</span>
                </div>
                <div className="font-newsreader text-[16px] font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                  {LEAD_DOSSIER.headline}
                </div>
                <p className="font-sourceserif text-[12px] text-[#45464d] line-clamp-2 mt-1">
                  {LEAD_DOSSIER.subhead}
                </p>
              </button>
            </div>
          )}

          {/* What Matters Inflection Points */}
          {filteredWhatMatters.length > 0 && (
            <div>
              <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#45464d] mb-2 flex items-center space-x-1.5">
                <AlertCircle className="w-3 h-3 text-[#B45309]" />
                <span>MACRO &amp; INFRASTRUCTURAL INFLECTION POINTS</span>
              </div>
              <div className="space-y-2">
                {filteredWhatMatters.map((item) => (
                  <button
                    key={item.id}
                    id={`search-res-wm-${item.id}`}
                    onClick={() => {
                      onSelectResult('briefing', item.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 bg-white border border-[#e2e8f0] hover:border-[#0F172A] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b] mb-0.5">
                      <span className="font-bold text-[#1E3A8A]">{item.tag}</span>
                      <span>{item.timeAgo}</span>
                    </div>
                    <div className="font-newsreader text-[15px] font-semibold text-[#0F172A] group-hover:text-[#1E3A8A]">
                      {item.headline}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Impact Watch Items */}
          {filteredImpact.length > 0 && (
            <div>
              <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#45464d] mb-2 flex items-center space-x-1.5">
                <Activity className="w-3 h-3 text-[#1E3A8A]" />
                <span>IMPACT WATCH NODES</span>
              </div>
              <div className="space-y-2">
                {filteredImpact.map((item) => (
                  <button
                    key={item.id}
                    id={`search-res-impact-${item.id}`}
                    onClick={() => {
                      onSelectResult('impact', item.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 bg-white border border-[#e2e8f0] hover:border-[#0F172A] transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#64748b]">
                        {item.label} • {item.vectorBadge}
                      </div>
                      <div className="font-newsreader text-[14px] font-semibold text-[#0F172A] group-hover:text-[#1E3A8A]">
                        {item.headline}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-[11px] font-mono font-bold text-[#0F172A]">
                        {item.metricValue}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Latest Wire Dispatches */}
          {filteredWire.length > 0 && (
            <div>
              <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#45464d] mb-2 flex items-center space-x-1.5">
                <Newspaper className="w-3 h-3" />
                <span>24/7 WIRE DISPATCHES</span>
              </div>
              <div className="space-y-1.5">
                {filteredWire.map((item) => (
                  <button
                    key={item.id}
                    id={`search-res-wire-${item.id}`}
                    onClick={() => {
                      onSelectResult('wire', item.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 bg-white border border-[#e2e8f0] hover:border-[#0F172A] transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] font-mono text-[#64748b] shrink-0">{item.time}</span>
                      <span className="text-[9px] font-mono font-bold uppercase bg-[#f1f5f9] px-1 text-[#1E3A8A] shrink-0">
                        {item.category}
                      </span>
                      <span className="font-newsreader text-[13px] text-[#0F172A] group-hover:text-[#1E3A8A] truncate">
                        {item.headline}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#cbd5e1] group-hover:text-[#0F172A] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!filteredDossier && filteredWhatMatters.length === 0 && filteredImpact.length === 0 && filteredWire.length === 0 && (
            <div className="text-center py-10 text-[#76777d]">
              <p className="font-sourceserif text-[14px]">
                No matching verified dossiers found for &ldquo;{query}&rdquo;.
              </p>
              <p className="text-[11px] font-mono mt-1 text-[#94a3b8]">
                Try searching &quot;NELFUND&quot;, &quot;FX&quot;, &quot;Tariff&quot;, &quot;Subsea&quot;, or &quot;Refinery&quot;.
              </p>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-4 py-2 flex items-center justify-between text-[10px] font-mono text-[#76777d]">
          <span>Institutional Algorithmic Dossier Index v4.12</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
}
