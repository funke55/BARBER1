import React from 'react';
import { Calendar, ChevronRight, Store, Home, Clock, MapPin } from 'lucide-react';
import { BusinessSettings } from '../../types';
import { ASSET_IMAGES } from '../../services/storage';

interface HeroProps {
  settings: BusinessSettings;
  onOpenBooking: () => void;
  onNavigate: (view: string) => void;
  onQuickBook?: (serviceId?: string, location?: 'shop' | 'home') => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onOpenBooking,
  onNavigate,
}) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-[#0a0a0d]">
      {/* Full-Bleed Background Photography with Cinematic Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="BARBER 1 Interior Lounge"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.12]"
        />
        {/* Soft Vignette Overlay for Crisp Typography Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/60 to-[#0a0a0d]/75" />
      </div>

      {/* Main Centered Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-10 sm:pb-14 text-center my-auto">
        {/* Modern Pill Location Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 sm:mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#f0d494] shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#f0d494]" />
          <span>Area 10 · Lilongwe, Malawi</span>
        </div>

        {/* Clean, Modern Editorial Headline */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
          Looking Your Best
          <span className="block mt-1 sm:mt-2 text-[#e6ca85]">
            Never Goes Out of Style.
          </span>
        </h1>

        {/* Clear, Simple English Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-200/90 max-w-xl mx-auto font-normal leading-relaxed drop-shadow-sm">
          Lilongwe's premier barbershop. Enjoy precision haircuts and hot towel beard trims at our Area 10 lounge, or have our master barber visit your home.
        </p>

        {/* Centered Modern Pill Action Buttons */}
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider rounded-full shadow-xl transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span className="whitespace-nowrap">Book Now</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white hover:text-white border border-white/20 hover:border-white/35 font-semibold text-sm rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span className="whitespace-nowrap">View Services & Prices</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom 3-Feature Floating Cards - Clean & Responsive */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Feature 1 */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 hover:border-white/20 transition-all shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#e6ca85] shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                In-Shop Lounge
              </span>
              <span className="text-xs text-gray-300 block mt-0.5">
                Presidential Way, Area 10
              </span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 hover:border-white/20 transition-all shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#e6ca85] shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Follow My House
              </span>
              <span className="text-xs text-gray-300 block mt-0.5">
                We come directly to your home
              </span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 hover:border-white/20 transition-all shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#e6ca85] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Opening Hours
              </span>
              <span className="text-xs text-gray-300 block mt-0.5">
                Mon – Sat: 8:30 AM – 7:30 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
