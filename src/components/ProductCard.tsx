import React, { useState } from 'react';
import { Heart, MessageCircle, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickWhatsApp: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickWhatsApp,
  onQuickAddToCart,
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white border border-[#E6DCce] rounded-xl overflow-hidden hover:border-[#BA8E35]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#FAF7F2] overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FAF7F2] to-[#EDE4D8] text-center">
            <Sparkles className="w-8 h-8 text-[#BA8E35] mb-2" />
            <span className="font-serif text-sm font-semibold text-[#420A16]">{product.name}</span>
            <span className="text-[11px] text-[#736863] mt-1">{product.fabric}</span>
          </div>
        )}

        {/* Subtle top left status indicator - unboxed subtle text */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#420A16]/90 text-[#DFC282] px-2 py-0.5 rounded-sm shadow-sm backdrop-blur-xs">
              New Arrival
            </span>
          )}
          {product.availability === 'Made to Order' && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#BA8E35]/90 text-white px-2 py-0.5 rounded-sm shadow-sm">
              Made to Order
            </span>
          )}
          {product.availability === 'Few Pieces Left' && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#851831]/90 text-white px-2 py-0.5 rounded-sm shadow-sm">
              Limited Pieces
            </span>
          )}
        </div>

        {/* Top right Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 shadow-sm ${
            isWishlisted
              ? 'bg-[#6B1226] text-white'
              : 'bg-white/80 text-[#4A423F] hover:bg-white hover:text-[#6B1226]'
          }`}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick hover action strip */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 z-10">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 bg-[#FAF7F2]/95 hover:bg-white text-[#420A16] text-xs font-semibold uppercase tracking-wider rounded-md shadow-md backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#BA8E35]" />
                <span>Enquire</span>
              </>
            )}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickWhatsApp(product);
            }}
            className="p-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-md shadow-md transition-colors cursor-pointer flex items-center justify-center"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Unboxed metadata: Category · Fabric */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#736863] font-medium tracking-wide">
            <span className="uppercase text-[#9E7422]">{product.category}</span>
            <span aria-hidden="true" className="text-[#DFC282]">·</span>
            <span className="truncate">{product.fabric.split('&')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#221B19] group-hover:text-[#6B1226] transition-colors mt-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Embroidery Highlight */}
          <p className="text-xs text-[#5A514D] mt-1 line-clamp-1 italic font-light">
            {product.embroidery}
          </p>

          {/* Sizes available */}
          <div className="mt-2.5 flex items-center gap-1 text-[10px] text-[#8C807A]">
            <span className="font-medium text-[#4A423F]">Sizes:</span>
            <span className="truncate">{product.sizes.join(', ')}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#E6DCce]/70 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#420A16] tabular-nums">
                ₹{formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#8C807A] line-through tabular-nums">
                  ₹{formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#8C807A] block">
              Sample Listing Price
            </span>
          </div>

          <span className="text-xs font-semibold text-[#BA8E35] group-hover:text-[#6B1226] flex items-center gap-1 transition-colors">
            <span>Details</span>
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
