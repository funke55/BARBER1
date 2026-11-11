import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Shield, ArrowUpRight } from 'lucide-react';
import { BusinessSettings } from '../../types';

interface FooterProps {
  settings: BusinessSettings;
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#0e0e12] border-t border-[#282833] text-[#9e9ea8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#f5f5f7]">
                BARBER 1
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            </div>
            <p className="text-xs text-[#c5a059] font-medium tracking-wider uppercase">
              {settings.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[#8a8a96]">
              {settings.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#141418] border border-[#282833] flex items-center justify-center text-[#9e9ea8] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://facebook.com`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#141418] border border-[#282833] flex items-center justify-center text-[#9e9ea8] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://x.com`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#141418] border border-[#282833] flex items-center justify-center text-[#9e9ea8] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation & Services */}
          <div>
            <h3 className="font-cinzel text-sm font-bold tracking-wider uppercase text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Services & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookup')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Track Your Booking</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#c5a059] text-white font-bold transition-colors cursor-pointer text-left"
                >
                  Book Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold tracking-wider uppercase text-[#f5f5f7] mb-4">
              Hours of Service
            </h3>
            <ul className="space-y-2 text-sm text-[#8a8a96]">
              <li className="flex justify-between pb-1.5 border-b border-[#202028]">
                <span>Monday – Thursday</span>
                <span className="text-[#f5f5f7] font-mono tabular-nums">08:30 – 19:30</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[#202028]">
                <span>Friday</span>
                <span className="text-[#f5f5f7] font-mono tabular-nums">08:30 – 20:00</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[#202028]">
                <span>Saturday</span>
                <span className="text-[#f5f5f7] font-mono tabular-nums">08:30 – 18:00</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Sunday</span>
                <span className="text-[#c5a059] text-xs uppercase tracking-wider font-medium">
                  Follow My House VIP Only
                </span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-[#141418] border border-[#282833] rounded-md text-xs leading-relaxed text-[#9e9ea8]">
              <span className="text-[#c5a059] font-medium block mb-0.5">Strict Appointment Policy</span>
              To safeguard exclusivity, all visits are reserved in advance. Walk-ins subject to chair availability.
            </div>
          </div>

          {/* Column 4: Contact & Flagship Location */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold tracking-wider uppercase text-[#f5f5f7] mb-4">
              Lilongwe Flagship
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span className="text-[#8a8a96]">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="text-[#8a8a96] font-mono tabular-nums">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="text-[#8a8a96]">{settings.email}</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#202028]">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 text-xs font-medium text-[#9e9ea8] hover:text-[#c5a059] transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Barber & Management Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Demo Mode Notice & Copyright */}
        <div className="pt-8 border-t border-[#202028] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span>© 2026 BARBER 1. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#c5a059]">Demo System Environment</span>
          </div>
          <div className="text-center sm:text-right text-[#80808e]">
            Configurable business details, prices in {settings.currency}, and automated scheduling.
          </div>
        </div>
      </div>
    </footer>
  );
};
