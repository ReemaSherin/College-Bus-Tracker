export const TARGET_ARRIVAL_TIME = '08:15';

export const analyzeArrivalTime = (arrivalTime: string): ArrivalAnalysis => {
  const [targetHour, targetMin] = TARGET_ARRIVAL_TIME.split(':').map(Number);
  const [arrHour, arrMin] = arrivalTime.split(':').map(Number);
  
  const targetMinutes = targetHour * 60 + targetMin;
  const arrivalMinutes = arrHour * 60 + arrMin;
  const diffMinutes = arrivalMinutes - targetMinutes;
  
  if (diffMinutes === 0) {
    return { status: 'on-time', minutes: 0 };
  } else if (diffMinutes > 0) {
    return { status: 'delayed', minutes: diffMinutes };
  } else {
    return { status: 'early', minutes: Math.abs(diffMinutes) };
  }
};

export const formatTimeWithStatus = (analysis: ArrivalAnalysis): string => {
  const { status, minutes } = analysis;
  if (status === 'on-time') return 'On Time';
  return `${status === 'early' ? 'Early' : 'Delayed'} by ${minutes} min`;
};