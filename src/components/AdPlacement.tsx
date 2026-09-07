import { ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  variant: 'leaderboard' | 'section-divider' | 'lower-homepage' | 'right-rail' | 'inline-sponsored' | 'category-inline' | 'latest-inline';
  sponsorName?: string;
  className?: string;
}

export function AdPlacement({ variant, sponsorName = 'Stanbic IBTC Capital', className = '' }: AdPlacementProps) {
  if (variant === 'leaderboard') {
    return (
      <aside
        id="ad-placement-leaderboard"
        aria-label="Advertisement"
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 ${className}`}
      >
        <div className="bg-[#f8fafc] border border-[#e2e8f0] px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase font-semibold">
              ADVERTISEMENT
            </span>
            <span className="hidden sm:inline text-[#cbd5e1]">//</span>
            <span className="font-newsreader text-[15px] font-medium text-[#0F172A]">
              West Africa Infrastructure & Liquidity Forum 2026
            </span>
            <span className="text-[12px] font-sourceserif text-[#64748b]">
              Eko Convention Centre · Institutional Registration Open
            </span>
          </div>

          <a
            href="#sponsor-link"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold tracking-wider text-[#1E3A8A] hover:underline uppercase shrink-0"
          >
            <span>DELEGATE ACCREDITATION</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>
    );
  }

  if (variant === 'section-divider') {
    return (
      <aside
        id="ad-placement-section-divider"
        aria-label="Sponsored Intelligence Partner"
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 ${className}`}
      >
        <div className="border-t border-b border-[#e2e8f0] bg-[#fafafa] py-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase font-bold">
              SPONSORED
            </span>
            <span className="text-[10px] font-mono text-[#64748b] uppercase">
              {sponsorName} Global Markets
            </span>
            <span className="hidden sm:inline text-[#cbd5e1]">•</span>
            <p className="font-sourceserif text-[13px] text-[#334155] italic">
              "Structured Sovereign Hedging: Hedging FX Exposures Across Frontier Trade Corridors."
            </p>
          </div>

          <a
            href="#partner-brief"
            onClick={(e) => e.preventDefault()}
            className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#0F172A] border border-[#0F172A] px-3 py-1 hover:bg-[#0F172A] hover:text-white transition-colors shrink-0"
          >
            DOWNLOAD BRIEF (PDF)
          </a>
        </div>
      </aside>
    );
  }

  if (variant === 'right-rail') {
    return (
      <aside
        id="ad-placement-right-rail"
        aria-label="Advertisement"
        className={`border border-[#e2e8f0] bg-[#f8fafc] p-4 text-center space-y-2.5 ${className}`}
      >
        <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase">
          <span>ADVERTISEMENT</span>
          <span>FMDQ PARTNER</span>
        </div>
        <div className="py-3 px-2 border-y border-[#e2e8f0]">
          <div className="font-newsreader text-[16px] font-semibold text-[#0F172A] leading-snug">
            Commercial Paper & Fixed Income Transparency Board
          </div>
          <p className="font-sourceserif text-[12px] text-[#64748b] mt-1.5 leading-relaxed">
            Real-time quoted yield curves for prime non-bank corporate issuers in Nigeria.
          </p>
        </div>
        <a
          href="#market-access"
          onClick={(e) => e.preventDefault()}
          className="block w-full text-center bg-[#0F172A] text-white py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-[#1E3A8A] transition-colors"
        >
          EXPLORE YIELD METRICS
        </a>
      </aside>
    );
  }

  if (variant === 'inline-sponsored') {
    return (
      <aside
        id="ad-placement-inline-sponsored"
        aria-label="Sponsored Intelligence"
        className={`border border-[#cbd5e1] bg-[#fdfbf7] p-4 my-6 space-y-2 ${className}`}
      >
        <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#78716c] uppercase font-bold">
          <span>SPONSORED INTELLIGENCE // {sponsorName.toUpperCase()}</span>
          <span>PARTNER INSIGHT</span>
        </div>
        <div className="font-newsreader text-[15px] font-medium text-[#1c1917]">
          Institutional Treasury Liquidity & Settlement Optimization
        </div>
        <p className="font-sourceserif text-[13px] text-[#44403c] leading-relaxed">
          How commercial conglomerates and family offices mitigate overnight interbank counterparty exposure during monetary policy recalibrations.
        </p>
        <div className="pt-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#a8a29e]">VERIFIED CORPORATE PARTNER CONTENT</span>
          <a
            href="#partner-analysis"
            onClick={(e) => e.preventDefault()}
            className="text-[#1E3A8A] font-bold hover:underline flex items-center space-x-1"
          >
            <span>READ WHITE PAPER</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>
    );
  }

  // variant === 'lower-homepage'
  return (
    <aside
      id="ad-placement-lower-homepage"
      aria-label="Advertisement"
      className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 ${className}`}
    >
      <div className="border border-[#e2e8f0] bg-white p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase font-bold">
            <span>ADVERTISEMENT</span>
            <span>•</span>
            <span>AFRICA EXPORT-IMPORT BANK (AFREXIMBANK)</span>
          </div>
          <h3 className="font-newsreader text-[18px] font-semibold text-[#0F172A]">
            Pan-African Payment and Settlement System (PAPSS)
          </h3>
          <p className="font-sourceserif text-[13px] text-[#64748b] max-w-2xl">
            Accelerating intra-African cross-border trade settlements in local domestic currencies. Eliminate third-party dollar conversions.
          </p>
        </div>

        <a
          href="#papss-portal"
          onClick={(e) => e.preventDefault()}
          className="bg-[#0F172A] text-white px-4 py-2 text-[11px] font-mono font-bold tracking-wider uppercase hover:bg-[#1E3A8A] transition-colors shrink-0 cursor-pointer"
        >
          INSTITUTIONAL ONBOARDING
        </a>
      </div>
    </aside>
  );
}
