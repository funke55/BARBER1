export type ServiceCategory = 'haircut' | 'beard' | 'package' | 'treatment';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  durationMinutes: number;
  image?: string;
  homeServiceEligible: boolean;
  popular?: boolean;
  active: boolean;
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  experienceYears: number;
  rating: number;
  specialties: string[];
}

export type ServiceLocationType = 'shop' | 'home';

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'partially_paid' | 'paid';

export type PaymentMethod = 'cash' | 'mobile_money' | 'bank_transfer' | 'pending';

export interface HomeServiceDetails {
  streetAddress: string;
  areaOrNeighborhood: string;
  landmarks?: string;
  specialInstructions?: string;
}

export interface Booking {
  id: string;
  reference: string; // e.g. "B1-7489"
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  durationMinutes: number;
  barberId: string;
  barberName: string;
  locationType: ServiceLocationType;
  homeServiceDetails?: HomeServiceDetails;
  homeServiceFee: number;
  totalPrice: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30"
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerNotes?: string;
  internalNotes?: string;
  barberResponseNote?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  balanceDue: number;
  createdAt: string;
  updatedAt: string;
}

export interface DaySchedule {
  open: boolean;
  start: string; // "08:30"
  end: string; // "19:30"
}

export interface WorkingHours {
  schedule: {
    [dayOfWeek: number]: DaySchedule; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  };
  breakStart: string; // "13:00"
  breakEnd: string; // "14:00"
  slotIntervalMinutes: number; // 45
  blackoutDates: string[]; // ['2026-12-25', ...]
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  cityArea: string;
  currency: string;
  homeServiceFee: number;
  instagram: string;
  facebook: string;
  xTwitter: string;
  cancellationPolicy: string;
  bookingRules: string;
  isDemoMode: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
  favoriteService?: string;
  notes?: string;
  isVIP?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'new_booking' | 'cancellation' | 'status_change';
  bookingId?: string;
  read: boolean;
  createdAt: string;
}
