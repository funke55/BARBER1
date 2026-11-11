import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Send,
  CheckCircle,
  AlertCircle,
  Navigation,
} from 'lucide-react';
import { BusinessSettings } from '../../types';

interface ContactPageProps {
  settings: BusinessSettings;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onOpenBooking }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Please complete all required fields (Name, Phone, and Message).');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-[#0b0b0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#c5a059] uppercase mb-2">
            <span>Concierge & Inquiries</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5f5f7]">
            Connect With BARBER 1
          </h1>
          <p className="mt-4 text-base text-[#9e9ea8] leading-relaxed">
            Have questions regarding our in-lounge appointments or Follow My House mobile home visits? Our concierge is at your service.
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="mb-10 p-4 bg-[#141418] border border-[#282833] rounded-lg text-xs text-[#9e9ea8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
            <span>
              <strong>Demo Environment:</strong> All contact information below is representative demo data for Lilongwe, Malawi, and can be customized via the Barber Management Dashboard.
            </span>
          </div>
          <span className="text-[11px] text-[#c5a059] font-mono uppercase tracking-wider">
            Malawi (MWK)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Information & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#141418] border border-[#282833] rounded-lg p-6 space-y-6">
              <h2 className="font-cinzel text-xl font-bold text-white">
                Lounge Location & Details
              </h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#71717e] uppercase tracking-wider block">
                      Physical Flagship
                    </span>
                    <span className="text-white font-medium">{settings.address}</span>
                    <span className="text-xs text-[#8e8e9c] block mt-0.5">
                      {settings.cityArea}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#71717e] uppercase tracking-wider block">
                      Direct Concierge / WhatsApp
                    </span>
                    <span className="text-white font-mono font-medium">{settings.phone}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#71717e] uppercase tracking-wider block">
                      Electronic Mail
                    </span>
                    <span className="text-white">{settings.email}</span>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#202028]">
                <span className="text-xs text-[#71717e] uppercase tracking-wider block mb-3">
                  Follow Our Work
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-[#9e9ea8] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{settings.instagram}</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-[#9e9ea8] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>{settings.facebook}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-[#141418] border border-[#282833] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#c5a059]">
                <Clock className="w-4 h-4" />
                <h3 className="font-cinzel text-base font-bold text-white">
                  Operating Hours
                </h3>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between pb-1.5 border-b border-[#202028]">
                  <span className="text-[#9e9ea8]">Monday – Thursday</span>
                  <span className="text-white font-mono tabular-nums">08:30 – 19:30</span>
                </li>
                <li className="flex justify-between pb-1.5 border-b border-[#202028]">
                  <span className="text-[#9e9ea8]">Friday</span>
                  <span className="text-white font-mono tabular-nums">08:30 – 20:00</span>
                </li>
                <li className="flex justify-between pb-1.5 border-b border-[#202028]">
                  <span className="text-[#9e9ea8]">Saturday</span>
                  <span className="text-white font-mono tabular-nums">08:30 – 18:00</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-[#9e9ea8]">Sunday</span>
                  <span className="text-[#c5a059] font-medium">Follow My House VIP Only</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form & Map Placeholder */}
          <div className="lg:col-span-7 space-y-8">
            {/* Enquiry Form */}
            <div className="bg-[#141418] border border-[#282833] rounded-lg p-6 sm:p-8">
              <h2 className="font-cinzel text-xl font-bold text-white mb-2">
                Send an Enquiry
              </h2>
              <p className="text-xs text-[#9e9ea8] mb-6">
                Fill in the form below for private group bookings, corporate grooming contracts, or general inquiries.
              </p>

              {submitted ? (
                <div className="p-8 bg-[#0b0b0e] border border-emerald-800/50 rounded-lg text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="font-cinzel text-lg font-bold text-white">
                    Enquiry Transmitted
                  </h3>
                  <p className="text-xs text-[#9e9ea8] max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{name}</span>. Our concierge team has received your message and will respond via {phone} shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="px-4 py-2 bg-[#1b1b22] hover:bg-[#282833] text-xs text-white rounded cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#9e9ea8] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tendai Banda"
                        className="w-full px-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#9e9ea8] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +265 999 123 456"
                        className="w-full px-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#9e9ea8] block mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. patron@domain.mw"
                        className="w-full px-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#9e9ea8] block mb-1">
                        Topic of Inquiry
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Follow My House Booking">Follow My House Booking</option>
                        <option value="Corporate Grooming Package">Corporate Grooming Package</option>
                        <option value="Wedding / Groom Party">Wedding / Groom Party</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#9e9ea8] block mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How may our master barber assist you?"
                      className="w-full px-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="text-xs text-[#c5a059] font-bold hover:underline transition-colors cursor-pointer"
                    >
                      Or Book an Appointment Now →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Stylized Google Maps Location Placeholder */}
            <div className="bg-[#141418] border border-[#282833] rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#c5a059]" />
                  <h3 className="font-cinzel text-base font-bold text-white">
                    Flagship Studio Map View
                  </h3>
                </div>
                <span className="text-[11px] text-[#71717e]">Area 10, Lilongwe</span>
              </div>

              {/* High-style map visual container */}
              <div className="relative h-56 rounded-md overflow-hidden bg-[#09090c] border border-[#282833] flex items-center justify-center group">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="absolute w-full h-[2px] bg-[#282835] top-1/2 -translate-y-1/2" />
                <div className="absolute w-[2px] h-full bg-[#282835] left-1/2 -translate-x-1/2" />
                <div className="absolute w-full h-[1px] bg-[#1e1e28] top-1/3" />
                <div className="absolute w-full h-[1px] bg-[#1e1e28] top-2/3" />
                <div className="absolute w-[1px] h-full bg-[#1e1e28] left-1/3" />
                <div className="absolute w-[1px] h-full bg-[#1e1e28] left-2/3" />

                {/* Central Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#c5a059] text-black flex items-center justify-center shadow-lg shadow-[#c5a059]/30">
                    <MapPin className="w-5 h-5 fill-current" />
                  </div>
                  <div className="mt-2 px-3 py-1 bg-[#141418] border border-[#c5a059]/40 rounded text-[11px] font-bold text-white whitespace-nowrap shadow-md">
                    BARBER 1 · Area 10
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 text-[10px] text-[#71717e] bg-black/60 px-2 py-0.5 rounded">
                  Google Maps Platform Coordinates · -13.9626, 33.7741
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8e8e9c]">
                <span>Secured private parking available for all patrons.</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#c5a059] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
