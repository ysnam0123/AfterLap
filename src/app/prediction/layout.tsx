import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '레이스 예측 | AfterLap',
  description:
    '다음 F1 그랑프리의 포디움(P1, P2, P3)을 예측하고 시즌 누적 점수를 쌓아보세요.',
  openGraph: {
    title: '레이스 예측 | AfterLap',
    description:
      '다음 F1 그랑프리의 포디움을 예측하고 친구들과 점수를 겨뤄보세요.',
    type: 'website',
  },
  alternates: {
    canonical: '/prediction',
  },
};

export default function PredictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
