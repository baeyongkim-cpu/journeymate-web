import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한국의 장면들 | JourneyMate',
  description: '당신이 꿈꾸는 한국의 여행지를 탐색해 보세요. 지역별 아름다운 명소와 숨겨진 스팟들을 소개합니다.',
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
