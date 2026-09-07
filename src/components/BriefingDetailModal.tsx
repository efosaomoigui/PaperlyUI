import { X, ExternalLink, Activity, AlertTriangle, Shuffle, ArrowRight } from 'lucide-react';
import { WhatMattersItem } from '../types';

interface BriefingDetailModalProps {
  item: WhatMattersItem | null;
  onClose: () => void;
}

export function BriefingDetailModal({ item, onClose }: BriefingDetailModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden my-auto animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#f1f1ef]">
              BRIEFING MEMO // {item.tag}
            </span>
          </div>
          <button
            id="btn-close-briefing-modal"
            onClick={onClose}
            className="p-1 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#64748b]">
            <span className="font-bold text-[#1E3A8A]">{item.tag}</span>
            <span>PUBLISHED {item.timeAgo}</span>
          </div>

          <h2 className="font-newsreader text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-tight">
            {item.headline}
          </h2>

          <p className="font-sourceserif text-[15px] leading-relaxed text-[#1a1c1b]">
            {item.summary}
          </p>

          {/* Deep Dive Why It Matters */}
          <div className="bg-[#f4f4f2] border-l-3 border-[#0F172A] p-4 space-y-1.5">
            <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F172A]">
              STRUCTURAL SIGNIFICANCE &amp; WHY IT MATTERS
            </div>
            <p className="font-sourceserif text-[13px] leading-relaxed text-[#1a1c1b]">
              {item.whyItMatters}
            </p>
          </div>

          {/* Telemetry Vector indicator */}
          <div className="border border-[#e2e8f0] bg-white p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item.signalType === 'cost' && <AlertTriangle className="w-4 h-4 text-[#DC2626]" />}
              {item.signalType === 'stabilization' && <Activity className="w-4 h-4 text-[#1E3A8A]" />}
              {item.signalType === 'traffic' && <Shuffle className="w-4 h-4 text-[#B45309]" />}
              <span className="font-mono text-[11px] font-bold text-[#0F172A]">
                {item.signalLabel}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#15803d] font-semibold">
              ● ALGORITHMIC TELEMETRY ACTIVE
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-6 py-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#76777d]">
            Paperly Executive Intelligence Desk
          </span>
          <button
            id="btn-dismiss-briefing"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors text-[10px] font-mono font-bold tracking-widest uppercase cursor-pointer"
          >
            DISMISS
          </button>
        </div>

      </div>
    </div>
  );
}
