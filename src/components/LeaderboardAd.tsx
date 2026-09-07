import { ExternalLink } from 'lucide-react';

export function LeaderboardAd() {
  return (
    <aside
      id="ad-masthead-leaderboard"
      aria-label="Advertisement"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1"
    >
      <div className="w-full border border-[#e2e8f0] bg-[#f8fafc] py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <span className="text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase font-bold px-1.5 py-0.5 bg-white border border-[#e2e8f0]">
            ADVERTISEMENT
          </span>
          <span className="text-[10px] font-mono text-[#475569] uppercase font-semibold">
            STANBIC IBTC CAPITAL // SOVEREIGN &amp; CORPORATE MARKETS
          </span>
          <span className="hidden sm:inline text-[#cbd5e1]">•</span>
          <span className="font-newsreader text-[14px] text-[#0F172A] font-medium">
            Structuring Sustainable Infrastructure Financing Across Sub-Saharan Corridors
          </span>
        </div>

        <a
          href="#sponsor-portal"
          onClick={(e) => e.preventDefault()}
          className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#1E3A8A] hover:underline flex items-center space-x-1 shrink-0 cursor-pointer"
        >
          <span>LEARN MORE</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
}

