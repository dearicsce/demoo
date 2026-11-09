import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsSectionProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickWhatsApp: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickWhatsApp,
  onQuickAddToCart,
  onViewAll,
}) => {
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 3);

  if (newArrivals.length === 0) return null;

  return (
    <section id="new-arrivals" className="py-16 bg-[#FAF7F2] border-b border-[#E6DCce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E6DCce] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7422] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#BA8E35]" />
              <span>Fresh Off The Loom</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#420A16] font-normal tracking-tight">
              New Season Arrivals
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs uppercase tracking-wider text-[#6B1226] font-semibold hover:text-[#420A16] transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1.5 group"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured New Arrivals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickWhatsApp={onQuickWhatsApp}
              onQuickAddToCart={onQuickAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
