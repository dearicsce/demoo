import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/currency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#DFC282]/40">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E6DCce] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#6B1226] fill-[#6B1226]" />
            <div>
              <h2 className="font-serif text-lg font-bold text-[#420A16]">
                Saved Favorites
              </h2>
              <span className="text-[11px] text-[#736863]">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'outfit saved' : 'outfits saved'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] rounded-full transition-colors cursor-pointer"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-white border border-[#E6DCce] rounded-xl flex gap-3 shadow-2xs hover:border-[#BA8E35] transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-18 h-22 object-cover rounded-lg bg-[#EDE4D8] shrink-0 cursor-pointer"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="font-serif text-sm font-bold text-[#221B19] truncate cursor-pointer hover:text-[#6B1226]"
                      >
                        {product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#8C807A] hover:text-[#851831] p-0.5 cursor-pointer"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#736863] mt-0.5 truncate">
                      {product.fabric}
                    </div>

                    <div className="font-serif text-sm font-bold text-[#420A16] mt-1 tabular-nums">
                      ₹{formatINR(product.price)}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E6DCce]/60 flex items-center justify-between">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="text-xs font-semibold text-[#6B1226] hover:text-[#420A16] flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#BA8E35]" />
                      <span>Add to Enquiry</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="text-[11px] text-[#8C807A] hover:text-[#420A16] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE1] flex items-center justify-center text-[#BA8E35] mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#420A16] mb-1">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-[#736863] max-w-xs mb-6">
                Click the heart icon on any outfit while browsing to save it here for later.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#420A16] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#540D1E] transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E6DCce] text-center">
            <p className="text-[11px] text-[#8C807A]">
              Items saved in your local session for demonstration purposes.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
