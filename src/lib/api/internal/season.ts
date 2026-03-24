import axios from 'axios';

// export const fetchMeetingsWithPodium = async (year: number) => {
//   const res = await axios.get('/api/season', {
//     params: { year },
//   });
//   return res.data;
// };
export async function fetchMeetingsWithPodium(year: number) {
  const res = await fetch(`/api/season?year=${year}`);
  const data = await res.json();

  return data.meetingStatus;
}
