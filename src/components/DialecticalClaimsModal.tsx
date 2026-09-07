import { X, Scale, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';

interface DialecticalClaimsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DialecticalClaimsModal({ isOpen, onClose }: DialecticalClaimsModalProps) {
  if (!isOpen) return null;

  const claims = [
    {
      id: 1,
      source: 'Federal Ministry of Education (Abuja)',
      actorGroup: 'Government',
      claim: 'Biometric verification portal enforces 100% merit-based queue processing with zero discretionary ministerial approvals.',
      corroboration: 'Corroborated by NIBSS clearing logs & JAMB Central Registry.',
      confidence: '98%',
      status: 'VERIFIED',
    },
    {
      id: 2,
      source: 'NELFUND Technical Operations',
      actorGroup: 'Government',
      claim: 'Asymmetry in early disbursements reflects tertiary institutions registrar upload speeds rather than state-level favoritism.',
      corroboration: 'Verified: South-West & North-West universities completed 86% of electronic matriculation uploads by Day 12.',
      confidence: '94%',
      status: 'VERIFIED',
    },
    {
      id: 3,
      source: 'ASUU National Executive Council',
      actorGroup: 'Union & Faculty',
      claim: 'Loan fund introduction serves as fiscal cover for universities to raise institutional fees beyond indigent household means.',
      corroboration: 'Substantiated: 42 federal universities raised departmental and facility charges by an average of 165%.',
      confidence: '92%',
      status: 'SUBSTANTIATED',
    },
    {
      id: 4,
      source: 'National Association of Nigerian Students (NANS)',
      actorGroup: 'Student Body',
      claim: 'Rural campuses experience up to 48-hour network latency during biometric facial capture and NIN cross-referencing.',
      corroboration: 'Confirmed: 18 satellite campuses reported server timeout rates exceeding 35%.',
      confidence: '89%',
      status: 'TECHNICAL FRICTION',
    },
    {
      id: 5,
      source: 'BudgIT & Center for Fiscal Transparency',
      actorGroup: 'Civil Society',
      claim: '₦150bn initial tranche requires continuous open-data telemetry per LGA to avert historical UBEC-style misappropriation.',
      corroboration: 'Independent audit recommendations submitted to National Assembly Public Accounts Committee.',
      confidence: '96%',
      status: 'AUDIT ADVISORY',
    },
    {
      id: 6,
      source: 'Nigeria Inter-Bank Settlement System (NIBSS)',
      actorGroup: 'Financial Clearing',
      claim: 'All ₦20,000 monthly student stipends are directly routed into tier-1 accounts without state ministry intermediaries.',
      corroboration: 'Direct cryptographic trace confirms zero middleman transaction ledger hops.',
      confidence: '99%',
      status: 'VERIFIED',
    },
    {
      id: 7,
      source: 'House Committee on Tertiary Education',
      actorGroup: 'Legislative Oversight',
      claim: 'Polytechnics and Colleges of Education must be fully onboarded into tranche 2 before budget review cycle closes.',
      corroboration: 'Scheduled hearing set for Tuesday 10:00 UTC at the National Assembly complex.',
      confidence: '95%',
      status: 'LEGISLATIVE AGENDA',
    },
    {
      id: 8,
      source: 'World Bank Education Global Practice (West Africa)',
      actorGroup: 'Multilateral Observer',
      claim: 'Income-contingent loan viability requires formal post-NYSC tax documentation to achieve long-term capital replenishment.',
      corroboration: 'Comparative policy brief referencing Ghanaian and South African recovery models.',
      confidence: '91%',
      status: 'MACRO ASSESSMENT',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[8px_8px_0px_0px_#0F172A] max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-[#cbd5e1]" />
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-white">
              DIALECTICAL VERIFICATION MATRIX // 8 TRIANGULATED CLAIMS
            </span>
          </div>
          <button
            id="btn-close-claims-modal"
            onClick={onClose}
            className="p-1 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheading */}
        <div className="bg-[#f4f4f2] border-b border-[#cbd5e1] px-5 py-3 text-[12px] font-sourceserif text-[#45464d]">
          Cross-institutional dialectic mapping rhetoric against cryptographic ledgers, institutional records, and independent third-party monitoring.
        </div>

        {/* Table of Claims */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {claims.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-white border border-[#cbd5e1] hover:border-[#0F172A] transition-colors space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#0F172A]">{c.source}</span>
                  <span className="text-[#cbd5e1]">•</span>
                  <span className="text-[#64748b]">{c.actorGroup}</span>
                </div>
                <span
                  className={`px-2 py-0.5 font-bold tracking-wider ${
                    c.status === 'VERIFIED'
                      ? 'bg-[#dcfce7] text-[#15803d]'
                      : c.status === 'SUBSTANTIATED'
                      ? 'bg-[#dbeafe] text-[#1E3A8A]'
                      : 'bg-[#fef3c7] text-[#92400e]'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <blockquote className="font-newsreader italic text-[15px] sm:text-[16px] text-[#0F172A] leading-snug">
                &ldquo;{c.claim}&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-2 text-[11px] font-sourceserif text-[#45464d]">
                <span>
                  <strong>Corroboration:</strong> {c.corroboration}
                </span>
                <span className="font-mono text-[10px] text-[#64748b]">
                  Confidence: {c.confidence}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-5 py-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#76777d]">
            Paperly Dialectical Framework v4.12
          </span>
          <button
            id="btn-close-claims-footer"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors text-[10px] font-mono font-bold tracking-widest uppercase cursor-pointer"
          >
            CLOSE MATRIX
          </button>
        </div>

      </div>
    </div>
  );
}
