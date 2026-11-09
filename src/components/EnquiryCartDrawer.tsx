import React, { useState } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag, ArrowRight, Eye, ShieldAlert, Sparkles } from 'lucide-react';
import { CartItem, BoutiqueSettings } from '../types';
import { formatINR } from '../utils/currency';

interface EnquiryCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: BoutiqueSettings;
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onSendWhatsAppEnquiry: (note: string) => void;
  onPreviewMessage: (note: string) => void;
  onExploreCollections: () => void;
}

export const EnquiryCartDrawer: React.FC<EnquiryCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSendWhatsAppEnquiry,
  onPreviewMessage,
  onExploreCollections,
}) => {
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const totalEstimate = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#DFC282]/40">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E6DCce] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6B1226]" />
            <div>
              <h2 className="font-serif text-lg font-bold text-[#420A16]">
                Enquiry Cart
              </h2>
              <span className="text-[11px] text-[#736863]">
                {items.length} {items.length === 1 ? 'outfit selected' : 'outfits selected'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-[#8C807A] hover:text-[#851831] underline cursor-pointer mr-2"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] rounded-full transition-colors cursor-pointer"
              aria-label="Close Enquiry Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informative Pitch / Honesty Banner */}
        <div className="bg-[#420A16]/5 border-b border-[#DFC282]/30 px-5 py-2.5 text-xs text-[#540D1E] flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
          <p className="leading-snug text-[11px]">
            <strong>Enquiry Only:</strong> Items in this cart generate a structured message for the boutique team to confirm sizing and custom tailoring. No payment is collected.
          </p>
        </div>

        {/* Drawer Body - Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length > 0 ? (
            <>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}-${index}`}
                    className="p-3 bg-white border border-[#E6DCce] rounded-xl flex gap-3 shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-22 object-cover rounded-lg bg-[#EDE4D8] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="font-serif text-sm font-bold text-[#221B19] truncate">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            className="text-[#8C807A] hover:text-[#851831] p-0.5 cursor-pointer"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-[#736863] mt-0.5">
                          <span>Size: <strong className="text-[#420A16]">{item.size}</strong></span>
                          <span>·</span>
                          <span className="text-[#9E7422]">{item.product.sku}</span>
                        </div>

                        {item.customNote && (
                          <p className="text-[10px] text-[#8C807A] italic mt-1 truncate">
                            Note: "{item.customNote}"
                          </p>
                        )}
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E6DCce]/50">
                        <div className="flex items-center border border-[#E6DCce] rounded bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#4A423F] hover:bg-[#E6DCce] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#221B19]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#4A423F] hover:bg-[#E6DCce] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-[#420A16] tabular-nums">
                          ₹{formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Notes / Custom Stitching details */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#420A16] mb-1">
                  Add Sizing Notes or Special Requests (Optional)
                </label>
                <textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="e.g. Wedding date is Dec 15th, need custom kurti length, will provide body measurements on WhatsApp..."
                  rows={3}
                  className="w-full p-2.5 bg-white border border-[#E6DCce] rounded-xl text-xs text-[#221B19] placeholder-[#8C807A] focus:outline-none focus:border-[#BA8E35]"
                />
              </div>
            </>
          ) : (
            /* Empty Cart */
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE1] flex items-center justify-center text-[#BA8E35] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#420A16] mb-1">
                Your Enquiry Cart is Empty
              </h3>
              <p className="text-xs text-[#736863] max-w-xs mb-6">
                Browse our Punjabi suits, festive kurtis, and dupattas, then add designs here to send an itemized inquiry.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollections();
                }}
                className="px-5 py-2.5 bg-[#420A16] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#540D1E] transition-colors cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer - Total & WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E6DCce] space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8C807A] font-medium block">
                  Estimated Total
                </span>
                <span className="text-[10px] text-[#8C807A]">
                  (Sample Pricing for Demo)
                </span>
              </div>
              <span className="font-serif text-2xl font-bold text-[#420A16] tabular-nums">
                ₹{formatINR(totalEstimate)}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onSendWhatsAppEnquiry(customerNote)}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Enquiry on WhatsApp</span>
              </button>

              <button
                onClick={() => onPreviewMessage(customerNote)}
                className="w-full py-2 px-3 text-xs text-[#6B1226] hover:bg-[#F3ECE1] border border-[#DFC282]/60 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <Eye className="w-3.5 h-3.5 text-[#BA8E35]" />
                <span>Preview Formatted WhatsApp Message</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-[#8C807A]">
              Connects directly with boutique owner/staff on WhatsApp without third-party commission.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
