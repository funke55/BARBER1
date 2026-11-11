import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  Store,
  Home,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock3,
  MessageSquare,
  X,
} from 'lucide-react';
import { Booking, BusinessSettings } from '../../types';
import { BarberStorage } from '../../services/storage';

interface BookingLookupProps {
  settings: BusinessSettings;
  onOpenBooking: () => void;
  initialQuery?: string;
}

export const BookingLookup: React.FC<BookingLookupProps> = ({
  settings,
  onOpenBooking,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'reference' | 'phone'>('reference');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Booking[]>([]);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setHasSearched(true);
    setMessage(null);

    if (searchType === 'reference') {
      const b = BarberStorage.getBookingByReference(query.trim());
      setResults(b ? [b] : []);
    } else {
      const list = BarberStorage.getBookingsByPhone(query.trim());
      setResults(list);
    }
  };

  const handleCancelBooking = (booking: Booking) => {
    BarberStorage.updateBookingStatus(
      booking.id,
      'cancelled',
      cancelReason ? `Customer note: ${cancelReason}` : 'Cancelled by customer'
    );
    setCancelModalBooking(null);
    setCancelReason('');
    setMessage(`Appointment ${booking.reference} has been cancelled.`);
    if (searchType === 'reference') {
      const b = BarberStorage.getBookingByReference(booking.reference);
      setResults(b ? [b] : []);
    } else {
      const list = BarberStorage.getBookingsByPhone(booking.customerPhone);
      setResults(list);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 font-bold uppercase tracking-wider">
            <Clock3 className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 font-bold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Accepted</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs text-blue-300 font-bold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-xs text-[#e6ca85] font-bold uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-bold uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            <span>Declined</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-500/15 border border-gray-500/30 text-xs text-gray-300 font-bold uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="py-14 sm:py-20 bg-[#0a0a0d] min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#e6ca85] uppercase tracking-wider mb-2.5">
            Client Portal
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Track Your Appointment
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Check your booking status, appointment timing, or manage your reservation.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-[#14141a] border border-gray-800 rounded-3xl p-5 sm:p-7 mb-8 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
            <span className="text-gray-400 font-medium">Search by:</span>
            <div className="flex items-center gap-1 p-1 bg-black/50 border border-gray-800 rounded-full">
              <button
                type="button"
                onClick={() => {
                  setSearchType('reference');
                  setQuery('');
                  setResults([]);
                  setHasSearched(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  searchType === 'reference'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Reference Code (e.g. B1-9481)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchType('phone');
                  setQuery('');
                  setResults([]);
                  setHasSearched(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  searchType === 'phone'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Phone Number
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchType === 'reference'
                    ? 'Enter Reference Number (e.g. B1-9481)'
                    : 'Enter Phone Number (e.g. +265 991 234 567)'
                }
                className="w-full pl-11 pr-4 py-3 bg-[#0d0d11] border border-gray-700/80 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-md active:scale-95"
            >
              Look Up Booking
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-3.5 text-xs text-gray-400 flex flex-wrap items-center gap-2">
            <span>Demo references to try:</span>
            <button
              type="button"
              onClick={() => {
                setSearchType('reference');
                setQuery('B1-9481');
              }}
              className="text-[#e6ca85] hover:underline cursor-pointer font-mono font-bold"
            >
              B1-9481 (Pending)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setSearchType('reference');
                setQuery('B1-7104');
              }}
              className="text-[#e6ca85] hover:underline cursor-pointer font-mono font-bold"
            >
              B1-7104 (Accepted)
            </button>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-emerald-200 text-xs flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage(null)} className="text-emerald-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="space-y-6">
            {results.length === 0 ? (
              <div className="bg-[#14141a] border border-gray-800 rounded-3xl p-8 sm:p-12 text-center">
                <AlertCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-white">
                  No Appointments Found
                </h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                  We could not find an appointment matching "{query}". Please verify your reference code or phone number.
                </p>
                <div className="mt-6">
                  <button
                    onClick={onOpenBooking}
                    className="px-6 py-3 bg-[#c5a059] text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Create a New Booking
                  </button>
                </div>
              </div>
            ) : (
              results.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#14141a] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl"
                >
                  {/* Top Bar with Reference & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800/80 gap-3">
                    <div>
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider block font-bold">
                        Booking Reference
                      </span>
                      <span className="font-mono text-2xl font-black text-white">
                        {booking.reference}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  {/* Status Banner */}
                  {booking.status === 'pending' && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs leading-relaxed">
                      <strong>Status: Pending Review.</strong> Master Barber Marcus Kazembe will review and confirm your slot shortly.
                    </div>
                  )}

                  {booking.status === 'accepted' && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-200 text-xs leading-relaxed">
                      <strong>Status: Accepted & Scheduled.</strong> Your appointment is confirmed!
                      {booking.barberResponseNote && (
                        <div className="mt-1.5 pt-1.5 border-t border-emerald-500/20 italic text-emerald-100">
                          Barber Note: "{booking.barberResponseNote}"
                        </div>
                      )}
                    </div>
                  )}

                  {booking.status === 'rejected' && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-200 text-xs leading-relaxed">
                      <strong>Status: Appointment Declined.</strong> The requested slot was unavailable.
                      {booking.barberResponseNote && (
                        <div className="mt-1.5 pt-1.5 border-t border-rose-500/20 font-semibold">
                          Reason: {booking.barberResponseNote}
                        </div>
                      )}
                      <div className="mt-2.5">
                        <button
                          onClick={onOpenBooking}
                          className="text-[#e6ca85] underline font-bold hover:text-white"
                        >
                          Book another time slot →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Main Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {/* Left: Service & Timing */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">
                          Grooming Service
                        </span>
                        <span className="font-display text-lg font-bold text-white block mt-0.5">
                          {booking.serviceName}
                        </span>
                        <span className="text-xs text-gray-400 block mt-0.5">
                          Duration: {booking.durationMinutes} Minutes
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Calendar className="w-4 h-4 text-[#e6ca85]" />
                        <span className="font-mono tabular-nums font-bold">{booking.date}</span>
                        <span className="text-gray-600">·</span>
                        <Clock className="w-4 h-4 text-[#e6ca85]" />
                        <span className="font-mono tabular-nums font-bold">{booking.timeSlot}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <User className="w-4 h-4 text-[#e6ca85]" />
                        <span>Master Barber: {booking.barberName}</span>
                      </div>
                    </div>

                    {/* Right: Location & Financials */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider block font-bold">
                          Service Location
                        </span>
                        {booking.locationType === 'shop' ? (
                          <div className="flex items-center gap-2 text-xs text-white mt-1">
                            <Store className="w-4 h-4 text-[#e6ca85]" />
                            <span>BARBER 1 Flagship Lounge – Area 10</span>
                          </div>
                        ) : (
                          <div className="space-y-1 text-xs text-white mt-1">
                            <div className="flex items-center gap-2 text-[#e6ca85] font-semibold">
                              <Home className="w-4 h-4" />
                              <span>Follow My House (Home Service)</span>
                            </div>
                            <p className="text-gray-400">
                              {booking.homeServiceDetails?.streetAddress},{' '}
                              {booking.homeServiceDetails?.areaOrNeighborhood}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-gray-800/80">
                        <div className="flex justify-between items-center text-xs text-gray-400">
                          <span>Total Amount:</span>
                          <span className="font-mono font-bold text-white tabular-nums text-sm">
                            {settings.currency} {booking.totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                          <span>Payment Status:</span>
                          <span className="capitalize text-[#e6ca85] font-bold">
                            {booking.paymentStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/265999000000?text=Hello%20BARBER%201,%20regarding%20my%20booking%20${booking.reference}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 rounded-full flex items-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#e6ca85]" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>

                    {['pending', 'accepted', 'confirmed'].includes(booking.status) && (
                      <button
                        onClick={() => setCancelModalBooking(booking)}
                        className="px-4 py-2 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/30 rounded-full transition-colors cursor-pointer"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancelModalBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className="bg-[#15151c] border border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  Cancel Appointment {cancelModalBooking.reference}?
                </h3>
                <button
                  onClick={() => setCancelModalBooking(null)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                {settings.cancellationPolicy}
              </p>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Reason for Cancellation (Optional)
                </label>
                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Schedule conflict"
                  className="w-full px-3 py-2 bg-[#0d0d11] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setCancelModalBooking(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={() => handleCancelBooking(cancelModalBooking)}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-full cursor-pointer shadow-md"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
