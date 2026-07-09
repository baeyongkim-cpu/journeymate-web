import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '여행기 및 가이드 | JourneyMate',
  description: '한국 여행에 대한 유용한 가이드와 다채로운 여행기들을 확인해 보세요.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
