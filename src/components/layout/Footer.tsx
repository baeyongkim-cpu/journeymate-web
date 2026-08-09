"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { href: "/#philosophy", labelKo: "진심", labelEn: "Sincerity" },
    { href: "/#hosts", labelKo: "호스트", labelEn: "Hosts" },
    { href: "/destinations", labelKo: "목적지", labelEn: "Destinations" },
    { href: "/builder", labelKo: "여행 만들기", labelEn: "Create Journey" },
    { href: "/blog", labelKo: "매거진", labelEn: "Magazine" },
    { href: "/#contact", labelKo: "연락처", labelEn: "Contact" }
  ];

  return (
    <footer className="bg-[var(--color-jm-navy)] text-white py-16 md:py-20 font-sans border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">JourneyMate</h2>
            <p className="text-white/95 max-w-md text-base font-semibold leading-relaxed">
              {t("당신의 여행을 한 편의 영화처럼 기록하고, 호스트를 평생의 친구로 만들어드립니다.", "Capture your trip like a movie, cherish your host like a lifelong friend.")}
            </p>
            <p className="text-sm text-amber-200/90 font-medium">
              {t("우리는 일정을 팔지 않습니다. 영원히 기억될 아름다운 순간을 디자인합니다.", "We don't sell itineraries. We craft moments that linger in your heart forever.")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider mb-6 text-[var(--color-jm-gold)]">{t("메뉴", "Explore")}</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/90 hover:text-[var(--color-jm-gold)] transition-colors text-sm font-semibold tracking-wide">
                    {t(link.labelKo, link.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider mb-6 text-[var(--color-jm-gold)]">{t("문의처", "Contact")}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://wa.me/821099008210" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-[var(--color-jm-gold)] transition-colors text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span>📱</span> WhatsApp: +82-10-9900-8210
                </a>
              </li>
              <li>
                <a href="mailto:baeyongkim@gmail.com" className="text-white/90 hover:text-[var(--color-jm-gold)] transition-colors text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span>✉️</span> Email: baeyongkim@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/70 tracking-wider font-medium">
            © {new Date().getFullYear()} JourneyMate. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <span className="text-xs text-white/50 font-medium">v. 0.2.1</span>
            <Link href="/terms" className="text-xs text-white/70 hover:text-white transition-colors font-medium">
              {t("이용약관", "Terms of Service")}
            </Link>
            <Link href="/privacy" className="text-xs text-white/70 hover:text-white transition-colors font-medium">
              {t("개인정보처리방침", "Privacy Policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
