import React from 'react';
import { Scissors, Sparkles, Gem, MessageCircle } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'Bespoke Custom Stitching',
      description:
        'Every outfit can be tailored to individual body measurements, preferred kurti lengths, necklines, and sleeve styles by experienced master tailors.',
    },
    {
      icon: Sparkles,
      title: 'Artisanal Punjabi Embroidery',
      description:
        'Showcasing traditional Punjabi Phulkari, intricate golden Tilla work, Gota Patti, and Dabka needlework celebrating regional textile heritage.',
    },
    {
      icon: Gem,
      title: 'Curated Heritage Textiles',
      description:
        'Selection of authentic handloom fabrics including pure silk velvet, fine Chanderi, Banarasi brocades, and sheer lightweight organza.',
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Consultations',
      description:
        'Direct personal contact with boutique stylists for fabric videos, personalized sizing recommendations, and dispatch updates without checkout friction.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#FAF7F2] border-b border-[#E6DCce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-[#9E7422] font-semibold mb-2">
            The Atelier Standard
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#420A16] font-normal tracking-tight">
            Crafting Elegance for Every Occasion
          </h2>
          <p className="mt-3 text-sm text-[#5A514D] leading-relaxed">
            Combining traditional Punjabi textile craftsmanship with modern bespoke tailoring for discerning clients worldwide.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#E6DCce] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#BA8E35]/60 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#DFC282]/40 flex items-center justify-center text-[#6B1226] mb-5">
                    <Icon className="w-6 h-6 text-[#BA8E35]" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#420A16] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5A514D] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DCce]/60 text-[11px] font-medium text-[#9E7422]">
                  {`0${index + 1}. Punjab Boutique Atelier`}
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Call to Action Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#420A16] to-[#540D1E] rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#DFC282]/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#DFC282] font-semibold block mb-2">
              Have a Specific Design in Mind?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF7F2] leading-snug">
              Share Your Reference Photos or Custom Measurements
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
              Our master cut-masters and embroidery artisans can recreate or adapt designs for your family weddings, festivals, and parties.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
