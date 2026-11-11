import React, { useState } from 'react';
import { Calendar, Shield, Menu, X } from 'lucide-react';
import { BusinessSettings } from '../../types';

interface HeaderProps {
  settings: BusinessSettings;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  pendingCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  currentView,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  isAdminLoggedIn,
  pendingCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Prices' },
    { id: 'about', label: 'About Us' },
    { id: 'lookup', label: 'Track Booking' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 text-black transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo / Brand Name - Guaranteed Single-Line on Mobile */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white font-display font-extrabold text-xs sm:text-sm flex items-center justify-center rounded-xl shadow-xs">
              B1
            </div>
            <div className="whitespace-nowrap">
              <span className="font-display text-base sm:text-2xl font-black tracking-tight text-black block leading-none">
                BARBER 1
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-sans tracking-normal block mt-0.5 font-medium">
                Lilongwe, Malawi
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors cursor-pointer py-1.5 px-3 rounded-full ${
                    isActive
                      ? 'text-black font-extrabold bg-gray-100'
                      : 'hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons - Perfectly Proportioned on Mobile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Barber Portal Button (Desktop) */}
            <button
              onClick={onOpenAdmin}
              title={isAdminLoggedIn ? 'Open Dashboard' : 'Barber Staff Login'}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full transition-all cursor-pointer relative"
            >
              <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="whitespace-nowrap">
                {isAdminLoggedIn ? 'Dashboard' : 'Barber Login'}
              </span>
              {pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            {/* Book Now Button - Sleek Pill with Rounded-Full */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm tracking-wide rounded-full shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059]" />
              <span>Book Now</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-black focus:outline-none cursor-pointer rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors ${
                  currentView === link.id
                    ? 'bg-black text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl"
            >
              <Shield className="w-4 h-4 text-[#c5a059]" />
              <span>{isAdminLoggedIn ? 'Open Barber Dashboard' : 'Barber & Staff Login'}</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px] font-bold rounded-full">
                  {pendingCount} Pending
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
