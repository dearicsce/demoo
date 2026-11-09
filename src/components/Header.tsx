import React, { useState } from 'react';
import { ShoppingBag, Heart, Calendar, Menu, X, Shield, Sparkles, MessageCircle } from 'lucide-react';
import { BoutiqueSettings } from '../types';

interface HeaderProps {
  settings: BoutiqueSettings;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onOpenWalkthrough: () => void;
  onNavigate: (sectionId: string) => void;
  isAdminView: boolean;
  onToggleAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAppointment,
  onOpenWalkthrough,
  onNavigate,
  isAdminView,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Demo Bar - Explicit Honesty & Pitch Helper */}
      <div className="bg-[#420A16] text-[#DFC282] text-xs py-2 px-4 border-b border-[#540D1E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#BA8E35]"></span>
            <span className="font-medium text-[#FAF7F2]">Concept Demo for Boutique Owner Presentation</span>
            <span className="hidden md:inline text-white/50">·</span>
            <span className="hidden md:inline text-white/80">Sample catalogue &amp; direct WhatsApp enquiry workflow</span>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <button
              onClick={onOpenWalkthrough}
              className="flex items-center gap-1.5 text-[#DFC282] hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
              aria-label="Open presentation walkthrough"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Pitch Guide</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer px-2 py-0.5 rounded text-[11px] font-medium ${
                isAdminView
                  ? 'bg-[#BA8E35] text-[#420A16]'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
              aria-label="Toggle Demo Admin view"
            >
              <Shield className="w-3 h-3" />
              <span>{isAdminView ? 'Exit Demo Admin' : 'Demo Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header adhering to Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DCce]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (one single text element, no subtitle in header) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer"
            aria-label="Punjab Boutique Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#6B1226] group-hover:text-[#420A16] transition-colors whitespace-nowrap shrink-0 block">
              {settings.boutiqueName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7422] block font-medium">
              Amritsar · Bespoke Couture
            </span>
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A423F]">
            <button
              onClick={() => handleNavClick('home')}
              className="hover:text-[#6B1226] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="hover:text-[#6B1226] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className="hover:text-[#6B1226] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#6B1226] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              About Boutique
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#6B1226] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contact &amp; Visit
            </button>
          </nav>

          {/* Zone 3: Primary Action & Interactive Icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Book Styling Appointment Button */}
            <button
              onClick={onOpenAppointment}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-[#6B1226] border border-[#6B1226]/30 hover:border-[#6B1226] rounded bg-[#6B1226]/5 hover:bg-[#6B1226]/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-[#4A423F] hover:text-[#6B1226] hover:bg-[#F3ECE1] rounded-full transition-colors cursor-pointer"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#BA8E35] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Enquiry Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-[#6B1226] hover:bg-[#540D1E] text-[#FAF7F2] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              aria-label={`Enquiry Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#DFC282]" />
              <span className="hidden sm:inline">Enquiry Cart</span>
              <span className="w-5 h-5 bg-[#BA8E35] text-[#420A16] text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A423F] hover:text-[#6B1226] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E6DCce] bg-[#FAF7F2] px-6 py-4 space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2 text-sm font-medium text-[#221B19] hover:text-[#6B1226]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="block w-full text-left py-2 text-sm font-medium text-[#221B19] hover:text-[#6B1226]"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className="block w-full text-left py-2 text-sm font-medium text-[#221B19] hover:text-[#6B1226]"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left py-2 text-sm font-medium text-[#221B19] hover:text-[#6B1226]"
            >
              About Boutique
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left py-2 text-sm font-medium text-[#221B19] hover:text-[#6B1226]"
            >
              Contact &amp; Visit
            </button>
            <div className="pt-2 border-t border-[#E6DCce] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAppointment();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-[#6B1226] border border-[#6B1226]/30 rounded bg-[#6B1226]/5"
              >
                Book Styling Appointment
              </button>
              <button
                onClick={() => {
                  onOpenWalkthrough();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-medium text-[#BA8E35] bg-[#420A16] rounded"
              >
                View Owner Pitch Guide
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
