import React, { useState } from 'react';
import { Save, RotateCcw, Check, Building, DollarSign, ShieldAlert, X } from 'lucide-react';
import { BusinessSettings } from '../../types';
import { BarberStorage } from '../../services/storage';

interface SettingsTabProps {
  settings: BusinessSettings;
  onRefresh: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<BusinessSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  const handleChange = (field: keyof BusinessSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    BarberStorage.updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onRefresh();
  };

  const handleConfirmReset = () => {
    BarberStorage.resetDemoData();
    setResetModal(false);
    setFormData(BarberStorage.getSettings());
    onRefresh();
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-gray-900">
            Brand Identity & System Settings
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Configure contact details, currency, Follow My House travel fees, and booking policies.
          </p>
        </div>

        {saved && (
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg flex items-center gap-1.5 self-start sm:self-auto">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Settings Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* General Business Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-black" />
            <span>Business Profile & Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-700 font-bold block mb-1">Business Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-gray-700 font-bold block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-gray-700 font-bold block mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-mono focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-gray-700 font-bold block mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-700 font-bold block mb-1">Physical Flagship Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-700 font-bold block mb-1">Brand Description</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Currency & Follow My House Surcharge */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-black" />
            <span>Currency & Follow My House Travel Charge</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-700 font-bold block mb-1">Operating Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black"
              >
                <option value="MWK">Malawian Kwacha (MWK)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="EUR">Euro (€)</option>
                <option value="ZAR">South African Rand (ZAR)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-bold block mb-1">
                Follow My House Travel Fee ({formData.currency})
              </label>
              <input
                type="number"
                value={formData.homeServiceFee}
                onChange={(e) => handleChange('homeServiceFee', Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-mono focus:outline-none focus:border-black"
              />
              <span className="text-[11px] text-gray-500 block mt-1">
                Added automatically to all mobile home bookings.
              </span>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900">
            Operational Policies
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-gray-700 font-bold block mb-1">Cancellation Policy</label>
              <textarea
                rows={2}
                value={formData.cancellationPolicy}
                onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-gray-700 font-bold block mb-1">Booking Rules & Grace Period</label>
              <textarea
                rows={2}
                value={formData.bookingRules}
                onChange={(e) => handleChange('bookingRules', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setResetModal(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {resetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-cinzel text-lg font-bold text-gray-900">
                Reset All Demo Data?
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              This will restore all default services, realistic bookings, hours, and demo settings to their initial clean state.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResetModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
