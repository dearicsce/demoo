import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (sectionId: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenCart,
  onOpenWishlist,
}) => {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E6DCce] px-2 py-1 shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-4 items-center h-14">
        
        {/* Tab 1: Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer transition-colors ${
            activeTab === 'home' ? 'text-[#6B1226]' : 'text-[#736863] hover:text-[#221B19]'
          }`}
          aria-label="Go to Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
        </button>

        {/* Tab 2: Collections */}
        <button
          onClick={() => onNavigate('collections')}
          className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer transition-colors ${
            activeTab === 'collections' ? 'text-[#6B1226]' : 'text-[#736863] hover:text-[#221B19]'
          }`}
          aria-label="View Collections"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Catalogue</span>
        </button>

        {/* Tab 3: Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="relative min-h-[44px] flex flex-col items-center justify-center cursor-pointer text-[#736863] hover:text-[#221B19] transition-colors"
          aria-label={`Wishlist (${wishlistCount})`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#BA8E35] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Saved</span>
        </button>

        {/* Tab 4: Enquiry Cart */}
        <button
          onClick={onOpenCart}
          className="relative min-h-[44px] flex flex-col items-center justify-center cursor-pointer text-[#6B1226] font-semibold transition-colors"
          aria-label={`Enquiry Cart (${cartCount})`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#BA8E35] text-[#420A16] text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Enquiry</span>
        </button>

      </div>
    </nav>
  );
};
