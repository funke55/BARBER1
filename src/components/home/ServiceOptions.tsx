import React from 'react';
import { Store, Home, Check, ArrowRight } from 'lucide-react';
import { BusinessSettings } from '../../types';
import { ASSET_IMAGES } from '../../services/storage';

interface ServiceOptionsProps {
  settings: BusinessSettings;
  onOpenBookingWithLocation: (location: 'shop' | 'home') => void;
}

export const ServiceOptions: React.FC<ServiceOptionsProps> = ({
  settings,
  onOpenBookingWithLocation,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#0e0e12] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple, Clear Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#e6ca85] uppercase tracking-wider mb-3">
            How We Serve You
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Visit our relaxing shop in Area 10, or book our master barber to come directly to your home.
          </p>
        </div>

        {/* 2 Clean Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: In-Shop */}
          <div className="bg-[#15151b] border border-gray-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl hover:border-gray-700 transition-all">
            <div>
              <div className="h-56 sm:h-64 relative overflow-hidden">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="BARBER 1 Shop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase text-[#e6ca85] border border-white/10">
                  Shop Service
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#e6ca85] font-bold uppercase mb-1.5">
                  <Store className="w-4 h-4" />
                  <span>Area 10, Lilongwe</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                  Visit Our Barbershop
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Come relax in our private executive barbershop. Includes free cold drinks or coffee, hot steamed towels, and vintage leather chairs.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Complimentary espresso, coffee, or cold refreshments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Hot steamed towel with every haircut</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Secure parking right outside our lounge</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Standard service prices (No extra travel fee)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={() => onOpenBookingWithLocation('shop')}
                className="w-full py-3.5 bg-white hover:bg-gray-100 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <span>Book In-Shop Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Follow My House (Home Service) */}
          <div className="bg-[#15151b] border-2 border-[#c5a059] rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl relative">
            {/* Top highlight badge */}
            <div className="absolute top-4 right-4 z-10 bg-[#c5a059] text-black text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
              Most Requested
            </div>

            <div>
              <div className="h-56 sm:h-64 relative overflow-hidden">
                <img
                  src={ASSET_IMAGES.serviceHome}
                  alt="Home Service Travel Kit"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase text-[#e6ca85] border border-white/10">
                  Mobile Service
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#e6ca85] font-bold uppercase mb-1.5">
                  <Home className="w-4 h-4" />
                  <span>Anywhere in Lilongwe</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                  Follow My House (Home Service)
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Skip the traffic. Our Master Barber brings a full professional barbershop setup straight to your living room, villa, or office.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Complete privacy in the comfort of your home</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Hospital-sanitized clippers, shears, and floor cover</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>Portable hot towel steamer for full luxury shave</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#e6ca85] font-bold">
                    <div className="w-5 h-5 rounded-full bg-[#c5a059]/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#e6ca85]" />
                    </div>
                    <span>
                      Standard price + {settings.currency} {settings.homeServiceFee.toLocaleString()} travel fee
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={() => onOpenBookingWithLocation('home')}
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl active:scale-95"
              >
                <span>Book Home Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
