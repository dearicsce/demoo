import React from 'react';
import { BoutiqueSettings } from '../types';
import { MessageCircle, MapPin, Clock, Phone, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  settings: BoutiqueSettings;
  onNavigate: (sectionId: string) => void;
  onOpenWalkthrough: () => void;
  onToggleAdmin: () => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenWalkthrough,
  onToggleAdmin,
  onOpenAppointment,
}) => {
  return (
    <footer id="contact" className="bg-[#420A16] text-[#FAF7F2] border-t border-[#540D1E] pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Atelier Narrative */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#DFC282]">
              {settings.boutiqueName}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Curators of authentic Punjabi heritage wear, hand-embroidered bridal suits, and bespoke occasion silhouettes crafted with time-honored artisanal traditions.
            </p>
            <div className="text-[11px] text-[#BA8E35] font-medium tracking-wide">
              {settings.tagline}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#DFC282]">
              Showcase Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#DFC282] transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#DFC282] transition-colors cursor-pointer"
                >
                  Collections &amp; Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-[#DFC282] transition-colors cursor-pointer"
                >
                  New Season Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-[#DFC282] transition-colors cursor-pointer"
                >
                  Book Bespoke Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWalkthrough}
                  className="text-[#DFC282] hover:underline transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Owner Pitch Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Hours & Demo Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#DFC282]">
              Studio &amp; Consultations
            </h4>
            <div className="space-y-2.5 text-xs text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
                <span>{settings.addressPlaceholder}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
                <span>{settings.consultationHours}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
                <span>
                  {settings.isNumberConfigured
                    ? `+${settings.whatsappNumber} (Live Connected)`
                    : 'WhatsApp Enquiry (Demo Mode)'}
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Demo Admin & Safety Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#DFC282]">
              Concept Demo Controls
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Demonstrating the WhatsApp-first customer funnel for fashion retail.
            </p>
            <button
              onClick={onToggleAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-[#DFC282] border border-[#DFC282]/30 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Open Demo Admin Console</span>
            </button>
          </div>

        </div>

        {/* Bottom Safety & Honesty Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {settings.boutiqueName}. Concept demonstration created for client presentation.
            </p>
            <p className="text-[11px] text-white/40 mt-1">
              Sample listings for demonstration purposes only. Not an official online shop or payment processor.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-white/40">Punjab Boutique Prototype</span>
            <span className="text-white/20">·</span>
            <button
              onClick={onOpenWalkthrough}
              className="text-[#DFC282] hover:underline cursor-pointer"
            >
              Pitch Notes
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
