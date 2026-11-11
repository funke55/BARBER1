import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock3,
  Calendar,
  Clock,
  Home,
  Store,
  DollarSign,
  FileText,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  User,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import {
  Booking,
  BookingStatus,
  BusinessSettings,
  PaymentMethod,
  PaymentStatus,
} from '../../types';
import { BarberStorage } from '../../services/storage';

interface AppointmentsTabProps {
  bookings: Booking[];
  settings: BusinessSettings;
  onRefresh: () => void;
}

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  bookings,
  settings,
  onRefresh,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'today'>('list');

  // Modals state
  const [rejectModalBooking, setRejectModalBooking] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState('Fully booked at this requested hour.');

  const [acceptModalBooking, setAcceptModalBooking] = useState<Booking | null>(null);
  const [acceptNote, setAcceptNote] = useState('Your appointment is confirmed. We look forward to welcoming you.');

  const [rescheduleModalBooking, setRescheduleModalBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const [paymentModalBooking, setPaymentModalBooking] = useState<Booking | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');

  const [notesModalBooking, setNotesModalBooking] = useState<Booking | null>(null);
  const [internalNotes, setInternalNotes] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredBookings = bookings.filter((b) => {
    if (viewMode === 'today' && b.date !== todayStr) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (locationFilter !== 'all' && b.locationType !== locationFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.toLowerCase().includes(q) ||
        b.reference.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Action handlers
  const handleConfirmAccept = () => {
    if (acceptModalBooking) {
      BarberStorage.updateBookingStatus(acceptModalBooking.id, 'accepted', acceptNote);
      setAcceptModalBooking(null);
      onRefresh();
    }
  };

  const handleConfirmReject = () => {
    if (rejectModalBooking) {
      BarberStorage.updateBookingStatus(rejectModalBooking.id, 'rejected', rejectReason);
      setRejectModalBooking(null);
      onRefresh();
    }
  };

  const handleConfirmReschedule = () => {
    if (rescheduleModalBooking && newDate && newTime) {
      BarberStorage.rescheduleBooking(rescheduleModalBooking.id, newDate, newTime);
      setRescheduleModalBooking(null);
      onRefresh();
    }
  };

  const handleConfirmPayment = () => {
    if (paymentModalBooking) {
      const pStatus: PaymentStatus =
        paymentAmount >= paymentModalBooking.totalPrice
          ? 'paid'
          : paymentAmount > 0
          ? 'partially_paid'
          : 'unpaid';

      BarberStorage.recordPayment(
        paymentModalBooking.id,
        paymentAmount,
        paymentMethod,
        pStatus
      );
      setPaymentModalBooking(null);
      onRefresh();
    }
  };

  const handleSaveNotes = () => {
    if (notesModalBooking) {
      BarberStorage.updateBookingNotes(notesModalBooking.id, internalNotes);
      setNotesModalBooking(null);
      onRefresh();
    }
  };

  const handleMarkCompleted = (b: Booking) => {
    BarberStorage.updateBookingStatus(b.id, 'completed');
    if (b.paymentStatus !== 'paid') {
      setPaymentModalBooking(b);
      setPaymentAmount(b.totalPrice);
    }
    onRefresh();
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
            Pending Review
          </span>
        );
      case 'accepted':
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider">
            Accepted
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold uppercase tracking-wider">
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold uppercase tracking-wider">
            Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold uppercase tracking-wider">
            Declined
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-300 text-[10px] font-bold uppercase tracking-wider">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Filter and Controls Bar - Clean White Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-xs space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs (Horizontal scroll on narrow mobile) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'pending', label: 'Pending' },
              { id: 'accepted', label: 'Accepted' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Location filter & Today shortcut */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-2.5 sm:px-3 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs font-semibold text-gray-900 focus:outline-none focus:border-black"
            >
              <option value="all">All Locations</option>
              <option value="shop">In-Shop Lounge</option>
              <option value="home">Follow My House (Home)</option>
            </select>

            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'today' : 'list')}
              className={`px-2.5 sm:px-3 py-1.5 rounded border text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                viewMode === 'today'
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {viewMode === 'today' ? "Today's List" : 'Show Today'}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, phone, or reference (e.g. B1-9481)..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-12 text-center text-xs text-gray-500 shadow-xs">
            No appointments match your active filter.
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`bg-white border rounded-xl p-4 sm:p-5 space-y-4 transition-all shadow-xs ${
                b.status === 'pending'
                  ? 'border-2 border-amber-400 bg-amber-50/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Header row: Reference, Date/Time, Location, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm sm:text-base font-extrabold text-black">
                    {b.reference}
                  </span>
                  {getStatusBadge(b.status)}
                  {b.locationType === 'home' ? (
                    <span className="flex items-center gap-1 text-[11px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">
                      <Home className="w-3 h-3 text-amber-600" />
                      Home Service
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-gray-700 font-medium bg-gray-100 px-2 py-0.5 rounded">
                      <Store className="w-3 h-3 text-gray-600" />
                      In-Shop Lounge
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-mono tabular-nums">{b.date}</span>
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-mono tabular-nums font-bold text-black">{b.timeSlot}</span>
                  </span>
                </div>
              </div>

              {/* Main Content Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Client info */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block">
                    Client Details
                  </span>
                  <div className="font-bold text-gray-900 text-sm">{b.customerName}</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-black" />
                    <a href={`tel:${b.customerPhone}`} className="font-mono hover:underline">
                      {b.customerPhone}
                    </a>
                  </div>
                  {b.customerEmail && (
                    <div className="flex items-center gap-2 text-gray-600 truncate">
                      <Mail className="w-3.5 h-3.5 text-black" />
                      <span className="truncate">{b.customerEmail}</span>
                    </div>
                  )}
                  {b.customerNotes && (
                    <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-gray-700 text-[11px] italic">
                      Client Note: "{b.customerNotes}"
                    </div>
                  )}
                </div>

                {/* Service info & Location */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block">
                    Grooming Service
                  </span>
                  <div className="font-bold text-gray-900 text-sm">{b.serviceName}</div>
                  <div className="text-gray-600 text-[11px]">
                    Duration: {b.durationMinutes} Minutes
                  </div>

                  {b.locationType === 'home' && b.homeServiceDetails && (
                    <div className="mt-2 p-2.5 bg-amber-50/70 border border-amber-200 rounded text-amber-950 space-y-1 text-[11px]">
                      <div className="flex items-center gap-1 font-bold text-amber-900">
                        <MapPin className="w-3 h-3 text-amber-700" />
                        <span>Home Address</span>
                      </div>
                      <div className="font-semibold">
                        {b.homeServiceDetails.streetAddress}, {b.homeServiceDetails.areaOrNeighborhood}
                      </div>
                      {b.homeServiceDetails.landmarks && (
                        <div className="text-gray-600 text-[10px]">
                          Landmarks: {b.homeServiceDetails.landmarks}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Financials & Staff Notes */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block">
                    Payment Details
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="font-mono font-bold text-gray-900 text-sm tabular-nums">
                      {settings.currency} {b.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Paid:</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      {settings.currency} {b.amountPaid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Balance:</span>
                    <span className="font-mono font-bold text-amber-700 tabular-nums">
                      {settings.currency} {b.balanceDue.toLocaleString()}
                    </span>
                  </div>

                  {b.internalNotes && (
                    <div className="mt-2 text-[11px] text-black bg-gray-100 p-2 rounded border border-gray-200 font-medium">
                      Staff Note: {b.internalNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Row - Fully Responsive on Mobile */}
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setNotesModalBooking(b);
                      setInternalNotes(b.internalNotes || '');
                    }}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{b.internalNotes ? 'Edit Note' : 'Add Note'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setPaymentModalBooking(b);
                      setPaymentAmount(b.amountPaid > 0 ? b.amountPaid : b.totalPrice);
                      setPaymentMethod(b.paymentMethod !== 'pending' ? b.paymentMethod : 'cash');
                    }}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-[#b48a3c]" />
                    <span>Payment</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          setRejectModalBooking(b);
                          setRejectReason('Schedule fully booked for this time slot.');
                        }}
                        className="flex-1 sm:flex-none px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold rounded transition-colors cursor-pointer"
                      >
                        Decline
                      </button>

                      <button
                        onClick={() => {
                          setAcceptModalBooking(b);
                          setAcceptNote('Your appointment has been accepted. We look forward to seeing you.');
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded transition-colors cursor-pointer shadow-xs"
                      >
                        Accept Appointment
                      </button>
                    </>
                  )}

                  {b.status === 'accepted' && (
                    <>
                      <button
                        onClick={() => {
                          setRescheduleModalBooking(b);
                          setNewDate(b.date);
                          setNewTime(b.timeSlot);
                        }}
                        className="flex-1 sm:flex-none px-3 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 border border-gray-300 rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reschedule</span>
                      </button>

                      <button
                        onClick={() => handleMarkCompleted(b)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded transition-colors cursor-pointer shadow-xs"
                      >
                        Mark Completed
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Accept Modal - Crisp White */}
      {acceptModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-lg font-bold text-gray-900">
              Accept Appointment {acceptModalBooking.reference}?
            </h3>
            <p className="text-xs text-gray-600">
              Client: {acceptModalBooking.customerName} · {acceptModalBooking.serviceName} on{' '}
              {acceptModalBooking.date} at {acceptModalBooking.timeSlot}
            </p>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Confirmation Note to Client (Visible in Tracking Portal)
              </label>
              <textarea
                rows={2}
                value={acceptNote}
                onChange={(e) => setAcceptNote(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setAcceptModalBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccept}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-lg cursor-pointer shadow-xs"
              >
                Confirm & Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-lg font-bold text-gray-900">
              Decline Appointment {rejectModalBooking.reference}?
            </h3>
            <p className="text-xs text-gray-600">
              The client will be notified with this reason in their tracking portal.
            </p>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Reason for Declining *
              </label>
              <textarea
                rows={2}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Decline Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-lg font-bold text-gray-900">
              Reschedule {rescheduleModalBooking.reference}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">New Time (e.g. 15:30)</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="15:30"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleModalBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Save New Time
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {paymentModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-lg font-bold text-gray-900">
              Record Payment: {paymentModalBooking.reference}
            </h3>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs flex justify-between">
              <span className="text-gray-600">Total Service Cost:</span>
              <span className="font-mono font-bold text-black">
                {settings.currency} {paymentModalBooking.totalPrice.toLocaleString()}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Amount Paid ({settings.currency})
              </label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
              >
                <option value="cash">Cash Settlement</option>
                <option value="mobile_money">Mobile Money (Airtel Money / Mpamba)</option>
                <option value="bank_transfer">Direct Bank Transfer</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPaymentModalBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Save Payment Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Notes Modal */}
      {notesModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-lg font-bold text-gray-900">
              Staff Note: {notesModalBooking.customerName}
            </h3>
            <textarea
              rows={3}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="e.g. VIP client, prefers low taper fade, gate intercom code 4492"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNotesModalBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
