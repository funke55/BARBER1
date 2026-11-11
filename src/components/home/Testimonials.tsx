import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Tendai Moyo',
      role: 'Area 10 Resident',
      service: 'Haircut & Beard Trim (Shop Visit)',
      quote:
        'Marcus gives the cleanest skin fade in Lilongwe. The shop is quiet and comfortable, and my appointment starts exactly on time every visit.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jean-Luc V.',
      role: 'Diplomat, Area 9',
      service: 'Follow My House (Home Visit)',
      quote:
        'The home service is fantastic. Marcus arrived right at my gate on time with clean, professional tools. Very convenient and discreet.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Kondwani Msowoya',
      role: 'Business Owner, City Centre',
      service: 'Precision Fade & Hot Towel Shave',
      quote:
        'Top quality haircut. The hot towel shave is very relaxing and sharp. Highly recommend booking in advance through this website.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0e0e12] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#e6ca85] uppercase tracking-wider mb-2.5">
            Client Reviews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Real feedback from our regular clients in Lilongwe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-[#15151b] border border-gray-800 hover:border-gray-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-6 italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800/80">
                <h4 className="font-display font-bold text-white text-sm">{r.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{r.role}</p>
                <span className="text-[11px] text-[#e6ca85] font-semibold block mt-1">
                  {r.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
