import { Session } from '@/types/meeting';

export const isSessionFinished = (session: Session) => {
  return new Date(session.date_end).getTime() <= Date.now();
};
