import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '예측 리더보드 | AfterLap',
  description:
    '시즌 누적 예측 점수 순위를 확인하세요. F1 그랑프리 포디움 예측 시즌 랭킹.',
  openGraph: {
    title: '예측 리더보드 | AfterLap',
    description: 'F1 포디움 예측 시즌 누적 랭킹.',
    type: 'website',
  },
  alternates: {
    canonical: '/prediction/leaderboard',
  },
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
