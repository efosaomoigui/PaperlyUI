import { useState } from 'react';
import { X, Check, ShieldCheck, Zap } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'individual' | 'institutional'>('institutional');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden my-auto animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#cbd5e1]" />
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-white">
              PAPERLY INSTITUTIONAL MEMBERSHIP &amp; ACCESS
            </span>
          </div>
          <button
            id="btn-close-sub-modal"
            onClick={onClose}
            className="p-1 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-newsreader text-[26px] font-bold text-[#0F172A]">
              Rigorous, Triangulated Intelligence
            </h2>
            <p className="font-sourceserif text-[14px] text-[#45464d] max-w-lg mx-auto">
              Access unredacted executive dossiers, continuous 24/7 pulse vector telemetry, and primary evidence ledgers synthesized for decision-makers.
            </p>
          </div>

          {/* Plan Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Plan 1: Individual Executive */}
            <div
              onClick={() => setSelectedPlan('individual')}
              className={`p-4 border transition-all cursor-pointer ${
                selectedPlan === 'individual'
                  ? 'border-2 border-[#0F172A] bg-white shadow-sm'
                  : 'border-[#cbd5e1] bg-[#f4f4f2] hover:border-[#0F172A]'
              }`}
            >
              <div className="text-[10px] font-mono tracking-wider uppercase font-bold text-[#64748b] mb-1">
                PROFESSIONAL DESK
              </div>
              <div className="font-newsreader text-[22px] font-bold text-[#0F172A]">
                $48 <span className="text-xs font-sans font-normal text-[#64748b]">/ month</span>
              </div>
              <p className="font-sourceserif text-[12px] text-[#45464d] mt-2 mb-4">
                Designed for analysts, sovereign advisors, and corporate strategists.
              </p>
              <ul className="space-y-1.5 text-[11px] font-inter text-[#45464d]">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Twice-daily computational dossiers</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Real-time continuous news wire</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Broadsheet PDF export capability</span>
                </li>
              </ul>
            </div>

            {/* Plan 2: Institutional Terminal */}
            <div
              onClick={() => setSelectedPlan('institutional')}
              className={`p-4 border transition-all cursor-pointer relative ${
                selectedPlan === 'institutional'
                  ? 'border-2 border-[#0F172A] bg-white shadow-sm'
                  : 'border-[#cbd5e1] bg-[#f4f4f2] hover:border-[#0F172A]'
              }`}
            >
              <div className="absolute top-2 right-2 bg-[#1E3A8A] text-white text-[8px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5">
                RECOMMENDED
              </div>
              <div className="text-[10px] font-mono tracking-wider uppercase font-bold text-[#1E3A8A] mb-1">
                INSTITUTIONAL TERMINAL
              </div>
              <div className="font-newsreader text-[22px] font-bold text-[#0F172A]">
                $280 <span className="text-xs font-sans font-normal text-[#64748b]">/ month</span>
              </div>
              <p className="font-sourceserif text-[12px] text-[#45464d] mt-2 mb-4">
                Enterprise coverage for ministries, central banks, and funds.
              </p>
              <ul className="space-y-1.5 text-[11px] font-inter text-[#45464d]">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>All Professional Desk capabilities</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Full REST API &amp; Webhook telemetry</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Multi-seat institutional licensing (10 users)</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Direct senior analyst inquiries</span>
                </li>
              </ul>
            </div>

          </div>

          {confirmed ? (
            <div className="p-4 bg-[#dcfce7] border border-[#86efac] text-[#15803d] text-center space-y-1">
              <div className="font-mono font-bold text-[12px] uppercase">
                ✓ Institutional Token Activated
              </div>
              <p className="font-sourceserif text-[13px]">
                Full computational access unlocked for this preview session.
              </p>
            </div>
          ) : (
            <button
              id="btn-confirm-subscription"
              onClick={() => setConfirmed(true)}
              className="w-full bg-[#0F172A] text-white py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase hover:bg-[#1E3A8A] transition-colors cursor-pointer"
            >
              INITIALIZE {selectedPlan.toUpperCase()} MEMBERSHIP
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-5 py-3 flex items-center justify-between text-[10px] font-mono text-[#76777d]">
          <span>Cancel anytime · Sovereign compliance guaranteed</span>
          <button
            onClick={onClose}
            className="hover:text-[#0F172A] uppercase cursor-pointer"
          >
            DISMISS
          </button>
        </div>

      </div>
    </div>
  );
}
