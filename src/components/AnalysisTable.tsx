import React from 'react';
import { DailyAnalysis } from '../types';
import { formatTimeWithStatus } from '../utils/timeCalculations';

interface AnalysisTableProps {
  busData: Record<string, DailyAnalysis[]>;
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ busData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'early': return 'text-green-600';
      case 'on-time': return 'text-blue-600';
      case 'delayed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const calculateAverages = (data: DailyAnalysis[]) => {
    if (data.length === 0) return null;
    
    const last3Days = data.slice(-3);
    const statusCounts = last3Days.reduce((acc, curr) => {
      acc[curr.arrivalStatus] = (acc[curr.arrivalStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      avgDeparture: averageTime(last3Days.map(d => d.departureTime)),
      avgArrival: averageTime(last3Days.map(d => d.arrivalTime)),
      avgStudents: Math.round(last3Days.reduce((acc, curr) => acc + curr.travellingStudents, 0) / last3Days.length),
      avgDelay: Math.round(last3Days.reduce((acc, curr) => acc + (curr.delayedTime || 0), 0) / last3Days.length),
      statusSummary: statusCounts
    };
  };

  const averageTime = (times: string[]) => {
    const totalMinutes = times.reduce((acc, time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return acc + hours * 60 + minutes;
    }, 0);
    
    const avgMinutes = Math.round(totalMinutes / times.length);
    const hours = Math.floor(avgMinutes / 60);
    const minutes = avgMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div className="overflow-x-auto">
      {Object.entries(busData).map(([busNumber, data]) => {
        const averages = calculateAverages(data);
        const last3Days = data.slice(-3);

        return (
          <div key={busNumber} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{busNumber} Analysis</h3>
            
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Last 3 Days Data</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Village</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Arrival</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {last3Days.map((day, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 text-sm text-gray-900">{day.date}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{day.village}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{day.departureTime}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{day.arrivalTime}</td>
                      <td className={`px-4 py-2 text-sm font-medium ${getStatusColor(day.arrivalStatus)}`}>
                        {formatTimeWithStatus({ status: day.arrivalStatus, minutes: day.delayedTime })}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{day.travellingStudents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {averages && (
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-md font-medium mb-2">3-Day Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Departure</p>
                    <p className="text-lg font-semibold">{averages.avgDeparture}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Arrival</p>
                    <p className="text-lg font-semibold">{averages.avgArrival}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Students</p>
                    <p className="text-lg font-semibold">{averages.avgStudents}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival Pattern</p>
                    <div className="text-sm">
                      <span className="text-green-600">Early: {averages.statusSummary.early || 0}</span>
                      <span className="mx-1">|</span>
                      <span className="text-blue-600">On-time: {averages.statusSummary['on-time'] || 0}</span>
                      <span className="mx-1">|</span>
                      <span className="text-red-600">Delayed: {averages.statusSummary.delayed || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnalysisTable;