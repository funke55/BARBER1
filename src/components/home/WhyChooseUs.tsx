import React from 'react';
import { ShieldCheck, Award, Clock, Home } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Clean & Sanitized Tools',
      description:
        'All clippers, razor blades, and shears are thoroughly sanitized and disinfected for every client.',
      icon: ShieldCheck,
    },
    {
      title: '14+ Years Experience',
      description:
        'Master training in London and Cape Town brings international grooming standards to Lilongwe.',
      icon: Award,
    },
    {
      title: 'No Waiting in Lines',
      description:
        'When you book an appointment, your time is strictly reserved. You sit in the chair right away.',
      icon: Clock,
    },
    {
      title: 'Home Visits Available',
      description:
        'Prefer to stay home? Book our Follow My House service and we will come straight to your residence or office.',
      icon: Home,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0a0a0d] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#e6ca85] uppercase tracking-wider mb-2.5">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The BARBER 1 Guarantee
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Quality grooming, medical-grade hygiene, and strict punctuality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-6 bg-[#14141a] border border-gray-800 hover:border-gray-700 rounded-2xl flex flex-col justify-between shadow-lg transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e6ca85] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
