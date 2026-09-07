import { X, Search, ChevronRight, Shield, Layers, Radio, Sparkles, BookOpen, Video, Clock, Bookmark, SlidersHorizontal, ArrowUpRight, Cpu } from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav: string;
  onSelectNav: (navId: string) => void;
  activeEdition: string;
  onSelectEdition: (edition: 'lagos' | 'london' | 'new-york' | 'nairobi') => void;
  onOpenSearch: () => void;
  onOpenSignIn: () => void;
  onOpenSubscribe: () => void;
  isNewsprintGrain: boolean;
  onToggleNewsprintGrain: () => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  activeNav,
  onSelectNav,
  activeEdition,
  onSelectEdition,
  onOpenSearch,
  onOpenSignIn,
  onOpenSubscribe,
  isNewsprintGrain,
  onToggleNewsprintGrain,
}: MobileNavDrawerProps) {
  if (!isOpen) return null;

  const handleNavClick = (id: string) => {
    onSelectNav(id);
    onClose();
  };

  const primaryDesks = [
    { id: 'briefing', label: 'The Paperly Briefing', sub: 'Master intelligence homepage' },
    { id: 'nigeria', label: 'Nigeria', sub: 'Sovereign & macro governance' },
    { id: 'world', label: 'World', sub: 'Geopolitics & global supply' },
    { id: 'business', label: 'Business', sub: 'Corporate & capital flows' },
    { id: 'technology', label: 'Technology', sub: 'AI, fintech & infrastructure' },
    { id: 'markets', label: 'Markets', sub: 'FX, yields, commodities & equities' },
  ];

  const intelligenceViews = [
    { id: 'impact-watch', label: 'Impact Watch', icon: Radio, badge: 'CONSEQUENCES' },
    { id: 'perspectives', label: 'Perspectives', icon: Layers, badge: 'DIALECTIC' },
    { id: 'developing', label: 'Developing Situations', icon: Sparkles, badge: 'LIVE' },
    { id: 'explained', label: 'Explained', icon: BookOpen, badge: 'CONTEXT' },
    { id: 'video', label: 'Video Intelligence', icon: Video, badge: 'VISUAL' },
    { id: 'latest', label: 'Latest News Wire', icon: Clock, badge: 'CHRONOLOGY' },
  ];

  const personalAndTools = [
    { id: 'for-you', label: 'For You / Personalised Briefing', icon: Bookmark },
    { id: 'how-it-works', label: 'How Paperly Works (Methodology)', icon: Shield },
    { id: 'admin-portal', label: 'Internal Operations & Source Health', icon: SlidersHorizontal },
    { id: 'design-system', label: 'Design System & UX Spec Handoff', icon: Cpu },
  ];

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Slide-out Sheet */}
      <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl border-r border-[#e2e8f0] overflow-y-auto z-10">
        
        {/* Header with Brand & Close */}
        <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-[#0F172A] flex items-center justify-center shadow-[1px_1px_0px_0px_#0F172A]">
              <span className="text-[11px] font-bold font-newsreader text-[#0F172A]">P</span>
            </div>
            <span className="font-newsreader text-xl font-bold tracking-tight text-[#0F172A]">
              Paperly
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded border border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:text-[#0F172A] hover:bg-[#f8fafc] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="p-4 border-b border-[#f1f5f9]">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between bg-[#f8fafc] border border-[#cbd5e1] py-2 px-3 text-left text-xs font-inter text-[#64748b] hover:border-[#0F172A] transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search dossiers, topics, entities...</span>
            </div>
            <span className="text-[10px] font-mono text-[#94a3b8]">⌘K</span>
          </button>
        </div>

        {/* Auth / Subscribe Row */}
        <div className="px-4 py-3 border-b border-[#f1f5f9] grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenSignIn();
            }}
            className="w-full py-2 text-center text-xs font-bold font-inter tracking-wider uppercase border border-[#0F172A] text-[#0F172A] hover:bg-[#f8fafc]"
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenSubscribe();
            }}
            className="w-full py-2 text-center text-xs font-bold font-inter tracking-wider uppercase bg-[#0F172A] text-white hover:bg-[#1E3A8A] shadow-xs"
          >
            SUBSCRIBE
          </button>
        </div>

        {/* Content Navigation Lists */}
        <div className="p-4 space-y-6 flex-1">
          
          {/* Primary Editorial Desks */}
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#94a3b8] mb-2">
              Editorial Desks
            </div>
            <nav className="space-y-1">
              {primaryDesks.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between border transition-all ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                        : 'bg-white hover:bg-[#f8fafc] text-[#1a1c1b] border-transparent hover:border-[#e2e8f0]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold tracking-wider uppercase font-inter">
                        {item.label}
                      </div>
                      <div className={`text-[10px] font-newsreader italic ${isActive ? 'text-slate-300' : 'text-[#64748b]'}`}>
                        {item.sub}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#94a3b8]'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Intelligence Products */}
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#94a3b8] mb-2">
              Intelligence Experiences
            </div>
            <nav className="space-y-1">
              {intelligenceViews.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between border transition-all ${
                      isActive
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] font-bold'
                        : 'bg-white hover:bg-[#f8fafc] text-[#1a1c1b] border-transparent hover:border-[#e2e8f0]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#1E3A8A]'}`} />
                      <span className="text-xs font-semibold tracking-wide font-inter">
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 uppercase tracking-wider ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#475569]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Institutional & Operations */}
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#94a3b8] mb-2">
              System & Institutional
            </div>
            <nav className="space-y-1">
              {personalAndTools.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs font-inter border transition-all ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#f8fafc] border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-3.5 h-3.5 text-[#64748b]" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-[#94a3b8]" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Edition Selector */}
          <div className="pt-2 border-t border-[#f1f5f9]">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#94a3b8] mb-2">
              Active Regional Edition
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-inter">
              {[
                { id: 'lagos', label: 'Lagos' },
                { id: 'london', label: 'London' },
                { id: 'new-york', label: 'New York' },
                { id: 'nairobi', label: 'Nairobi' },
              ].map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => onSelectEdition(ed.id as any)}
                  className={`py-1.5 px-2 text-center uppercase tracking-wider text-[10px] border transition-colors ${
                    activeEdition === ed.id
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                      : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f8fafc]'
                  }`}
                >
                  {ed.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Texture Toggle */}
          <div className="pt-2 border-t border-[#f1f5f9] pb-6">
            <button
              onClick={onToggleNewsprintGrain}
              className="w-full flex items-center justify-between p-2.5 bg-[#f8fafc] border border-[#cbd5e1] text-[11px] font-mono text-[#334155]"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isNewsprintGrain ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
                <span>NEWSPRINT FEEL</span>
              </div>
              <span className="font-bold">{isNewsprintGrain ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
