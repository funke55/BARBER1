import React, { useState } from 'react';
import { Clock, Calendar, Check, Plus, Trash2 } from 'lucide-react';
import { WorkingHours, DaySchedule } from '../../types';
import { BarberStorage } from '../../services/storage';

interface AvailabilityTabProps {
  onRefresh: () => void;
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const AvailabilityTab: React.FC<AvailabilityTabProps> = ({ onRefresh }) => {
  const [workingHours, setWorkingHours] = useState<WorkingHours>(BarberStorage.getWorkingHours());
  const [newBlackoutDate, setNewBlackoutDate] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleToggleDay = (dayIndex: number) => {
    const current = workingHours.schedule[dayIndex];
    const updatedSchedule = {
      ...workingHours.schedule,
      [dayIndex]: {
        ...current,
        open: !current.open,
      },
    };
    const updated = { ...workingHours, schedule: updatedSchedule };
    setWorkingHours(updated);
    BarberStorage.updateWorkingHours(updated);
    triggerSaved();
  };

  const handleTimeChange = (
    dayIndex: number,
    field: 'start' | 'end',
    value: string
  ) => {
    const current = workingHours.schedule[dayIndex];
    const updatedSchedule = {
      ...workingHours.schedule,
      [dayIndex]: {
        ...current,
        [field]: value,
      },
    };
    const updated = { ...workingHours, schedule: updatedSchedule };
    setWorkingHours(updated);
    BarberStorage.updateWorkingHours(updated);
    triggerSaved();
  };

  const handleBreakChange = (field: 'breakStart' | 'breakEnd', value: string) => {
    const updated = { ...workingHours, [field]: value };
    setWorkingHours(updated);
    BarberStorage.updateWorkingHours(updated);
    triggerSaved();
  };

  const handleIntervalChange = (val: number) => {
    const updated = { ...workingHours, slotIntervalMinutes: val };
    setWorkingHours(updated);
    BarberStorage.updateWorkingHours(updated);
    triggerSaved();
  };

  const handleAddBlackoutDate = () => {
    if (!newBlackoutDate) return;
    if (workingHours.blackoutDates.includes(newBlackoutDate)) return;

    const updated = {
      ...workingHours,
      blackoutDates: [...workingHours.blackoutDates, newBlackoutDate].sort(),
    };
    setWorkingHours(updated);
    BarberStorage.updateWorkingHours(updated);
    setNewBlackoutDate('');
    triggerSaved();
  };

  const handleRemoveBlackoutDate = (dStr: string) => {
    const updated = {
      ...workingHours,
      blackoutDates: workingHours.blackoutDates.filter((d) => d !== dStr),
    };
    setWorkingHours(updated);
    BarberStorage.updateWorkingHours(updated);
    triggerSaved();
  };

  const triggerSaved = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
    onRefresh();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-gray-900">
            Working Hours & Chair Availability
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Configure daily opening hours, lunch breaks, and holiday blackout dates.
          </p>
        </div>
        {savedMessage && (
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg flex items-center gap-1.5 self-start sm:self-auto">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Saved
          </span>
        )}
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
        <h3 className="font-cinzel text-base font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-black" />
          <span>Weekly Schedule</span>
        </h3>

        <div className="space-y-2.5 pt-1">
          {DAYS_OF_WEEK.map((dayName, idx) => {
            const sched = workingHours.schedule[idx] || { open: false, start: '08:30', end: '19:30' };
            return (
              <div
                key={dayName}
                className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs transition-colors ${
                  sched.open
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 w-36">
                  <input
                    type="checkbox"
                    id={`day-${idx}`}
                    checked={sched.open}
                    onChange={() => handleToggleDay(idx)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor={`day-${idx}`}
                    className="font-bold text-gray-900 cursor-pointer select-none"
                  >
                    {dayName}
                  </label>
                </div>

                {sched.open ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">Hours:</span>
                    <input
                      type="text"
                      value={sched.start}
                      onChange={(e) => handleTimeChange(idx, 'start', e.target.value)}
                      placeholder="08:30"
                      className="w-20 px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded font-mono text-center text-gray-900 text-xs font-semibold focus:outline-none focus:border-black"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="text"
                      value={sched.end}
                      onChange={(e) => handleTimeChange(idx, 'end', e.target.value)}
                      placeholder="19:30"
                      className="w-20 px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded font-mono text-center text-gray-900 text-xs font-semibold focus:outline-none focus:border-black"
                    />
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 italic">
                    Closed / By Request Only
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Break Times & Slot Step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Daily Rest / Break Intervals */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-3 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-black" />
            <span>Daily Master Barber Break / Lunch</span>
          </h3>
          <p className="text-xs text-gray-600">
            Time slots during this rest window are blocked out from booking.
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs">
            <div>
              <label className="text-gray-600 font-semibold block mb-1">Starts</label>
              <input
                type="text"
                value={workingHours.breakStart}
                onChange={(e) => handleBreakChange('breakStart', e.target.value)}
                className="w-24 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded font-mono text-gray-900 text-center font-bold"
              />
            </div>
            <span className="text-gray-400 pt-4">to</span>
            <div>
              <label className="text-gray-600 font-semibold block mb-1">Ends</label>
              <input
                type="text"
                value={workingHours.breakEnd}
                onChange={(e) => handleBreakChange('breakEnd', e.target.value)}
                className="w-24 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded font-mono text-gray-900 text-center font-bold"
              />
            </div>
          </div>
        </div>

        {/* Slot Interval */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-3 shadow-xs">
          <h3 className="font-cinzel text-base font-bold text-gray-900">
            Booking Slot Spacing
          </h3>
          <p className="text-xs text-gray-600">
            The grid interval between available appointment start times.
          </p>

          <div className="pt-2">
            <select
              value={workingHours.slotIntervalMinutes}
              onChange={(e) => handleIntervalChange(Number(e.target.value))}
              className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-black"
            >
              <option value={30}>Every 30 Minutes</option>
              <option value={45}>Every 45 Minutes (Recommended)</option>
              <option value={60}>Every 60 Minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blackout Dates / Holidays */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
        <h3 className="font-cinzel text-base font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black" />
          <span>Holidays & Days Off</span>
        </h3>
        <p className="text-xs text-gray-600">
          Specific dates where all appointments are disabled.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md pt-1">
          <input
            type="date"
            value={newBlackoutDate}
            onChange={(e) => setNewBlackoutDate(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-black"
          />
          <button
            onClick={handleAddBlackoutDate}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-lg cursor-pointer whitespace-nowrap shadow-xs"
          >
            Add Date Off
          </button>
        </div>

        <div className="pt-1">
          {workingHours.blackoutDates.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No blackout dates currently registered.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {workingHours.blackoutDates.map((dStr) => (
                <div
                  key={dStr}
                  className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-800 flex items-center gap-2 font-mono font-medium"
                >
                  <span>{dStr}</span>
                  <button
                    onClick={() => handleRemoveBlackoutDate(dStr)}
                    className="text-rose-600 hover:text-rose-800 cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
