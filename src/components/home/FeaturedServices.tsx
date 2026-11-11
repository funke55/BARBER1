import React, { useState } from 'react';
import { Clock, ArrowRight, Scissors } from 'lucide-react';
import { Service, BusinessSettings } from '../../types';

interface FeaturedServicesProps {
  services: Service[];
  settings: BusinessSettings;
  onSelectService: (service: Service) => void;
  onViewAll: () => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  services,
  settings,
  onSelectService,
  onViewAll,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'haircut' | 'beard' | 'package'>('all');
  const activeServices = services.filter((s) => s.active);

  const filtered = activeServices.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#0a0a0d] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#e6ca85] uppercase tracking-wider mb-2.5">
              Service Menu
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Grooming Services
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e6ca85] hover:text-[#f3deab] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>See All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Rounded Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'haircut', label: 'Haircuts' },
            { id: 'beard', label: 'Beard Trims' },
            { id: 'package', label: 'Packages' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-[#15151b] text-gray-400 hover:text-white hover:bg-[#1f1f27] border border-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean, High-Contrast Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="bg-[#14141a] border border-gray-800 hover:border-gray-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all group"
            >
              <div>
                {/* Duration & Category */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="capitalize font-semibold text-[#e6ca85]">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.durationMinutes} mins</span>
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#e6ca85] transition-colors mb-2">
                  {service.name}
                </h3>

                {/* Service Description in Simple English */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Price and Book Now Button */}
              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">
                    Price
                  </span>
                  <span className="font-mono text-lg font-extrabold text-white">
                    {settings.currency} {service.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
