import { useState } from 'react';
import { Search, User, ChevronDown, Menu } from 'lucide-react';

interface HeaderMastheadProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenSignIn: () => void;
  onOpenMenu?: () => void;
}

export function HeaderMasthead({
  activeNav,
  onSelectNav,
  onOpenSearch,
  onOpenSubscribe,
  onOpenSignIn,
  onOpenMenu,
}: HeaderMastheadProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navItems = [
    { label: 'BRIEFING', id: 'briefing' },
    { label: 'COMMUNITY', id: 'community' },
    { label: 'NIGERIA', id: 'nigeria' },
    { label: 'WORLD', id: 'world' },
    { label: 'BUSINESS', id: 'business' },
    { label: 'TECHNOLOGY', id: 'technology' },
    { label: 'MARKETS', id: 'markets' },
    { label: 'IMPACT WATCH', id: 'impact-watch' },
    { label: 'PERSPECTIVES', id: 'perspectives' },
    { label: 'DEVELOPING', id: 'developing' },
    { label: 'EXPLAINED', id: 'explained' },
    { label: 'VIDEO', id: 'video' },
    { label: 'LATEST', id: 'latest' },
    { label: 'MORE', id: 'more', hasDropdown: true },
  ];

  const moreItems = [
    { label: 'FOR YOU / WATCHLIST', id: 'for-you' },
    { label: 'HOW PAPERLY WORKS', id: 'how-it-works' },
    { label: 'EDITORIAL PRINCIPLES', id: 'principles' },
    { label: 'ADVERTISE WITH PAPERLY', id: 'advertise' },
    { label: 'OPERATIONS & SOURCE HEALTH', id: 'admin-portal' },
    { label: 'DESIGN SYSTEM & SPEC HANDOFF', id: 'design-system' },
  ];

  return (
    <div className="bg-white border-b border-[#e2e8f0] relative">
      {/* Masthead Main Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3 sm:space-x-3.5">
          {/* Mobile Menu Trigger */}
          <button
            onClick={onOpenMenu}
            className="sm:hidden p-1 text-[#0F172A] hover:bg-[#f1f5f9] rounded cursor-pointer"
            aria-label="Open Desks Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSelectNav('briefing')}
            className="flex items-center space-x-2 text-left cursor-pointer group"
          >
            {/* Architectural folded document glyph */}
            <div className="w-6 h-6 border-2 border-[#0F172A] bg-transparent flex items-center justify-center relative shadow-[1px_1px_0px_0px_#0F172A] group-hover:bg-[#0F172A] transition-colors">
              <span className="text-[11px] font-bold font-newsreader tracking-tighter text-[#0F172A] group-hover:text-white transition-colors">P</span>
            </div>
            <span className="font-newsreader text-[26px] font-bold tracking-tight text-[#0F172A]">
              Paperly
            </span>
          </button>
          <div className="hidden md:block h-5 w-[1px] bg-[#cbd5e1] mx-1" />
          <span className="hidden md:inline-block font-newsreader italic text-[15px] text-[#45464d] font-normal">
            Make sense of what is happening.
          </span>
        </div>

        {/* Search Bar - Computational Dossiers */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6 hidden sm:block">
          <button
            id="btn-search-trigger"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between bg-white border border-[#cbd5e1] hover:border-[#0F172A] transition-colors py-1.5 px-3 text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-2 text-[#64748b] group-hover:text-[#0F172A] transition-colors">
              <Search className="w-3.5 h-3.5 text-[#64748b]" />
              <span className="text-xs font-inter text-[#64748b] truncate">
                Search computational dossiers, entities...
              </span>
            </div>
            <kbd className="hidden lg:inline-flex items-center space-x-0.5 text-[10px] font-mono bg-[#f1f5f9] border border-[#cbd5e1] px-1.5 py-0.5 text-[#64748b]">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* User / Membership Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            id="btn-mobile-search"
            onClick={onOpenSearch}
            className="sm:hidden p-1.5 text-[#45464d] hover:text-[#0F172A]"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            id="btn-sign-in"
            onClick={onOpenSignIn}
            className="text-[11px] font-bold font-inter tracking-wider uppercase text-[#0F172A] px-2.5 py-1.5 hover:bg-[#eeeeec] transition-colors cursor-pointer"
          >
            SIGN IN
          </button>

          <button
            id="btn-subscribe"
            onClick={onOpenSubscribe}
            className="text-[11px] font-bold font-inter tracking-wider uppercase bg-[#0F172A] text-white px-3.5 py-1.5 hover:bg-[#1E3A8A] transition-colors shadow-sm cursor-pointer"
          >
            SUBSCRIBE
          </button>

          <button
            id="btn-user-avatar"
            onClick={onOpenSignIn}
            className="w-7 h-7 rounded-full bg-[#131b2e] text-white flex items-center justify-center hover:opacity-90 transition-opacity ml-1"
            title="Account Profile"
          >
            <User className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Primary Section Navigation */}
      <nav className="border-t border-[#e2e8f0] overflow-x-auto scrollbar-none relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-5 sm:space-x-6 text-[11px] font-inter font-bold tracking-wider uppercase whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            if (item.hasDropdown) {
              return (
                <div key={item.id} className="relative">
                  <button
                    id={`nav-item-${item.id}`}
                    onClick={() => setIsMoreOpen((prev) => !prev)}
                    className={`py-2.5 transition-all duration-100 flex items-center space-x-1 cursor-pointer relative ${
                      isMoreOpen
                        ? 'text-[#0F172A] font-extrabold border-b-2 border-[#0F172A]'
                        : 'text-[#64748b] hover:text-[#0F172A] border-b-2 border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 text-[#64748b]" />
                  </button>

                  {/* Dropdown Menu */}
                  {isMoreOpen && (
                    <div className="absolute right-0 top-full mt-0 w-64 bg-white border border-[#0F172A] shadow-xl py-2 z-50 text-left">
                      {moreItems.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            onSelectNav(m.id);
                            setIsMoreOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-mono font-semibold text-[#1a1c1b] hover:bg-[#0F172A] hover:text-white transition-colors"
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  setIsMoreOpen(false);
                  onSelectNav(item.id);
                }}
                className={`py-2.5 transition-all duration-100 flex items-center space-x-1 cursor-pointer relative ${
                  isActive
                    ? 'text-[#0F172A] font-extrabold border-b-2 border-[#0F172A]'
                    : 'text-[#64748b] hover:text-[#0F172A] border-b-2 border-transparent'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
