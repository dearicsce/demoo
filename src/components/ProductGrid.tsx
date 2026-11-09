import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: Category | 'All') => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickWhatsApp: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickWhatsApp,
  onQuickAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in-stock' | 'made-to-order'>('all');

  const categories: (Category | 'All')[] = [
    'All',
    'Punjabi Suits',
    'Salwar Kameez',
    'Kurtis',
    'Party Wear',
    'Festive Collection',
    'Dupattas',
  ];

  // Filtering and sorting
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Availability filter
      if (availabilityFilter === 'in-stock' && p.availability !== 'In Stock') {
        return false;
      }
      if (availabilityFilter === 'made-to-order' && p.availability !== 'Made to Order') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesFabric = p.fabric.toLowerCase().includes(query);
        const matchesEmbroidery = p.embroidery.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesEmbroidery && !matchesSku) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, availabilityFilter, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'All' || availabilityFilter !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    onSelectCategory('All');
    setAvailabilityFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="collections" className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7422] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#BA8E35]" />
            <span>Digital Sample Lookbook</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#420A16] font-normal tracking-tight">
            Curated Boutique Collections
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A514D]">
            Select any design to view detailed fabric specifications, customized sizing options, or enquire with our master tailor via WhatsApp.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#E6DCce] rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          
          {/* Top row: Category segmented buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 scrollbar-none border-b border-[#E6DCce]/60">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#420A16] text-[#DFC282] shadow-sm'
                      : 'text-[#4A423F] hover:bg-[#F3ECE1] hover:text-[#420A16]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search + Sort + Availability */}
          <div className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C807A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by suit name, fabric (e.g. Velvet, Georgette), or SKU..."
                className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg text-xs text-[#221B19] placeholder-[#8C807A] focus:outline-none focus:border-[#BA8E35] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C807A] hover:text-[#221B19]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-start">
              {/* Availability Filter */}
              <div className="flex items-center gap-1.5 text-xs text-[#5A514D]">
                <span className="hidden sm:inline">Status:</span>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg text-xs text-[#4A423F] focus:outline-none focus:border-[#BA8E35] cursor-pointer"
                >
                  <option value="all">All Availability</option>
                  <option value="in-stock">Ready to Ship</option>
                  <option value="made-to-order">Made to Order</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs text-[#5A514D]">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg text-xs text-[#4A423F] focus:outline-none focus:border-[#BA8E35] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Reset if active */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-[#851831] hover:underline cursor-pointer px-2 py-1"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Active Result Count / Filter Summary */}
        <div className="flex items-center justify-between text-xs text-[#736863] mb-6 px-1">
          <div>
            Showing <strong className="text-[#420A16] font-semibold">{filteredProducts.length}</strong> of {products.length} sample designs
            {selectedCategory !== 'All' && <span> in <strong className="text-[#420A16]">{selectedCategory}</strong></span>}
          </div>
          <div className="text-[11px] italic text-[#8C807A]">
            *Click any design to enquire via WhatsApp
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
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
        ) : (
          /* Empty State */
          <div className="bg-white border border-[#E6DCce] rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Search className="w-10 h-10 text-[#DFC282] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#420A16] mb-1">
              No Matching Designs Found
            </h3>
            <p className="text-xs text-[#736863] mb-5">
              We couldn't find any outfits matching "{searchQuery}". Try searching for fabrics like Velvet, Georgette, or clear filters to view all pieces.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#420A16] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#540D1E] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
