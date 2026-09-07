export interface TickerItem {
  symbol: string;
  value: string;
  change: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface SectorImpactNode {
  id: string;
  sector: string;
  tag: string;
  tagVariant: 'high' | 'inflow' | 'partner' | 'regulatory';
  description: string;
}

export interface ChronologyItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
}

export interface WhatMattersItem {
  id: string;
  tag: string;
  timeAgo: string;
  isAlert?: boolean;
  headline: string;
  summary: string;
  whyItMatters: string;
  signalLabel: string;
  signalType: 'stabilization' | 'cost' | 'traffic';
  actionLabel: string;
  fullDossierId?: string;
}

export interface ImpactWatchItem {
  id: string;
  group: 'For You' | 'Households' | 'Business' | 'Investors' | 'Students' | 'Travellers';
  label: string;
  vectorBadge: string;
  headline: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricSubtext: string;
  iconType: 'trend-up' | 'chart-down' | 'activity' | 'award' | 'plane';
  affectedAudience: string;
  consequenceLevel: 'High' | 'Moderate' | 'Direct' | 'Volatile';
}

export interface PulseNode {
  id: string;
  indicator: string;
  context: string;
  vector: string;
  status: 'volatile' | 'stable' | 'tripped' | 'disbursement' | 'rerouted';
  delta?: string;
}

export interface DialecticalFrame {
  id: string;
  actor: string;
  indicatorColor: string;
  quote: string;
  analysis: string;
  source: string;
}

export interface NewsWireItem {
  id: string;
  time: string;
  category: string;
  categoryColor?: string;
  headline: string;
  source: string;
  desk: string;
  urgent?: boolean;
}

export interface IntelligenceDossier {
  id: string;
  status: 'DEVELOPING' | 'UPDATED' | 'NEW';
  updatedTime: string;
  sourcesTriangulated: number;
  confidenceScore: number;
  headline: string;
  subhead: string;
  imageUrl: string;
  imageCaption: string;
  imageArchive: string;
  whatHappened: string[];
  whyItMatters: string[];
  primarySources: string[];
  affectedSectors: SectorImpactNode[];
  chronology: ChronologyItem[];
  synthesisAssessment: string;
  // Deep-dive intelligence sections for Development Page
  extendedNarrative?: string[];
  keyActors?: {
    name: string;
    role: string;
    organization: string;
    stance: string;
  }[];
  scenarioModel?: {
    bestCase: { probability: string; description: string };
    baseCase: { probability: string; description: string };
    stressCase: { probability: string; description: string };
  };
  keyVerifiedFacts?: string[];
  whoIsAffectedSummary?: string;
  perspectives?: {
    actor: string;
    position: string;
    stance: string;
    source: string;
  }[];
  evidenceAndSources?: {
    title: string;
    type: string;
    date: string;
    verified: boolean;
  }[];
  relatedDevelopments?: {
    title: string;
    category: string;
    time: string;
  }[];
  communityNote?: string;
}
