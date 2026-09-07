import { X, Users, Building, Landmark, Scale } from 'lucide-react';
import { LEAD_DOSSIER } from '../data/mockData';

interface SectorModalProps {
  sectorId: string | null;
  onClose: () => void;
}

export function SectorModal({ sectorId, onClose }: SectorModalProps) {
  if (!sectorId) return null;

  const sector = LEAD_DOSSIER.affectedSectors.find((s) => s.id === sectorId);
  if (!sector) return null;

  const sectorDetails: Record<string, { icon: typeof Users; details: string[]; actions: string }> = {
    students: {
      icon: Users,
      details: [
        'Over 640,000 undergraduate applicants in tier-1 public tertiary institutions face tuition deadlines.',
        'Direct monthly living upkeep of ₦20,000 sent straight to biometric-verified accounts eliminates family distress.',
        'Exclusion risk remains concentrated in remote institutions with manual student registry backlogs.',
      ],
      actions: 'Ensure your institution registrar has digitally synchronized student rosters with the NELFUND portal.',
    },
    universities: {
      icon: Building,
      details: [
        '126 federal and state universities rely on automated tuition remittals to maintain power, laboratory supplies, and exam materials.',
        'Bursaries that deployed digital API connectors achieved 92%+ disbursement verification within 10 days.',
        'Reduces student loan default risks and prevents campus academic calendar disruptions.',
      ],
      actions: 'Upload verified JAMB matriculation lists and departmental fee schedules to avoid disbursement stalls.',
    },
    banks: {
      icon: Landmark,
      details: [
        'Deposit Money Banks (DMBs) and NIBSS clear batch payments under zero-commission educational charter mandates.',
        'BVN-NIN cross-checks prevent duplicate biometric identity fraud across merchant accounts.',
        'Zero float retention mandated: funds must reach beneficiary accounts within 24 hours of release.',
      ],
      actions: 'Maintain automated settlement queues and real-time failure notification callbacks.',
    },
    ministry: {
      icon: Scale,
      details: [
        'Federal Ministry of Education and National Assembly oversight committees audit equitable geopolitical distribution.',
        'Tranche 2 expansion will formally encompass state-owned polytechnics and colleges of agriculture.',
        'Sovereign recovery framework scheduled for review ahead of post-NYSC tax linkage rollout.',
      ],
      actions: 'Submit weekly public distribution reports by LGA to maintain transparency and public trust.',
    },
  };

  const currentInfo = sectorDetails[sectorId] || sectorDetails.students;
  const IconComponent = currentInfo.icon;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden my-auto animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconComponent className="w-4 h-4 text-[#cbd5e1]" />
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">
              SECTOR IMPACT NODE // {sector.sector}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-newsreader text-[20px] font-bold text-[#0F172A]">
              {sector.sector}
            </span>
            <span
              className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 uppercase ${
                sector.tagVariant === 'high'
                  ? 'bg-[#fee2e2] text-[#DC2626] border border-[#fecaca]'
                  : sector.tagVariant === 'inflow'
                  ? 'bg-[#e0e7ff] text-[#1E3A8A] border border-[#c7d2fe]'
                  : 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]'
              }`}
            >
              {sector.tag}
            </span>
          </div>

          <p className="font-sourceserif text-[13px] leading-relaxed text-[#45464d]">
            {sector.description}
          </p>

          <div className="bg-white border border-[#e2e8f0] p-3.5 space-y-2">
            <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#1E3A8A]">
              OPERATIONAL IMPACT DETAILS
            </div>
            <ul className="space-y-1.5 text-[12px] font-sourceserif text-[#1a1c1b] list-disc list-inside">
              {currentInfo.details.map((point, idx) => (
                <li key={idx} className="leading-snug">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f4f4f2] border-l-3 border-[#0F172A] p-3 text-[11px] font-mono text-[#0F172A]">
            <span className="font-bold">RECOMMENDED STAKEHOLDER ACTION:</span> {currentInfo.actions}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-4 py-2.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors text-[10px] font-mono font-bold tracking-wider uppercase cursor-pointer"
          >
            DISMISS
          </button>
        </div>

      </div>
    </div>
  );
}
