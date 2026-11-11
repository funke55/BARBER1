/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { FeaturedServices } from './components/home/FeaturedServices';
import { ServiceOptions } from './components/home/ServiceOptions';
import { BarberSpotlight } from './components/home/BarberSpotlight';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { Testimonials } from './components/home/Testimonials';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { BookingLookup } from './components/booking/BookingLookup';
import { BookingWizard } from './components/booking/BookingWizard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BarberStorage, subscribeToStorage } from './services/storage';
import {
  Booking,
  Service,
  Barber,
  BusinessSettings,
  ServiceLocationType,
} from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [settings, setSettings] = useState<BusinessSettings>(BarberStorage.getSettings());
  const [services, setServices] = useState<Service[]>(BarberStorage.getServices());
  const [barbers, setBarbers] = useState<Barber[]>(BarberStorage.getBarbers());
  const [bookings, setBookings] = useState<Booking[]>(BarberStorage.getBookings());

  // Booking Wizard Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedLocation, setPreselectedLocation] = useState<ServiceLocationType | undefined>();

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('barber1_admin_auth') === 'true';
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Subscribe to storage changes for instant multi-view reactive sync
  useEffect(() => {
    const refreshData = () => {
      setSettings(BarberStorage.getSettings());
      setServices(BarberStorage.getServices());
      setBarbers(BarberStorage.getBarbers());
      setBookings(BarberStorage.getBookings());
    };

    const unsubscribe = subscribeToStorage(refreshData);
    return () => unsubscribe();
  }, []);

  const handleOpenBooking = (serviceId?: string, location?: ServiceLocationType) => {
    setPreselectedServiceId(serviceId);
    setPreselectedLocation(location);
    setIsBookingOpen(true);
  };

  const handleOpenAdminPortal = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('barber1_admin_auth', 'true');
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('barber1_admin_auth');
    setCurrentView('home');
  };

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  // If in Admin Dashboard view and authenticated
  if (currentView === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        settings={settings}
        bookings={bookings}
        services={services}
        onRefresh={() => {
          setSettings(BarberStorage.getSettings());
          setServices(BarberStorage.getServices());
          setBookings(BarberStorage.getBookings());
        }}
        onLogout={handleLogout}
        onViewClientSite={() => setCurrentView('home')}
      />
    );
  }

  // Customer-Facing Website View
  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#f5f5f7] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        settings={settings}
        currentView={currentView}
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdminPortal}
        isAdminLoggedIn={isAdminLoggedIn}
        pendingCount={pendingCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <>
            <Hero
              settings={settings}
              onOpenBooking={() => handleOpenBooking()}
              onQuickBook={(serviceId, loc) => handleOpenBooking(serviceId, loc)}
              onNavigate={(viewId) => {
                setCurrentView(viewId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ServiceOptions
              settings={settings}
              onOpenBookingWithLocation={(loc) => handleOpenBooking(undefined, loc)}
            />

            <FeaturedServices
              services={services}
              settings={settings}
              onSelectService={(service) => handleOpenBooking(service.id)}
              onViewAll={() => {
                setCurrentView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {barbers.length > 0 && (
              <BarberSpotlight
                barber={barbers[0]}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}

            <WhyChooseUs />

            <Testimonials />
          </>
        )}

        {/* SERVICES PAGE */}
        {currentView === 'services' && (
          <ServicesPage
            services={services}
            settings={settings}
            onSelectService={(service) => handleOpenBooking(service.id)}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* ABOUT PAGE */}
        {currentView === 'about' && (
          <AboutPage onOpenBooking={() => handleOpenBooking()} />
        )}

        {/* TRACK / LOOKUP BOOKING PAGE */}
        {currentView === 'lookup' && (
          <BookingLookup
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* CONTACT PAGE */}
        {currentView === 'contact' && (
          <ContactPage
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdminPortal}
      />

      {/* 7-Step Interactive Booking Engine Modal */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedLocation={preselectedLocation}
        onBookingComplete={(newBooking) => {
          setBookings(BarberStorage.getBookings());
        }}
      />

      {/* Barber Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
