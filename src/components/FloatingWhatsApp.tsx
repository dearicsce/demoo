import React, { useState } from 'react';
import { MessageCircle, X, ShoppingBag, Sparkles, Scissors } from 'lucide-react';
import { BoutiqueSettings } from '../types';

interface FloatingWhatsAppProps {
  settings: BoutiqueSettings;
  cartCount: number;
  onOpenCart: () => void;
  onQuickGeneralWhatsApp: () => void;
  onCustomStitchingWhatsApp: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onQuickGeneralWhatsApp,
  onCustomStitchingWhatsApp,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      
      {/* Quick Menu Popup */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-[#DFC282]/50 p-4 w-72 animate-in slide-in-from-bottom-2 fade-in">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E6DCce]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <span className="font-serif text-xs font-bold text-[#420A16]">
                {settings.boutiqueName} Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8C807A] hover:text-[#420A16] p-1 cursor-pointer"
              aria-label="Close chat menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-[#736863] leading-relaxed mb-3">
            Namaste! How can our master stylists help you today?
          </p>

          <div className="space-y-1.5 text-xs">
            <button
              onClick={() => {
                setIsOpen(false);
                onQuickGeneralWhatsApp();
              }}
              className="w-full text-left p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#221B19] font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#BA8E35] shrink-0" />
              <span className="truncate">Ask about latest Punjabi suits</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onCustomStitchingWhatsApp();
              }}
              className="w-full text-left p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#221B19] font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Scissors className="w-3.5 h-3.5 text-[#6B1226] shrink-0" />
              <span className="truncate">Custom tailoring &amp; measurements</span>
            </button>

            {cartCount > 0 && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCart();
                }}
                className="w-full text-left p-2 rounded-lg bg-[#420A16] text-[#DFC282] font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Send Enquiry Cart</span>
                </div>
                <span className="text-[10px] bg-[#BA8E35] text-[#420A16] px-1.5 py-0.2 rounded-full font-bold">
                  {cartCount}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 cursor-pointer group active:scale-95"
        aria-label="Open WhatsApp styling chat options"
        title="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7 fill-current" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#420A16] text-[#DFC282] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </div>
        )}
      </button>

    </div>
  );
};
