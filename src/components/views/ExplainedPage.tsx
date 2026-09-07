import { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, ArrowRight, HelpCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { IntelligenceDossier } from '../../types';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface ExplainedPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
}

interface ExplainerItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyFacts: string[];
  mechanics: { step: string; detail: string }[];
  implication: string;
  dossierId: string;
}

const EXPLAINER_ITEMS: ExplainerItem[] = [
  {
    id: 'exp-1',
    title: 'How Nigeria’s Student Loan (NELFUND) System Actually Works',
    category: 'PUBLIC POLICY & EDUCATION',
    readTime: '6 MIN DEEP DIVE',
    summary: 'A step-by-step breakdown of the biometric authentication, institutional verification protocol, direct treasury disbursement, and post-NYSC recovery framework.',
    keyFacts: [
      'Disbursements flow directly from the Central Bank escrow to university bursaries, bypassing student bank accounts for tuition components.',
      'A monthly ₦20,000 upkeep stipend is credited directly to the student’s authenticated BVN-linked personal account.',
      'Repayment commences exactly two years after completion of the compulsory National Youth Service Corps (NYSC).',
      'Deduction is capped at 10% of beneficiary gross salary via employer PAYE systems.',
    ],
    mechanics: [
      { step: '01. Identity Validation', detail: 'Applicant cross-references JAMB registration number, National Identification Number (NIN), and Bank Verification Number (BVN).' },
      { step: '02. Campus Registrar Clearance', detail: 'The candidate’s university registrar verifies active academic enrollment and uploads approved session fee schedule.' },
      { step: '03. Treasury Batch Settlement', detail: 'NELFUND executes electronic single-treasury account transfer directly to the institution’s verified Remita or CBN gateway.' },
      { step: '04. Post-Graduation Recovery', detail: 'Repayment tracking is automated through the Federal Inland Revenue Service (FIRS) and credit bureau networks.' },
    ],
    implication: 'Shifts tertiary financing from discretionary household cash reserves to structured sovereign student credit, testing whether state universities can maintain institutional operational funding.',
    dossierId: 'dossier-nelfund-01',
  },
  {
    id: 'exp-2',
    title: 'Why Foreign Exchange Liquidity Matters & What Drives the NAFEM Spread',
    category: 'MACROECONOMICS & FINANCIAL ARCHITECTURE',
    readTime: '8 MIN DEEP DIVE',
    summary: 'Understanding the mechanics behind autonomous market price discovery, parallel market premiums, central bank dollar sales, and enterprise trade finance.',
    keyFacts: [
      'The Nigerian Autonomous Foreign Exchange Market (NAFEM) operates on an electronic order book model reflecting willing buyer/willing seller dynamics.',
      'The parallel market rate reflects non-bank demand, informal cross-border trade settlements, and cash-in-hand transactions.',
      'When the spread between NAFEM and parallel exceeds 5%, round-tripping arbitrage incentives re-emerge.',
      'Gross foreign reserves include sovereign petrodollar inflows, foreign portfolio investment (FPI), and diaspora remittances.',
    ],
    mechanics: [
      { step: '01. Exporter Window Inflows', detail: 'Non-oil exporters and oil majors sell dollar proceeds into authorized dealer bank pools.' },
      { step: '02. CBN Liquidity Interventions', detail: 'The monetary authority sells targeted tranches to meet retail bureau and corporate trade demand.' },
      { step: '03. Daily Fixing & Convergence', detail: 'Weighted average transaction rates establish the sovereign benchmark for commercial letters of credit.' },
    ],
    implication: 'Determines the landed replacement cost of imported machinery, fuel, pharmaceuticals, and raw industrial chemicals across the real sector.',
    dossierId: 'dossier-cbn-fx-02',
  },
  {
    id: 'exp-3',
    title: 'How Multi-Tier (Band A) Electricity Tariffs Are Calculated',
    category: 'INFRASTRUCTURE & UTILITIES',
    readTime: '7 MIN DEEP DIVE',
    summary: 'Deconstructing the Multi-Year Tariff Order (MYTO): gas-to-power generation pricing, transmission wheeling loss, DisCo distribution margins, and feeder metering audits.',
    keyFacts: [
      'Band A customers receive a minimum contractual supply of 20 hours daily power.',
      'Tariff calculations factor in natural gas commodity benchmarks ($2.42/MMBtu) and foreign exchange indexation.',
      'Feeders failing the 20-hour verified threshold over 48 consecutive hours are mandated to be downgraded to Band B by NERC.',
      'Subsidies are retained exclusively for lower tiers (Bands B through E) consuming under 16 hours daily.',
    ],
    mechanics: [
      { step: '01. Generation Cost Indexation', detail: 'GenCos bill based on natural gas transport and turbine dollar debt service obligations.' },
      { step: '02. Transmission Loss Allocation', detail: 'TCN wheeling fee covers national grid maintenance and frequency stabilization reserves.' },
      { step: '03. DisCo Feeder Monitoring', detail: 'Smart meters at substation injection points log continuous telemetry sent directly to NERC regulators.' },
    ],
    implication: 'Forces manufacturing plants and commercial clusters to weigh grid power tariffs against self-generated industrial diesel generator economics.',
    dossierId: 'dossier-nelfund-01',
  },
];

export function ExplainedPage({
  onBackToBriefing,
  onOpenDossier,
}: ExplainedPageProps) {
  const [expandedId, setExpandedId] = useState<string>('exp-1');

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
            SLOW INTELLIGENCE ARCHIVE // PROTOCOL 07
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#1E3A8A] uppercase font-bold mb-1">
          <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A]" />
          <span>STRUCTURAL MECHANICS & CONTEXT</span>
        </div>

        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
          Explained: Deep Context for Complex Systems
        </h1>
        <p className="font-newsreader text-base sm:text-lg text-[#45464d] italic max-w-3xl">
          When breaking headlines only tell half the story. Paperly Explainers dissect foundational macroeconomic mechanisms, regulatory formulas, and legal frameworks so you understand how the system functions.
        </p>
      </div>

      {/* Explainer List */}
      <div className="space-y-6 mb-10">
        {EXPLAINER_ITEMS.map((item) => {
          const isExpanded = expandedId === item.id;
          const matchedDossier =
            BRIEFING_CAROUSEL_DOSSIERS.find((d) => d.id === item.dossierId) ||
            BRIEFING_CAROUSEL_DOSSIERS[0];

          return (
            <article
              key={item.id}
              className="border border-[#e2e8f0] bg-white transition-all overflow-hidden"
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="p-6 cursor-pointer hover:bg-[#f8fafc] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
              >
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#64748b] uppercase tracking-wider mb-1.5">
                    <span className="font-bold text-[#1E3A8A]">{item.category}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h2 className="font-newsreader text-2xl font-bold text-[#0F172A]">
                    {item.title}
                  </h2>
                  <p className="font-inter text-xs sm:text-sm text-[#45464d] mt-1 max-w-3xl">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-[#64748b] self-end md:self-center shrink-0">
                  <span>{isExpanded ? 'COLLAPSE' : 'EXPAND EXPLAINER'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded Deep Dive Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-[#f1f5f9] space-y-6">
                  
                  {/* Verified Key Facts */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#0F172A] font-bold mb-3">
                      KEY STRUCTURAL FACTS
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.keyFacts.map((fact, idx) => (
                        <div key={idx} className="p-3 bg-[#f8fafc] border-l-2 border-[#1E3A8A] text-xs font-inter text-[#334155] leading-relaxed">
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Mechanics */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#0F172A] font-bold mb-3">
                      OPERATIONAL MECHANICS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.mechanics.map((m, idx) => (
                        <div key={idx} className="border border-[#e2e8f0] p-3 bg-white">
                          <div className="font-mono text-[11px] font-bold text-[#1E3A8A] mb-1">
                            {m.step}
                          </div>
                          <p className="text-xs font-inter text-[#45464d] leading-relaxed">
                            {m.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Macro Implication */}
                  <div className="p-4 bg-[#0F172A] text-white">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold mb-1">
                      BOTTOM LINE MACRO IMPLICATION
                    </div>
                    <p className="font-newsreader text-base text-slate-100 italic leading-relaxed">
                      "{item.implication}"
                    </p>
                  </div>

                  {/* Connect to Underlying Active Dossier */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onOpenDossier(matchedDossier)}
                      className="text-xs font-bold font-inter tracking-wider uppercase text-[#1E3A8A] hover:text-[#0F172A] flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>VIEW ACTIVE REAL-TIME DOSSIER FOR THIS TOPIC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono text-[#94a3b8]">PEER REVIEWED METHODOLOGY</span>
                  </div>

                </div>
              )}
            </article>
          );
        })}

        <AdPlacement variant="section-divider" />
      </div>

    </div>
  );
}
