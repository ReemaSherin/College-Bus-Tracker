import React, { useState } from 'react';
import { Bus, Clock, Users } from 'lucide-react';
import BusForm from './components/BusForm';
import AnalysisTable from './components/AnalysisTable';
import { BusData, DailyAnalysis } from './types';
import { analyzeArrivalTime } from './utils/timeCalculations';

function App() {
  const [busData, setBusData] = useState<Record<string, DailyAnalysis[]>>({});

  const handleSubmit = (data: BusData) => {
    const arrivalAnalysis = analyzeArrivalTime(data.arrivalTime);
    
    setBusData(prev => ({
      ...prev,
      [data.busNumber]: [
        ...(prev[data.busNumber] || []),
        {
          ...data,
          delayedTime: arrivalAnalysis.status === 'delayed' ? arrivalAnalysis.minutes : 0,
          arrivalStatus: arrivalAnalysis.status
        }
      ]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bus className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">College Bus Tracker</h1>
          </div>
          <p className="text-gray-600">Target Arrival Time: 8:15 AM</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Daily Entry</h2>
            </div>
            <BusForm onSubmit={handleSubmit} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Analysis Dashboard</h2>
            </div>
            <AnalysisTable busData={busData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;