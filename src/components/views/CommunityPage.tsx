import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  Users,
  ShieldCheck,
  ArrowRight,
  Vote,
  Compass,
  FileCheck,
  Check,
  Flag,
  Share2,
  ThumbsUp,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  ArrowLeft,
  X,
  AlertCircle,
  ExternalLink,
  Lock,
  CornerDownRight,
  Sparkles,
  ChevronDown,
  ChevronRight,
  UserCheck,
  SlidersHorizontal,
  HelpCircle,
  Clock,
  Send,
  Eye,
} from 'lucide-react';
import {
  CommunityTopic,
  CommunityComment,
  CommunityPoll,
  CommunityAuthor,
  IntelligenceDossier,
} from '../../types';
import {
  CURRENT_USER,
  COMMUNITY_TOPICS,
  COMMUNITY_POLLS,
  INITIAL_COMMUNITY_COMMENTS,
  DELIBERATION_CHARTER_POINTS,
} from '../../data/communityData';
import { BRIEFING_CAROUSEL_DOSSIERS } from '../../data/mockData';
import { AdPlacement } from '../AdPlacement';

interface CommunityPageProps {
  onBackToBriefing: () => void;
  onOpenDossier: (dossier: IntelligenceDossier) => void;
  initialTopicId?: string | null;
}

export function CommunityPage({
  onBackToBriefing,
  onOpenDossier,
  initialTopicId,
}: CommunityPageProps) {
  // ----------------- Auth State (Signed-In vs Signed-Out) -----------------
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);
  const currentUser = isSignedIn ? CURRENT_USER : null;

  // ----------------- Topics & State -----------------
  const [topics, setTopics] = useState<CommunityTopic[]>(() => {
    const saved = localStorage.getItem('paperly_community_topics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return COMMUNITY_TOPICS;
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (initialTopicId && COMMUNITY_TOPICS.some((t) => t.id === initialTopicId)) {
      return initialTopicId;
    }
    return COMMUNITY_TOPICS[0].id;
  });

  // Comments State
  const [comments, setComments] = useState<CommunityComment[]>(() => {
    const saved = localStorage.getItem('paperly_community_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_COMMUNITY_COMMENTS;
  });

  // Polls State
  const [polls, setPolls] = useState<CommunityPoll[]>(() => {
    const saved = localStorage.getItem('paperly_community_polls');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return COMMUNITY_POLLS;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPerspective, setSelectedPerspective] = useState<string>('ALL');
  const [showOnlyFollowed, setShowOnlyFollowed] = useState<boolean>(false);

  // Mobile Tab view: 'thread' | 'topics' | 'poll' | 'charter'
  const [mobileTab, setMobileTab] = useState<'thread' | 'topics' | 'poll' | 'charter'>('thread');

  // Comment Composer form state
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [newPerspectiveTag, setNewPerspectiveTag] = useState<CommunityComment['perspectiveTag']>('Institutional Policy');
  const [citationTitle, setCitationTitle] = useState<string>('');
  const [citationSource, setCitationSource] = useState<string>('');
  const [isCitationExpanded, setIsCitationExpanded] = useState<boolean>(false);

  // Inline Reply state: parentCommentId
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  // Moderation / Reporting Modal State
  const [reportingComment, setReportingComment] = useState<CommunityComment | null>(null);
  const [reportReason, setReportReason] = useState<string>('Unsubstantiated or Disproven Factual Claim');
  const [reportNote, setReportNote] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('paperly_community_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('paperly_community_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('paperly_community_polls', JSON.stringify(polls));
  }, [polls]);

  // Update selected topic if prop changes
  useEffect(() => {
    if (initialTopicId && topics.some((t) => t.id === initialTopicId)) {
      setSelectedTopicId(initialTopicId);
      setMobileTab('thread');
    }
  }, [initialTopicId, topics]);

  const activeTopic = useMemo(() => {
    return topics.find((t) => t.id === selectedTopicId) || topics[0];
  }, [topics, selectedTopicId]);

  const activePoll = useMemo(() => {
    return polls.find((p) => p.topicId === activeTopic.id) || polls[0];
  }, [polls, activeTopic]);

  const linkedDossier = useMemo(() => {
    return (
      BRIEFING_CAROUSEL_DOSSIERS.find((d) => d.id === activeTopic.linkedDossierId) ||
      BRIEFING_CAROUSEL_DOSSIERS[0]
    );
  }, [activeTopic]);

  // Filtered comments for the active topic
  const topicComments = useMemo(() => {
    return comments.filter((c) => {
      if (c.topicId !== activeTopic.id) return false;
      if (selectedPerspective !== 'ALL' && c.perspectiveTag !== selectedPerspective) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesContent = c.content.toLowerCase().includes(query);
        const matchesAuthor = c.author.name.toLowerCase().includes(query) || c.author.affiliation.toLowerCase().includes(query);
        const matchesTag = c.perspectiveTag.toLowerCase().includes(query);
        if (!matchesContent && !matchesAuthor && !matchesTag) return false;
      }
      return true;
    });
  }, [comments, activeTopic.id, selectedPerspective, searchQuery]);

  // Filtered topics list
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (showOnlyFollowed && !t.isFollowed) return false;
      if (selectedCategory !== 'ALL' && t.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(query);
        const matchTags = t.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchSummary = t.summary.toLowerCase().includes(query);
        if (!matchTitle && !matchTags && !matchSummary) return false;
      }
      return true;
    });
  }, [topics, showOnlyFollowed, selectedCategory, searchQuery]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    topics.forEach((t) => set.add(t.category));
    return ['ALL', ...Array.from(set)];
  }, [topics]);

  // Perspective tags
  const perspectiveOptions: CommunityComment['perspectiveTag'][] = [
    'Institutional Policy',
    'Market & Capital',
    'Field Evidence',
    'Legal & Regulatory',
    'Civic Impact',
  ];

  // ----------------- Actions -----------------
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleFollow = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          const nextState = !t.isFollowed;
          triggerToast(
            nextState
              ? `Following "${t.title}". Updates will appear in your briefing dispatch.`
              : `Unfollowed "${t.title}".`
          );
          return { ...t, isFollowed: nextState };
        }
        return t;
      })
    );
  };

  const handleVotePoll = (optionId: string) => {
    if (!isSignedIn) {
      triggerToast('Please sign in to participate in the institutional community poll.');
      return;
    }

    if (!activePoll) return;
    if (activePoll.userVotedOptionId === optionId) return;

    setPolls((prev) =>
      prev.map((p) => {
        if (p.id === activePoll.id) {
          const previousVotedId = p.userVotedOptionId;
          const updatedOptions = p.options.map((opt) => {
            let votes = opt.votes;
            if (opt.id === optionId) votes += 1;
            if (previousVotedId && opt.id === previousVotedId) votes -= 1;
            return { ...opt, votes };
          });

          const totalVotes = updatedOptions.reduce((acc, curr) => acc + curr.votes, 0);
          const finalOptions = updatedOptions.map((opt) => ({
            ...opt,
            percentage: totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0,
          }));

          triggerToast('Your verification vote has been registered in the institutional sample.');
          return {
            ...p,
            userVotedOptionId: optionId,
            totalVotes,
            options: finalOptions,
          };
        }
        return p;
      })
    );
  };

  const handleEndorseComment = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (!isSignedIn) {
      triggerToast('Sign in to endorse and corroborate community analyses.');
      return;
    }

    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === commentId) {
          const nextEndorsed = !c.userEndorsed;
          return {
            ...c,
            userEndorsed: nextEndorsed,
            endorsements: nextEndorsed ? c.endorsements + 1 : c.endorsements - 1,
          };
        }
        if (isReply && c.id === parentId && c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === commentId) {
                const nextEndorsed = !r.userEndorsed;
                return {
                  ...r,
                  userEndorsed: nextEndorsed,
                  endorsements: nextEndorsed ? r.endorsements + 1 : r.endorsements - 1,
                };
              }
              return r;
            }),
          };
        }
        return c;
      })
    );
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !currentUser) {
      triggerToast('Please sign in to submit reasoned contributions.');
      return;
    }
    if (!newCommentText.trim()) return;

    const newComment: CommunityComment = {
      id: `comm-user-${Date.now()}`,
      topicId: activeTopic.id,
      author: currentUser,
      timestamp: 'Just now',
      content: newCommentText.trim(),
      perspectiveTag: newPerspectiveTag,
      endorsements: 1,
      userEndorsed: true,
      citation:
        citationTitle.trim() && citationSource.trim()
          ? {
              title: citationTitle.trim(),
              source: citationSource.trim(),
            }
          : undefined,
      replies: [],
    };

    setComments((prev) => [newComment, ...prev]);
    setTopics((prev) =>
      prev.map((t) =>
        t.id === activeTopic.id
          ? {
              ...t,
              contributionsCount: t.contributionsCount + 1,
              participantsCount: t.participantsCount + 1,
              lastActivity: 'Just now',
            }
          : t
      )
    );

    setNewCommentText('');
    setCitationTitle('');
    setCitationSource('');
    setIsCitationExpanded(false);
    triggerToast('Contribution published and pinned to verified community record.');
  };

  const handleCreateReply = (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !currentUser) {
      triggerToast('Please sign in to reply to analyses.');
      return;
    }
    if (!replyText.trim()) return;

    const newReply: CommunityComment = {
      id: `reply-${Date.now()}`,
      topicId: activeTopic.id,
      parentId,
      author: currentUser,
      timestamp: 'Just now',
      content: replyText.trim(),
      perspectiveTag: 'Field Evidence',
      endorsements: 1,
      userEndorsed: true,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply],
          };
        }
        return c;
      })
    );

    setTopics((prev) =>
      prev.map((t) =>
        t.id === activeTopic.id
          ? { ...t, contributionsCount: t.contributionsCount + 1, lastActivity: 'Just now' }
          : t
      )
    );

    setReplyText('');
    setActiveReplyId(null);
    triggerToast('Your reply was added to this dialectical thread.');
  };

  const handleOpenReportModal = (comment: CommunityComment) => {
    setReportingComment(comment);
    setReportReason('Unsubstantiated or Disproven Factual Claim');
    setReportNote('');
  };

  const handleSubmitReport = () => {
    if (!reportingComment) return;
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === reportingComment.id) {
          return { ...c, isReported: true };
        }
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) => (r.id === reportingComment.id ? { ...r, isReported: true } : r)),
          };
        }
        return c;
      })
    );
    setReportingComment(null);
    triggerToast('Contribution flagged. Editorial moderation desk will review against Paperly Charter.');
  };

  return (
    <div className="bg-white min-h-screen text-[#1a1c1b] font-inter antialiased pb-20 sm:pb-12">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#0F172A] text-white text-xs font-mono px-4 py-2.5 shadow-xl border border-white/20 flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <Check className="w-3.5 h-3.5 text-[#15803d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ----------------- Top Institutional Context & Session Header ----------------- */}
      <div className="border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-y-2 text-xs">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <button
              onClick={onBackToBriefing}
              className="text-[#64748b] hover:text-[#0F172A] transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>THE PAPERLY BRIEFING</span>
            </button>
            <span className="text-[#cbd5e1]">/</span>
            <span className="font-bold text-[#0F172A] uppercase tracking-wider">
              COMMUNITY DELIBERATION &amp; CIVIC INTELLIGENCE
            </span>
          </div>

          {/* Signed-in / Signed-out State Switcher */}
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#15803d]" />
                <span className="text-[#45464d]">
                  SIGNED IN AS <strong className="text-[#0F172A]">{CURRENT_USER.name}</strong> ({CURRENT_USER.badge})
                </span>
                <button
                  onClick={() => setIsSignedIn(false)}
                  className="ml-2 text-[10px] text-[#1E3A8A] hover:underline uppercase font-bold tracking-wider cursor-pointer"
                  title="Switch to guest / logged out testing mode"
                >
                  [SWITCH TO GUEST]
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#cbd5e1]" />
                <span className="text-[#64748b]">BROWSING AS GUEST (SIGNED OUT)</span>
                <button
                  onClick={() => setIsSignedIn(true)}
                  className="ml-2 bg-[#0F172A] text-white text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider hover:bg-[#1E3A8A] transition-colors cursor-pointer"
                  title="Sign in with your verified institutional identity"
                >
                  SIGN IN AS INSTITUTIONAL FELLOW
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ----------------- Page Master Title & Editorial Thesis ----------------- */}
      <div className="border-b border-[#e2e8f0] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#64748b]">
                <span className="font-semibold text-[#1E3A8A]">COLLEGIAL POLICY FORUM</span>
                <span>·</span>
                <span>CHATHAM HOUSE STANDARDS</span>
                <span>·</span>
                <span>VERIFIED PROVENANCE</span>
              </div>
              <h1 className="font-newsreader text-[32px] sm:text-[40px] lg:text-[46px] font-normal leading-[1.08] text-[#0F172A] tracking-tight">
                Paperly Community Deliberation
              </h1>
              <p className="font-sourceserif text-[15px] sm:text-[17px] text-[#45464d] leading-[1.45]">
                Informed public discussion anchored strictly in Paperly’s triangulated intelligence dossiers. Practitioners, economists, registrars, and citizens examine macro impact, interrogate institutional claims, and vote on policy gauges.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className="flex items-center space-x-4 shrink-0 text-xs font-mono border-t md:border-t-0 md:border-l border-[#e2e8f0] pt-3 md:pt-0 md:pl-6">
              <div>
                <div className="text-[10px] uppercase text-[#64748b]">ACTIVE TOPICS</div>
                <div className="text-[16px] font-bold text-[#0F172A]">0{topics.length}</div>
              </div>
              <div className="h-6 w-px bg-[#e2e8f0]" />
              <div>
                <div className="text-[10px] uppercase text-[#64748b]">VERIFIED ENTRIES</div>
                <div className="text-[16px] font-bold text-[#0F172A]">186</div>
              </div>
              <div className="h-6 w-px bg-[#e2e8f0]" />
              <div>
                <div className="text-[10px] uppercase text-[#64748b]">POLL RESPONSES</div>
                <div className="text-[16px] font-bold text-[#15803d]">1,328</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ----------------- Mobile Segmented Navigation Switcher ----------------- */}
      <div className="lg:hidden border-b border-[#cbd5e1] bg-[#f8fafc] sticky top-0 z-20">
        <div className="grid grid-cols-4 text-center font-mono text-[11px] font-bold">
          <button
            onClick={() => setMobileTab('thread')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
              mobileTab === 'thread'
                ? 'border-[#0F172A] text-[#0F172A] bg-white'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            DISCUSSION
          </button>
          <button
            onClick={() => setMobileTab('topics')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
              mobileTab === 'topics'
                ? 'border-[#0F172A] text-[#0F172A] bg-white'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            TOPICS ({filteredTopics.length})
          </button>
          <button
            onClick={() => setMobileTab('poll')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
              mobileTab === 'poll'
                ? 'border-[#0F172A] text-[#0F172A] bg-white'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            ACTIVE POLL
          </button>
          <button
            onClick={() => setMobileTab('charter')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
              mobileTab === 'charter'
                ? 'border-[#0F172A] text-[#0F172A] bg-white'
                : 'border-transparent text-[#64748b] hover:text-[#0F172A]'
            }`}
          >
            CHARTER
          </button>
        </div>
      </div>

      {/* ----------------- Main 3-Column Grid Layout ----------------- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= COLUMN 1: Topics Directory & Filtering Desk (Desktop 3 Cols) ================= */}
          <div className={`lg:col-span-3 space-y-5 ${mobileTab !== 'topics' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search arguments, authors, sources..."
                className="w-full bg-white border border-[#cbd5e1] focus:border-[#0F172A] text-xs font-inter py-2 pl-8 pr-8 text-[#0F172A] placeholder-[#94a3b8] focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#94a3b8] hover:text-[#0F172A]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Followed Filter Toggle Button */}
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
              <button
                onClick={() => setShowOnlyFollowed((prev) => !prev)}
                className={`flex items-center space-x-1.5 text-xs font-mono font-bold tracking-wider px-2.5 py-1.5 transition-colors cursor-pointer ${
                  showOnlyFollowed
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-[#f1f5f9] text-[#45464d] hover:bg-[#e2e8f0]'
                }`}
              >
                {showOnlyFollowed ? <BookmarkCheck className="w-3.5 h-3.5 text-[#15803d]" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>FOLLOWED CONVERSATIONS ({topics.filter((t) => t.isFollowed).length})</span>
              </button>
              {showOnlyFollowed && (
                <button
                  onClick={() => setShowOnlyFollowed(false)}
                  className="text-[10px] text-[#64748b] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] flex items-center justify-between">
                <span>POLICY DESK DOMAIN</span>
                <SlidersHorizontal className="w-2.5 h-2.5" />
              </div>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[10px] font-mono px-2 py-0.5 border transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                        : 'bg-white text-[#45464d] border-[#e2e8f0] hover:border-[#cbd5e1]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic List Cards */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] pb-1 border-b border-[#e2e8f0]">
                ACTIVE PAPERLY CONVERSATIONS ({filteredTopics.length})
              </div>

              {/* Empty State: Followed or Search Filter */}
              {filteredTopics.length === 0 && (
                <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] text-center space-y-2">
                  <AlertCircle className="w-5 h-5 text-[#64748b] mx-auto" />
                  <div className="font-newsreader text-base font-semibold text-[#0F172A]">
                    {showOnlyFollowed ? 'No Followed Conversations' : 'No Matching Deliberations'}
                  </div>
                  <p className="text-xs text-[#64748b]">
                    {showOnlyFollowed
                      ? 'You have not flagged any intelligence topics to follow yet. Select the follow bookmark on any discussion to track updates.'
                      : `No discussions match "${searchQuery}". Reset filters to browse all developments.`}
                  </p>
                  <button
                    onClick={() => {
                      setShowOnlyFollowed(false);
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                    }}
                    className="text-[11px] font-mono font-bold text-[#1E3A8A] hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              )}

              {filteredTopics.map((topic) => {
                const isSelected = topic.id === activeTopic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      setMobileTab('thread');
                    }}
                    className={`p-3.5 border transition-all cursor-pointer text-left relative ${
                      isSelected
                        ? 'bg-white border-[#0F172A] shadow-xs'
                        : 'bg-white border-[#e2e8f0] hover:border-[#94a3b8]'
                    }`}
                  >
                    {/* Active Indicator Bar on Left */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F172A]" />
                    )}

                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-[#1E3A8A] bg-[#f1f5f9] px-1.5 py-0.5">
                        {topic.category}
                      </span>
                      <button
                        onClick={(e) => handleToggleFollow(topic.id, e)}
                        className="text-[#64748b] hover:text-[#0F172A] p-0.5"
                        title={topic.isFollowed ? 'Unfollow conversation' : 'Follow conversation'}
                      >
                        {topic.isFollowed ? (
                          <BookmarkCheck className="w-3.5 h-3.5 text-[#15803d]" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5 text-[#94a3b8]" />
                        )}
                      </button>
                    </div>

                    <h3 className="font-newsreader text-[16px] font-semibold text-[#0F172A] leading-snug mb-1.5">
                      {topic.title}
                    </h3>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b]">
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3 text-[#64748b]" />
                        <span>{topic.contributionsCount} contributions</span>
                      </span>
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sponsor Box */}
            <div className="pt-2">
              <AdPlacement variant="right-rail" />
            </div>

          </div>

          {/* ================= COLUMN 2: Active Deliberation Stream & Composer (Desktop 6 Cols) ================= */}
          <div className={`lg:col-span-6 space-y-6 ${mobileTab !== 'thread' ? 'hidden lg:block' : 'block'}`}>
            
            {/* ----------------- Prominent Connection to Paperly Intelligence Dossier ----------------- */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 relative">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#e2e8f0] text-[10px] font-mono uppercase">
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-bold px-1.5 py-0.5 text-white ${
                      activeTopic.dossierStatus === 'DEVELOPING' ? 'bg-[#DC2626]' : 'bg-[#1E3A8A]'
                    }`}
                  >
                    {activeTopic.dossierStatus}
                  </span>
                  <span className="font-bold text-[#0F172A]">LINKED PAPERLY DOSSIER</span>
                  <span className="text-[#cbd5e1]">|</span>
                  <span className="text-[#15803d] font-bold">
                    CONFIDENCE: {activeTopic.confidenceScore}%
                  </span>
                  <span className="text-[#cbd5e1]">|</span>
                  <span className="text-[#45464d]">{activeTopic.triangulatedSources} SOURCES TRIANGULATED</span>
                </div>

                <span className="text-[#64748b]">DOSSIER #{activeTopic.linkedDossierId.toUpperCase()}</span>
              </div>

              <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono text-[#64748b] uppercase">Substantive Baseline:</div>
                  <h4 className="font-newsreader text-[16px] font-medium text-[#0F172A] leading-snug">
                    {activeTopic.linkedDossierHeadline}
                  </h4>
                </div>

                <button
                  onClick={() => onOpenDossier(linkedDossier)}
                  className="inline-flex items-center space-x-1.5 bg-[#0F172A] text-white hover:bg-[#1E3A8A] transition-colors text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-2 shrink-0 cursor-pointer shadow-xs"
                  title="Inspect verified evidence ledger, sources, and scenario model in full dossier"
                >
                  <span>INSPECT FULL DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ----------------- Active Topic Header & Deliberation Framing ----------------- */}
            <div className="space-y-3 pb-4 border-b border-[#e2e8f0]">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#1E3A8A] font-bold uppercase tracking-wider text-[11px]">
                  {activeTopic.category} · {activeTopic.participantsCount} PARTICIPANTS
                </span>

                {/* Follow Button */}
                <button
                  onClick={() => handleToggleFollow(activeTopic.id)}
                  className={`flex items-center space-x-1.5 text-[11px] font-mono px-3 py-1 border transition-colors cursor-pointer ${
                    activeTopic.isFollowed
                      ? 'bg-[#15803d] text-white border-[#15803d]'
                      : 'bg-white text-[#0F172A] border-[#cbd5e1] hover:bg-[#f8fafc]'
                  }`}
                >
                  {activeTopic.isFollowed ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>FOLLOWING CONVERSATION</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>FOLLOW CONVERSATION</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="font-newsreader text-[26px] sm:text-[32px] font-medium text-[#0F172A] leading-tight">
                {activeTopic.title}
              </h2>

              {/* Intellectual Deliberation Prompt */}
              <div className="bg-[#f9f9f7] border-l-3 border-[#0F172A] p-3 text-xs font-inter space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b]">
                  CHATHAM DELIBERATION PROMPT
                </div>
                <p className="font-newsreader text-[15px] sm:text-[16px] italic text-[#0F172A] leading-snug">
                  &ldquo;{activeTopic.deliberationPrompt}&rdquo;
                </p>
              </div>

              {/* Pinned Editorial Verification Note */}
              {activeTopic.pinnedEditorNote && (
                <div className="bg-[#f1f5f9] border border-[#cbd5e1] p-3 text-xs font-inter flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono">
                      <strong className="text-[#0F172A]">{activeTopic.pinnedEditorNote.author}</strong>
                      <span className="text-[#64748b]">({activeTopic.pinnedEditorNote.role})</span>
                      <span className="text-[#cbd5e1]">·</span>
                      <span className="text-[#64748b]">{activeTopic.pinnedEditorNote.timestamp}</span>
                    </div>
                    <p className="text-[#45464d] text-xs">
                      {activeTopic.pinnedEditorNote.note}
                    </p>
                  </div>
                </div>
              )}

              {/* Topic Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-[#64748b]">INDEXED ENTITIES:</span>
                {activeTopic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono bg-[#f4f4f2] text-[#45464d] px-2 py-0.5 border border-[#e2e8f0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ----------------- Substantive Contribution Composer ----------------- */}
            <div className="bg-white border border-[#cbd5e1] p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-[#0F172A] text-white flex items-center justify-center font-mono text-xs font-bold">
                    {currentUser ? currentUser.avatarInitials : 'G'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">
                      {currentUser ? currentUser.name : 'Guest Contributor (Unauthenticated)'}
                    </div>
                    <div className="text-[10px] font-mono text-[#64748b]">
                      {currentUser ? currentUser.role : 'Read-only access mode'}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[#64748b] uppercase">
                  REASONED CONTRIBUTION DESK
                </div>
              </div>

              {isSignedIn ? (
                <form onSubmit={handleCreateComment} className="space-y-3">
                  
                  {/* Perspective Tag Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block">
                      Perspective &amp; Methodology Tag:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {perspectiveOptions.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setNewPerspectiveTag(tag)}
                          className={`text-[10.5px] font-mono px-2.5 py-1 border transition-colors cursor-pointer ${
                            newPerspectiveTag === tag
                              ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                              : 'bg-[#f8fafc] text-[#45464d] border-[#cbd5e1] hover:bg-[#f1f5f9]'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Analysis Textarea */}
                  <div>
                    <textarea
                      rows={3}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Contribute verified institutional observations, policy mechanisms, or empirical caveats..."
                      className="w-full bg-[#fcfcfb] border border-[#cbd5e1] focus:border-[#0F172A] p-3 text-xs sm:text-sm font-sourceserif text-[#0F172A] placeholder-[#94a3b8] focus:outline-hidden leading-relaxed"
                    />
                  </div>

                  {/* Citation Drawer Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsCitationExpanded((prev) => !prev)}
                      className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-[#1E3A8A] hover:text-[#0F172A] cursor-pointer"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{isCitationExpanded ? '— HIDE CITATION FIELD' : '+ ATTACH STATUTORY / REGULATORY CITATION (OPTIONAL)'}</span>
                    </button>

                    {isCitationExpanded && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 animate-in fade-in duration-100">
                        <input
                          type="text"
                          value={citationTitle}
                          onChange={(e) => setCitationTitle(e.target.value)}
                          placeholder="Document title (e.g. CBN Circular 2026/04)"
                          className="bg-white border border-[#cbd5e1] text-xs font-inter p-2 focus:border-[#0F172A] focus:outline-hidden"
                        />
                        <input
                          type="text"
                          value={citationSource}
                          onChange={(e) => setCitationSource(e.target.value)}
                          placeholder="Source body (e.g. Federal Ministry of Finance)"
                          className="bg-white border border-[#cbd5e1] text-xs font-inter p-2 focus:border-[#0F172A] focus:outline-hidden"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button & Standards Notice */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#e2e8f0]">
                    <span className="text-[10px] font-mono text-[#76777d]">
                      Adheres to Paperly Deliberation Charter: no ad hominem, reasoned logic required.
                    </span>
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="inline-flex items-center justify-center space-x-1.5 bg-[#0F172A] text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1E3A8A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>PUBLISH CONTRIBUTION</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Signed-Out Prompt */
                <div className="bg-[#f8fafc] border border-dashed border-[#cbd5e1] p-5 text-center space-y-3">
                  <Lock className="w-5 h-5 text-[#64748b] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-newsreader text-base font-semibold text-[#0F172A]">
                      Institutional Authentication Required
                    </h4>
                    <p className="text-xs text-[#64748b] max-w-md mx-auto">
                      Paperly discussions are reserved for verified subscribers and policy practitioners to maintain high intellectual fidelity and prevent automated spam.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSignedIn(true)}
                    className="inline-flex items-center space-x-2 bg-[#0F172A] text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#1E3A8A] transition-colors shadow-xs cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>SIGN IN WITH INSTITUTIONAL ACCOUNT</span>
                  </button>
                </div>
              )}
            </div>

            {/* ----------------- Filter Bar for Perspective Streams ----------------- */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 pb-1 border-b border-[#e2e8f0]">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-[#64748b]">
                <Filter className="w-3.5 h-3.5 text-[#0F172A]" />
                <span className="font-bold text-[#0F172A]">PERSPECTIVE FILTER:</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {['ALL', ...perspectiveOptions].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedPerspective(opt)}
                    className={`text-[10px] font-mono px-2 py-0.5 border transition-colors cursor-pointer ${
                      selectedPerspective === opt
                        ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                        : 'bg-white text-[#45464d] border-[#e2e8f0] hover:border-[#cbd5e1]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* ----------------- Active Discussion Comments Stream ----------------- */}
            <div className="space-y-4">
              
              {/* Empty State: Zero Comments for Current Filters */}
              {topicComments.length === 0 && (
                <div className="p-8 bg-[#f8fafc] border border-[#e2e8f0] text-center space-y-3">
                  <MessageSquare className="w-6 h-6 text-[#94a3b8] mx-auto" />
                  <div className="font-newsreader text-lg font-semibold text-[#0F172A]">
                    No Dialectical Contributions Yet
                  </div>
                  <p className="text-xs text-[#64748b] max-w-md mx-auto">
                    {selectedPerspective !== 'ALL'
                      ? `No arguments have been submitted under the "${selectedPerspective}" perspective yet.`
                      : 'Be the first institutional contributor to frame this development.'}
                  </p>
                  {selectedPerspective !== 'ALL' && (
                    <button
                      onClick={() => setSelectedPerspective('ALL')}
                      className="text-xs font-mono text-[#1E3A8A] font-bold hover:underline"
                    >
                      VIEW ALL PERSPECTIVES &rarr;
                    </button>
                  )}
                </div>
              )}

              {topicComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`bg-white border p-4 sm:p-5 transition-all text-left ${
                    comment.isReported
                      ? 'border-[#fca5a5] bg-[#fff5f5]'
                      : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
                  }`}
                >
                  
                  {/* Reported Status Banner */}
                  {comment.isReported && (
                    <div className="bg-[#fee2e2] text-[#991b1b] text-[10px] font-mono px-2.5 py-1 mb-3 flex items-center space-x-1.5">
                      <Flag className="w-3 h-3 text-[#dc2626]" />
                      <span>FLAGGED: This contribution is pending Paperly editorial verification.</span>
                    </div>
                  )}

                  {/* Comment Author Row */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start space-x-2.5">
                      <div className="w-8 h-8 rounded-none bg-[#f1f5f9] text-[#0F172A] border border-[#cbd5e1] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {comment.author.avatarInitials}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="font-newsreader text-[16px] font-bold text-[#0F172A]">
                            {comment.author.name}
                          </span>
                          {comment.author.isVerified && (
                            <span className="inline-flex items-center space-x-0.5 text-[9px] font-mono font-bold bg-[#f1f5f9] text-[#1E3A8A] border border-[#cbd5e1] px-1.5 py-0.2 uppercase">
                              <ShieldCheck className="w-2.5 h-2.5 text-[#1E3A8A]" />
                              <span>{comment.author.badge || 'VERIFIED'}</span>
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#94a3b8]">{comment.author.handle}</span>
                        </div>
                        <div className="text-[11px] font-inter text-[#64748b]">
                          {comment.author.role} · <span className="font-medium text-[#45464d]">{comment.author.affiliation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-[10px] font-mono text-[#94a3b8]">{comment.timestamp}</span>
                      <button
                        onClick={() => handleOpenReportModal(comment)}
                        className="text-[#94a3b8] hover:text-[#DC2626] p-1 transition-colors"
                        title="Report contribution to editorial desk"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Perspective Tag Badge */}
                  <div className="mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#f8fafc] text-[#1E3A8A] px-2 py-0.5 border border-[#e2e8f0]">
                      TAG: {comment.perspectiveTag}
                    </span>
                  </div>

                  {/* Content Body */}
                  <p className="font-sourceserif text-[15px] sm:text-[16px] leading-[1.6] text-[#1a1c1b] mb-3 whitespace-pre-line">
                    {comment.content}
                  </p>

                  {/* Citation Attachment Card if Present */}
                  {comment.citation && (
                    <div className="bg-[#f9f9f7] border-l-2 border-[#1E3A8A] p-2.5 mb-3 text-xs font-inter flex items-start space-x-2">
                      <FileCheck className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[9.5px] font-mono uppercase text-[#64748b]">CITED INSTITUTIONAL SOURCE:</div>
                        <div className="font-semibold text-[#0F172A] text-[12px]">{comment.citation.title}</div>
                        <div className="text-[10.5px] text-[#64748b] font-mono">{comment.citation.source}</div>
                      </div>
                    </div>
                  )}

                  {/* Action Bar (Endorse, Reply Count, Inline Reply Trigger) */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] text-xs font-mono">
                    <div className="flex items-center space-x-3">
                      
                      {/* Endorsement Button */}
                      <button
                        onClick={() => handleEndorseComment(comment.id)}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 border text-[10.5px] transition-colors cursor-pointer ${
                          comment.userEndorsed
                            ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                            : 'bg-white text-[#45464d] border-[#cbd5e1] hover:border-[#0F172A]'
                        }`}
                        title="Corroborate as sound institutional analysis"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>SOUND ANALYSIS ({comment.endorsements})</span>
                      </button>

                      {/* Reply Trigger */}
                      <button
                        onClick={() => {
                          if (!isSignedIn) {
                            triggerToast('Please sign in to reply to analyses.');
                            return;
                          }
                          setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                        }}
                        className="inline-flex items-center space-x-1 text-[#64748b] hover:text-[#0F172A] text-[10.5px] cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>REPLY {comment.replies && comment.replies.length > 0 ? `(${comment.replies.length})` : ''}</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-[#94a3b8] font-mono">ID: #{comment.id}</span>
                  </div>

                  {/* Inline Reply Form */}
                  {activeReplyId === comment.id && (
                    <form onSubmit={(e) => handleCreateReply(comment.id, e)} className="mt-3 pt-3 border-t border-[#e2e8f0] space-y-2">
                      <div className="text-[10px] font-mono uppercase text-[#64748b]">
                        Replying as <strong className="text-[#0F172A]">{currentUser?.name}</strong>:
                      </div>
                      <textarea
                        rows={2}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Address ${comment.author.name}'s point with cited evidence...`}
                        className="w-full bg-[#fcfcfb] border border-[#cbd5e1] focus:border-[#0F172A] p-2.5 text-xs font-sourceserif text-[#0F172A] focus:outline-hidden"
                      />
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setActiveReplyId(null)}
                          className="px-2.5 py-1 text-xs font-mono text-[#64748b] hover:text-[#0F172A]"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          disabled={!replyText.trim()}
                          className="bg-[#0F172A] text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#1E3A8A] transition-colors disabled:opacity-40"
                        >
                          SUBMIT REPLY
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Nested Replies Stream */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-3 sm:pl-5 border-l-2 border-[#cbd5e1] space-y-3">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className={`bg-[#fbfbfa] p-3 border text-left ${
                            reply.isReported ? 'border-[#fca5a5] bg-[#fff5f5]' : 'border-[#e2e8f0]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-newsreader text-[14px] font-bold text-[#0F172A]">
                                {reply.author.name}
                              </span>
                              {reply.author.isVerified && (
                                <span className="text-[9px] font-mono font-bold bg-[#f1f5f9] text-[#1E3A8A] px-1 py-0.2">
                                  {reply.author.badge || 'VERIFIED'}
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-[#64748b]">
                                · {reply.author.role}
                              </span>
                            </div>
                            <span className="text-[9.5px] font-mono text-[#94a3b8]">{reply.timestamp}</span>
                          </div>

                          <p className="font-sourceserif text-[14px] leading-relaxed text-[#1a1c1b] mb-2">
                            {reply.content}
                          </p>

                          {reply.citation && (
                            <div className="bg-white border border-[#e2e8f0] p-1.5 mb-2 text-[11px] font-inter">
                              <strong className="text-[#0F172A]">{reply.citation.title}</strong> · {reply.citation.source}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-[#f1f5f9]">
                            <button
                              onClick={() => handleEndorseComment(reply.id, true, comment.id)}
                              className={`inline-flex items-center space-x-1 px-1.5 py-0.5 border cursor-pointer ${
                                reply.userEndorsed
                                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                  : 'bg-white text-[#45464d] border-[#cbd5e1] hover:border-[#0F172A]'
                              }`}
                            >
                              <ThumbsUp className="w-2.5 h-2.5" />
                              <span>CONCUR ({reply.endorsements})</span>
                            </button>

                            <button
                              onClick={() => handleOpenReportModal(reply)}
                              className="text-[#94a3b8] hover:text-[#DC2626]"
                              title="Report reply"
                            >
                              <Flag className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* ================= COLUMN 3: Relevant Polls, Dossier Quick Access, Charter (Desktop 3 Cols) ================= */}
          <div className={`lg:col-span-3 space-y-5 ${mobileTab !== 'poll' && mobileTab !== 'charter' ? 'hidden lg:block' : 'block'}`}>
            
            {/* ----------------- Active Institutional Community Poll ----------------- */}
            {activePoll && (
              <div className="bg-[#f9f9f7] border-2 border-[#0F172A] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0F172A]">
                <div className="flex items-center justify-between pb-2 border-b border-[#0F172A] mb-3">
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
                    <Vote className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>INSTITUTIONAL POLL GAUGE</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#15803d] font-bold bg-[#f1f5f9] px-1.5 py-0.5 border border-[#e2e8f0]">
                    {activePoll.status}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-[10px] font-mono uppercase text-[#64748b]">QUESTION &amp; HORIZON:</div>
                  <h3 className="font-newsreader text-[17px] font-bold text-[#0F172A] leading-snug">
                    {activePoll.question}
                  </h3>
                  <p className="text-[11px] font-sourceserif text-[#45464d] pt-1">
                    {activePoll.context}
                  </p>
                </div>

                {/* Poll Options List */}
                <div className="space-y-2.5 my-3.5">
                  {activePoll.options.map((option) => {
                    const isSelected = activePoll.userVotedOptionId === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVotePoll(option.id)}
                        className={`w-full text-left p-2.5 border transition-all relative overflow-hidden cursor-pointer ${
                          isSelected
                            ? 'border-[#0F172A] bg-white shadow-xs'
                            : 'border-[#cbd5e1] bg-white hover:border-[#94a3b8]'
                        }`}
                      >
                        {/* Fill Progress Bar */}
                        <div
                          className={`absolute top-0 bottom-0 left-0 opacity-15 pointer-events-none transition-all duration-300 ${
                            isSelected ? 'bg-[#0F172A]' : 'bg-[#1E3A8A]'
                          }`}
                          style={{ width: `${option.percentage}%` }}
                        />

                        <div className="relative z-10 flex items-start justify-between gap-2">
                          <div className="flex items-start space-x-2">
                            <div
                              className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                                isSelected ? 'border-[#0F172A] bg-[#0F172A]' : 'border-[#94a3b8]'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                            <span className="text-[12px] font-inter text-[#1a1c1b] leading-tight">
                              {option.label}
                            </span>
                          </div>

                          <span className="font-mono text-[12px] font-bold text-[#0F172A] shrink-0">
                            {option.percentage}%
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Poll Metadata & Methodology */}
                <div className="pt-2 border-t border-[#cbd5e1] text-[10px] font-mono text-[#64748b] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>TOTAL SAMPLE: <strong className="text-[#0F172A]">{activePoll.totalVotes}</strong></span>
                    <span>{activePoll.closingDate}</span>
                  </div>
                  <div className="text-[9.5px] leading-tight text-[#76777d]">
                    {activePoll.methodologyNote}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- Paperly Deliberation Charter ----------------- */}
            <div className="bg-white border border-[#cbd5e1] p-4 text-xs font-inter space-y-3">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-[#e2e8f0]">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F172A]">
                  PAPERLY CIVIC CHARTER
                </h4>
              </div>

              <p className="text-[#45464d] text-[11px] leading-relaxed">
                Paperly is designed as a sanctuary for rigorous, high-signal civil deliberation. Contributors operate under the following institutional rules:
              </p>

              <div className="space-y-2 pt-1">
                {DELIBERATION_CHARTER_POINTS.map((pt, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-mono text-[10px] font-bold uppercase text-[#0F172A]">
                      0{idx + 1}. {pt.title}
                    </div>
                    <p className="text-[10.5px] text-[#64748b] leading-snug">
                      {pt.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#e2e8f0] text-[10px] font-mono text-[#1E3A8A]">
                EDITORIAL STANDARDS &amp; MODERATION DIRECTIVE v2.4
              </div>
            </div>

            {/* ----------------- Verified Contributor Directory Callout ----------------- */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-3.5 space-y-2 text-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748b]">
                VERIFIED CONTRIBUTORS
              </div>
              <div className="space-y-1.5 text-[11px] font-inter">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-[#0F172A] text-white flex items-center justify-center font-mono text-[10px]">
                    KA
                  </div>
                  <div>
                    <span className="font-semibold text-[#0F172A]">Prof. Kayode Adeyemi</span> · UNILAG Registrar
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-[#0F172A] text-white flex items-center justify-center font-mono text-[10px]">
                    BC
                  </div>
                  <div>
                    <span className="font-semibold text-[#0F172A]">Babajide Cole</span> · Afrinvest Credit Head
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-[#0F172A] text-white flex items-center justify-center font-mono text-[10px]">
                    FA
                  </div>
                  <div>
                    <span className="font-semibold text-[#0F172A]">Folashade Adelekan, CFA</span> · Meristem
                  </div>
                </div>
              </div>
              <div className="pt-2 text-[10px] font-mono text-[#64748b]">
                Want institutional verification? Contact <span className="text-[#0F172A] underline">desk@paperly.ai</span>.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================= EDITORIAL MODERATION & REPORTING MODAL ================= */}
      {reportingComment && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border-2 border-[#0F172A] shadow-[8px_8px_0px_0px_#0F172A] max-w-lg w-full p-5 space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div className="flex items-center space-x-2">
                <Flag className="w-4 h-4 text-[#DC2626]" />
                <h3 className="font-newsreader text-[19px] font-bold text-[#0F172A]">
                  Report Dialectical Contribution
                </h3>
              </div>
              <button
                onClick={() => setReportingComment(null)}
                className="p-1 text-[#64748b] hover:text-[#0F172A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#f8fafc] p-3 border border-[#e2e8f0] text-xs space-y-1">
              <div className="text-[10px] font-mono text-[#64748b]">FLAGGING RECORD BY:</div>
              <div className="font-bold text-[#0F172A]">{reportingComment.author.name} ({reportingComment.author.role})</div>
              <p className="text-[#45464d] line-clamp-2 italic font-sourceserif">
                &ldquo;{reportingComment.content}&rdquo;
              </p>
            </div>

            {/* Reason Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block">
                Select Charter Violation Ground:
              </label>

              {[
                'Unsubstantiated or Disproven Factual Claim',
                'Ad Hominem or Uncivil Discourse',
                'Undisclosed Commercial Conflict of Interest',
                'Off-Topic or Incoherent with Development',
                'Impersonation of Institutional Authority',
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center space-x-2 p-2 border border-[#e2e8f0] hover:bg-[#f8fafc] cursor-pointer text-xs"
                >
                  <input
                    type="radio"
                    name="report-reason"
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="accent-[#0F172A]"
                  />
                  <span className="font-inter text-[#1a1c1b]">{reason}</span>
                </label>
              ))}
            </div>

            {/* Context Note */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block mb-1">
                Additional Verification Note (Optional):
              </label>
              <textarea
                rows={2}
                value={reportNote}
                onChange={(e) => setReportNote(e.target.value)}
                placeholder="Cite counter-document or specific reason for editorial review..."
                className="w-full bg-[#fcfcfb] border border-[#cbd5e1] p-2 text-xs font-inter focus:border-[#0F172A] focus:outline-hidden"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#e2e8f0]">
              <button
                type="button"
                onClick={() => setReportingComment(null)}
                className="px-3 py-1.5 text-xs font-mono uppercase text-[#64748b] hover:text-[#0F172A]"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleSubmitReport}
                className="bg-[#DC2626] text-white px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#b91c1c] transition-colors"
              >
                SUBMIT FLAG TO EDITORIAL DESK
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
