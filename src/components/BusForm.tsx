import React, { useState } from 'react';
import { BusData } from '../types';

interface BusFormProps {
  onSubmit: (data: BusData) => void;
}

const BusForm: React.FC<BusFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BusData>({
    busNumber: '',
    date: '',
    village: '',
    departureTime: '',
    arrivalTime: '',
    totalStudents: 0,
    travellingStudents: 0
  });

  const handleBusNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, busNumber: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.busNumber.length !== 4) {
      alert('Bus number must be exactly 4 digits');
      return;
    }
    onSubmit(formData);
    setFormData(prev => ({
      ...prev,
      date: '',
      village: '',
      departureTime: '',
      arrivalTime: '',
      totalStudents: 0,
      travellingStudents: 0
    }));
  };

  const validateTravellingStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > formData.totalStudents) {
      alert('Travelling students cannot exceed total students');
      return;
    }
    setFormData(prev => ({ ...prev, travellingStudents: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Number (4 digits)</label>
          <input
            type="text"
            pattern="\d{4}"
            maxLength={4}
            placeholder="Enter 4-digit bus number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.busNumber}
            onChange={handleBusNumberChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Village/City</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.village}
            onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Departure Time</label>
          <input
            type="time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.departureTime}
            onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
          <input
            type="time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.arrivalTime}
            onChange={(e) => setFormData(prev => ({ ...prev, arrivalTime: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Total Students</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.totalStudents}
            onChange={(e) => setFormData(prev => ({ ...prev, totalStudents: parseInt(e.target.value) }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Travelling Students</label>
          <input
            type="number"
            min="0"
            max={formData.totalStudents}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.travellingStudents}
            onChange={validateTravellingStudents}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Submit Entry
      </button>
    </form>
  );
};

export default BusForm;