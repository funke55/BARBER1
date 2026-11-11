import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Scissors,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Home,
  Store,
  DollarSign,
  ArrowRight,
  Shield,
  ChevronDown,
} from 'lucide-react';
import {
  Booking,
  Service,
  BusinessSettings,
  Notification,
} from '../../types';
import { BarberStorage } from '../../services/storage';
import { AppointmentsTab } from './AppointmentsTab';
import { ServicesTab } from './ServicesTab';
import { AvailabilityTab } from './AvailabilityTab';
import { CustomersTab } from './CustomersTab';
import { ReportsTab } from './ReportsTab';
import { PaymentsTab } from './PaymentsTab';
import { SettingsTab } from './SettingsTab';

interface AdminDashboardProps {
  settings: BusinessSettings;
  bookings: Booking[];
  services: Service[];
  onRefresh: () => void;
  onLogout: () => void;
  onViewClientSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  bookings,
  services,
  onRefresh,
  onLogout,
  onViewClientSite,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'appointments'
    | 'services'
    | 'availability'
    | 'customers'
    | 'reports'
    | 'payments'
    | 'settings'
  >('overview');

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = BarberStorage.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Pending count
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.date === todayStr);

  // Realized revenue strictly from completed appointments or recorded payments
  const realizedRevenue = bookings
    .filter((b) => b.status === 'completed' || b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + (b.amountPaid > 0 ? b.amountPaid : b.totalPrice), 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      badge: pendingBookings.length > 0 ? pendingBookings.length : undefined,
    },
    { id: 'services', label: 'Services', icon: Scissors },
    { id: 'availability', label: 'Hours & Days Off', icon: Clock },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Revenue Reports', icon: BarChart3 },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMarkAllNotifsRead = () => {
    BarberStorage.markAllNotificationsRead();
    onRefresh();
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#111827]">
      {/* Admin Top Navigation - Crisp White with Black Text */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Logo / Brand Name - Strictly on ONE line, never wraps */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-1.5 cursor-pointer text-left focus:outline-none"
            >
              <span className="font-display text-base sm:text-2xl font-black tracking-tight text-black whitespace-nowrap">
                BARBER 1
              </span>
              <span className="px-2 py-0.5 bg-black text-white text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">
                Admin
              </span>
            </button>
          </div>

          {/* Right Action Icons - Guaranteed to fit on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full transition-colors relative cursor-pointer"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-88 bg-white border border-gray-200 rounded-2xl shadow-2xl py-3 z-50 text-gray-900">
                  <div className="px-4 pb-2 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllNotifsRead}
                        className="text-[11px] text-[#c5a059] hover:underline cursor-pointer font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-500">
                        No notifications.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs transition-colors ${
                            !n.read ? 'bg-amber-50/60' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between text-gray-500 text-[10px] mb-1">
                            <span className="font-bold text-black">{n.title}</span>
                            <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* View Client Site Button - Compact on Mobile */}
            <button
              onClick={onViewClientSite}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full transition-colors cursor-pointer"
              title="Return to the customer website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">Website</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 text-gray-700 hover:text-rose-600 bg-gray-100 hover:bg-rose-50 border border-gray-200 rounded-full transition-colors cursor-pointer"
              title="Sign out of Dashboard"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Pending Bookings Urgent Alert Banner */}
      {pendingBookings.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-xs text-amber-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Action Needed:</strong> You have {pendingBookings.length} pending appointment request{pendingBookings.length > 1 ? 's' : ''} to review.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-amber-800 font-bold hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <span>Review Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Mobile Tab Selector (Dropdown) */}
        <div className="sm:hidden mb-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
            Dashboard Menu
          </label>
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-900 shadow-xs focus:outline-none focus:border-black appearance-none"
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} {t.badge ? `(${t.badge} pending)` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Desktop Navigation Tabs Bar (Clean Black & White Pills) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative shrink-0 ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-400 text-black' : 'bg-amber-500 text-black'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards - Clean White Cards with High-Contrast Text */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold block">
                  Today's Bookings
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-black mt-1 block tabular-nums">
                  {todayBookings.length}
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Scheduled for today
                </span>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold block">
                  Pending Reviews
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 block tabular-nums">
                  {pendingBookings.length}
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Awaiting acceptance
                </span>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold block">
                  Total Bookings
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-black mt-1 block tabular-nums">
                  {bookings.length}
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Shop & home visits
                </span>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold block">
                  Realized Revenue
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#c5a059] mt-1 block tabular-nums">
                  {settings.currency} {realizedRevenue.toLocaleString()}
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Completed & verified only
                </span>
              </div>
            </div>

            {/* Quick Pending Inquiries Spotlight */}
            {pendingBookings.length > 0 && (
              <div className="bg-white border-2 border-amber-300 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel text-base font-bold text-black flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <span>Pending Requests ({pendingBookings.length})</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-black hover:underline cursor-pointer"
                  >
                    View All in Appointments →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {pendingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col justify-between space-y-3"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black text-sm">{b.customerName}</span>
                            <span className="font-mono text-xs font-semibold text-[#c5a059]">{b.reference}</span>
                          </div>
                          <span className="text-xs text-gray-600 mt-0.5 block font-medium">{b.serviceName}</span>
                          <span className="text-[11px] text-gray-500 block font-mono mt-0.5">
                            {b.date} at {b.timeSlot}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0 ${
                            b.locationType === 'home'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {b.locationType === 'home' ? 'Home Service' : 'Shop'}
                        </span>
                      </div>

                      {b.locationType === 'home' && b.homeServiceDetails && (
                        <div className="text-[11px] text-gray-600 bg-white border border-gray-200 p-2 rounded">
                          <strong>Address:</strong> {b.homeServiceDetails.streetAddress}, {b.homeServiceDetails.areaOrNeighborhood}
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setActiveTab('appointments');
                          }}
                          className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded cursor-pointer"
                        >
                          Review & Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Today & Upcoming Schedule and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {/* Schedule list */}
              <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <h3 className="font-cinzel text-base font-bold text-black flex items-center gap-2">
                    <Clock className="w-4 h-4 text-black" />
                    <span>Recent Scheduled Appointments</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-black hover:underline cursor-pointer"
                  >
                    Manage All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {bookings.slice(0, 5).map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-black">{b.timeSlot}</span>
                        <div>
                          <span className="font-bold text-black block">{b.customerName}</span>
                          <span className="text-[11px] text-gray-500">{b.serviceName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-mono text-gray-600 tabular-nums hidden sm:inline">{b.date}</span>
                        <span className="capitalize text-xs font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-black">
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs">
                <h3 className="font-cinzel text-base font-bold text-black pb-2 border-b border-gray-200">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('services')}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Manage Services & Prices</span>
                    <Scissors className="w-4 h-4 text-black" />
                  </button>

                  <button
                    onClick={() => setActiveTab('availability')}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Working Hours & Days Off</span>
                    <Clock className="w-4 h-4 text-black" />
                  </button>

                  <button
                    onClick={() => setActiveTab('reports')}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>View Revenue & Reports</span>
                    <BarChart3 className="w-4 h-4 text-black" />
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Home Service Fee ({settings.currency})</span>
                    <Home className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <AppointmentsTab
            bookings={bookings}
            settings={settings}
            onRefresh={onRefresh}
          />
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <ServicesTab
            services={services}
            settings={settings}
            onRefresh={onRefresh}
          />
        )}

        {/* TAB 4: AVAILABILITY */}
        {activeTab === 'availability' && (
          <AvailabilityTab onRefresh={onRefresh} />
        )}

        {/* TAB 5: PATRONS */}
        {activeTab === 'customers' && (
          <CustomersTab settings={settings} onRefresh={onRefresh} />
        )}

        {/* TAB 6: REPORTS */}
        {activeTab === 'reports' && (
          <ReportsTab
            bookings={bookings}
            services={services}
            settings={settings}
          />
        )}

        {/* TAB 7: PAYMENTS */}
        {activeTab === 'payments' && (
          <PaymentsTab
            bookings={bookings}
            settings={settings}
            onRefresh={onRefresh}
          />
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === 'settings' && (
          <SettingsTab settings={settings} onRefresh={onRefresh} />
        )}
      </div>
    </div>
  );
};
