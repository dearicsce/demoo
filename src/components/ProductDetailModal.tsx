import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Ruler, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number, customNote?: string) => void;
  onDirectWhatsApp: (product: Product, size: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onDirectWhatsApp,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Set default size when product changes
  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setCustomNote('');
      setShowSizeGuide(false);
      setAddedToast(false);
    }
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize || product.sizes[0] || 'Standard', quantity, customNote);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  const handleWhatsApp = () => {
    onDirectWhatsApp(product, selectedSize || product.sizes[0] || 'Standard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative bg-[#FAF7F2] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#DFC282]/40 z-10 my-8 flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#4A423F] hover:text-[#420A16] bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Viewport */}
        <div className="md:w-1/2 bg-[#EDE4D8] relative flex items-center justify-center min-h-[320px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[420px] md:max-h-full"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#420A16] text-[#DFC282] px-2.5 py-1 rounded-sm shadow">
              {product.category}
            </span>
            <span className="text-[10px] font-semibold bg-white/90 text-[#420A16] px-2.5 py-0.5 rounded-sm shadow-xs backdrop-blur-xs">
              Code: {product.sku}
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist(product)}
            className={`absolute bottom-4 left-4 p-2.5 rounded-full shadow-md transition-colors cursor-pointer ${
              isWishlisted ? 'bg-[#6B1226] text-white' : 'bg-white text-[#4A423F] hover:text-[#6B1226]'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right Column: Contiguous Purchase & Details Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 text-xs text-[#736863]">
              <span className="uppercase tracking-wider font-semibold text-[#9E7422]">
                {product.category}
              </span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{product.availability}</span>
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#420A16] mt-1 leading-snug">
              {product.name}
            </h2>

            {/* Price */}
            <div className="mt-2.5 flex items-baseline gap-3">
              <span className="font-serif text-2xl font-bold text-[#420A16] tabular-nums">
                ₹{formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#8C807A] line-through tabular-nums">
                  ₹{formatINR(product.originalPrice)}
                </span>
              )}
              <span className="text-[11px] text-[#8C807A] italic">
                (Sample Catalogue Price)
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-[#5A514D] leading-relaxed">
              {product.description}
            </p>

            {/* Fabric & Craft Specifications Box */}
            <div className="mt-5 p-3.5 bg-white border border-[#E6DCce] rounded-xl space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-[#8C807A]">Fabric:</span>
                <span className="font-medium text-[#221B19] text-right">{product.fabric}</span>
              </div>
              {product.lining && (
                <div className="flex items-start justify-between">
                  <span className="text-[#8C807A]">Lining:</span>
                  <span className="font-medium text-[#221B19] text-right">{product.lining}</span>
                </div>
              )}
              <div className="flex items-start justify-between">
                <span className="text-[#8C807A]">Embroidery:</span>
                <span className="font-medium text-[#221B19] text-right">{product.embroidery}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#420A16]">
                  Select Size
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-[#9E7422] hover:text-[#6B1226] flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#420A16] text-[#DFC282] font-semibold ring-1 ring-[#BA8E35] shadow-xs'
                        : 'bg-white border border-[#E6DCce] text-[#4A423F] hover:border-[#BA8E35]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Size Guide Accordion */}
              {showSizeGuide && (
                <div className="mt-3 p-3 bg-[#F3ECE1] border border-[#DFC282]/50 rounded-lg text-[11px] text-[#4A423F] space-y-1.5 animate-in slide-in-from-top-1">
                  <div className="font-bold text-[#420A16] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#BA8E35]" />
                    <span>Standard Boutique Measurement Guide (Inches)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-[10px] text-center pt-1 border-t border-[#DFC282]/30">
                    <span className="font-bold">Size</span>
                    <span className="font-bold">Bust</span>
                    <span className="font-bold">Waist</span>
                    <span className="font-bold">Hip</span>
                    <span>S</span><span>36"</span><span>30"</span><span>38"</span>
                    <span>M</span><span>38"</span><span>32"</span><span>40"</span>
                    <span>L</span><span>40"</span><span>34"</span><span>42"</span>
                    <span>XL</span><span>42"</span><span>36"</span><span>44"</span>
                  </div>
                  <p className="text-[10px] text-[#736863] pt-1">
                    *Choose "Custom Stitching" to discuss exact measurements with our master tailor on WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Selector & Custom Note */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-semibold text-[#420A16] mb-1">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-[#E6DCce] bg-white rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-sm font-bold text-[#4A423F] hover:bg-[#F3ECE1] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold tabular-nums text-[#221B19]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-sm font-bold text-[#4A423F] hover:bg-[#F3ECE1] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-[#420A16] mb-1">
                  Custom Request (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Alter kurti length, full sleeves..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E6DCce] rounded-lg focus:outline-none focus:border-[#BA8E35]"
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-[#E6DCce] space-y-2.5">
            {addedToast && (
              <div className="p-2 bg-emerald-50 text-emerald-800 text-xs rounded-md border border-emerald-200 flex items-center justify-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added to Enquiry Cart! Ready to send enquiry on WhatsApp.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className="w-full py-3 px-4 bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#420A16] border border-[#BA8E35] text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#BA8E35]" />
                <span>Add to Enquiry Cart</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-[#8C807A]">
              *No payment required. Enquiries are sent directly to the boutique stylist for custom tailoring and confirmation.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
