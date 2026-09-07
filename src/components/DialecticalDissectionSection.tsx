import { DIALECTICAL_FRAMES } from '../data/mockData';
import { Scale, ArrowRight } from 'lucide-react';
import { DialecticalFrame } from '../types';

interface DialecticalDissectionSectionProps {
  onOpenComparison: () => void;
  onSelectFrame: (frame: DialecticalFrame) => void;
}

export function DialecticalDissectionSection({
  onOpenComparison,
  onSelectFrame,
}: DialecticalDissectionSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#e2e8f0]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#0F172A] mb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase font-bold text-[#1E3A8A] mb-1">
            <Scale className="w-3.5 h-3.5 text-[#1E3A8A]" />
            <span>DIALECTICAL DISSECTION</span>
          </div>
          <h2 className="font-newsreader text-[24px] sm:text-[28px] font-semibold text-[#0F172A] tracking-tight">
            How This Development Is Being Framed
          </h2>
          <p className="font-sourceserif text-[13px] sm:text-[14px] text-[#45464d] mt-1">
            Comparing institutional rhetoric, union grievances, and independent fiscal sustainability audits on student loan rollouts.
          </p>
        </div>

        <button
          id="btn-compare-claims"
          onClick={onOpenComparison}
          className="flex items-center space-x-1.5 text-[11px] font-mono font-bold tracking-wider uppercase text-[#0F172A] hover:text-[#1E3A8A] transition-colors cursor-pointer group self-start md:self-auto shrink-0"
        >
          <span>COMPARE 8 VERIFIED SOURCES &amp; CLAIMS</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Comparative Frames Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DIALECTICAL_FRAMES.map((frame) => (
          <div
            key={frame.id}
            onClick={() => onSelectFrame(frame)}
            className="border border-[#cbd5e1] bg-white p-5 flex flex-col justify-between hover:border-[#0F172A] transition-colors cursor-pointer group shadow-sm"
          >
            <div className="space-y-3">
              {/* Actor Header with Dot */}
              <div className="flex items-center space-x-2 pb-2 border-b border-[#e2e8f0]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: frame.indicatorColor }}
                />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#0F172A]">
                  {frame.actor}
                </span>
              </div>

              {/* Central Key Quote */}
              <blockquote className="font-newsreader italic text-[16px] sm:text-[17px] font-medium leading-[1.35] text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                {frame.quote}
              </blockquote>

              {/* Analytical Breakdown */}
              <p className="font-sourceserif text-[12px] sm:text-[13px] leading-[1.6] text-[#45464d]">
                {frame.analysis}
              </p>
            </div>

            {/* Source Reference Tag */}
            <div className="pt-4 mt-4 border-t border-[#f1f5f9] text-[11px] font-sourceserif text-[#64748b]">
              {frame.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
