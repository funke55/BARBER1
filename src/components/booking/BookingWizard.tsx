import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  Store,
  Home,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Copy,
  CheckCircle,
  Scissors,
  Sparkles,
} from 'lucide-react';
import { Service, Barber, BusinessSettings, ServiceLocationType, Booking } from '../../types';
import { BarberStorage } from '../../services/storage';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedLocation?: ServiceLocationType;
  onBookingComplete: (booking: Booking) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedLocation,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(BarberStorage.getSettings());

  // Form State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [locationType, setLocationType] = useState<ServiceLocationType>('shop');
  
  // Home service address fields
  const [streetAddress, setStreetAddress] = useState('');
  const [areaOrNeighborhood, setAreaOrNeighborhood] = useState('Area 10');
  const [landmarks, setLandmarks] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Date and Time State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Customer Contact State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize data
  useEffect(() => {
    if (isOpen) {
      const allServices = BarberStorage.getActiveServices();
      const allBarbers = BarberStorage.getBarbers();
      const currentSettings = BarberStorage.getSettings();

      setServices(allServices);
      setBarbers(allBarbers);
      setSettings(currentSettings);

      // Defaults
      if (allBarbers.length > 0) {
        setSelectedBarber(allBarbers[0]);
      }

      if (preselectedServiceId) {
        const found = allServices.find((s) => s.id === preselectedServiceId);
        if (found) setSelectedService(found);
      } else if (allServices.length > 0 && !selectedService) {
        setSelectedService(allServices[0]);
      }

      if (preselectedLocation) {
        setLocationType(preselectedLocation);
      }

      // Default date to tomorrow if none selected
      if (!selectedDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
      }
    }
  }, [isOpen, preselectedServiceId, preselectedLocation]);

  // Recalculate available slots whenever date or service changes
  useEffect(() => {
    if (selectedDate && selectedService) {
      setSlotsLoading(true);
      const slots = BarberStorage.getAvailableTimeSlots(
        selectedDate,
        selectedService.durationMinutes
      );
      setAvailableSlots(slots);
      setSlotsLoading(false);

      if (selectedTimeSlot && !slots.includes(selectedTimeSlot)) {
        setSelectedTimeSlot('');
      }
    }
  }, [selectedDate, selectedService]);

  if (!isOpen) return null;

  // Total calculation
  const homeFee = locationType === 'home' ? settings.homeServiceFee : 0;
  const totalPrice = (selectedService?.price || 0) + homeFee;

  // Step Validation
  const canProceedToNext = (): boolean => {
    setFormError(null);
    if (step === 1) {
      if (!selectedService) {
        setFormError('Please select a grooming service.');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!selectedBarber) {
        setFormError('Please select a barber.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (locationType === 'home') {
        if (!streetAddress.trim() || !areaOrNeighborhood.trim()) {
          setFormError('Please provide your residential street address and area.');
          return false;
        }
      }
      return true;
    }
    if (step === 4) {
      if (!selectedDate) {
        setFormError('Please select an appointment date.');
        return false;
      }
      if (!selectedTimeSlot) {
        setFormError('Please select an available appointment time slot.');
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!customerName.trim()) {
        setFormError('Please enter your full name.');
        return false;
      }
      if (!customerPhone.trim() || customerPhone.trim().length < 7) {
        setFormError('Please enter a valid phone number for appointment notifications.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (canProceedToNext()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setFormError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = async () => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTimeSlot) {
      setFormError('Missing required booking details.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const newBooking = BarberStorage.createBooking({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        durationMinutes: selectedService.durationMinutes,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        locationType,
        homeServiceDetails:
          locationType === 'home'
            ? {
                streetAddress,
                areaOrNeighborhood,
                landmarks,
                specialInstructions,
              }
            : undefined,
        homeServiceFee: homeFee,
        totalPrice,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerNotes: customerNotes.trim() || undefined,
      });

      setConfirmedBooking(newBooking);
      setStep(7); // Confirmation screen
      onBookingComplete(newBooking);
    } catch (err) {
      setFormError('An error occurred while saving your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferenceCode = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // Generate 14 selectable consecutive days
  const upcomingDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start from tomorrow
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141418] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#0d0d11] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-black text-white tracking-tight">
                BARBER 1
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            </div>
            <span className="text-gray-700">|</span>
            <span className="text-xs text-gray-400 font-medium tracking-wide">
              {step < 7 ? `Step ${step} of 6` : 'Appointment Confirmed'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Steps 1 to 6) */}
        {step <= 6 && (
          <div className="h-1 bg-[#202028] w-full">
            <div
              className="h-full bg-[#c5a059] transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto">
          {formError && (
            <div className="mb-4 sm:mb-6 p-3.5 bg-red-950/40 border border-red-800/60 rounded-md text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Step 1: Choose a Service
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Select the haircut or grooming service you want.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {services.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setFormError(null);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#1b1b26] border-[#c5a059] shadow-md'
                          : 'bg-[#0f0f13] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm text-white">
                            {service.name}
                          </span>
                          {service.homeServiceEligible && (
                            <span className="text-[10px] text-[#e6ca85] font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                              Home Eligible
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-1">
                          <Clock className="w-3 h-3 text-[#c5a059]" />
                          <span className="tabular-nums">{service.durationMinutes} Minutes</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold font-mono text-white tabular-nums">
                          {settings.currency} {service.price.toLocaleString()}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full mt-2 ml-auto flex items-center justify-center text-xs ${
                            isSelected
                              ? 'bg-[#c5a059] text-black font-bold'
                              : 'border border-gray-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Step 2: Select Your Barber
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  BARBER 1 operates with senior master barbers to ensure consistency.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {barbers.map((barber) => {
                  const isSelected = selectedBarber?.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => {
                        setSelectedBarber(barber);
                        setFormError(null);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? 'bg-[#1b1b26] border-[#c5a059] shadow-md'
                          : 'bg-[#0f0f13] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <img
                        src={barber.photo}
                        alt={barber.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full object-cover border border-gray-700 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-base text-white">
                            {barber.name}
                          </h4>
                          <span className="text-xs text-[#e6ca85] font-semibold tabular-nums">
                            ★ {barber.rating} ({barber.experienceYears} yrs)
                          </span>
                        </div>
                        <p className="text-xs text-[#e6ca85] font-medium mt-0.5">{barber.title}</p>
                        <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">
                          {barber.bio}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs ${
                          isSelected ? 'bg-[#c5a059] text-black font-bold' : 'border border-gray-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SELECT SERVICE LOCATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Step 3: Barbershop or Home Service?
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Choose whether you want to visit our shop or have the barber visit your home.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option A: Shop */}
                <div
                  onClick={() => {
                    setLocationType('shop');
                    setFormError(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    locationType === 'shop'
                      ? 'bg-[#1b1b26] border-[#c5a059] shadow-md'
                      : 'bg-[#0f0f13] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e6ca85] mb-3">
                      <Store className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-base text-white">
                      In-Shop Lounge
                    </h4>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                      Visit our flagship lounge at Area 10, Lilongwe.
                    </p>
                    <div className="mt-3 text-xs text-[#e6ca85] font-semibold">
                      Standard service pricing
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-400">
                    Complimentary refreshment & hot steamed towel.
                  </div>
                </div>

                {/* Option B: Home Service */}
                <div
                  onClick={() => {
                    if (selectedService && !selectedService.homeServiceEligible) {
                      setFormError(
                        'The selected service is only available at our physical lounge. Please select a different service or choose in-shop.'
                      );
                      return;
                    }
                    setLocationType('home');
                    setFormError(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    locationType === 'home'
                      ? 'bg-[#1b1b26] border-[#c5a059] shadow-md'
                      : 'bg-[#0f0f13] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e6ca85] mb-3">
                      <Home className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-white">
                        Follow My House
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 bg-[#c5a059]/20 text-[#e6ca85] rounded-full font-bold uppercase">
                        Mobile
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                      The Master Barber travels to your home or preferred location.
                    </p>
                    <div className="mt-3 text-xs text-[#e6ca85] font-semibold">
                      +{settings.currency} {settings.homeServiceFee.toLocaleString()} Concierge Fee
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-400">
                    Requires standard electrical plug.
                  </div>
                </div>
              </div>

              {/* If Home Service is selected, collect address fields */}
              {locationType === 'home' && (
                <div className="p-4 bg-[#0f0f13] border border-[#282833] rounded-lg space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                    <Home className="w-3.5 h-3.5" />
                    <span>Residential Service Address Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#9e9ea8] block mb-1">
                        Street / Residence Address *
                      </label>
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. Plot 43/12, Off Presidential Way"
                        className="w-full px-3 py-2 bg-[#141418] border border-[#282833] rounded text-sm text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#9e9ea8] block mb-1">
                        Area / Neighborhood *
                      </label>
                      <input
                        type="text"
                        value={areaOrNeighborhood}
                        onChange={(e) => setAreaOrNeighborhood(e.target.value)}
                        placeholder="e.g. Area 10, Area 43, Area 12, Area 9"
                        className="w-full px-3 py-2 bg-[#141418] border border-[#282833] rounded text-sm text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#9e9ea8] block mb-1">
                      Notable Landmarks / Directions (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmarks}
                      onChange={(e) => setLandmarks(e.target.value)}
                      placeholder="e.g. Opposite High Commission residences, black gate"
                      className="w-full px-3 py-2 bg-[#141418] border border-[#282833] rounded text-sm text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#9e9ea8] block mb-1">
                      Security Gate / Entry Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Inform security guard at gate, ring intercom #4"
                      className="w-full px-3 py-2 bg-[#141418] border border-[#282833] rounded text-sm text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: SELECT DATE & TIME */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Step 4: Pick a Date & Time
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Select your preferred appointment date and time slot.
                </p>
              </div>

              {/* Date Selection Horizontal Carousel */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
                  Select Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {upcomingDays.map((dStr) => {
                    const dateObj = new Date(dStr + 'T00:00:00');
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = dateObj.getDate();
                    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
                    const isSelected = selectedDate === dStr;

                    return (
                      <button
                        key={dStr}
                        onClick={() => {
                          setSelectedDate(dStr);
                          setFormError(null);
                        }}
                        className={`shrink-0 px-3.5 py-2.5 rounded-2xl border text-center transition-all cursor-pointer min-w-[70px] ${
                          isSelected
                            ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold shadow-md'
                            : 'bg-[#15151c] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                        }`}
                      >
                        <span className="text-[11px] uppercase block tracking-wider opacity-80">
                          {dayName}
                        </span>
                        <span className="text-lg font-bold font-mono block mt-0.5 tabular-nums">
                          {dayNum}
                        </span>
                        <span className="text-[10px] block opacity-80">{monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
                  Available Times for {selectedDate}
                </label>

                {slotsLoading ? (
                  <div className="p-8 text-center text-xs text-gray-400">
                    Checking chair availability...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="p-6 bg-[#15151c] border border-gray-800 rounded-2xl text-center">
                    <p className="text-xs text-gray-400">
                      No available times for this date. The barber may be fully booked or closed.
                    </p>
                    <p className="text-[11px] text-[#e6ca85] font-semibold mt-1">
                      Please pick another date above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => {
                            setSelectedTimeSlot(slot);
                            setFormError(null);
                          }}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer tabular-nums flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-md'
                              : 'bg-[#15151c] border-gray-800 text-white hover:border-gray-600'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: CUSTOMER INFORMATION */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Step 5: Customer Contact Details
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  We use your phone number for appointment notifications and booking lookup.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Kondwani Chirwa"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#0d0d11] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Phone Number (WhatsApp Preferred) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +265 999 123 456"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#0d0d11] border border-gray-800 rounded-xl text-sm text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. patron@executive.mw"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#0d0d11] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#9e9ea8] block mb-1">
                    Special Grooming Notes or Styling Requests (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-[#71717e] absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="e.g. Sensitive skin on neck, prefer low skin taper, extra hot towel"
                      className="w-full pl-9 pr-3 py-2 bg-[#0f0f13] border border-[#282833] rounded text-sm text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: BOOKING SUMMARY BEFORE SUBMISSION */}
          {step === 6 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#f5f5f7]">
                  Step 6: Review Booking Summary
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Please review your appointment details before submitting your request.
                </p>
              </div>

              <div className="bg-[#15151c] border border-gray-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-start pb-3 border-b border-gray-800">
                  <div>
                    <span className="text-xs text-[#e6ca85] uppercase tracking-wider block font-bold">
                      Service
                    </span>
                    <span className="font-display font-bold text-base text-white">
                      {selectedService?.name}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      Estimated Duration: {selectedService?.durationMinutes} Minutes
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    {settings.currency} {selectedService?.price.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider font-bold">Barber</span>
                    <span className="font-semibold text-white">{selectedBarber?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider font-bold">Date & Time</span>
                    <span className="font-semibold text-white font-mono tabular-nums">
                      {selectedDate} at {selectedTimeSlot}
                    </span>
                  </div>
                </div>

                <div className="text-xs pt-2 border-t border-gray-800">
                  <span className="text-gray-400 block uppercase tracking-wider mb-1 font-bold">
                    Location & Delivery
                  </span>
                  {locationType === 'shop' ? (
                    <div className="text-gray-300 flex items-center gap-1.5 font-medium">
                      <Store className="w-3.5 h-3.5 text-[#e6ca85]" />
                      <span>BARBER 1 Flagship Lounge – Area 10, Lilongwe</span>
                    </div>
                  ) : (
                    <div className="space-y-1 text-gray-300">
                      <div className="flex items-center gap-1.5 text-[#e6ca85] font-semibold">
                        <Home className="w-3.5 h-3.5" />
                        <span>Follow My House – Mobile Home Service</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Address: {streetAddress}, {areaOrNeighborhood}
                      </div>
                      {landmarks && (
                        <div className="text-[11px] text-gray-500">
                          Landmarks: {landmarks}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-4 border-t border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Service Rate</span>
                    <span className="font-mono tabular-nums">
                      {settings.currency} {selectedService?.price.toLocaleString()}
                    </span>
                  </div>

                  {locationType === 'home' && (
                    <div className="flex justify-between text-[#e6ca85]">
                      <span>Follow My House Travel Fee</span>
                      <span className="font-mono tabular-nums">
                        +{settings.currency} {homeFee.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gray-800">
                    <span>Total Amount</span>
                    <span className="font-mono text-base text-[#e6ca85] tabular-nums font-extrabold">
                      {settings.currency} {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Notice */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold block">Pending Review</span>
                  Your booking will initially be marked as <strong className="uppercase">Pending</strong>. Master Barber Marcus will review the request and accept it in the system.
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: SUBMISSION CONFIRMATION */}
          {step === 7 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#e6ca85] font-bold block mb-1">
                  Appointment Request Received
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Booking Reference Generated
                </h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="text-white font-bold">{confirmedBooking.customerName}</span>. Your appointment has been submitted with an initial <span className="text-amber-400 font-bold uppercase">Pending</span> status.
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-5 bg-[#0d0d11] border border-gray-800 rounded-2xl max-w-sm mx-auto shadow-inner">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                  Your Booking Reference Code
                </span>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="font-mono text-3xl font-extrabold text-white tracking-wider">
                    {confirmedBooking.reference}
                  </span>
                  <button
                    onClick={copyReferenceCode}
                    className="p-2 text-gray-400 hover:text-white bg-[#15151c] hover:bg-gray-800 rounded-xl border border-gray-700 transition-colors cursor-pointer"
                    title="Copy reference code"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedRef && (
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-1.5">Copied to clipboard!</span>
                )}
              </div>

              {/* Appointment summary recap */}
              <div className="text-xs text-gray-300 space-y-1.5 max-w-sm mx-auto p-4 bg-[#15151c] border border-gray-800/80 rounded-2xl">
                <p>
                  <strong className="text-white">Service:</strong> {confirmedBooking.serviceName}
                </p>
                <p>
                  <strong className="text-white">Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.timeSlot}
                </p>
                <p>
                  <strong className="text-white">Location:</strong>{' '}
                  {confirmedBooking.locationType === 'home'
                    ? `Follow My House (${confirmedBooking.homeServiceDetails?.areaOrNeighborhood})`
                    : 'BARBER 1 Flagship Lounge'}
                </p>
                <p>
                  <strong className="text-white">Total Amount:</strong> {settings.currency}{' '}
                  {confirmedBooking.totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 6) */}
        {step <= 6 && (
          <div className="px-6 py-4 bg-[#0d0d11] border-t border-gray-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white bg-[#15151c] hover:bg-gray-800 border border-gray-800 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-7 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md active:scale-95"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitBooking}
                disabled={submitting}
                className="flex items-center gap-2 px-7 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-lg active:scale-95"
              >
                {submitting ? (
                  <span>Saving Request...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Book</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
