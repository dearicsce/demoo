import React from 'react';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (category: Category | 'All') => void;
}

interface CategoryInfo {
  name: Category;
  tagline: string;
  sampleCount: string;
  image: string;
}

const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Punjabi Suits',
    tagline: 'Patiala salwars, short kurtis & zardozi borders',
    sampleCount: 'Classic & Modern Silhouettes',
    image: '/src/assets/images/punjabi_suit_maroon_1794219999388.jpg',
  },
  {
    name: 'Salwar Kameez',
    tagline: 'Pure Chanderi, Georgette & Gota Patti accents',
    sampleCount: 'Timeless Day & Evening Wear',
    image: '/src/assets/images/salwar_kameez_chanderi_1794220000323.jpg',
  },
  {
    name: 'Kurtis',
    tagline: 'Tilla embroidered kurtas & palazzo separates',
    sampleCount: 'Everyday Luxury & Occasions',
    image: '/src/assets/images/salwar_kameez_chanderi_1794220000323.jpg',
  },
  {
    name: 'Party Wear',
    tagline: 'Embellished jacket sets, shararas & gowns',
    sampleCount: 'Cocktails & Sangeet Ceremonies',
    image: '/src/assets/images/festive_anarkali_wine_1794220001824.jpg',
  },
  {
    name: 'Festive Collection',
    tagline: 'Royal silk Anarkalis & heavy bridal ensembles',
    sampleCount: 'Grand Celebrations & Weddings',
    image: '/src/assets/images/hero_punjabi_boutique_1794219999073.jpg',
  },
  {
    name: 'Dupattas',
    tagline: 'Authentic Amritsari Phulkari & sheer organza',
    sampleCount: 'Artisanal Heritage Craft',
    image: '/src/assets/images/phulkari_dupatta_heritage_1794220000834.jpg',
  },
];

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories-section" className="py-14 bg-[#FAF7F2] border-b border-[#E6DCce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E6DCce] gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#9E7422] font-semibold mb-1">
              Curated Classifications
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#420A16] font-normal tracking-tight">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs uppercase tracking-wider text-[#6B1226] font-semibold hover:text-[#420A16] transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1 group"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`group text-left rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#F3ECE1] border-[#BA8E35] ring-2 ring-[#BA8E35]/30 shadow-md'
                    : 'bg-white border-[#E6DCce] hover:border-[#BA8E35]/50 hover:shadow-md'
                }`}
                aria-label={`Filter by ${cat.name}`}
              >
                <div>
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#EDE4D8] mb-3">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Active Checkmark / Dot */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#420A16] text-[#DFC282] text-[10px] font-bold rounded-sm shadow">
                        Active
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#420A16] group-hover:text-[#6B1226] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  
                  <p className="text-[11px] text-[#736863] mt-1 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E6DCce]/60 flex items-center justify-between text-[11px] font-medium text-[#9E7422]">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
