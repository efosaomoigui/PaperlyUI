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
  communityTopicId?: string;
  communityContributionsCount?: number;
}

// ----------------- Paperly Community & Public Deliberation Types -----------------

export interface CommunityAuthor {
  id: string;
  name: string;
  handle: string;
  role: string;
  affiliation: string;
  isVerified: boolean;
  isEditor?: boolean;
  badge?: string;
  avatarInitials: string;
}

export interface CommunityCitation {
  title: string;
  source: string;
  url?: string;
}

export interface CommunityComment {
  id: string;
  topicId: string;
  parentId?: string | null;
  author: CommunityAuthor;
  timestamp: string;
  content: string;
  citation?: CommunityCitation;
  perspectiveTag: 'Institutional Policy' | 'Market & Capital' | 'Field Evidence' | 'Legal & Regulatory' | 'Civic Impact';
  endorsements: number;
  userEndorsed: boolean;
  isReported?: boolean;
  replies?: CommunityComment[];
}

export interface CommunityPollOption {
  id: string;
  label: string;
  votes: number;
  percentage: number;
}

export interface CommunityPoll {
  id: string;
  topicId: string;
  linkedDossierId: string;
  title: string;
  question: string;
  context: string;
  options: CommunityPollOption[];
  totalVotes: number;
  userVotedOptionId?: string | null;
  closingDate: string;
  methodologyNote: string;
  status: 'OPEN' | 'CONCLUDED';
}

export interface CommunityTopic {
  id: string;
  title: string;
  category: string;
  linkedDossierId: string;
  linkedDossierHeadline: string;
  triangulatedSources: number;
  confidenceScore: number;
  dossierStatus: 'DEVELOPING' | 'UPDATED' | 'NEW';
  summary: string;
  deliberationPrompt: string;
  participantsCount: number;
  contributionsCount: number;
  isFollowed: boolean;
  pinnedEditorNote?: {
    author: string;
    role: string;
    timestamp: string;
    note: string;
  };
  lastActivity: string;
  tags: string[];
}
