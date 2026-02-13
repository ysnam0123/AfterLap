export const formatDateTime = (iso: string) => {
  return new Date(iso).toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export type SessionStatus = 'upcoming' | 'ongoing' | 'finished';

export const getSessionStatus = (
  dateStart: string,
  dateEnd: string,
  now: number = Date.now(),
): SessionStatus => {
  const start = new Date(dateStart).getTime();
  const end = new Date(dateEnd).getTime();

  if (now < start) return 'upcoming';
  if (now <= end) return 'ongoing';
  return 'finished';
};
