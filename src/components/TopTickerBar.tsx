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
    <header className="border-b border-[#e2e8f0] bg-white text-[11px] font-medium tracking-tight text-[#1a1c1b]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-y-1">
        
        {/* Editions toggle and Newsprint Texture switch */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#45464d] tracking-wider text-[10px] uppercase font-inter">
              Editions:
            </span>
            <div className="flex items-center space-x-1.5 font-inter text-[11px]">
              {editions.map((edition, idx) => (
                <span key={edition} className="flex items-center">
                  <button
                    id={`btn-edition-${edition.toLowerCase()}`}
                    onClick={() => onSelectEdition(edition)}
                    className={`cursor-pointer transition-colors duration-100 ${
                      active === edition
                        ? 'font-bold text-[#0F172A] underline underline-offset-2'
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
              <span className="text-[10px] font-mono uppercase text-[#64748b]">
                NEWSPRINT FEEL:
              </span>
              <button
                id="btn-toggle-newsprint-grain"
                onClick={onToggleNewsprintGrain}
                className={`text-[10px] font-mono px-1.5 py-0.5 border cursor-pointer transition-colors ${
                  isNewsprintGrain
                    ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                    : 'bg-white text-[#64748b] border-[#cbd5e1] hover:text-[#0F172A]'
                }`}
                title="Toggle authentic broadsheet paper grain and fibrous texture"
              >
                {isNewsprintGrain ? 'ON (GRAIN)' : 'OFF'}
              </button>
            </div>
          )}
        </div>

        {/* Financial & Sovereign Telemetry Tickers */}
        <div className="flex items-center flex-wrap gap-x-4 sm:gap-x-6 text-[11px] font-inter">
          {TOP_TICKERS.map((ticker) => {
            const isPos = ticker.type === 'positive';
            const isNeg = ticker.type === 'negative';
            return (
              <button
                key={ticker.symbol}
                id={`btn-ticker-${ticker.symbol.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={onOpenPulse}
                className="flex items-center space-x-1.5 hover:opacity-75 transition-opacity"
                title="View in Paperly Pulse Telemetry"
              >
                <span className="font-semibold tracking-wide text-[#45464d] text-[10px]">
                  {ticker.symbol}
                </span>
                <span className="font-bold text-[#0F172A] font-inter">
                  {ticker.value}
                </span>
                <span
                  className={`flex items-center text-[10px] font-semibold ${
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
          <div className="flex items-center space-x-1.5 pl-2 border-l border-[#e2e8f0] text-[#64748b]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#15803d] animate-pulse" />
            <span className="text-[10px] font-medium tracking-wider uppercase font-inter">
              SYNC: 14:02 UTC
            </span>
            <button
              id="btn-sync-refresh"
              onClick={handleRefresh}
              className="p-0.5 text-[#64748b] hover:text-[#0F172A] transition-colors"
              title="Re-synchronize algorithmic telemetry"
            >
              <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
