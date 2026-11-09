import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, ShoppingBag, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface OwnerWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
}

export const OwnerWalkthroughModal: React.FC<OwnerWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Concept & Value Proposition',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-xs text-[#5A514D] leading-relaxed">
          <p>
            Standard e-commerce websites with shopping cart gateways often fail for luxury Indian boutiques: customers want to ask about custom sleeve lengths, neckline changes, dupatta matching, and authentic color shades before paying.
          </p>
          <div className="p-3 bg-white border border-[#E6DCce] rounded-xl space-y-2">
            <div className="font-semibold text-[#420A16]">Why this model works better:</div>
            <ul className="list-disc pl-4 space-y-1 text-[#736863]">
              <li><strong>Zero payment drop-off:</strong> Customers don't get stuck at credit card checkout forms.</li>
              <li><strong>Direct customer relationship:</strong> Every lead arrives in your WhatsApp where you can send fabric videos and close orders directly.</li>
              <li><strong>Tailoring friendly:</strong> Customers easily request custom sizing, kurti length alterations, and urgent event deadlines.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'The Customer Experience',
      icon: ShoppingBag,
      content: (
        <div className="space-y-3 text-xs text-[#5A514D] leading-relaxed">
          <p>
            Here is how a prospective customer uses the boutique digital showcase:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-[#736863]">
            <li>
              <strong>Visual Browsing:</strong> The customer scrolls through high-resolution looks organized by Punjabi Suits, Salwar Kameez, Kurtis, Party Wear, Festive Wear, and Dupattas.
            </li>
            <li>
              <strong>Size &amp; Fabric Details:</strong> Clicking any outfit displays authentic fabric breakdown (Velvet, Chanderi, Georgette), embroidery types, and standard size guides.
            </li>
            <li>
              <strong>Enquiry Cart:</strong> They add one or more outfits to their enquiry cart with optional notes (e.g., "Need for sister's wedding on Dec 20").
            </li>
            <li>
              <strong>1-Click WhatsApp:</strong> The app formats an itemized message with product codes, sizes, sample prices, and total estimate directly into WhatsApp chat.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Testing With Your Real Number',
      icon: MessageCircle,
      content: (
        <div className="space-y-3 text-xs text-[#5A514D] leading-relaxed">
          <p>
            To see how seamless this is, you can test it on your own mobile phone right now:
          </p>
          <div className="p-3.5 bg-[#F3ECE1] border border-[#DFC282]/50 rounded-xl space-y-2">
            <div className="font-bold text-[#420A16] flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>How to test live chat during presentation:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1.5 text-[#540D1E] text-[11px]">
              <li>Click the <strong>Demo Admin</strong> button in the top navigation header.</li>
              <li>Open the <strong>WhatsApp &amp; Boutique Settings</strong> tab.</li>
              <li>Check "Enable Live WhatsApp Click-to-Chat" and type your own phone number (e.g. 91XXXXXXXXXX).</li>
              <li>Click "Save Boutique Settings".</li>
              <li>Add an outfit to the enquiry cart and click "Send Enquiry on WhatsApp" — watch it open a real chat with your phone!</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: 'Production Deployment Checklist',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3 text-xs text-[#5A514D] leading-relaxed">
          <p>
            This prototype is an <strong>honest concept demonstration</strong>. Before taking this live for the public boutique, replace the following placeholders:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2.5 bg-white border border-[#E6DCce] rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#221B19]">Official WhatsApp Business Account:</strong> Set up WhatsApp Business with quick automated greetings and catalog integration.
              </div>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-white border border-[#E6DCce] rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#221B19]">Real Studio Photography:</strong> Replace sample stock photography with the boutique's actual in-house shoot assets.
              </div>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-white border border-[#E6DCce] rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#221B19]">Physical Boutique Address:</strong> Replace sample address with verified street location and Google Maps pin.
              </div>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-white border border-[#E6DCce] rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#221B19]">Secure Cloud Admin:</strong> Connect Firebase Authentication or database for multiple staff members to update stock.
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF7F2] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#DFC282]/50 z-10 my-8 flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E6DCce] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#420A16] text-[#DFC282] flex items-center justify-center shadow-xs">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#420A16]">
                Boutique Owner Pitch Walkthrough
              </h2>
              <span className="text-[11px] text-[#736863]">
                Step {currentStep + 1} of {steps.length} · {current.title}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] rounded-full transition-colors cursor-pointer"
            aria-label="Close walkthrough"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress */}
        <div className="grid grid-cols-4 h-1 bg-[#E6DCce]">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-full transition-colors ${
                i <= currentStep ? 'bg-[#BA8E35]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-bold text-[#420A16] mb-3">
            {current.title}
          </h3>
          {current.content}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-white border-t border-[#E6DCce] flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-[#8C807A]'
                : 'text-[#4A423F] hover:bg-[#F3ECE1] cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep === 2 && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="px-3.5 py-2 bg-[#F3ECE1] hover:bg-[#EDE4D8] text-[#420A16] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Go to Demo Admin
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-5 py-2 bg-[#420A16] hover:bg-[#540D1E] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#6B1226] hover:bg-[#540D1E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Close Walkthrough
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
