import { useState } from 'react';
import { ArrowLeft, Play, Clock, ShieldCheck, ArrowRight, Video } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface VideoPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
}

interface VideoReport {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  source: string;
  published: string;
  category: string;
  context: string;
  whyThisMatters: string;
  dossierId: string;
}

const VIDEO_REPORTS: VideoReport[] = [
  {
    id: 'vid-1',
    title: 'Executive Managing Director Akintunde Sawyerr on NELFUND Regional Loan Disbursal Parity',
    thumbnail: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    duration: '08:45',
    source: 'Channels Television Special Briefing',
    published: '35m ago',
    category: 'POLICY & INSTITUTIONS',
    context: 'Detailed breakdown of state-by-state verification submissions and the IT infrastructure connecting university bursaries directly to the CBN single account.',
    whyThisMatters: 'Demonstrates biometric verification throughput ahead of imminent tuition deadlines for over 640,000 low-income matriculants.',
    dossierId: 'dossier-nelfund-01',
  },
  {
    id: 'vid-2',
    title: 'Central Bank Deputy Governor Addresses Inter-Bank NAFEM Order Matching & Reserve Floor',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    duration: '14:20',
    source: 'Arise News Global Business Report',
    published: '2 hours ago',
    category: 'MACROECONOMICS & FX',
    context: 'Explains the elimination of administrative pegging, commercial bank forward settlement discipline, and sovereign reserve buffering.',
    whyThisMatters: 'Critical for corporate CFOs establishing quarterly forward pricing and raw material import inventory replenishment.',
    dossierId: 'dossier-cbn-fx-02',
  },
  {
    id: 'vid-3',
    title: 'NERC Regulatory Hearing: DisCo Compliance Audits on Multi-Tier Feeder Supply Hours',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    duration: '11:10',
    source: 'NTA Parliamentary Broadcast',
    published: '4 hours ago',
    category: 'INFRASTRUCTURE & ENERGY',
    context: 'Evidence presentation examining substation injection logs where Band A feeders failed the contractual 20-hour threshold.',
    whyThisMatters: 'Direct legal basis for enterprise customer refunds and feeder classification downgrades under federal regulatory penalties.',
    dossierId: 'dossier-nelfund-01',
  },
  {
    id: 'vid-4',
    title: 'Refinery Technical Walkthrough: Bonny Light Feedstock Fractionation & Domestic Fuel Logistics',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    duration: '18:50',
    source: 'CNBC Africa Energy Pulse',
    published: 'Yesterday',
    category: 'COMMODITIES & ENERGY',
    context: 'Engineering review of distillation columns and the domestic naira-for-crude maritime loading terminals in Lekki.',
    whyThisMatters: 'Validates real-world domestic supply capacity to reduce sovereign dependence on imported European refined fuels.',
    dossierId: 'dossier-opec-oil-03',
  },
];

export function VideoPage({
  onBackToBriefing,
  onOpenDossier,
}: VideoPageProps) {
  const [activeVideo, setActiveVideo] = useState<VideoReport>(VIDEO_REPORTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

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
            VISUAL EVIDENCE & TESTIMONY // PROTOCOL 09
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#DC2626] uppercase font-bold mb-1">
          <Video className="w-3.5 h-3.5 text-[#DC2626]" />
          <span>SUBSTANTIVE VISUAL INTELLIGENCE</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Video Intelligence: Official Testimony & Evidence
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Visual documentation that supports comprehension. Unedited regulatory hearings, key executive interviews, and forensic technical walk-throughs curated for verifiable facts.
        </p>
      </div>

      {/* Featured Main Video Player Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left 8 Cols: Active Video Frame */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-16/9 bg-[#0F172A] border border-[#cbd5e1] overflow-hidden group">
            <img
              src={activeVideo.thumbnail}
              alt={activeVideo.title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-white/95 hover:bg-white text-[#0F172A] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </button>
            </div>

            {/* Video Meta Badges */}
            <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-xs text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider">
              {activeVideo.category}
            </div>
            <div className="absolute bottom-3 right-3 bg-[#0F172A]/90 backdrop-blur-xs text-white px-2.5 py-1 text-[10px] font-mono">
              {activeVideo.duration}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#64748b] mb-1">
              <span className="font-bold text-[#0F172A]">{activeVideo.source}</span>
              <span>•</span>
              <span>PUBLISHED {activeVideo.published}</span>
            </div>
            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A] leading-snug mb-3">
              {activeVideo.title}
            </h2>

            {/* Context and Why This Matters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#f8fafc] border border-[#e2e8f0]">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#0F172A] font-bold mb-1">
                  CONTEXT
                </div>
                <p className="text-xs font-inter text-[#45464d] leading-relaxed">
                  {activeVideo.context}
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-bold mb-1">
                  WHY THIS MATTERS
                </div>
                <p className="text-xs font-inter text-[#334155] leading-relaxed">
                  {activeVideo.whyThisMatters}
                </p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() => onOpenDossier(BRIEFING_CAROUSEL_DOSSIERS[0])}
                className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] hover:text-[#0F172A] flex items-center space-x-1 cursor-pointer"
              >
                <span>OPEN LINKED PAPERLY INTELLIGENCE DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-[#94a3b8]">TRANSCRIPT INDEXED</span>
            </div>
          </div>

          <AdPlacement variant="category-inline" />
        </div>

        {/* Right 4 Cols: Video Playlist Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0F172A] pb-2 border-b border-[#e2e8f0]">
            CURATED VIDEO INTELLIGENCE
          </div>

          <div className="space-y-3">
            {VIDEO_REPORTS.map((vid) => {
              const isSelected = activeVideo.id === vid.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className={`p-3 border transition-all cursor-pointer bg-white ${
                    isSelected ? 'border-[#0F172A] bg-[#f8fafc]' : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative w-24 h-16 bg-[#0F172A] shrink-0 overflow-hidden">
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] font-mono px-1">
                        {vid.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-mono text-[#1E3A8A] font-semibold uppercase truncate">
                        {vid.source}
                      </div>
                      <h4 className="font-inter text-xs font-bold text-[#1a1c1b] leading-tight line-clamp-2 mt-0.5">
                        {vid.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <AdPlacement variant="right-rail" />
        </div>

      </div>

    </div>
  );
}
