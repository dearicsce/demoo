import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink, Settings, ShieldAlert, Sparkles } from 'lucide-react';
import { BoutiqueSettings } from '../types';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageText: string;
  settings: BoutiqueSettings;
  whatsappUrl: string | null;
  onOpenAdminSettings: () => void;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  messageText,
  settings,
  whatsappUrl,
  onOpenAdminSettings,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isConfigured = settings.isNumberConfigured && settings.whatsappNumber;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF7F2] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#DFC282]/50 z-10 my-8">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E6DCce] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#420A16]">
                WhatsApp Enquiry Generator
              </h2>
              <span className="text-[11px] text-[#736863]">
                Verified click-to-chat preview for boutique demonstration
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout Banner */}
        <div className="p-4 bg-[#F3ECE1] border-b border-[#E6DCce] text-xs">
          {isConfigured ? (
            <div className="flex items-start gap-2 text-[#420A16]">
              <Sparkles className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
              <div>
                <strong>Connected Business Number:</strong> +{settings.whatsappNumber}
                <p className="text-[11px] text-[#736863] mt-0.5">
                  Clicking "Launch in WhatsApp" will open a direct chat with this prefilled structured enquiry.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 text-[#540D1E]">
              <ShieldAlert className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#851831]">Demo Safe Mode (No Business Number Configured):</strong>
                <p className="text-[11px] text-[#5A514D] mt-0.5">
                  As requested in project guidelines, we never launch unverified or fake phone numbers. You can inspect the complete prefilled text below, copy it, or configure your boutique number in Demo Admin.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Formatted Message Preview Box */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#420A16]">
              Generated Customer Message:
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-[#9E7422] hover:text-[#6B1226] font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-white border border-[#E6DCce] rounded-xl text-xs font-mono text-[#221B19] whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed shadow-inner">
            {messageText}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-white border-t border-[#E6DCce] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAdminSettings();
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] border border-[#E6DCce] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-[#BA8E35]" />
            <span>Configure Boutique Number</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch in WhatsApp</span>
              </a>
            ) : (
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#420A16] hover:bg-[#540D1E] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Formatted Text'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
