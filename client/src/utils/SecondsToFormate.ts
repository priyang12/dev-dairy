import { secondsToHours, secondsToMinutes } from 'date-fns';

function toDaysMinutesSeconds(totalSeconds: number, Formate?: string): any {
  const seconds = totalSeconds % 60;
  const minutes = secondsToMinutes(totalSeconds) % 60;
  const hours = secondsToHours(totalSeconds) % 24;
  const days = Math.floor(totalSeconds / 86400);

  if (Formate === 'hh:mm:ss') {
    return `${hours}:${minutes}:${seconds}`;
  }
  if (Formate === 'mm:ss') {
    return `${minutes}:${seconds}`;
  }
  if (Formate === 'ss') {
    return `${seconds}`;
  }
  if (Formate === 'dd:hh:mm:ss') {
    return `${days}:${hours}:${minutes}:${seconds}`;
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export { toDaysMinutesSeconds };
