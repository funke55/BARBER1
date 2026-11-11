import React, { useState } from 'react';
import {
  DollarSign,
  CreditCard,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Booking, BusinessSettings, PaymentMethod, PaymentStatus } from '../../types';
import { BarberStorage } from '../../services/storage';

interface PaymentsTabProps {
  bookings: Booking[];
  settings: BusinessSettings;
  onRefresh: () => void;
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({
  bookings,
  settings,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [amountInput, setAmountInput] = useState<number>(0);
  const [methodInput, setMethodInput] = useState<PaymentMethod>('cash');

  const filtered = bookings.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      b.customerName.toLowerCase().includes(q) ||
      b.reference.toLowerCase().includes(q) ||
      b.customerPhone.toLowerCase().includes(q)
    );
  });

  const handleUpdatePayment = () => {
    if (selectedBooking) {
      const pStatus: PaymentStatus =
        amountInput >= selectedBooking.totalPrice
          ? 'paid'
          : amountInput > 0
          ? 'partially_paid'
          : 'unpaid';

      BarberStorage.recordPayment(selectedBooking.id, amountInput, methodInput, pStatus);
      setSelectedBooking(null);
      onRefresh();
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-gray-900">
            Payments & Settlement Ledger
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Record cash, Airtel Money, Mpamba, and bank payments with balance tracking.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client or reference..."
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white"
          />
        </div>
      </div>

      {/* PayChangu Mobile Money Gateway Integration Note */}
      <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-black" />
            <h3 className="font-cinzel text-sm font-bold text-gray-900">
              PayChangu & Mobile Money Gateway Architecture
            </h3>
          </div>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 border border-gray-300 rounded text-[10px] uppercase font-bold tracking-wider">
            Ready
          </span>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          The booking engine is architected to interface seamlessly with the PayChangu API for automated Airtel Money, Mpamba, and Visa checkout. To activate direct live processing, provision your Merchant Keys in server environment variables:
        </p>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[11px] text-gray-700 space-y-0.5 overflow-x-auto">
          <div><code>PAYCHANGU_PUBLIC_KEY="pub-live-..."</code></div>
          <div><code>PAYCHANGU_SECRET_KEY="sec-live-..."</code></div>
          <div><code>WEBHOOK_ENDPOINT="https://yourdomain.com/api/webhooks/paychangu"</code></div>
        </div>

        <div className="text-[11px] text-gray-500">
          Until live gateway keys are connected, the barber records payments manually as verified above.
        </div>
      </div>

      {/* Mobile Payments Card View (< md screens) */}
      <div className="md:hidden space-y-3">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-gray-200 rounded-xl p-4 space-y-2.5 shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-sm font-extrabold text-black block">{b.reference}</span>
                <span className="font-bold text-gray-900 text-sm block mt-0.5">{b.customerName}</span>
                <span className="text-xs text-gray-500">{b.serviceName}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  b.paymentStatus === 'paid'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : b.paymentStatus === 'partially_paid'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                {b.paymentStatus.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-xs">
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Total</span>
                <span className="font-mono font-bold text-black">{settings.currency} {b.totalPrice.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Paid</span>
                <span className="font-mono font-bold text-emerald-700">{settings.currency} {b.amountPaid.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Balance</span>
                <span className="font-mono font-bold text-amber-700">{settings.currency} {b.balanceDue.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 capitalize">
                Method: {b.paymentMethod.replace('_', ' ')}
              </span>
              <button
                onClick={() => {
                  setSelectedBooking(b);
                  setAmountInput(b.amountPaid > 0 ? b.amountPaid : b.totalPrice);
                  setMethodInput(b.paymentMethod !== 'pending' ? b.paymentMethod : 'cash');
                }}
                className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded text-xs font-bold cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Payment Ledger Table (>= md screens) */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Reference</th>
                <th className="py-3.5 px-4 font-bold">Client Name</th>
                <th className="py-3.5 px-4 font-bold">Service</th>
                <th className="py-3.5 px-4 font-bold">Total Price</th>
                <th className="py-3.5 px-4 font-bold">Amount Paid</th>
                <th className="py-3.5 px-4 font-bold">Balance</th>
                <th className="py-3.5 px-4 font-bold">Method</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-900">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-extrabold text-black">
                    {b.reference}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {b.customerName}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {b.serviceName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-black tabular-nums">
                    {settings.currency} {b.totalPrice.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold tabular-nums">
                    {settings.currency} {b.amountPaid.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-700 font-bold tabular-nums">
                    {settings.currency} {b.balanceDue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-gray-600">
                    {b.paymentMethod.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        b.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : b.paymentStatus === 'partially_paid'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {b.paymentStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setAmountInput(b.amountPaid > 0 ? b.amountPaid : b.totalPrice);
                        setMethodInput(b.paymentMethod !== 'pending' ? b.paymentMethod : 'cash');
                      }}
                      className="px-2.5 py-1 bg-black hover:bg-gray-800 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Payment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-cinzel text-lg font-bold text-gray-900">
                Update Payment: {selectedBooking.reference}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Client:</span>
                <span className="text-black font-bold">{selectedBooking.customerName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Expected:</span>
                <span className="font-mono text-black font-bold">
                  {settings.currency} {selectedBooking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Amount Received ({settings.currency})
              </label>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Payment Method</label>
              <select
                value={methodInput}
                onChange={(e) => setMethodInput(e.target.value as PaymentMethod)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
              >
                <option value="cash">Cash Settlement</option>
                <option value="mobile_money">Airtel Money / Mpamba</option>
                <option value="bank_transfer">Direct Bank Transfer</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePayment}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-lg cursor-pointer shadow-xs"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
