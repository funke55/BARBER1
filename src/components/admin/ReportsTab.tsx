import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Store,
  Home,
  CheckCircle,
  Scissors,
} from 'lucide-react';
import { Booking, BusinessSettings, Service } from '../../types';

interface ReportsTabProps {
  bookings: Booking[];
  services: Service[];
  settings: BusinessSettings;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  bookings,
  services,
  settings,
}) => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'all'>('30days');

  // Filter bookings strictly based on time range
  const now = Date.now();
  const rangeMs =
    timeRange === '7days'
      ? 7 * 86400000
      : timeRange === '30days'
      ? 30 * 86400000
      : 365 * 86400000;

  const relevantBookings = bookings.filter((b) => {
    if (timeRange === 'all') return true;
    const bDate = new Date(b.date).getTime();
    return now - bDate <= rangeMs;
  });

  // CRITICAL RULE: Revenue should only be calculated from completed appointments and recorded payments!
  const completedOrPaidBookings = relevantBookings.filter(
    (b) => b.status === 'completed' || b.paymentStatus === 'paid'
  );

  const totalCollectedRevenue = completedOrPaidBookings.reduce((sum, b) => {
    return sum + (b.amountPaid > 0 ? b.amountPaid : b.totalPrice);
  }, 0);

  const outstandingBalance = relevantBookings
    .filter((b) => b.status === 'completed' && b.balanceDue > 0)
    .reduce((sum, b) => sum + b.balanceDue, 0);

  const completedCount = relevantBookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = relevantBookings.filter((b) => b.status === 'cancelled').length;
  const pendingCount = relevantBookings.filter((b) => b.status === 'pending').length;

  const shopBookingsCount = relevantBookings.filter((b) => b.locationType === 'shop').length;
  const homeBookingsCount = relevantBookings.filter((b) => b.locationType === 'home').length;

  // Calculate service popularity
  const serviceCounts: { [name: string]: { count: number; revenue: number } } = {};
  relevantBookings.forEach((b) => {
    if (!serviceCounts[b.serviceName]) {
      serviceCounts[b.serviceName] = { count: 0, revenue: 0 };
    }
    serviceCounts[b.serviceName].count += 1;
    if (b.status === 'completed' || b.paymentStatus === 'paid') {
      serviceCounts[b.serviceName].revenue += b.servicePrice;
    }
  });

  const popularServices = Object.entries(serviceCounts)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count);

  const handleExportCSV = () => {
    const headers = [
      'Reference',
      'Date',
      'Client',
      'Phone',
      'Service',
      'Location',
      'Status',
      'Total Amount',
      'Amount Paid',
      'Payment Status',
    ];

    const rows = relevantBookings.map((b) => [
      b.reference,
      b.date,
      `"${b.customerName}"`,
      `"${b.customerPhone}"`,
      `"${b.serviceName}"`,
      b.locationType,
      b.status,
      b.totalPrice,
      b.amountPaid,
      b.paymentStatus,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `barber1_report_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-gray-900">
            Revenue Analytics & Reports
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Revenue is calculated strictly from completed appointments and recorded payments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                timeRange === '7days'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                timeRange === '30days'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                timeRange === 'all'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">Realized Revenue</span>
            <DollarSign className="w-4 h-4 text-[#b48a3c]" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-black tabular-nums">
            {settings.currency} {totalCollectedRevenue.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            {completedOrPaidBookings.length} completed bookings
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">Uncollected Balance</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-amber-700 tabular-nums">
            {settings.currency} {outstandingBalance.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            Pending settlement
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">Completed Services</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-black tabular-nums">
            {completedCount}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            {cancelledCount} cancelled
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px]">Total Bookings</span>
            <TrendingUp className="w-4 h-4 text-black" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-black tabular-nums">
            {relevantBookings.length}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            {pendingCount} pending review
          </div>
        </div>
      </div>

      {/* Breakdown: Location Mix & Service Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Location Ratio Card */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900">
            Location Breakdown
          </h3>
          <p className="text-xs text-gray-600">
            Proportion of flagship lounge visits vs. Follow My House home appointments.
          </p>

          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold">
                <span className="flex items-center gap-1.5 text-gray-800">
                  <Store className="w-3.5 h-3.5 text-black" />
                  <span>Flagship Lounge (Area 10)</span>
                </span>
                <span className="font-mono text-black tabular-nums">
                  {shopBookingsCount} ({relevantBookings.length > 0 ? Math.round((shopBookingsCount / relevantBookings.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black"
                  style={{
                    width: `${relevantBookings.length > 0 ? (shopBookingsCount / relevantBookings.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold">
                <span className="flex items-center gap-1.5 text-gray-800">
                  <Home className="w-3.5 h-3.5 text-amber-600" />
                  <span>Follow My House (Home Calls)</span>
                </span>
                <span className="font-mono text-black tabular-nums">
                  {homeBookingsCount} ({relevantBookings.length > 0 ? Math.round((homeBookingsCount / relevantBookings.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500"
                  style={{
                    width: `${relevantBookings.length > 0 ? (homeBookingsCount / relevantBookings.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Most Popular Services */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-black" />
            <span>Top Services Booked</span>
          </h3>

          <div className="space-y-2.5 pt-1">
            {popularServices.slice(0, 5).map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-extrabold text-black w-4">{idx + 1}</span>
                  <div>
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <span className="text-[11px] text-gray-500">
                      {item.count} appointments
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-black tabular-nums">
                    {settings.currency} {item.revenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-500 block">Realized</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
