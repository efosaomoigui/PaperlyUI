/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TopTickerBar } from './components/TopTickerBar';
import { HeaderMasthead } from './components/HeaderMasthead';
import { LeaderboardAd } from './components/LeaderboardAd';
import { LiveTrackingBar } from './components/LiveTrackingBar';
import { LeadStorySection } from './components/LeadStorySection';
import { WhatMattersSection } from './components/WhatMattersSection';
import { ImpactWatchSection } from './components/ImpactWatchSection';
import { DialecticalDissectionSection } from './components/DialecticalDissectionSection';
import { NewsWireSection } from './components/NewsWireSection';
import { AdPlacement } from './components/AdPlacement';
import { Footer } from './components/Footer';

// Mobile-First Navigation
import { MobileNavDrawer } from './components/MobileNavDrawer';
import { MobileBottomBar } from './components/MobileBottomBar';

// Full Screen Page Views
import { CategoryView } from './components/views/CategoryView';
import { CommunityPage } from './components/views/CommunityPage';
import { ImpactWatchPage } from './components/views/ImpactWatchPage';
import { PerspectivesPage } from './components/views/PerspectivesPage';
import { DevelopingPage } from './components/views/DevelopingPage';
import { ExplainedPage } from './components/views/ExplainedPage';
import { LatestPage } from './components/views/LatestPage';
import { VideoPage } from './components/views/VideoPage';
import { ForYouPage } from './components/views/ForYouPage';
import { InstitutionalPage } from './components/views/InstitutionalPage';
import { AdminOperationsPage } from './components/views/AdminOperationsPage';
import { DesignSystemPage } from './components/views/DesignSystemPage';
import { TopicEntityPage } from './components/views/TopicEntityPage';
import { SourceProfilePage } from './components/views/SourceProfilePage';

// Interactive Modals & Drawers
import { SearchModal } from './components/SearchModal';
import { DossierDetailModal } from './components/DossierDetailModal';
import { BriefingDetailModal } from './components/BriefingDetailModal';
import { DialecticalClaimsModal } from './components/DialecticalClaimsModal';
import { PulseModal } from './components/PulseModal';
import { WireFeedDrawer } from './components/WireFeedDrawer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { SectorModal } from './components/SectorModal';

import {
  WhatMattersItem,
  PulseNode,
  NewsWireItem,
  DialecticalFrame,
  IntelligenceDossier,
} from './types';
import { WHAT_MATTERS_ITEMS, BRIEFING_CAROUSEL_DOSSIERS } from './data/mockData';

export default function App() {
  // Navigation & Edition State
  const [activeNav, setActiveNav] = useState<string>('briefing');
  const [activeEdition, setActiveEdition] = useState<'lagos' | 'london' | 'new-york' | 'nairobi'>('lagos');
  const [isNewsprintGrain, setIsNewsprintGrain] = useState<boolean>(true);

  // Mobile Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal State Controls
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isWireDrawerOpen, setIsWireDrawerOpen] = useState(false);
  const [isClaimsModalOpen, setIsClaimsModalOpen] = useState(false);
  const [isPulseModalOpen, setIsPulseModalOpen] = useState(false);

  // Selected Item details for modals
  const [selectedDossier, setSelectedDossier] = useState<IntelligenceDossier | null>(null);
  const [selectedBriefing, setSelectedBriefing] = useState<WhatMattersItem | null>(null);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [selectedPulseNode, setSelectedPulseNode] = useState<PulseNode | null>(null);
  const [communityTopicId, setCommunityTopicId] = useState<string | null>(null);

  // Nav Switcher with window scroll reset
  const handleSelectNav = (nav: string) => {
    setActiveNav(nav);
    if (nav !== 'community') {
      setCommunityTopicId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCommunityTopic = (topicId: string) => {
    setCommunityTopicId(topicId);
    setActiveNav('community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topic: string) => {
    if (topic === 'nelfund') {
      setSelectedDossier(BRIEFING_CAROUSEL_DOSSIERS[0]);
      setIsDossierOpen(true);
    } else if (topic === 'naira') {
      setSelectedDossier(BRIEFING_CAROUSEL_DOSSIERS[1]);
      setIsDossierOpen(true);
    } else if (topic === 'opec') {
      setSelectedDossier(BRIEFING_CAROUSEL_DOSSIERS[2]);
      setIsDossierOpen(true);
    }
  };

  const handleSelectSearchResult = (type: string, id: string) => {
    if (type === 'dossier') {
      const match = BRIEFING_CAROUSEL_DOSSIERS.find((d) => d.id === id) || BRIEFING_CAROUSEL_DOSSIERS[0];
      setSelectedDossier(match);
      setIsDossierOpen(true);
    } else if (type === 'briefing') {
      const item = WHAT_MATTERS_ITEMS.find((b) => b.id === id);
      if (item) setSelectedBriefing(item);
    } else if (type === 'impact') {
      setActiveNav('impact-watch');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (type === 'wire') {
      setIsWireDrawerOpen(true);
    }
  };

  const handleOpenTimelineEvent = (_eventId: string) => {
    setIsDossierOpen(true);
  };

  const handleSelectFrame = (_frame: DialecticalFrame) => {
    setIsClaimsModalOpen(true);
  };

  const handleSelectPulseNode = (node: PulseNode) => {
    setSelectedPulseNode(node);
    setIsPulseModalOpen(true);
  };

  const handleSelectDispatch = (_item: NewsWireItem) => {
    setIsWireDrawerOpen(true);
  };

  // Render View Routing Logic
  const renderMainView = () => {
    if (activeNav === 'briefing') {
      return (
        <main className="flex-1">
          {/* Lead The Paperly Briefing Carousel with Clean Intro & Progressive Disclosure */}
          <LeadStorySection
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            onSelectSector={(sectorId) => setSelectedSectorId(sectorId)}
            onOpenTimelineEvent={handleOpenTimelineEvent}
            onOpenMethodology={() => handleSelectNav('how-it-works')}
          />

          {/* What Matters Now (3 Macro & Infrastructural Inflection Points) */}
          <WhatMattersSection
            onOpenBriefing={(item) => setSelectedBriefing(item)}
            onOpenWire={() => setIsWireDrawerOpen(true)}
          />

          {/* Tasteful Section-Divider Sponsorship Placement */}
          <AdPlacement variant="section-divider" sponsorName="Stanbic IBTC" />

          {/* Impact Watch & Paperly Pulse (Consequence Mapping & Telemetry) */}
          <ImpactWatchSection
            onSelectItem={(item) => {
              const matched = BRIEFING_CAROUSEL_DOSSIERS.find((d) =>
                d.headline.toLowerCase().includes(item.headline.toLowerCase().slice(0, 15))
              ) || BRIEFING_CAROUSEL_DOSSIERS[0];
              setSelectedDossier(matched);
              setIsDossierOpen(true);
            }}
            onSelectPulseNode={handleSelectPulseNode}
            onOpenMethodology={() => setIsPulseModalOpen(true)}
          />

          {/* Dialectical Dissection (How This Development Is Being Framed) */}
          <DialecticalDissectionSection
            onOpenComparison={() => setIsClaimsModalOpen(true)}
            onSelectFrame={handleSelectFrame}
          />

          {/* Lower Homepage Premium Partner Placement */}
          <AdPlacement variant="lower-homepage" />

          {/* Latest News Wire (24/7 Verified Chronology) */}
          <NewsWireSection
            onOpenFullWire={() => setIsWireDrawerOpen(true)}
            onSelectDispatch={handleSelectDispatch}
          />
        </main>
      );
    }

    if (['nigeria', 'world', 'business', 'technology', 'markets'].includes(activeNav)) {
      return (
        <main className="flex-1">
          <CategoryView
            categoryId={activeNav}
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            onSelectDispatch={handleSelectDispatch}
          />
        </main>
      );
    }

    if (activeNav === 'community') {
      return (
        <main className="flex-1">
          <CommunityPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            initialTopicId={communityTopicId}
          />
        </main>
      );
    }

    if (activeNav === 'impact-watch') {
      return (
        <main className="flex-1">
          <ImpactWatchPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            onSelectPulseNode={handleSelectPulseNode}
          />
        </main>
      );
    }

    if (activeNav === 'perspectives') {
      return (
        <main className="flex-1">
          <PerspectivesPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            onOpenClaimsModal={() => setIsClaimsModalOpen(true)}
          />
        </main>
      );
    }

    if (activeNav === 'developing') {
      return (
        <main className="flex-1">
          <DevelopingPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            onOpenCommunityTopic={handleOpenCommunityTopic}
          />
        </main>
      );
    }

    if (activeNav === 'explained') {
      return (
        <main className="flex-1">
          <ExplainedPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
          />
        </main>
      );
    }

    if (activeNav === 'video') {
      return (
        <main className="flex-1">
          <VideoPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
          />
        </main>
      );
    }

    if (activeNav === 'latest') {
      return (
        <main className="flex-1">
          <LatestPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
            onSelectDispatch={handleSelectDispatch}
          />
        </main>
      );
    }

    if (activeNav === 'for-you') {
      return (
        <main className="flex-1">
          <ForYouPage
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
          />
        </main>
      );
    }

    if (['how-it-works', 'principles', 'about', 'advertise', 'contact', 'terms'].includes(activeNav)) {
      return (
        <main className="flex-1">
          <InstitutionalPage
            initialTab={activeNav as any}
            onBackToBriefing={() => handleSelectNav('briefing')}
          />
        </main>
      );
    }

    if (activeNav === 'admin-portal') {
      return (
        <main className="flex-1">
          <AdminOperationsPage
            onBackToBriefing={() => handleSelectNav('briefing')}
          />
        </main>
      );
    }

    if (activeNav === 'design-system') {
      return (
        <main className="flex-1">
          <DesignSystemPage
            onBackToBriefing={() => handleSelectNav('briefing')}
          />
        </main>
      );
    }

    if (activeNav.startsWith('entity-')) {
      const entityId = activeNav.replace('entity-', '');
      return (
        <main className="flex-1">
          <TopicEntityPage
            entityId={entityId}
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
          />
        </main>
      );
    }

    if (activeNav.startsWith('source-')) {
      const sourceName = activeNav.replace('source-', '');
      return (
        <main className="flex-1">
          <SourceProfilePage
            sourceName={sourceName}
            onBackToBriefing={() => handleSelectNav('briefing')}
            onOpenDossier={(dossier) => {
              setSelectedDossier(dossier);
              setIsDossierOpen(true);
            }}
          />
        </main>
      );
    }

    // Default fallback
    return (
      <main className="flex-1">
        <LeadStorySection
          onOpenDossier={(dossier) => {
            setSelectedDossier(dossier);
            setIsDossierOpen(true);
          }}
          onSelectSector={(sectorId) => setSelectedSectorId(sectorId)}
          onOpenTimelineEvent={handleOpenTimelineEvent}
          onOpenMethodology={() => handleSelectNav('how-it-works')}
        />
      </main>
    );
  };

  return (
    <div
      className="min-h-screen bg-white text-[#1a1c1b] font-inter selection:bg-[#0F172A] selection:text-white flex flex-col antialiased relative transition-colors duration-200 pb-16 sm:pb-0"
    >
      {/* Authentic Tactile Broadsheet Clean White Paper Grain Overlay */}
      {isNewsprintGrain && (
        <div className="newsprint-grain-overlay" aria-hidden="true" />
      )}

      {/* 1. Global Sovereign Financial & Telemetry Ticker */}
      <TopTickerBar
        activeEdition={activeEdition}
        onSelectEdition={setActiveEdition}
        isNewsprintGrain={isNewsprintGrain}
        onToggleNewsprintGrain={() => setIsNewsprintGrain((prev) => !prev)}
        onOpenPulse={() => setIsPulseModalOpen(true)}
      />

      {/* 2. Primary Paperly Header Masthead & Navigation */}
      <HeaderMasthead
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscriptionOpen(true)}
        onOpenSignIn={() => setIsSubscriptionOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* 3. Institutional Sponsorship Leaderboard Space */}
      <LeaderboardAd />

      {/* 4. Live Tracking Bar (Developing / New / Updated) */}
      <LiveTrackingBar
        onSelectTopic={handleSelectTopic}
        onOpenWireFilter={() => setIsWireDrawerOpen(true)}
      />

      {/* Dynamic View Content Based on activeNav */}
      {renderMainView()}

      {/* Footers (Brand, Desk Taxonomy, Executive Dispatch, Legal Provenance) */}
      <Footer
        onOpenEditorialCharter={() => handleSelectNav('principles')}
        onOpenDesk={(deskName) => {
          const lower = deskName.toLowerCase();
          if (lower.includes('nigeria')) handleSelectNav('nigeria');
          else if (lower.includes('world')) handleSelectNav('world');
          else if (lower.includes('business')) handleSelectNav('business');
          else if (lower.includes('technology')) handleSelectNav('technology');
          else if (lower.includes('markets')) handleSelectNav('markets');
          else if (lower.includes('impact')) handleSelectNav('impact-watch');
          else if (lower.includes('perspectives')) handleSelectNav('perspectives');
          else if (lower.includes('wire') || lower.includes('latest')) handleSelectNav('latest');
          else if (lower.includes('confidence') || lower.includes('how')) handleSelectNav('how-it-works');
          else if (lower.includes('charter') || lower.includes('principles')) handleSelectNav('principles');
          else if (lower.includes('advertise')) handleSelectNav('advertise');
          else if (lower.includes('terms') || lower.includes('privacy')) handleSelectNav('terms');
          else handleSelectNav('briefing');
        }}
      />

      {/* Mobile-Specific Navigation Drawer & Bottom Bar */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        activeEdition={activeEdition}
        onSelectEdition={setActiveEdition}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSignIn={() => setIsSubscriptionOpen(true)}
        onOpenSubscribe={() => setIsSubscriptionOpen(true)}
        isNewsprintGrain={isNewsprintGrain}
        onToggleNewsprintGrain={() => setIsNewsprintGrain((prev) => !prev)}
      />

      <MobileBottomBar
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Interactive Modals & Slide-Overs */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <DossierDetailModal
        isOpen={isDossierOpen}
        dossier={selectedDossier}
        onClose={() => setIsDossierOpen(false)}
        onOpenCommunityTopic={handleOpenCommunityTopic}
      />

      <BriefingDetailModal
        item={selectedBriefing}
        onClose={() => setSelectedBriefing(null)}
      />

      <DialecticalClaimsModal
        isOpen={isClaimsModalOpen}
        onClose={() => setIsClaimsModalOpen(false)}
      />

      <PulseModal
        isOpen={isPulseModalOpen}
        selectedNode={selectedPulseNode}
        onClose={() => {
          setIsPulseModalOpen(false);
          setSelectedPulseNode(null);
        }}
      />

      <WireFeedDrawer
        isOpen={isWireDrawerOpen}
        onClose={() => setIsWireDrawerOpen(false)}
        onSelectDispatch={(_item) => {
          // Dispatch selected inside drawer
        }}
      />

      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />

      <SectorModal
        sectorId={selectedSectorId}
        onClose={() => setSelectedSectorId(null)}
      />

      {/* Floating Paper Feel Controller for Instant Comparison */}
      <aside className="fixed bottom-16 sm:bottom-4 right-4 z-30" aria-label="Texture Preview Controller">
        <button
          id="btn-floating-toggle-grain"
          onClick={() => setIsNewsprintGrain((prev) => !prev)}
          className={`flex items-center space-x-2 px-3 py-1.5 border shadow-sm text-[10px] font-mono tracking-wider transition-all duration-150 cursor-pointer ${
            isNewsprintGrain
              ? 'bg-[#0F172A] text-white border-[#0F172A]'
              : 'bg-white text-[#334155] border-[#cbd5e1] hover:bg-[#f8fafc]'
          }`}
          title="Toggle authentic broadsheet paper grain and fibrous texture"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isNewsprintGrain ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'
            }`}
          />
          <span>NEWSPRINT: {isNewsprintGrain ? 'ON (WHITE GRAIN)' : 'OFF (CLEAN DIGITAL)'}</span>
        </button>
      </aside>

    </div>
  );
}
