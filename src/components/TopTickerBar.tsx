import { useState } from 'react';
import { TOP_TICKERS } from '../data/mockData';
import { RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TopTickerBarProps {
  activeEdition?: string;
  currentEdition?: string;
  onSelectEdition: (edition: string) => void;
  onOpenPulse?: () => void;
  isNewsprintGrain?: boolean;
  onToggleNewsprintGrain?: () => void;
}

export function TopTickerBar({
  activeEdition,
  currentEdition,
  onSelectEdition,
  onOpenPulse,
  isNewsprintGrain,
  onToggleNewsprintGrain,
}: TopTickerBarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const editions = ['GLOBAL', 'AFRICA', 'NIGERIA'];
  const active = activeEdition?.toUpperCase() || currentEdition?.toUpperCase() || 'NIGERIA';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="border-b border-[#e2e8f0] bg-white text-[10px] text-[#1a1c1b]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1 flex flex-wrap items-center justify-between gap-y-1">
        
        {/* Editions toggle and Newsprint Texture switch */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-[#94a3b8] tracking-widest text-[9px] uppercase">
              EDITIONS:
            </span>
            <div className="flex items-center space-x-1.5 font-inter text-[10px]">
              {editions.map((edition, idx) => (
                <span key={edition} className="flex items-center">
                  <button
                    id={`btn-edition-${edition.toLowerCase()}`}
                    onClick={() => onSelectEdition(edition)}
                    className={`cursor-pointer transition-colors duration-100 ${
                      active === edition
                        ? 'font-bold text-[#0F172A]'
                        : 'text-[#64748b] hover:text-[#0F172A]'
                    }`}
                  >
                    {edition}
                  </button>
                  {idx < editions.length - 1 && (
                    <span className="text-[#cbd5e1] ml-1.5">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Real Newsprint Grain Texture Experimentation Toggle */}
          {onToggleNewsprintGrain && (
            <div className="hidden sm:flex items-center pl-2.5 border-l border-[#e2e8f0] space-x-1.5">
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#94a3b8]">
                NEWSPRINT:
              </span>
              <button
                id="btn-toggle-newsprint-grain"
                onClick={onToggleNewsprintGrain}
                className={`text-[9px] font-mono px-1 py-0.2 border cursor-pointer transition-colors ${
                  isNewsprintGrain
                    ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                    : 'bg-white text-[#64748b] border-[#cbd5e1] hover:text-[#0F172A]'
                }`}
                title="Toggle broadsheet paper grain overlay"
              >
                {isNewsprintGrain ? 'ON' : 'OFF'}
              </button>
            </div>
          )}
        </div>

        {/* Financial & Sovereign Telemetry Tickers */}
        <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-5 text-[10.5px] font-inter">
          {TOP_TICKERS.map((ticker) => {
            const isPos = ticker.type === 'positive';
            const isNeg = ticker.type === 'negative';
            return (
              <button
                key={ticker.symbol}
                id={`btn-ticker-${ticker.symbol.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={onOpenPulse}
                className="flex items-center space-x-1 hover:opacity-75 transition-opacity"
                title="View in Paperly Pulse Telemetry"
              >
                <span className="font-mono text-[#64748b] text-[9.5px]">
                  {ticker.symbol}
                </span>
                <span className="font-bold text-[#0F172A] font-inter text-[10.5px]">
                  {ticker.value}
                </span>
                <span
                  className={`flex items-center text-[9px] font-mono font-semibold ${
                    isPos
                      ? 'text-[#15803d]'
                      : isNeg
                      ? 'text-[#DC2626]'
                      : 'text-[#64748b]'
                  }`}
                >
                  {isPos && <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" />}
                  {isNeg && <TrendingDown className="w-2.5 h-2.5 mr-0.5 inline" />}
                  {!isPos && !isNeg && <Minus className="w-2.5 h-2.5 mr-0.5 inline" />}
                  {ticker.change}
                </span>
              </button>
            );
          })}

          {/* Sync Time & Protocol Indicator */}
          <div className="flex items-center space-x-1 pl-2 border-l border-[#e2e8f0] text-[#94a3b8]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            <span className="text-[9px] font-mono tracking-widest uppercase">
              SYNC 14:02 UTC
            </span>
            <button
              id="btn-sync-refresh"
              onClick={handleRefresh}
              className="p-0.5 text-[#94a3b8] hover:text-[#0F172A] transition-colors"
              title="Re-synchronize algorithmic telemetry"
            >
              <RefreshCw className={`w-2 h-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
