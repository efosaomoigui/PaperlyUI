interface SponsorBannerProps {
  onRequestDossier: () => void;
}

export function SponsorBanner({ onRequestDossier }: SponsorBannerProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="border border-[#cbd5e1] bg-[#f4f4f2] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Sponsor Identity */}
        <div className="md:w-1/3">
          <div className="text-[9px] font-mono tracking-widest uppercase text-[#76777d] mb-1">
            INSTITUTIONAL SPONSORSHIP
          </div>
          <div className="font-newsreader text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-tight">
            Lombard Odier · Global Sovereign Debt Transition Forum
          </div>
        </div>

        {/* Narrative Description */}
        <div className="md:w-1/2 font-sourceserif text-[13px] leading-[1.5] text-[#45464d]">
          High-level delegation examining Sub-Saharan African debt re-profiling, climate adaptation green bonds, and multi-currency synthetic guarantees. Geneva &amp; Virtual.
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-end md:self-center shrink-0">
          <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#76777d]">
            ACCREDITED ACCESS ONLY
          </span>
          <button
            id="btn-request-sponsor-dossier"
            onClick={onRequestDossier}
            className="bg-[#0F172A] text-white px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-[#1E3A8A] transition-colors cursor-pointer"
          >
            REQUEST DOSSIER
          </button>
        </div>

      </div>
    </div>
  );
}
