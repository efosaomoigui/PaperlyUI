import { X, BarChart2, Activity, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { PULSE_NODES, DOSSIER_METHODOLOGY } from '../data/mockData';
import { PulseNode } from '../types';

interface PulseModalProps {
  isOpen: boolean;
  selectedNode?: PulseNode | null;
  onClose: () => void;
}

export function PulseModal({ isOpen, selectedNode, onClose }: PulseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#f9f9f7] border-2 border-[#0F172A] shadow-[8px_8px_0px_0px_#0F172A] max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-[#cbd5e1]" />
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-white">
              PAPERLY PULSE // REAL-TIME ALGORITHMIC VECTOR STATE
            </span>
          </div>
          <button
            id="btn-close-pulse-modal"
            onClick={onClose}
            className="p-1 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Methodology Subheader */}
        <div className="bg-[#f4f4f2] border-b border-[#cbd5e1] px-5 py-3 text-[12px] font-sourceserif text-[#45464d] flex flex-wrap items-center justify-between gap-2">
          <span>
            Algorithm: Pulse-Index v4.1 · Continuous 4-minute polling across monetary, grid, pipeline, and maritime nodes.
          </span>
          <span className="text-[10px] font-mono text-[#15803d] font-bold">
            ● 5 OF 5 NODES RESPONSIVE
          </span>
        </div>

        {/* Nodes Detail List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {PULSE_NODES.map((node) => {
            const isHighlighted = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                className={`p-4 border transition-colors ${
                  isHighlighted
                    ? 'border-2 border-[#0F172A] bg-white shadow-sm'
                    : 'border-[#cbd5e1] bg-white hover:border-[#0F172A]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-newsreader text-[18px] font-bold text-[#0F172A]">
                      {node.indicator}
                    </h3>
                    <p className="font-sourceserif text-[13px] text-[#64748b]">
                      Context: {node.context}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 uppercase ${
                      node.status === 'volatile'
                        ? 'bg-[#fee2e2] text-[#DC2626] border border-[#fecaca]'
                        : node.status === 'stable'
                        ? 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]'
                        : node.status === 'tripped'
                        ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab]'
                        : node.status === 'disbursement'
                        ? 'bg-[#dae2fd] text-[#1E3A8A] border border-[#b6c4ff]'
                        : 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                    }`}
                  >
                    {node.vector}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#f1f5f9] grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-[#45464d]">
                  <div>
                    Vector Confidence: <strong>99.1%</strong>
                  </div>
                  <div>
                    Refresh Frequency: <strong>120s</strong>
                  </div>
                  <div>
                    Data Provenance: <strong>API Verified</strong>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pulse Index Methodology Section */}
          <div className="bg-[#f4f4f2] border border-[#cbd5e1] p-4 space-y-2">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-[#0F172A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>ALGORITHMIC METHODOLOGY NOTE</span>
            </div>
            <p className="font-sourceserif text-[12px] leading-relaxed text-[#45464d]">
              Pulse-Index normalizes disparate real-time data feeds—interbank foreign exchange spreads, grid generation telemetry from NCC Osogbo, OPEC+ quota adherence trackers, and subsea cable optical latency ping logs—into calibrated volatility vectors to inform institutional risk management.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f2] border-t border-[#cbd5e1] px-5 py-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#76777d]">
            Paperly Sovereign Telemetry System
          </span>
          <button
            id="btn-close-pulse-footer"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors text-[10px] font-mono font-bold tracking-widest uppercase cursor-pointer"
          >
            CLOSE TELEMETRY
          </button>
        </div>

      </div>
    </div>
  );
}
