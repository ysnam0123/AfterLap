export function formatDuration(seconds: number | null): string {
  if (seconds == null) return '-';

  const totalMs = Math.floor(seconds * 1000);

  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);

  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);

  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  const pad = (n: number, l = 2) => n.toString().padStart(l, '0');

  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}
