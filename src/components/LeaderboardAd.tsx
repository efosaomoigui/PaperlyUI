import { ArrowRight } from 'lucide-react';

export function LeaderboardAd() {
  return (
    <aside
      id="ad-masthead-leaderboard"
      aria-label="Advertisement"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 border-b border-[#f1f5f9]"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-x-3 gap-y-1 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-0.5">
          <span className="text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase font-semibold">
            ADVERTISEMENT
          </span>
          <span className="text-[#cbd5e1] hidden sm:inline">|</span>
          <span className="font-newsreader text-[13px] text-[#334155] font-medium">
            West Africa Infrastructure &amp; Liquidity Forum 2026
          </span>
          <span className="text-[#cbd5e1] hidden sm:inline">·</span>
          <span className="text-[12px] font-sourceserif text-[#64748b]">
            Institutional Registration Open
          </span>
        </div>

        <a
          href="#sponsor-portal"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold tracking-wider text-[#1E3A8A] hover:underline uppercase shrink-0 cursor-pointer"
        >
          <span>DELEGATE ACCREDITATION</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </a>
      </div>
    </aside>
  );
}

