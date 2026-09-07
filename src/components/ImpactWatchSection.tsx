import { useState } from 'react';
import { IMPACT_WATCH_DATA, PULSE_NODES } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  GraduationCap,
  Plane,
  ArrowRight,
  BarChart2,
  AlertOctagon,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { ImpactWatchItem, PulseNode } from '../types';

interface ImpactWatchSectionProps {
  onSelectItem: (item: ImpactWatchItem) => void;
  onSelectPulseNode: (node: PulseNode) => void;
  onOpenMethodology: () => void;
}

export function ImpactWatchSection({
  onSelectItem,
  onSelectPulseNode,
  onOpenMethodology,
}: ImpactWatchSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('For You');
  const filters = ['For You', 'Households', 'Business', 'Investors', 'Students', 'Travellers'];

  const filteredItems = selectedFilter === 'For You'
    ? IMPACT_WATCH_DATA
    : IMPACT_WATCH_DATA.filter((item) => item.group === selectedFilter);

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#e2e8f0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Impact Watch */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Header & Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#0F172A]">
            <div className="flex items-baseline space-x-2.5">
              <span className="w-2.5 h-2.5 bg-[#0F172A] inline-block self-center" />
              <h2 className="font-newsreader text-[22px] font-semibold text-[#0F172A] tracking-tight">
                Impact Watch
              </h2>
              <span className="text-[10px] font-mono tracking-wider text-[#64748b] uppercase font-bold hidden sm:inline">
                // HOW TODAY'S DEVELOPMENTS COULD AFFECT YOU
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase">
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    id={`btn-impact-filter-${filter.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-2 py-1 transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-white text-[#45464d] border-[#cbd5e1] hover:border-[#0F172A]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="font-sourceserif text-[13px] text-[#45464d] leading-normal">
            Direct consequence mapping: algorithmic correlation between macro policy determinations and ground-level cashflows.
          </p>

          {/* List of Impact Rows */}
          <div className="divide-y divide-[#e2e8f0]">
            {filteredItems.map((item) => {
              return (
                <button
                  key={item.id}
                  id={`btn-impact-item-${item.id}`}
                  onClick={() => onSelectItem(item)}
                  className="w-full text-left py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#f4f4f2] px-2 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3.5 flex-1">
                    {/* Visual Icon Tile */}
                    <div
                      className={`w-9 h-9 shrink-0 flex items-center justify-center border ${
                        item.iconType === 'trend-up'
                          ? 'bg-[#fee2e2] border-[#fecaca] text-[#DC2626]'
                          : item.iconType === 'chart-down'
                          ? 'bg-[#e0e7ff] border-[#c7d2fe] text-[#1E3A8A]'
                          : item.iconType === 'award'
                          ? 'bg-[#ede9fe] border-[#ddd6fe] text-[#6d28d9]'
                          : item.iconType === 'plane'
                          ? 'bg-[#fef3c7] border-[#fde68a] text-[#b45309]'
                          : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#0F172A]'
                      }`}
                    >
                      {item.iconType === 'trend-up' && <TrendingUp className="w-4 h-4" />}
                      {item.iconType === 'chart-down' && <TrendingDown className="w-4 h-4" />}
                      {item.iconType === 'activity' && <Activity className="w-4 h-4" />}
                      {item.iconType === 'award' && <GraduationCap className="w-4 h-4" />}
                      {item.iconType === 'plane' && <Plane className="w-4 h-4" />}
                    </div>

                    {/* Content */}
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono tracking-wider uppercase font-bold text-[#64748b]">
                        <span>{item.label}</span>
                        <span className="mx-1 text-[#cbd5e1]">•</span>
                        <span
                          className={
                            item.vectorBadge.includes('COST') || item.vectorBadge.includes('FRICTION')
                              ? 'text-[#DC2626]'
                              : 'text-[#1E3A8A]'
                          }
                        >
                          {item.vectorBadge}
                        </span>
                        {item.affectedAudience && (
                          <>
                            <span className="mx-1 text-[#cbd5e1]">•</span>
                            <span className="text-[#475569] font-normal">{item.affectedAudience}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-newsreader text-[16px] font-semibold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                        {item.headline}
                      </h3>
                      <p className="font-sourceserif text-[12px] leading-[1.45] text-[#45464d] line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Quantitative Projection Box */}
                  <div className="sm:text-right shrink-0 pl-12 sm:pl-0">
                    <div className="text-[9px] font-mono tracking-widest uppercase text-[#76777d]">
                      {item.metricLabel}
                    </div>
                    <div
                      className={`text-[14px] font-mono font-bold leading-tight ${
                        item.metricValue.includes('↑ High') || item.metricValue.includes('Cost')
                          ? 'text-[#DC2626]'
                          : item.metricValue.includes('↓')
                          ? 'text-[#15803d]'
                          : item.metricValue.includes('Direct')
                          ? 'text-[#1E3A8A]'
                          : 'text-[#0F172A]'
                      }`}
                    >
                      {item.metricValue}
                    </div>
                    <div className="text-[10px] font-sourceserif italic text-[#76777d]">
                      {item.metricSubtext}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right 5 Columns: Paperly Pulse */}
        <div className="lg:col-span-5 lg:pl-6 lg:border-l border-[#e2e8f0] space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-[#0F172A]" />
              <h2 className="font-newsreader text-[22px] font-semibold text-[#0F172A] tracking-tight">
                Paperly Pulse
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#64748b]">
              REAL-TIME STATE
            </span>
          </div>

          {/* Telemetry Nodes Table */}
          <div className="border border-[#e2e8f0] bg-white">
            <div className="bg-[#f4f4f2] px-3.5 py-2 border-b border-[#e2e8f0] flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#76777d]">
              <span>INDICATOR NODE</span>
              <span>CURRENT VECTOR</span>
            </div>

            <div className="divide-y divide-[#e2e8f0]">
              {PULSE_NODES.map((node) => (
                <button
                  key={node.id}
                  id={`btn-pulse-node-${node.id}`}
                  onClick={() => onSelectPulseNode(node)}
                  className="w-full text-left px-3.5 py-3 flex items-center justify-between hover:bg-[#f9f9f7] transition-colors cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-mono font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                      {node.indicator}
                    </div>
                    <div className="font-sourceserif text-[12px] text-[#64748b]">
                      {node.context}
                    </div>
                  </div>

                  {/* Vector Status Tag */}
                  <div>
                    <span
                      className={`inline-flex items-center space-x-1 text-[10px] font-mono font-bold tracking-wider px-2 py-1 uppercase ${
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
                      {node.status === 'volatile' && <span>↑</span>}
                      {node.status === 'stable' && <span>→</span>}
                      {node.status === 'tripped' && <AlertOctagon className="w-2.5 h-2.5 mr-0.5 inline" />}
                      {node.status === 'disbursement' && <RefreshCw className="w-2.5 h-2.5 mr-0.5 inline" />}
                      {node.status === 'rerouted' && <Zap className="w-2.5 h-2.5 mr-0.5 inline" />}
                      <span>{node.vector}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Methodology Link */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b] pt-1">
            <span>Algorithm: Pulse-Index v4.1</span>
            <button
              id="btn-pulse-methodology"
              onClick={onOpenMethodology}
              className="flex items-center space-x-1 font-bold text-[#0F172A] hover:text-[#1E3A8A] transition-colors cursor-pointer"
            >
              <span>Methodology</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
