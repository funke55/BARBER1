import {
  Booking,
  Service,
  Barber,
  BusinessSettings,
  WorkingHours,
  Customer,
  Notification,
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
} from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'barber1_bookings_v1',
  SERVICES: 'barber1_services_v1',
  BARBERS: 'barber1_barbers_v1',
  SETTINGS: 'barber1_settings_v1',
  WORKING_HOURS: 'barber1_hours_v1',
  CUSTOMERS: 'barber1_customers_v1',
  NOTIFICATIONS: 'barber1_notifications_v1',
  INITIALIZED: 'barber1_initialized_v1',
};

// Default high-fidelity image assets from our generation batch
export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_barber_lounge_1794322263474.jpg',
  serviceCraft: '/src/assets/images/service_craft_grooming_1794322262833.jpg',
  serviceHome: '/src/assets/images/service_home_mobile_1794322264365.jpg',
  barberPortrait: '/src/assets/images/master_barber_portrait_1794322264044.jpg',
};

const DEFAULT_SETTINGS: BusinessSettings = {
  businessName: 'BARBER 1',
  tagline: 'Haute Barbiere & Executive Mobile Grooming',
  description:
    'Lilongwe’s premier sanctuary for gentleman grooming. We merge traditional artisanal barbering with contemporary precision, offering bespoke lounge services and luxury Follow My House private home grooming.',
  phone: '+265 999 000 000',
  email: 'info@barber1.demo',
  address: 'Presidential Way, Area 10, Lilongwe, Malawi',
  cityArea: 'Area 10 / City Centre',
  currency: 'MWK',
  homeServiceFee: 15000,
  instagram: '@barber1.malawi',
  facebook: 'Barber1LuxuryMalawi',
  xTwitter: '@barber1mw',
  cancellationPolicy:
    'Appointments may be cancelled or rescheduled up to 3 hours in advance without penalty. For Follow My House home bookings, cancellations made under 2 hours may incur a 50% travel fee.',
  bookingRules:
    'All appointments begin promptly at the scheduled time. A 10-minute courtesy grace period applies. Home service bookings require a secure parking space and access to a standard electrical outlet.',
  isDemoMode: true,
};

const DEFAULT_BARBER: Barber = {
  id: 'barber-01',
  name: 'Marcus Kazembe',
  title: 'Founder & Master Barber',
  bio: 'With over 14 years of international training in London and Cape Town, Marcus is revered for surgical skin fades, bespoke beard architecture, and discreet executive home grooming for dignitaries and business leaders.',
  photo: ASSET_IMAGES.barberPortrait,
  experienceYears: 14,
  rating: 4.98,
  specialties: ['Precision Skin Fades', 'Hot Towel Beard Sculpting', 'Scissor Craft', 'Executive Home Service'],
};

const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-01',
    name: 'The Signature Haircut',
    category: 'haircut',
    description: 'Precision scissor and clipper cut tailored to your head shape, completed with neck shave, styling pomade, and refreshing tonic.',
    price: 15000,
    durationMinutes: 45,
    image: ASSET_IMAGES.hero,
    homeServiceEligible: true,
    popular: true,
    active: true,
  },
  {
    id: 'srv-02',
    name: 'Precision Skin Fade',
    category: 'haircut',
    description: 'Flawless low, mid, or high bald fade with seamless gradient transition, razor edge detailing, and scalp hydration.',
    price: 18000,
    durationMinutes: 50,
    image: ASSET_IMAGES.hero,
    homeServiceEligible: true,
    popular: true,
    active: true,
  },
  {
    id: 'srv-03',
    name: 'Hot Towel Beard Sculpt & Shave',
    category: 'beard',
    description: 'Traditional multi-step straight razor shaping, steamed eucalyptus towels, botanical shaving cream, and sandalwood beard oil treatment.',
    price: 12000,
    durationMinutes: 35,
    image: ASSET_IMAGES.serviceCraft,
    homeServiceEligible: true,
    popular: false,
    active: true,
  },
  {
    id: 'srv-04',
    name: 'The Gentleman’s Duo (Hair & Beard)',
    category: 'package',
    description: 'Our premier complete service: Full precision haircut, skin fade or taper, hot towel straight razor beard sculpting, and facial mist.',
    price: 26000,
    durationMinutes: 75,
    image: ASSET_IMAGES.serviceCraft,
    homeServiceEligible: true,
    popular: true,
    active: true,
  },
  {
    id: 'srv-05',
    name: 'Royal Executive VIP Experience',
    category: 'package',
    description: 'The definitive luxury grooming ritual: Haircut, hot towel shave, detoxifying charcoal facial mask, revitalizing scalp massage, and ear/nose wax grooming.',
    price: 40000,
    durationMinutes: 90,
    image: ASSET_IMAGES.serviceHome,
    homeServiceEligible: true,
    popular: false,
    active: true,
  },
  {
    id: 'srv-06',
    name: 'Hair Wash & Scalp Invigoration',
    category: 'treatment',
    description: 'Deep cleansing organic tea tree wash, tension-relieving acupressure scalp massage, and leave-in botanical conditioning.',
    price: 8000,
    durationMinutes: 25,
    image: ASSET_IMAGES.hero,
    homeServiceEligible: false,
    popular: false,
    active: true,
  },
  {
    id: 'srv-07',
    name: 'Junior Gentleman (Under 12)',
    category: 'haircut',
    description: 'Patient, gentle styling for young gentlemen with scissor finish, textured top, and complimentary refreshments.',
    price: 10000,
    durationMinutes: 30,
    image: ASSET_IMAGES.hero,
    homeServiceEligible: true,
    popular: false,
    active: true,
  },
  {
    id: 'srv-08',
    name: 'Charcoal Purifying Facial Treatment',
    category: 'treatment',
    description: 'Exfoliating volcanic ash scrub, heated aromatic steam, blackhead unclogging mask, and cooling cucumber eye pads.',
    price: 16000,
    durationMinutes: 40,
    image: ASSET_IMAGES.serviceCraft,
    homeServiceEligible: true,
    popular: false,
    active: true,
  },
];

const DEFAULT_WORKING_HOURS: WorkingHours = {
  schedule: {
    0: { open: false, start: '10:00', end: '16:00' }, // Sunday - Closed for in-shop, available on custom request
    1: { open: true, start: '08:30', end: '19:30' }, // Monday
    2: { open: true, start: '08:30', end: '19:30' }, // Tuesday
    3: { open: true, start: '08:30', end: '19:30' }, // Wednesday
    4: { open: true, start: '08:30', end: '19:30' }, // Thursday
    5: { open: true, start: '08:30', end: '20:00' }, // Friday (extended)
    6: { open: true, start: '08:30', end: '18:00' }, // Saturday
  },
  breakStart: '13:00',
  breakEnd: '14:00',
  slotIntervalMinutes: 45,
  blackoutDates: [],
};

// Seed realistic demo bookings
const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'bkg-101',
    reference: 'B1-9481',
    serviceId: 'srv-04',
    serviceName: 'The Gentleman’s Duo (Hair & Beard)',
    servicePrice: 26000,
    durationMinutes: 75,
    barberId: 'barber-01',
    barberName: 'Marcus Kazembe',
    locationType: 'home',
    homeServiceDetails: {
      streetAddress: 'Plot 43/12, Off Presidential Boulevard',
      areaOrNeighborhood: 'Area 43, Lilongwe',
      landmarks: 'Opposite High Commission residences, black sliding gate',
      specialInstructions: 'Security guard at gate has been informed; enter via stone driveway.',
    },
    homeServiceFee: 15000,
    totalPrice: 41000,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '10:00',
    customerName: 'Chimwemwe Phiri',
    customerPhone: '+265 991 234 567',
    customerEmail: 'c.phiri@consulting.mw',
    customerNotes: 'Require early preparation before afternoon executive board meeting.',
    internalNotes: 'VIP client. Prefers sandalwood aftershave and low skin taper.',
    barberResponseNote: '',
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    amountPaid: 0,
    balanceDue: 41000,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'bkg-102',
    reference: 'B1-8293',
    serviceId: 'srv-02',
    serviceName: 'Precision Skin Fade',
    servicePrice: 18000,
    durationMinutes: 50,
    barberId: 'barber-01',
    barberName: 'Marcus Kazembe',
    locationType: 'shop',
    homeServiceFee: 0,
    totalPrice: 18000,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '14:30',
    customerName: 'Tiyamike Banda',
    customerPhone: '+265 888 776 655',
    customerEmail: 'tiyamike.banda@finance.mw',
    customerNotes: 'First time visiting BARBER 1.',
    internalNotes: 'Referred by Dr. Gondwe.',
    barberResponseNote: '',
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    amountPaid: 0,
    balanceDue: 18000,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'bkg-103',
    reference: 'B1-7104',
    serviceId: 'srv-01',
    serviceName: 'The Signature Haircut',
    servicePrice: 15000,
    durationMinutes: 45,
    barberId: 'barber-01',
    barberName: 'Marcus Kazembe',
    locationType: 'shop',
    homeServiceFee: 0,
    totalPrice: 15000,
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '11:15',
    customerName: 'Davie Nyasulu',
    customerPhone: '+265 994 555 123',
    customerEmail: 'davie.n@tech.mw',
    customerNotes: 'Clean side taper, leave texture on top.',
    internalNotes: 'Confirmed via phone.',
    barberResponseNote: 'Appointment accepted. See you at our lounge.',
    status: 'accepted',
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    amountPaid: 0,
    balanceDue: 15000,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 + 1800000).toISOString(),
  },
  {
    id: 'bkg-104',
    reference: 'B1-6549',
    serviceId: 'srv-05',
    serviceName: 'Royal Executive VIP Experience',
    servicePrice: 40000,
    durationMinutes: 90,
    barberId: 'barber-01',
    barberName: 'Marcus Kazembe',
    locationType: 'home',
    homeServiceDetails: {
      streetAddress: 'Villa 7, Sanctuary Greens Estate',
      areaOrNeighborhood: 'Area 12, Lilongwe',
      landmarks: 'Near State House Gate 2',
      specialInstructions: 'Ring interlock buzzer 07 for entry.',
    },
    homeServiceFee: 15000,
    totalPrice: 55000,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    timeSlot: '16:00',
    customerName: 'Kondwani Msowoya',
    customerPhone: '+265 999 888 777',
    customerEmail: 'k.msowoya@diplomat.mw',
    customerNotes: 'Full VIP grooming package.',
    internalNotes: 'Excellent client. Paid in full via Airtel Money.',
    barberResponseNote: 'Thank you for your patronage.',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'mobile_money',
    amountPaid: 55000,
    balanceDue: 0,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 + 7200000).toISOString(),
  },
  {
    id: 'bkg-105',
    reference: 'B1-5820',
    serviceId: 'srv-04',
    serviceName: 'The Gentleman’s Duo (Hair & Beard)',
    servicePrice: 26000,
    durationMinutes: 75,
    barberId: 'barber-01',
    barberName: 'Marcus Kazembe',
    locationType: 'shop',
    homeServiceFee: 0,
    totalPrice: 26000,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    timeSlot: '14:00',
    customerName: 'Thokozani Chirwa',
    customerPhone: '+265 881 223 344',
    customerEmail: 'tchirwa@law.mw',
    customerNotes: 'Beard trim and trim top.',
    internalNotes: 'Paid in cash.',
    barberResponseNote: 'Completed.',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    amountPaid: 26000,
    balanceDue: 0,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000 + 5400000).toISOString(),
  },
  {
    id: 'bkg-106',
    reference: 'B1-4321',
    serviceId: 'srv-03',
    serviceName: 'Hot Towel Beard Sculpt & Shave',
    servicePrice: 12000,
    durationMinutes: 35,
    barberId: 'barber-01',
    barberName: 'Marcus Kazembe',
    locationType: 'shop',
    homeServiceFee: 0,
    totalPrice: 12000,
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    timeSlot: '11:00',
    customerName: 'Gomezgani Mkandawire',
    customerPhone: '+265 993 111 222',
    customerEmail: '',
    customerNotes: '',
    internalNotes: 'Client had sudden travel.',
    barberResponseNote: 'Cancelled by client.',
    status: 'cancelled',
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    amountPaid: 0,
    balanceDue: 12000,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Booking Request',
    message: 'Chimwemwe Phiri requested Follow My House Home Service (Gentleman’s Duo) in Area 43.',
    type: 'new_booking',
    bookingId: 'bkg-101',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'notif-2',
    title: 'New In-Lounge Booking',
    message: 'Tiyamike Banda booked Precision Skin Fade for tomorrow at 14:30.',
    type: 'new_booking',
    bookingId: 'bkg-102',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'notif-3',
    title: 'Appointment Completed & Paid',
    message: 'Payment of MWK 55,000 recorded for Kondwani Msowoya via Airtel Money.',
    type: 'status_change',
    bookingId: 'bkg-104',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Reactive Event Bus
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const subscribeToStorage = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Error notifying storage listener:', e);
    }
  });
};

export class BarberStorage {
  private static init() {
    if (typeof window === 'undefined') return;
    const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!initialized) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify([DEFAULT_BARBER]));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
      localStorage.setItem(STORAGE_KEYS.WORKING_HOURS, JSON.stringify(DEFAULT_WORKING_HOURS));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  }

  // Settings
  static getSettings(): BusinessSettings {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  static updateSettings(settings: Partial<BusinessSettings>): BusinessSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    notifyListeners();
    return updated;
  }

  // Barbers
  static getBarbers(): Barber[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BARBERS);
      return data ? JSON.parse(data) : [DEFAULT_BARBER];
    } catch {
      return [DEFAULT_BARBER];
    }
  }

  // Services
  static getServices(): Service[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  }

  static getActiveServices(): Service[] {
    return this.getServices().filter((s) => s.active);
  }

  static getServiceById(id: string): Service | undefined {
    return this.getServices().find((s) => s.id === id);
  }

  static addService(service: Omit<Service, 'id'>): Service {
    const services = this.getServices();
    const newService: Service = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    services.push(newService);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    notifyListeners();
    return newService;
  }

  static updateService(id: string, updates: Partial<Service>): Service | null {
    const services = this.getServices();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    services[index] = { ...services[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    notifyListeners();
    return services[index];
  }

  static deleteService(id: string): boolean {
    const services = this.getServices();
    const filtered = services.filter((s) => s.id !== id);
    if (filtered.length === services.length) return false;
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(filtered));
    notifyListeners();
    return true;
  }

  // Working Hours & Schedule
  static getWorkingHours(): WorkingHours {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORKING_HOURS);
      return data ? JSON.parse(data) : DEFAULT_WORKING_HOURS;
    } catch {
      return DEFAULT_WORKING_HOURS;
    }
  }

  static updateWorkingHours(hours: WorkingHours): WorkingHours {
    localStorage.setItem(STORAGE_KEYS.WORKING_HOURS, JSON.stringify(hours));
    notifyListeners();
    return hours;
  }

  // Bookings
  static getBookings(): Booking[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  }

  static getBookingById(id: string): Booking | undefined {
    return this.getBookings().find((b) => b.id === id);
  }

  static getBookingByReference(reference: string): Booking | undefined {
    const cleanRef = reference.trim().toUpperCase();
    return this.getBookings().find((b) => b.reference.toUpperCase() === cleanRef);
  }

  static getBookingsByPhone(phone: string): Booking[] {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.getBookings().filter((b) => {
      const bPhone = b.customerPhone.replace(/[^0-9]/g, '');
      return bPhone.includes(cleanPhone) || cleanPhone.includes(bPhone);
    });
  }

  static createBooking(
    bookingData: Omit<
      Booking,
      | 'id'
      | 'reference'
      | 'status'
      | 'paymentStatus'
      | 'paymentMethod'
      | 'amountPaid'
      | 'balanceDue'
      | 'createdAt'
      | 'updatedAt'
    >
  ): Booking {
    const bookings = this.getBookings();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `B1-${randomSuffix}`;

    const newBooking: Booking = {
      ...bookingData,
      id: `bkg-${Date.now()}`,
      reference,
      status: 'pending', // Starts strictly as PENDING as requested
      paymentStatus: 'unpaid',
      paymentMethod: 'pending',
      amountPaid: 0,
      balanceDue: bookingData.totalPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Create Notification for the Barber
    this.addNotification({
      title: 'New Booking Submitted',
      message: `${newBooking.customerName} requested ${newBooking.serviceName} (${newBooking.locationType === 'home' ? 'Home Service' : 'Barbershop'}) for ${newBooking.date} at ${newBooking.timeSlot}.`,
      type: 'new_booking',
      bookingId: newBooking.id,
    });

    notifyListeners();
    return newBooking;
  }

  static updateBookingStatus(
    id: string,
    status: BookingStatus,
    barberResponseNote?: string
  ): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const prevStatus = bookings[index].status;
    bookings[index] = {
      ...bookings[index],
      status,
      barberResponseNote:
        barberResponseNote !== undefined ? barberResponseNote : bookings[index].barberResponseNote,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // If customer cancelled
    if (status === 'cancelled' && prevStatus !== 'cancelled') {
      this.addNotification({
        title: 'Booking Cancelled',
        message: `${bookings[index].customerName} cancelled appointment ${bookings[index].reference}.`,
        type: 'cancellation',
        bookingId: id,
      });
    }

    notifyListeners();
    return bookings[index];
  }

  static rescheduleBooking(id: string, newDate: string, newTime: string): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    bookings[index] = {
      ...bookings[index],
      date: newDate,
      timeSlot: newTime,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    notifyListeners();
    return bookings[index];
  }

  static updateBookingNotes(id: string, internalNotes: string): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    bookings[index] = {
      ...bookings[index],
      internalNotes,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    notifyListeners();
    return bookings[index];
  }

  static recordPayment(
    id: string,
    amountPaid: number,
    paymentMethod: PaymentMethod,
    paymentStatus: PaymentStatus
  ): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const currentBooking = bookings[index];
    const total = currentBooking.totalPrice;
    const balance = Math.max(0, total - amountPaid);

    bookings[index] = {
      ...currentBooking,
      amountPaid,
      paymentMethod,
      paymentStatus,
      balanceDue: balance,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    notifyListeners();
    return bookings[index];
  }

  // Dynamic slot availability calculation
  static getAvailableTimeSlots(dateString: string, serviceDurationMinutes = 45): string[] {
    const workingHours = this.getWorkingHours();
    const dateObj = new Date(dateString + 'T00:00:00');
    const dayOfWeek = dateObj.getDay();

    // Check blackout dates
    if (workingHours.blackoutDates.includes(dateString)) {
      return [];
    }

    const daySchedule = workingHours.schedule[dayOfWeek];
    if (!daySchedule || !daySchedule.open) {
      return [];
    }

    const [openHour, openMin] = daySchedule.start.split(':').map(Number);
    const [closeHour, closeMin] = daySchedule.end.split(':').map(Number);
    const [breakStartHour, breakStartMin] = workingHours.breakStart.split(':').map(Number);
    const [breakEndHour, breakEndMin] = workingHours.breakEnd.split(':').map(Number);

    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;
    const breakStartMinutes = breakStartHour * 60 + breakStartMin;
    const breakEndMinutes = breakEndHour * 60 + breakEndMin;

    const interval = workingHours.slotIntervalMinutes || 45;

    // Fetch existing active bookings on this date (pending, accepted, confirmed)
    const existingBookings = this.getBookings().filter(
      (b) =>
        b.date === dateString &&
        ['pending', 'accepted', 'confirmed'].includes(b.status)
    );

    const bookedIntervals = existingBookings.map((b) => {
      const [h, m] = b.timeSlot.split(':').map(Number);
      const start = h * 60 + m;
      const end = start + (b.durationMinutes || 45);
      return { start, end };
    });

    const slots: string[] = [];
    for (let time = openMinutes; time + serviceDurationMinutes <= closeMinutes; time += interval) {
      const slotEnd = time + serviceDurationMinutes;

      // Check collision with lunch break
      const overlapsBreak = time < breakEndMinutes && slotEnd > breakStartMinutes;
      if (overlapsBreak) {
        continue;
      }

      // Check collision with existing active appointments
      const overlapsExisting = bookedIntervals.some(
        (b) => time < b.end && slotEnd > b.start
      );
      if (overlapsExisting) {
        continue;
      }

      const h = Math.floor(time / 60);
      const m = time % 60;
      const formatted = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      slots.push(formatted);
    }

    return slots;
  }

  // Customers CRM aggregation
  static getCustomers(): Customer[] {
    const bookings = this.getBookings();
    const customerMap: { [phone: string]: Customer } = {};

    bookings.forEach((b) => {
      const phoneKey = b.customerPhone.trim();
      if (!customerMap[phoneKey]) {
        customerMap[phoneKey] = {
          id: `cust-${phoneKey.replace(/[^0-9]/g, '')}`,
          name: b.customerName,
          phone: b.customerPhone,
          email: b.customerEmail,
          totalBookings: 0,
          totalSpent: 0,
          lastBookingDate: b.date,
          favoriteService: b.serviceName,
          notes: b.internalNotes,
          isVIP: false,
        };
      }

      customerMap[phoneKey].totalBookings += 1;
      // Revenue strictly from completed appointments or recorded payments
      if (b.status === 'completed' || b.paymentStatus === 'paid') {
        customerMap[phoneKey].totalSpent += b.amountPaid > 0 ? b.amountPaid : b.totalPrice;
      }
      if (b.date > customerMap[phoneKey].lastBookingDate) {
        customerMap[phoneKey].lastBookingDate = b.date;
      }
      if (customerMap[phoneKey].totalSpent >= 50000 || customerMap[phoneKey].totalBookings >= 3) {
        customerMap[phoneKey].isVIP = true;
      }
    });

    return Object.values(customerMap);
  }

  // Notifications
  static getNotifications(): Notification[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  static addNotification(notif: Omit<Notification, 'id' | 'read' | 'createdAt'>): Notification {
    const notifs = this.getNotifications();
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    notifyListeners();
    return newNotif;
  }

  static markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifyListeners();
  }

  static markAllNotificationsRead(): void {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifyListeners();
  }

  // Reset to initial demo state
  static resetDemoData(): void {
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify([DEFAULT_BARBER]));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
    localStorage.setItem(STORAGE_KEYS.WORKING_HOURS, JSON.stringify(DEFAULT_WORKING_HOURS));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyListeners();
  }
}
