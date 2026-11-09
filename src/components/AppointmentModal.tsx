import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { AppointmentForm } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  boutiqueName: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  boutiqueName,
}) => {
  const [formData, setFormData] = useState<AppointmentForm>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '11:30 AM - 1:00 PM',
    serviceType: 'Bespoke Punjabi Suit',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.date) {
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleReset} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF7F2] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#DFC282]/50 z-10 my-8">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E6DCce] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#420A16] text-[#DFC282] flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#420A16]">
                Bespoke Styling Consultation
              </h2>
              <span className="text-[11px] text-[#736863]">
                Schedule an in-person or video fitting session
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="p-3 bg-[#F3ECE1] border border-[#DFC282]/40 rounded-xl text-xs text-[#540D1E] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
              <p className="leading-snug text-[11px]">
                <strong>Concept Demo Notice:</strong> This appointment request form records your demo submission locally to demonstrate the client booking flow for {boutiqueName}.
              </p>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#420A16] mb-1.5">
                Service Requested
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-[#E6DCce] rounded-lg text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
              >
                <option value="Bespoke Punjabi Suit">Bespoke Punjabi Suit (Tailoring &amp; Embroidery)</option>
                <option value="Bridal Consultation">Bridal Trousseau &amp; Sangeet Consultation</option>
                <option value="Party Wear Fitting">Party Wear &amp; Anarkali Fitting</option>
                <option value="Fabric & Sizing Advice">Fabric Selection &amp; Measurement Guide</option>
              </select>
            </div>

            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#420A16] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#8C807A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jasleen Kaur"
                    className="w-full pl-8.5 pr-3 py-2 bg-white border border-[#E6DCce] rounded-lg text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#420A16] mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#8C807A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98765 43210"
                    className="w-full pl-8.5 pr-3 py-2 bg-white border border-[#E6DCce] rounded-lg text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#420A16] mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E6DCce] rounded-lg text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#420A16] mb-1">
                  Time Slot *
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-[#8C807A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full pl-8.5 pr-3 py-2 bg-white border border-[#E6DCce] rounded-lg text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
                  >
                    <option value="11:30 AM - 1:00 PM">Morning (11:30 AM - 1:00 PM)</option>
                    <option value="2:30 PM - 4:00 PM">Afternoon (2:30 PM - 4:00 PM)</option>
                    <option value="5:00 PM - 6:30 PM">Evening (5:00 PM - 6:30 PM)</option>
                    <option value="7:00 PM - 8:30 PM">Late Evening (7:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#420A16] mb-1">
                Occasion / Style Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Sister of the groom, looking for traditional velvet suit in deep wine or emerald..."
                rows={2}
                className="w-full p-2.5 bg-white border border-[#E6DCce] rounded-lg text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#420A16] hover:bg-[#540D1E] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Submit Consultation Request (Demo)
              </button>
            </div>
          </form>
        ) : (
          /* Submission Confirmation Receipt */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#420A16]">
              Request Received (Demo)
            </h3>

            <p className="text-xs text-[#5A514D] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. In the live production boutique application, this would immediately alert the boutique coordinator on WhatsApp and send a calendar invitation for:
            </p>

            <div className="p-4 bg-white border border-[#E6DCce] rounded-xl text-left text-xs space-y-2 max-w-xs mx-auto">
              <div>
                <span className="text-[#8C807A]">Service:</span>{' '}
                <strong className="text-[#420A16]">{formData.serviceType}</strong>
              </div>
              <div>
                <span className="text-[#8C807A]">Date:</span>{' '}
                <span className="font-semibold text-[#221B19]">{formData.date}</span>
              </div>
              <div>
                <span className="text-[#8C807A]">Time:</span>{' '}
                <span className="font-semibold text-[#221B19]">{formData.timeSlot}</span>
              </div>
              <div>
                <span className="text-[#8C807A]">Contact:</span>{' '}
                <span className="font-semibold text-[#221B19]">{formData.phone}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#420A16] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#540D1E] transition-colors cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
