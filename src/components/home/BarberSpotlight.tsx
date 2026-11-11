import React from 'react';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Barber } from '../../types';
import { ASSET_IMAGES } from '../../services/storage';

interface BarberSpotlightProps {
  barber: Barber;
  onOpenBooking: () => void;
}

export const BarberSpotlight: React.FC<BarberSpotlightProps> = ({ barber, onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#0e0e12] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Barber Portrait */}
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden border-2 border-gray-800 bg-[#15151b] shadow-2xl max-w-sm mx-auto">
              <img
                src={ASSET_IMAGES.barberPortrait}
                alt={barber.name}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 md:h-[440px] object-cover object-top"
              />
              <div className="p-4 bg-[#121217] text-center border-t border-gray-800/80">
                <h3 className="font-display text-lg font-bold text-white">
                  {barber.name}
                </h3>
                <p className="text-xs text-[#e6ca85] font-semibold mt-0.5">
                  Founder & Master Barber
                </p>
              </div>
            </div>
          </div>

          {/* Barber Info in Simple, Warm English */}
          <div className="md:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider text-[#e6ca85] uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Meet The Master Barber</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Marcus Kazembe
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              With over 14 years of professional training in London and Cape Town, Marcus is dedicated to giving every customer the perfect haircut and beard trim.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              Whether you come to our comfortable lounge in Area 10 or request a home visit, you will receive undivided attention and clean, sharp results every time.
            </p>

            {/* Specialties */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">
                Specialties:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e6ca85]" />
                  </div>
                  <span>Precision Skin Fades & Tapers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e6ca85]" />
                  </div>
                  <span>Hot Towel Beard Trimming & Shave</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e6ca85]" />
                  </div>
                  <span>Scissor Haircuts & Styling</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e6ca85]" />
                  </div>
                  <span>Private In-Home VIP Visits</span>
                </div>
              </div>
            </div>

            {/* Direct Booking Button */}
            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-xl active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Book With Marcus</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
