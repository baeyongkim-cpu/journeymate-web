import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스마트 여행 빌더 | JourneyMate',
  description: '나만의 맞춤 한국 여행을 설계하세요. 방문할 장소, 숙박, 교통편 등을 선택하여 여행 일정을 커스터마이징 할 수 있습니다.',
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
