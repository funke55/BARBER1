import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Clock, Check, X, Home, AlertCircle, Scissors } from 'lucide-react';
import { Service, BusinessSettings, ServiceCategory } from '../../types';
import { BarberStorage } from '../../services/storage';

interface ServicesTabProps {
  services: Service[];
  settings: BusinessSettings;
  onRefresh: () => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  settings,
  onRefresh,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('haircut');
  const [price, setPrice] = useState<number>(15000);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [description, setDescription] = useState('');
  const [homeServiceEligible, setHomeServiceEligible] = useState(true);
  const [active, setActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingService(null);
    setName('');
    setCategory('haircut');
    setPrice(15000);
    setDurationMinutes(45);
    setDescription('');
    setHomeServiceEligible(true);
    setActive(true);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setName(s.name);
    setCategory(s.category);
    setPrice(s.price);
    setDurationMinutes(s.durationMinutes);
    setDescription(s.description);
    setHomeServiceEligible(s.homeServiceEligible);
    setActive(s.active);
    setError(null);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0 || durationMinutes <= 0) {
      setError('Please provide a valid service name, price, and duration.');
      return;
    }

    if (editingService) {
      BarberStorage.updateService(editingService.id, {
        name: name.trim(),
        category,
        price,
        durationMinutes,
        description: description.trim(),
        homeServiceEligible,
        active,
      });
    } else {
      BarberStorage.addService({
        name: name.trim(),
        category,
        price,
        durationMinutes,
        description: description.trim(),
        homeServiceEligible,
        active,
      });
    }

    setModalOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string, serviceName: string) => {
    if (window.confirm(`Are you sure you want to delete the service "${serviceName}"?`)) {
      BarberStorage.deleteService(id);
      onRefresh();
    }
  };

  const handleToggleActive = (s: Service) => {
    BarberStorage.updateService(s.id, { active: !s.active });
    onRefresh();
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-gray-900">
            Services & Pricing Management
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Manage your service menu, pricing, estimated duration, and Follow My House availability.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Mobile Card View (< md screens) */}
      <div className="md:hidden space-y-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  {s.category}
                </span>
                <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
              </div>
              <div className="text-right">
                <span className="font-mono font-extrabold text-sm text-black block">
                  {settings.currency} {s.price.toLocaleString()}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {s.durationMinutes} mins
                </span>
              </div>
            </div>

            {s.description && (
              <p className="text-xs text-gray-600 leading-relaxed">
                {s.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(s)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                    s.active
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  {s.active ? 'Active' : 'Disabled'}
                </button>

                {s.homeServiceEligible && (
                  <span className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Home Eligible
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-1.5 text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 cursor-pointer"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id, s.name)}
                  className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 cursor-pointer"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= md screens) */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Service Name</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price ({settings.currency})</th>
                <th className="py-3.5 px-4 font-bold">Duration</th>
                <th className="py-3.5 px-4 font-bold">Follow My House</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-900">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                    <div className="text-[11px] text-gray-500 line-clamp-1 max-w-xs mt-0.5">
                      {s.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize text-gray-800 font-semibold">
                    {s.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-black tabular-nums">
                    {settings.currency} {s.price.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-gray-700">
                    {s.durationMinutes} mins
                  </td>
                  <td className="py-3.5 px-4">
                    {s.homeServiceEligible ? (
                      <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 w-fit">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Eligible
                      </span>
                    ) : (
                      <span className="text-gray-400">In-Shop Only</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(s)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                        s.active
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {s.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-cinzel text-lg font-bold text-gray-900">
                {editingService ? 'Edit Grooming Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Service Title *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Razor Fade & Scalp Steam"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
                  >
                    <option value="haircut">Haircuts & Fades</option>
                    <option value="beard">Beard & Shaves</option>
                    <option value="package">Packages</option>
                    <option value="treatment">Scalp & Treatments</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Price ({settings.currency}) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Duration (Minutes) *
                </label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  step={5}
                  min={15}
                  max={180}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the tools, techniques, and styling included..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs text-gray-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={homeServiceEligible}
                    onChange={(e) => setHomeServiceEligible(e.target.checked)}
                    className="rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
                  />
                  <span>Follow My House Eligible</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-gray-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
                  />
                  <span>Active & Bookable</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer shadow-xs"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
