import { WHAT_MATTERS_ITEMS } from '../data/mockData';
import { ArrowUpRight, ArrowRight, AlertTriangle, Activity, Shuffle } from 'lucide-react';
import { WhatMattersItem } from '../types';

interface WhatMattersSectionProps {
  onOpenBriefing: (item: WhatMattersItem) => void;
  onOpenWire: () => void;
}

export function WhatMattersSection({ onOpenBriefing, onOpenWire }: WhatMattersSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#e2e8f0]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#0F172A] mb-6">
        <div className="flex items-baseline space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#0F172A] inline-block" />
            <h2 className="font-newsreader text-[22px] sm:text-[24px] font-semibold text-[#0F172A] tracking-tight">
              What Matters Now
            </h2>
          </div>
          <span className="hidden sm:inline font-sourceserif italic text-[14px] text-[#45464d]">
            Macro and infrastructural inflection points
          </span>
        </div>

        <button
          id="btn-continuous-wire-trigger"
          onClick={onOpenWire}
          className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-[#45464d] hover:text-[#0F172A] transition-colors cursor-pointer"
        >
          <span>CONTINUOUS WIRE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
        </button>
      </div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
        {WHAT_MATTERS_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between ${
              idx === 0
                ? 'md:pr-6 pb-6 md:pb-0'
                : idx === 1
                ? 'md:px-6 py-6 md:py-0'
                : 'md:pl-6 pt-6 md:pt-0'
            }`}
          >
            <div>
              {/* Category & Timestamp */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase mb-2">
                <span
                  className={`font-bold ${
                    item.isAlert
                      ? 'text-[#DC2626]'
                      : item.tag.includes('MONETARY')
                      ? 'text-[#1E3A8A]'
                      : 'text-[#45464d]'
                  }`}
                >
                  {item.tag}
                </span>
                <span className="text-[#76777d]">{item.timeAgo}</span>
              </div>

              {/* Title */}
              <h3 className="font-newsreader text-[19px] sm:text-[20px] font-semibold leading-[1.25] text-[#0F172A] hover:text-[#1E3A8A] transition-colors mb-2.5">
                <button
                  id={`btn-what-matters-title-${item.id}`}
                  onClick={() => onOpenBriefing(item)}
                  className="text-left cursor-pointer"
                >
                  {item.headline}
                </button>
              </h3>

              {/* Summary */}
              <p className="font-sourceserif text-[13px] leading-[1.55] text-[#45464d] mb-4">
                {item.summary}
              </p>

              {/* Embedded "Why It Matters" Callout Container */}
              <div className="bg-[#f4f4f2] border border-[#e2e8f0] p-3 mb-4 space-y-1">
                <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#0F172A]">
                  WHY IT MATTERS
                </div>
                <p className="font-sourceserif text-[12px] leading-[1.5] text-[#1a1c1b]">
                  {item.whyItMatters}
                </p>
              </div>
            </div>

            {/* Bottom Signal Telemetry & Read Briefing Action */}
            <div className="pt-2 border-t border-[#e2e8f0] flex items-center justify-between text-[10px] font-mono tracking-wider">
              <div className="flex items-center space-x-1 text-[#45464d]">
                {item.signalType === 'cost' && <AlertTriangle className="w-3 h-3 text-[#DC2626]" />}
                {item.signalType === 'stabilization' && <Activity className="w-3 h-3 text-[#1E3A8A]" />}
                {item.signalType === 'traffic' && <Shuffle className="w-3 h-3 text-[#B45309]" />}
                <span className="font-semibold text-[#0F172A]">{item.signalLabel}</span>
              </div>

              <button
                id={`btn-read-briefing-${item.id}`}
                onClick={() => onOpenBriefing(item)}
                className="flex items-center space-x-1 font-bold text-[#0F172A] hover:text-[#1E3A8A] transition-colors cursor-pointer group"
              >
                <span>{item.actionLabel}</span>
                {item.actionLabel === 'TRACK' ? (
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                ) : (
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
