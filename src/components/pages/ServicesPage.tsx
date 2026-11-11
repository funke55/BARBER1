import React, { useState } from 'react';
import { Clock, Home, Search, Scissors, Sparkles, Check } from 'lucide-react';
import { Service, BusinessSettings, ServiceCategory } from '../../types';

interface ServicesPageProps {
  services: Service[];
  settings: BusinessSettings;
  onSelectService: (service: Service) => void;
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  settings,
  onSelectService,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [homeOnly, setHomeOnly] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'haircut', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard & Shaves' },
    { id: 'package', label: 'Luxury Packages' },
    { id: 'treatment', label: 'Scalp & Facials' },
  ];

  const filteredServices = services.filter((s) => {
    if (!s.active) return false;
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    if (homeOnly && !s.homeServiceEligible) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-16 bg-[#0b0b0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#c5a059] uppercase mb-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>Master Barbering Catalog</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5f5f7]">
            Services & Pricing
          </h1>
          <p className="mt-4 text-base text-[#9e9ea8] leading-relaxed">
            Every appointment includes consultation, precision craftsmanship, steamed towels, and bespoke finishing pomades. Available in our flagship lounge or via <span className="text-[#f5f5f7] font-medium">Follow My House</span> mobile delivery.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#141418] border border-[#282833] rounded-lg p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0b0b0e] border border-[#282833] rounded-md w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'text-[#9e9ea8] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Home Only Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <label className="flex items-center gap-2 text-xs text-[#b0b0bc] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={homeOnly}
                onChange={(e) => setHomeOnly(e.target.checked)}
                className="rounded border-[#282833] text-[#c5a059] focus:ring-0 cursor-pointer"
              />
              <span>Follow My House Only</span>
            </label>

            <div className="relative w-48 sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#71717e] absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#141418] border border-[#282833] hover:border-[#c5a059]/40 rounded-lg p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8e8e9c] mb-3">
                  <span className="capitalize text-[#c5a059] font-medium tracking-wide">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8e8e9c]" />
                    <span className="tabular-nums">{service.durationMinutes} Mins</span>
                    {service.homeServiceEligible && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#a0a0b0] flex items-center gap-0.5">
                          <Home className="w-3 h-3 text-[#c5a059]" />
                          Home
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-[#9e9ea8] mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#202028] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#71717e] uppercase tracking-wider block font-medium">
                    Price
                  </span>
                  <span className="text-lg font-bold font-mono text-white tabular-nums">
                    {settings.currency} {service.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs font-extrabold uppercase tracking-wider rounded transition-all cursor-pointer shadow active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Note Callout */}
        <div className="mt-16 p-6 bg-[#141418] border border-[#282833] rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>Follow My House Concierge Service</span>
            </h4>
            <p className="text-xs text-[#9e9ea8] max-w-2xl leading-relaxed">
              Prefer private grooming at your home or suite? Select Follow My House during booking. A fixed concierge travel surcharge of {settings.currency} {settings.homeServiceFee.toLocaleString()} applies per visit regardless of the number of services.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer whitespace-nowrap"
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
