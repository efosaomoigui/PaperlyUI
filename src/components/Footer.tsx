import { useState, FormEvent } from 'react';
import { Check } from 'lucide-react';

interface FooterProps {
  onOpenEditorialCharter: () => void;
  onOpenDesk: (deskName: string) => void;
}

export function Footer({ onOpenEditorialCharter, onOpenDesk }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2500);
    }
  };

  return (
    <footer className="bg-[#f4f4f2] border-t border-[#cbd5e1] text-[#1a1c1b] pt-10 pb-8 mt-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Major Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#e2e8f0]">
          
          {/* Column 1: Brand & Node Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-[#0F172A] bg-transparent flex items-center justify-center">
                <span className="text-[10px] font-bold font-newsreader text-[#0F172A]">P</span>
              </div>
              <span className="font-newsreader text-[22px] font-bold tracking-tight text-[#0F172A]">
                Paperly
              </span>
            </div>

            <p className="font-sourceserif text-[13px] leading-[1.6] text-[#45464d] max-w-md">
              Modern computational news synthesis. Transforming asymmetric noise into transparent, verifiable intelligence for institutional leaders, researchers, and global citizens.
            </p>

            <div className="text-[10px] font-mono tracking-widest uppercase text-[#76777d]">
              <span className="font-bold text-[#0F172A]">NODES:</span> LONDON · LAGOS · NEW YORK · NAIROBI
            </div>
          </div>

          {/* Column 2: Desk & Taxonomy */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F172A]">
              DESK &amp; TAXONOMY
            </div>
            <ul className="space-y-2 text-[12px] font-sourceserif text-[#45464d]">
              {[
                'Morning Wire & Synthesis',
                'Sovereign Debt & FX Desk',
                'Commodities & Energy Transition',
                'Confidence Scoring Protocol',
              ].map((item) => (
                <li key={item}>
                  <button
                    id={`btn-footer-desk-${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => onOpenDesk(item)}
                    className="hover:text-[#0F172A] hover:underline underline-offset-2 transition-colors cursor-pointer text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Executive Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F172A]">
              EXECUTIVE DISPATCH
            </div>
            <p className="font-sourceserif text-[12px] leading-[1.5] text-[#45464d]">
              Receive twice-daily analytical digests synthesized across 12,000 algorithmic sources.
            </p>

            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <input
                id="input-executive-dispatch-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Institutional email..."
                className="flex-1 bg-white border border-[#cbd5e1] focus:border-[#0F172A] px-3 py-1.5 text-xs font-inter outline-none"
              />
              <button
                id="btn-executive-dispatch-join"
                type="submit"
                className="bg-[#0F172A] text-white px-3.5 py-1.5 text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#1E3A8A] transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? (
                  <span className="flex items-center space-x-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>SENT</span>
                  </span>
                ) : (
                  'JOIN'
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] font-mono text-[#15803d]">
                ✓ Confirmed. Added to confidential morning transmission queue.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Legal & Algorithmic Provenance Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-mono uppercase text-[#76777d]">
          <div>
            © 2025 PAPERLY MEDIA &amp; SYNTHESIS CORP. ALL RIGHTS RESERVED.
          </div>

          <div className="text-[#45464d] font-semibold">
            algorithmic provenance: synthesis v4.12 // hash verified
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-privacy-policy"
              onClick={onOpenEditorialCharter}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <span>|</span>
            <button
              id="btn-terms-of-dispatch"
              onClick={onOpenEditorialCharter}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              TERMS OF DISPATCH
            </button>
            <span>|</span>
            <button
              id="btn-editorial-charter"
              onClick={onOpenEditorialCharter}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              EDITORIAL CHARTER
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
