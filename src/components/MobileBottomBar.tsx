import { Home, Radio, Clock, Search, Menu } from 'lucide-react';

interface MobileBottomBarProps {
  activeNav: string;
  onSelectNav: (navId: string) => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}

export function MobileBottomBar({
  activeNav,
  onSelectNav,
  onOpenSearch,
  onOpenMenu,
}: MobileBottomBarProps) {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] px-2 py-1 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 items-center justify-around">
        
        {/* 1. Briefing */}
        <button
          onClick={() => onSelectNav('briefing')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[44px] transition-colors ${
            activeNav === 'briefing' ? 'text-[#0F172A]' : 'text-[#64748b] hover:text-[#0F172A]'
          }`}
          aria-label="The Paperly Briefing"
        >
          <Home className={`w-4 h-4 ${activeNav === 'briefing' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] font-inter font-bold tracking-tight mt-0.5">Briefing</span>
        </button>

        {/* 2. Impact Watch */}
        <button
          onClick={() => onSelectNav('impact-watch')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[44px] transition-colors relative ${
            activeNav === 'impact-watch' ? 'text-[#1E3A8A]' : 'text-[#64748b] hover:text-[#1E3A8A]'
          }`}
          aria-label="Impact Watch"
        >
          <Radio className={`w-4 h-4 ${activeNav === 'impact-watch' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] font-inter font-bold tracking-tight mt-0.5">Impact</span>
          <span className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
        </button>

        {/* 3. Latest */}
        <button
          onClick={() => onSelectNav('latest')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[44px] transition-colors ${
            activeNav === 'latest' ? 'text-[#0F172A]' : 'text-[#64748b] hover:text-[#0F172A]'
          }`}
          aria-label="Latest Wire"
        >
          <Clock className={`w-4 h-4 ${activeNav === 'latest' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] font-inter font-bold tracking-tight mt-0.5">Latest</span>
        </button>

        {/* 4. Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1.5 px-1 min-h-[44px] text-[#64748b] hover:text-[#0F172A] transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4 stroke-2" />
          <span className="text-[10px] font-inter font-bold tracking-tight mt-0.5">Search</span>
        </button>

        {/* 5. Menu / All Desks */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1.5 px-1 min-h-[44px] text-[#64748b] hover:text-[#0F172A] transition-colors"
          aria-label="Open Desks & Menu"
        >
          <Menu className="w-4 h-4 stroke-2" />
          <span className="text-[10px] font-inter font-bold tracking-tight mt-0.5">Desks</span>
        </button>

      </div>
    </div>
  );
}
