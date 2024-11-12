export interface BusData {
  busNumber: string;
  date: string;
  village: string;
  departureTime: string;
  arrivalTime: string;
  totalStudents: number;
  travellingStudents: number;
}

export interface DailyAnalysis extends BusData {
  delayedTime: number;
  arrivalStatus: 'early' | 'on-time' | 'delayed';
}

export interface ArrivalAnalysis {
  status: 'early' | 'on-time' | 'delayed';
  minutes: number;
}