import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, Compass } from 'lucide-react';
import { BoutiqueSettings } from '../types';

interface HeroProps {
  settings: BoutiqueSettings;
  onExploreCollections: () => void;
  onBookAppointment: () => void;
  onQuickWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreCollections,
  onBookAppointment,
  onQuickWhatsApp,
}) => {
  return (
    <section className="relative bg-[#FAF7F2] overflow-hidden border-b border-[#E6DCce]">
      {/* Background architectural aura */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#DFC282]/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#6B1226]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7422]">
              <Sparkles className="w-3.5 h-3.5 text-[#BA8E35]" />
              <span>Haute Couture Punjabi &amp; Festive Atelier</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#420A16] font-normal leading-[1.12] tracking-tight [text-wrap:balance]">
              Elegance Woven Into Every Thread
            </h1>

            <p className="text-base sm:text-lg text-[#5A514D] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Welcome to the digital lookbook of {settings.boutiqueName}. Discover bespoke Punjabi suits, heritage Phulkari dupattas, and handcrafted festive silhouettes. Browse our curated sample catalog and connect directly with our stylists on WhatsApp for custom sizing and inquiries.
            </p>

            {/* Quick trust highlights (no pill badges, clean typographic separation) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3 text-xs text-[#736863] pt-1">
              <span>Bespoke Tailoring</span>
              <span aria-hidden="true" className="text-[#DFC282]">·</span>
              <span>Authentic Punjabi Handwork</span>
              <span aria-hidden="true" className="text-[#DFC282]">·</span>
              <span>Direct WhatsApp Consultations</span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#6B1226] hover:bg-[#540D1E] text-[#FAF7F2] text-sm font-semibold tracking-wider uppercase rounded transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 text-[#DFC282] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onQuickWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#420A16] border border-[#DFC282] text-sm font-medium rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Enquiry Demo</span>
              </button>
            </div>

            {/* Pitch context note */}
            <p className="text-[11px] text-[#8C807A] italic">
              *Designed for boutique clients to browse effortlessly and order directly via chat without payment cart friction.
            </p>
          </div>

          {/* Right Column: High-Fashion Generated Image Asset */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold decorative border frame */}
              <div className="absolute -inset-2.5 rounded-2xl border border-[#DFC282]/50 pointer-events-none transform rotate-1 hidden sm:block" />
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#EDE4D8] aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                <img
                  src="/src/assets/images/hero_punjabi_boutique_1794219999073.jpg"
                  alt="Punjab Boutique Couture Bridal and Festive Exhibit"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle luxury overlay banner at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#420A16]/90 via-[#420A16]/50 to-transparent text-white">
                  <div className="text-xs uppercase tracking-widest text-[#DFC282] font-semibold">
                    New Season Showcase
                  </div>
                  <div className="font-serif text-lg font-medium text-[#FAF7F2]">
                    Royal Maroon &amp; Zardozi Heritage Suite
                  </div>
                  <div className="text-[11px] text-white/80 mt-0.5">
                    Sample Masterpiece · Custom Stitching Available
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
