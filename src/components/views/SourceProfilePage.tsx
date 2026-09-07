import { ArrowLeft, ShieldCheck, ExternalLink, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface SourceProfilePageProps {
  sourceName?: string;
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
}

export function SourceProfilePage({
  sourceName = 'Channels Television',
  onBackToBriefing,
  onOpenDossier,
}: SourceProfilePageProps) {
  const profile = {
    name: sourceName,
    type: 'BROADCAST & INVESTIGATIVE DIGITAL NEWSROOM',
    founded: '1995 (Lagos, Nigeria)',
    jurisdiction: 'National & Global African Desk',
    reliabilityScore: '96.2%',
    totalIndexed: '1,420 Verified Dispatches',
    recentDossier: BRIEFING_CAROUSEL_DOSSIERS[0],
    indexedReports: [
      {
        time: '35m ago',
        title: 'NELFUND Managing Director Addresses National Disbursement Parity on Sunrise Daily',
        category: 'GOVERNANCE & EDUCATION',
        verifiedFacts: '3 primary figures extracted into Paperly active dossier',
      },
      {
        time: '3 hours ago',
        title: 'Federal High Court Enjoins Electoral Commission on Disputed Constituency Reallocation',
        category: 'JUDICIARY & STATECRAFT',
        verifiedFacts: 'Court order certified copy referenced in legal radar',
      },
      {
        time: 'Yesterday',
        title: 'Central Bank Commercial Bank Liquidity Mopping Operations at 27.25% Stop Rate',
        category: 'MACROECONOMICS & FX',
        verifiedFacts: 'Turnover volume confirmed against FMDQ electronic blotter',
      },
    ],
  };

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
            SOURCE PROVENANCE REGISTRY // VERIFIED INDEX
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#15803d] uppercase font-bold mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
          <span>VERIFIED INDEPENDENT SOURCE RECORD</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          {profile.name}
        </h1>
        <p className="font-inter text-sm text-[#45464d] max-w-3xl leading-relaxed">
          Indexed continuously by Paperly’s ingestion crawlers. Subject to automated fact-extraction cross-referencing and editorial source consensus modeling.
        </p>

        {/* Source Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#f1f5f9]">
          <div className="p-3 bg-white border border-[#e2e8f0]">
            <div className="text-[10px] font-mono text-[#64748b] uppercase">RELIABILITY INDEX</div>
            <div className="text-lg font-bold font-mono text-[#15803d] mt-0.5">{profile.reliabilityScore}</div>
          </div>
          <div className="p-3 bg-white border border-[#e2e8f0]">
            <div className="text-[10px] font-mono text-[#64748b] uppercase">TOTAL INDEXED</div>
            <div className="text-lg font-bold font-mono text-[#0F172A] mt-0.5">{profile.totalIndexed}</div>
          </div>
          <div className="p-3 bg-white border border-[#e2e8f0]">
            <div className="text-[10px] font-mono text-[#64748b] uppercase">JURISDICTION</div>
            <div className="text-xs font-bold font-inter text-[#0F172A] mt-1">{profile.jurisdiction}</div>
          </div>
          <div className="p-3 bg-white border border-[#e2e8f0]">
            <div className="text-[10px] font-mono text-[#64748b] uppercase">CRAWL FREQUENCY</div>
            <div className="text-xs font-bold font-mono text-[#1E3A8A] mt-1">Every 5 Minutes</div>
          </div>
        </div>
      </div>

      {/* Grid: Indexed Reports + Active Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left 8 Cols: Indexed Reports */}
        <div className="lg:col-span-8 space-y-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            RECENT DISPATCHES EXTRACTED & TRIANGULATED
          </div>

          <div className="space-y-4">
            {profile.indexedReports.map((rep, idx) => (
              <div key={idx} className="p-4 border border-[#e2e8f0] bg-white space-y-2">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#64748b]">
                  <span className="font-bold text-[#0F172A]">{rep.time}</span>
                  <span>•</span>
                  <span className="text-[#1E3A8A] font-semibold">{rep.category}</span>
                </div>
                <h3 className="font-newsreader text-lg font-bold text-[#0F172A]">
                  {rep.title}
                </h3>
                <div className="flex items-center space-x-1.5 text-xs text-[#15803d] font-inter">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{rep.verifiedFacts}</span>
                </div>
              </div>
            ))}
          </div>

          <AdPlacement variant="category-inline" />
        </div>

        {/* Right 4 Cols: Active Dossiers Supported */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-[#0F172A] p-5 bg-white space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#f1f5f9]">
              PRIMARY ACTIVE DOSSIER CONTRIBUTION
            </div>
            <div className="text-xs font-mono text-[#DC2626] font-bold">
              {profile.recentDossier.status}
            </div>
            <h4 className="font-newsreader text-base font-bold text-[#0F172A] leading-snug">
              {profile.recentDossier.headline}
            </h4>
            <button
              onClick={() => onOpenDossier(profile.recentDossier)}
              className="text-xs font-inter font-bold tracking-wider uppercase text-[#1E3A8A] hover:underline flex items-center space-x-1 mt-2"
            >
              <span>INSPECT COMPLETE DOSSIER</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <AdPlacement variant="right-rail" />
        </div>

      </div>

    </div>
  );
}
