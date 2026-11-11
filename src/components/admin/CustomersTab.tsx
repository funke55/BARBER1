import React, { useState } from 'react';
import { Search, User, Phone, Mail, Award, Calendar, DollarSign, FileText, ChevronRight, X } from 'lucide-react';
import { Customer, BusinessSettings } from '../../types';
import { BarberStorage } from '../../services/storage';

interface CustomersTabProps {
  settings: BusinessSettings;
  onRefresh: () => void;
}

export const CustomersTab: React.FC<CustomersTabProps> = ({ settings, onRefresh }) => {
  const customers = BarberStorage.getCustomers();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-gray-900">
            Customer Database & CRM
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Client profiles compiled automatically from bookings and reservations.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone..."
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white"
          />
        </div>
      </div>

      {/* Mobile Customer Cards (< md screens) */}
      <div className="md:hidden space-y-3">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCustomer(c)}
            className="bg-white border border-gray-200 rounded-xl p-4 space-y-2.5 shadow-xs cursor-pointer hover:border-black transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                {c.isVIP && (
                  <span className="px-1.5 py-0.5 bg-black text-white rounded text-[10px] font-bold uppercase tracking-wider">
                    VIP
                  </span>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="font-mono">{c.phone}</span>
              <span className="font-mono font-bold text-black">
                {settings.currency} {c.totalSpent.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
              <span>{c.totalBookings} Total Visits</span>
              <span>Last: {c.lastBookingDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Directory Table (>= md screens) */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Client Name</th>
                <th className="py-3.5 px-4 font-bold">Phone Contact</th>
                <th className="py-3.5 px-4 font-bold">Email</th>
                <th className="py-3.5 px-4 font-bold">Total Visits</th>
                <th className="py-3.5 px-4 font-bold">Total Spend ({settings.currency})</th>
                <th className="py-3.5 px-4 font-bold">Last Visit</th>
                <th className="py-3.5 px-4 font-bold">Favorite Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-900">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                      {c.isVIP && (
                        <span className="px-1.5 py-0.5 bg-black text-white rounded text-[10px] font-bold uppercase tracking-wider">
                          VIP
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-700 tabular-nums">
                    {c.phone}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {c.email || '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900 tabular-nums">
                    {c.totalBookings}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-black tabular-nums">
                    {settings.currency} {c.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600 tabular-nums">
                    {c.lastBookingDate}
                  </td>
                  <td className="py-3.5 px-4 text-gray-800">
                    {c.favoriteService || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>{selectedCustomer.name}</span>
                  {selectedCustomer.isVIP && (
                    <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-bold uppercase rounded">
                      VIP
                    </span>
                  )}
                </h3>
                <span className="text-xs text-gray-500">Client Profile Record</span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Contact Phone:</span>
                <a href={`tel:${selectedCustomer.phone}`} className="font-mono font-bold text-black hover:underline">
                  {selectedCustomer.phone}
                </a>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Email Address:</span>
                <span className="text-gray-900">{selectedCustomer.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Total Lifetime Visits:</span>
                <span className="font-mono text-black font-bold">{selectedCustomer.totalBookings}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Total Lifetime Spend:</span>
                <span className="font-mono text-black font-extrabold text-sm">
                  {settings.currency} {selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Last Visit Date:</span>
                <span className="font-mono text-gray-800">{selectedCustomer.lastBookingDate}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium block mb-1">Preferences & Notes:</span>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 leading-relaxed">
                  {selectedCustomer.notes || 'No custom notes recorded.'}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-xs font-bold text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
