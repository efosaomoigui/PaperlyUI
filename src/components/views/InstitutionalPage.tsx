import { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, ArrowRight, Layers, Lock, Mail, FileText } from 'lucide-react';
import { AdPlacement } from '../AdPlacement';

interface InstitutionalPageProps {
  initialTab?: 'how-it-works' | 'about' | 'principles' | 'advertise' | 'contact' | 'terms';
  onBackToBriefing: () => void;
}

export function InstitutionalPage({
  initialTab = 'how-it-works',
  onBackToBriefing,
}: InstitutionalPageProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'how-it-works', label: 'HOW PAPERLY WORKS' },
    { id: 'principles', label: 'EDITORIAL PRINCIPLES' },
    { id: 'about', label: 'ABOUT PAPERLY' },
    { id: 'advertise', label: 'ADVERTISE & COMMERCIAL' },
    { id: 'contact', label: 'CONTACT & INQUIRIES' },
    { id: 'terms', label: 'LEGAL & PRIVACY' },
  ];

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
            INSTITUTIONAL CHARTER // PAPERLY PROTOCOL
          </div>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Institutional Governance & Methodology
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          Paperly exists to help institutional decision-makers, executives, and citizens make sense of what is happening through transparent, evidence-led computational synthesis.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-3 border-t border-[#f1f5f9]">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-inter font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-4xl space-y-8 mb-12">
        
        {/* 1. HOW PAPERLY WORKS */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-1">
                SYNTHESIS ENGINE ARCHITECTURE
              </div>
              <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A]">
                The Paperly Intelligence Triangulation Lifecycle
              </h2>
              <p className="font-inter text-sm text-[#45464d] mt-2 leading-relaxed">
                Conventional journalism produces articles. Paperly continuously ingests, clusters, and cross-references sovereign source documents, verified reporting, and official registries to produce dynamic, evolving intelligence dossiers.
              </p>
            </div>

            {/* Methodology Flow Pipeline */}
            <div className="border border-[#e2e8f0] p-6 bg-white space-y-6">
              {[
                {
                  step: 'STAGE 01',
                  title: 'Ingestion from Multiple Independent Sources',
                  desc: 'Over 40+ verified feeds, regulatory gazettes (CBN, NERC, FIRS), and independent media streams (Punch, BusinessDay, Premium Times, Reuters) are ingested continuously via automated, monitored crawlers.',
                },
                {
                  step: 'STAGE 02',
                  title: 'Development Clustering & Deduplication',
                  desc: 'Dispatches addressing identical factual real-world events are clustered into an active development node, filtering out sensationalist variations and redundant wires.',
                },
                {
                  step: 'STAGE 03',
                  title: 'Cross-Verification & Dialectical Mapping',
                  desc: 'Every factual assertion is evaluated across sources. Mutually verified facts are separated from unverified claims and partisan rhetoric.',
                },
                {
                  step: 'STAGE 04',
                  title: 'The Paperly Briefing Synthesis',
                  desc: 'The verified cluster is structured into: What Happened, Why It Matters, Who Is Affected, and Key Verified Facts.',
                },
                {
                  step: 'STAGE 05',
                  title: 'Consequence Modeling (Impact Watch)',
                  desc: 'Algorithms calculate the direct micro and macro consequences on household utility bills, enterprise working capital, import tariffs, and student matriculation.',
                },
                {
                  step: 'STAGE 06',
                  title: 'Continuous Surveillance & What To Watch',
                  desc: 'When new evidence or official audit data emerges, the dossier updates with a cryptographic timeline stamp, logging exactly what shifted.',
                },
              ].map((stage, idx) => (
                <div key={idx} className="flex items-start space-x-4 pb-4 border-b border-[#f1f5f9] last:border-b-0 last:pb-0">
                  <span className="font-mono text-xs font-bold px-2 py-1 bg-[#f1f5f9] text-[#0F172A] shrink-0">
                    {stage.step}
                  </span>
                  <div>
                    <h3 className="font-newsreader text-lg font-bold text-[#0F172A]">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed mt-1">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. EDITORIAL PRINCIPLES */}
        {activeTab === 'principles' && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Editorial & Intelligence Principles
            </h2>
            <div className="space-y-4">
              <div className="p-5 border-l-2 border-[#1E3A8A] bg-white border border-[#e2e8f0]">
                <h3 className="font-newsreader text-lg font-bold text-[#0F172A]">
                  1. Evidence-Led, Not Emotion-Led
                </h3>
                <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed mt-1">
                  We do not manufacture false balance. If the evidence conclusively contradicts an official statement or partisan rumor, we explicitly state what the empirical data proves and highlight remaining ambiguities.
                </p>
              </div>

              <div className="p-5 border-l-2 border-[#1E3A8A] bg-white border border-[#e2e8f0]">
                <h3 className="font-newsreader text-lg font-bold text-[#0F172A]">
                  2. Small Interface, Deep Intelligence
                </h3>
                <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed mt-1">
                  We respect the reader’s cognitive bandwidth. Every pixel, line rule, and typographical pairing exists to communicate meaning quickly without clickbait or algorithmic distraction.
                </p>
              </div>

              <div className="p-5 border-l-2 border-[#1E3A8A] bg-white border border-[#e2e8f0]">
                <h3 className="font-newsreader text-lg font-bold text-[#0F172A]">
                  3. Transparent Provenance & Triangulation
                </h3>
                <p className="text-xs sm:text-sm font-inter text-[#45464d] leading-relaxed mt-1">
                  Every intelligence dossier displays the exact number of sources triangulated, timestamps, confidence scores, and direct links to original reporting. Readers can inspect the primary evidence behind any conclusion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A]">
              About Paperly
            </h2>
            <div className="font-inter text-sm text-[#334155] leading-relaxed space-y-4">
              <p>
                Paperly is an editorial intelligence broadsheet designed for senior decision-makers, executives, economists, and engaged citizens across Africa and the global diaspora.
              </p>
              <p>
                In an era dominated by algorithmic echo chambers and fragmented breaking headlines, Paperly provides calm, authoritative, computational synthesis. We don’t merely tell you what happened—we explain what it means, why it matters, who is affected, and what to watch next.
              </p>
              <p>
                Headquartered in Lagos with telemetry desks monitoring London, New York, and Nairobi, Paperly combines broadsheet typography with institutional data rigor.
              </p>
            </div>
          </div>
        )}

        {/* 4. ADVERTISE */}
        {activeTab === 'advertise' && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Advertise with Paperly
            </h2>
            <p className="text-sm font-inter text-[#45464d] leading-relaxed">
              Paperly provides institutional partners, financial institutions, enterprise technology leaders, and blue-chip corporations with high-integrity advertising inventory.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#e2e8f0] bg-white">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-1">
                  PREMIUM PLACEMENTS
                </div>
                <h3 className="font-newsreader text-lg font-bold text-[#0F172A] mb-2">
                  Institutional Leaderboards & Rail
                </h3>
                <p className="text-xs font-inter text-[#64748b]">
                  Prominently positioned across our master homepage, desk briefings, and dossier headers. Reaches verified C-suite leaders and policy makers.
                </p>
              </div>

              <div className="p-4 border border-[#e2e8f0] bg-white">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-1">
                  INTEGRITY STANDARD
                </div>
                <h3 className="font-newsreader text-lg font-bold text-[#0F172A] mb-2">
                  The Critical Separation Rule
                </h3>
                <p className="text-xs font-inter text-[#64748b]">
                  Advertising never interrupts an intelligence answer. All commercial inventory sits strictly between complete editorial modules and is unmistakably labelled.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#f8fafc] border border-[#cbd5e1] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold font-inter text-[#0F172A]">
                  Ready to partner with Paperly?
                </div>
                <div className="text-xs text-[#64748b]">
                  Request our current media kit and institutional rate card.
                </div>
              </div>
              <button
                onClick={() => setActiveTab('contact')}
                className="text-xs font-bold font-inter tracking-wider uppercase bg-[#0F172A] text-white px-4 py-2 hover:bg-[#1E3A8A]"
              >
                CONTACT ADVERTISING DESK
              </button>
            </div>
          </div>
        )}

        {/* 5. CONTACT */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Contact & Editorial Inquiries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#e2e8f0] bg-white">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-1">
                  EDITORIAL & CORRECTIONS
                </div>
                <div className="text-sm font-bold text-[#0F172A] mt-1">
                  editorial@paperly.intelligence
                </div>
                <div className="text-xs text-[#64748b] mt-1">
                  For factual challenges, data verification, and dossier amendments.
                </div>
              </div>

              <div className="p-4 border border-[#e2e8f0] bg-white">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1E3A8A] font-bold mb-1">
                  COMMERCIAL & PARTNERSHIPS
                </div>
                <div className="text-sm font-bold text-[#0F172A] mt-1">
                  partnerships@paperly.intelligence
                </div>
                <div className="text-xs text-[#64748b] mt-1">
                  For institutional subscriptions, sponsorships, and API syndication.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. TERMS & PRIVACY */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Privacy Policy & Terms of Service
            </h2>
            <div className="font-inter text-xs sm:text-sm text-[#45464d] leading-relaxed space-y-3">
              <p>
                <strong>No Surveillance Tracking:</strong> Paperly does not deploy intrusive behavioral advertising trackers or sell personal browsing history to third-party data brokers.
              </p>
              <p>
                <strong>Local Storage for Personalisation:</strong> Your followed topics, active regional edition, and persona settings are preserved directly in your browser's local state.
              </p>
              <p>
                <strong>Copyright & Attribution:</strong> All original synthesis, consequence modeling, and dialectical dissections are proprietary to Paperly. Quoted sources remain property of their respective originating newsrooms and gazettes.
              </p>
            </div>
          </div>
        )}

        <AdPlacement variant="section-divider" />

      </div>

    </div>
  );
}
