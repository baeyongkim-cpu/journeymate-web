"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();
  
  const isKo = lang === "ko";

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand & Info */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-2">JourneyMate</h2>
          <p className="text-sm text-gray-500 mb-1">
            {isKo ? "당신의 여행을 한 편의 영화처럼 기록합니다." : "Capture your trip like a movie."}
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} JourneyMate. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 font-medium">
          <Link href="/terms" className="hover:text-blue-600 transition-colors">
            {isKo ? "이용약관" : "Terms of Service"}
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">
            {isKo ? "개인정보처리방침" : "Privacy Policy"}
          </Link>
          <a href="mailto:baeyongkim@gmail.com" className="hover:text-blue-600 transition-colors">
            {isKo ? "고객센터" : "Contact Us"}
          </a>
        </div>

      </div>
    </footer>
  );
}
