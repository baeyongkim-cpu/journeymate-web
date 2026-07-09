"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Hero Video (YouTube Sequence) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] md:w-[150vw] aspect-video">
          <iframe
            className="w-full h-full opacity-50 pointer-events-none"
            src="https://www.youtube.com/embed/2bOVs2HyTwQ?autoplay=1&mute=1&controls=0&loop=1&playlist=2bOVs2HyTwQ&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-5xl px-4 mt-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight"
        >
          {t("당신의 한국 여행,", "Your Trip to Korea,")} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            {t("퍼스널 프라이빗 맞춤 여정", "Personal Private Custom Journey")}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-md font-light leading-relaxed"
        >
          {t("숨겨진 매력적인 한국의 관광지부터 나만의 로컬 체험까지, 당신의 든든한 동행자가 되어 맞춤 여행을 함께합니다. 그리고 그 모든 눈부신 순간을 영원히 간직할 아름다운 사진과 영상으로 기록해 드립니다.", "From hidden attractive tourist spots in Korea to your own local experiences, we become your reliable companion and join your customized trip. And we record all those dazzling moments with beautiful photos and videos to keep forever.")}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Link href="/builder" className="inline-flex items-center justify-center font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-14 rounded-full px-8 text-lg w-full sm:w-auto gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            {t("나만의 여행 만들기", "Build My Trip")} <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/destinations" className="inline-flex items-center justify-center font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white/10 hover:bg-white/20 text-white hover:text-white h-14 rounded-full px-8 text-lg w-full sm:w-auto backdrop-blur-md border-white/20">
            {t("테마 둘러보기", "Explore Themes")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
