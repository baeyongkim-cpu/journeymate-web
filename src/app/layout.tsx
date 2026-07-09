import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AuthProvider } from "@/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JourneyMate | 당신의 한국 여행을 한 편의 영화처럼",
  description: "한국의 트렌디한 장소에서 프라이빗 스냅 촬영과 맞춤형 동행을 즐겨보세요. JourneyMate와 함께 특별한 순간을 기록하세요.",
  keywords: "JourneyMate, 한국 여행, 스냅 촬영, 프라이빗 투어, 여행 스냅, 동행 서비스, Korea travel, snap photography, private tour",
  openGraph: {
    title: "JourneyMate | 당신의 한국 여행을 한 편의 영화처럼",
    description: "한국의 트렌디한 장소에서 프라이빗 스냅 촬영과 맞춤형 동행을 즐겨보세요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
