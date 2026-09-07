import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, Activity, RefreshCw, CheckCircle2, AlertTriangle, Database, Cpu, Radio, Shield } from 'lucide-react';

interface AdminOperationsPageProps {
  onBackToBriefing: () => void;
}

export function AdminOperationsPage({ onBackToBriefing }: AdminOperationsPageProps) {
  const [activeTab, setActiveTab] = useState<'sources' | 'freshness' | 'ads' | 'system'>('sources');

  const sources = [
    { name: 'Central Bank of Nigeria (CBN)', type: 'REGULATORY RSS', lastCrawl: '4m ago', status: 'HEALTHY', latency: '420ms', failures: 0, enabled: true },
    { name: 'Punch Newspapers', type: 'WEB SCRAPE', lastCrawl: '8m ago', status: 'HEALTHY', latency: '680ms', failures: 0, enabled: true },
    { name: 'BusinessDay Nigeria', type: 'ATOM FEED', lastCrawl: '12m ago', status: 'HEALTHY', latency: '510ms', failures: 0, enabled: true },
    { name: 'Nigerian Electricity Regulatory Commission', type: 'SITEMAP', lastCrawl: '22m ago', status: 'HEALTHY', latency: '890ms', failures: 0, enabled: true },
    { name: 'Premium Times Nigeria', type: 'RSS FEED', lastCrawl: '15m ago', status: 'HEALTHY', latency: '340ms', failures: 0, enabled: true },
    { name: 'OPEC Media Secretariat', type: 'WEB API', lastCrawl: '35m ago', status: 'STALE (45m)', latency: '1.2s', failures: 1, enabled: true },
  ];

  const adSlots = [
    { slot: 'TOP_LEADERBOARD', sponsor: 'Stanbic IBTC Bank Plc', type: 'DIRECT SPONSOR', ctr: '1.84%', impressions: '142,800', status: 'ACTIVE' },
    { slot: 'SECTION_DIVIDER_MID', sponsor: 'Google AdSense (Responsive)', type: 'PROGRAMMATIC', ctr: '0.92%', impressions: '98,400', status: 'ACTIVE' },
    { slot: 'RIGHT_RAIL_DESKTOP', sponsor: 'Africa Finance Corporation', type: 'DIRECT SPONSOR', ctr: '2.14%', impressions: '76,200', status: 'ACTIVE' },
    { slot: 'LOWER_HOMEPAGE', sponsor: 'House of Tara International', type: 'DIRECT SPONSOR', ctr: '1.45%', impressions: '54,000', status: 'ACTIVE' },
    { slot: 'DOSSIER_DETAIL_BREAK', sponsor: 'FBNQuest Merchant Bank', type: 'DIRECT CAMPAIGN', ctr: '2.80%', impressions: '38,900', status: 'ACTIVE' },
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
            INTERNAL OPERATIONAL TELEMETRY // RESTRICTED CONSOLE
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#0F172A] uppercase font-bold mb-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>PAPERLY SYSTEM OPERATIONS & CRAWL HEALTH</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Engineering & Ingestion Operations
        </h1>
        <p className="font-inter text-xs sm:text-sm text-[#45464d] max-w-3xl">
          Internal management surface monitoring multi-source RSS/ATOM/API ingest health, triangulation queue depth, AI synthesis readiness, and commercial ad inventory.
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[#f1f5f9]">
          {[
            { id: 'sources', label: 'SOURCE HEALTH & CRAWLERS' },
            { id: 'freshness', label: 'FRESHNESS & QUEUE LAG' },
            { id: 'ads', label: 'AD INVENTORY & CAMPAIGNS' },
            { id: 'system', label: 'SYSTEM TELEMETRY' },
          ].map((t) => {
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`text-xs font-mono font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Console Content */}
      <div className="space-y-6 mb-12">
        
        {/* 1. SOURCES */}
        {activeTab === 'sources' && (
          <div className="border border-[#e2e8f0] bg-white">
            <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <div className="text-xs font-mono font-bold text-[#0F172A] uppercase">
                ACTIVE INGESTION CRAWLERS (42 TOTAL CONFIGURED)
              </div>
              <button className="flex items-center space-x-1 text-xs font-mono text-[#1E3A8A] font-bold">
                <RefreshCw className="w-3 h-3" />
                <span>POLL NOW</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[10px] text-[#64748b] uppercase">
                  <tr>
                    <th className="p-3">SOURCE NAME</th>
                    <th className="p-3">INGEST PROTOCOL</th>
                    <th className="p-3">LAST CRAWL</th>
                    <th className="p-3">LATENCY</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {sources.map((src, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc]">
                      <td className="p-3 font-bold text-[#0F172A]">{src.name}</td>
                      <td className="p-3 text-[#64748b]">{src.type}</td>
                      <td className="p-3 text-[#45464d]">{src.lastCrawl}</td>
                      <td className="p-3 text-[#45464d]">{src.latency}</td>
                      <td className="p-3">
                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                            src.status.includes('HEALTHY')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {src.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-[10px] font-bold text-[#1E3A8A] hover:underline">
                          TEST INGEST
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. FRESHNESS */}
        {activeTab === 'freshness' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 border border-[#e2e8f0] bg-white">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] mb-1">
                DISCOVERY TO CLUSTER LAG
              </div>
              <div className="text-2xl font-bold font-mono text-[#0F172A]">
                1.4 MINUTES
              </div>
              <div className="text-xs text-[#15803d] font-mono mt-1">
                Within target SLAs (&lt; 3.0m)
              </div>
            </div>

            <div className="p-5 border border-[#e2e8f0] bg-white">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] mb-1">
                READY_FOR_AI SYNTHESIS QUEUE
              </div>
              <div className="text-2xl font-bold font-mono text-[#0F172A]">
                2 DEVELOPMENTS
              </div>
              <div className="text-xs text-[#64748b] font-mono mt-1">
                Processing via Gemini 2.5 Flash
              </div>
            </div>

            <div className="p-5 border border-[#e2e8f0] bg-white">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] mb-1">
                PUBLICATION THROUGHPUT
              </div>
              <div className="text-2xl font-bold font-mono text-[#0F172A]">
                18 DOSSIERS / 24H
              </div>
              <div className="text-xs text-[#15803d] font-mono mt-1">
                100% human editorial verification
              </div>
            </div>
          </div>
        )}

        {/* 3. AD INVENTORY */}
        {activeTab === 'ads' && (
          <div className="border border-[#e2e8f0] bg-white">
            <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <div className="text-xs font-mono font-bold text-[#0F172A] uppercase">
                ACTIVE COMMERCIAL INVENTORY PLACEMENTS
              </div>
              <span className="text-xs font-mono text-[#15803d] font-semibold">
                ALL 5 CORE SLOTS OCCUPIED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[10px] text-[#64748b] uppercase">
                  <tr>
                    <th className="p-3">SLOT NAME</th>
                    <th className="p-3">SPONSOR / ADVERTISER</th>
                    <th className="p-3">INVENTORY TYPE</th>
                    <th className="p-3">IMPRESSIONS</th>
                    <th className="p-3">CTR</th>
                    <th className="p-3">STATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {adSlots.map((ad, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc]">
                      <td className="p-3 font-bold text-[#0F172A]">{ad.slot}</td>
                      <td className="p-3 text-[#1E3A8A] font-semibold">{ad.sponsor}</td>
                      <td className="p-3 text-[#64748b]">{ad.type}</td>
                      <td className="p-3 text-[#45464d]">{ad.impressions}</td>
                      <td className="p-3 text-[#45464d]">{ad.ctr}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 text-[9px] font-bold">
                          {ad.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SYSTEM TELEMETRY */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-[#e2e8f0] bg-white space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#0F172A] pb-2 border-b border-[#f1f5f9]">
                CORE INFRASTRUCTURE
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">INGRESS PROXY:</span>
                <span className="font-bold text-[#0F172A]">Cloud Run Container (Port 3000)</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">EDGE REGIONS:</span>
                <span className="font-bold text-[#0F172A]">Lagos (LOS-1), London (LHR), New York (JFK)</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">SSL & PROTOCOL:</span>
                <span className="font-bold text-emerald-700">TLS 1.3 / HTTP/2 Active</span>
              </div>
            </div>

            <div className="p-5 border border-[#e2e8f0] bg-white space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#0F172A] pb-2 border-b border-[#f1f5f9]">
                EDITORIAL INTEGRITY CHECKS
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">MINIMUM SOURCE QUORUM:</span>
                <span className="font-bold text-[#0F172A]">3 Verified Independent Sources</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">CONFIDENCE THRESHOLD:</span>
                <span className="font-bold text-[#0F172A]">85.0% for Lead Briefing</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">ANONYMIZED AUDIT LOG:</span>
                <span className="font-bold text-emerald-700">SHA-256 Ledger Verified</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
