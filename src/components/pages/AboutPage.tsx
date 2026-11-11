import React from 'react';
import { ShieldCheck, Award, Compass, Eye, HeartHandshake, Scissors } from 'lucide-react';
import { ASSET_IMAGES } from '../../services/storage';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-16 bg-[#0b0b0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#c5a059] uppercase mb-2">
            <span>Heritage & Philosophy</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5f5f7]">
            Craftsmanship Without Compromise
          </h1>
          <p className="mt-4 text-base text-[#9e9ea8] leading-relaxed">
            BARBER 1 was founded on a singular conviction: that the grooming ritual is the cornerstone of executive dignity, personal confidence, and timeless masculine refinement.
          </p>
        </div>

        {/* 2-Column Split: Image & Brand Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="rounded-lg overflow-hidden border border-[#282833] bg-[#141418] shadow-2xl">
              <img
                src={ASSET_IMAGES.serviceCraft}
                alt="Artisanal straight razor detailing at BARBER 1"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-snug">
              Who We Are
            </h2>
            <p className="text-sm text-[#a0a0b0] leading-relaxed">
              Based in Lilongwe, Malawi, BARBER 1 operates as a private gentleman’s grooming sanctum and an executive mobile service. We reject assembly-line barbershops where patrons are rushed through chairs in fifteen minutes.
            </p>
            <p className="text-sm text-[#a0a0b0] leading-relaxed">
              Every appointment at BARBER 1 is dedicated to one client at a time. We examine your hairline growth patterns, facial proportions, and lifestyle demands to sculpt cuts that look sharp immediately and grow out with effortless grace.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-[#202028]">
              <div>
                <span className="font-cinzel text-xl font-bold text-[#c5a059]">Bespoke</span>
                <p className="text-xs text-[#8e8e9c] mt-0.5">Tailored to individual cranial symmetry</p>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold text-white">Discreet</span>
                <p className="text-xs text-[#8e8e9c] mt-0.5">Full confidentiality for high-profile patrons</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 bg-[#141418] border border-[#282833] rounded-lg space-y-4">
            <div className="w-10 h-10 rounded-md bg-[#0b0b0e] border border-[#282833] flex items-center justify-center text-[#c5a059]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-[#9e9ea8] leading-relaxed">
              To elevate the standard of grooming across Central Africa by blending old-world European master barbering traditions with cutting-edge styling and medical-grade hygiene protocols.
            </p>
          </div>

          <div className="p-8 bg-[#141418] border border-[#282833] rounded-lg space-y-4">
            <div className="w-10 h-10 rounded-md bg-[#0b0b0e] border border-[#282833] flex items-center justify-center text-[#c5a059]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-[#9e9ea8] leading-relaxed">
              To be the gold standard in premium executive grooming, renowned for flawless punctuality, master craft, and pioneering mobile luxury services that set new benchmarks for customer satisfaction.
            </p>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-cinzel text-2xl font-bold text-white">
              The Four Cornerstones of Our Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#141418] border border-[#282833] rounded-lg">
              <ShieldCheck className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-cinzel font-bold text-white text-base mb-1.5">Hospital Cleanliness</h4>
              <p className="text-xs text-[#9e9ea8] leading-relaxed">
                Ultrasonic sterilization and fresh single-use razor blades for every patron with zero exceptions.
              </p>
            </div>

            <div className="p-6 bg-[#141418] border border-[#282833] rounded-lg">
              <Scissors className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-cinzel font-bold text-white text-base mb-1.5">Mastery of Tooling</h4>
              <p className="text-xs text-[#9e9ea8] leading-relaxed">
                Hand-forged Japanese stainless steel shears and calibrated German rotary clippers.
              </p>
            </div>

            <div className="p-6 bg-[#141418] border border-[#282833] rounded-lg">
              <HeartHandshake className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-cinzel font-bold text-white text-base mb-1.5">Patron Reverence</h4>
              <p className="text-xs text-[#9e9ea8] leading-relaxed">
                Uncompromising respect for your schedule, your privacy, and your unique grooming preferences.
              </p>
            </div>

            <div className="p-6 bg-[#141418] border border-[#282833] rounded-lg">
              <Award className="w-6 h-6 text-[#c5a059] mb-3" />
              <h4 className="font-cinzel font-bold text-white text-base mb-1.5">Continuous Evolution</h4>
              <p className="text-xs text-[#9e9ea8] leading-relaxed">
                Ongoing international masterclasses to master emerging hair sciences, skin therapies, and styling trends.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-[#141418] border border-[#282833] rounded-xl text-center max-w-2xl mx-auto space-y-4">
          <h3 className="font-cinzel text-2xl font-bold text-white">
            Experience the Standard Firsthand
          </h3>
          <p className="text-xs text-[#9e9ea8]">
            Reserve an appointment in our Area 10 lounge or book Follow My House to your home.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
