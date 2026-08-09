"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useLanguage } from "@/lib/LanguageContext";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 서브페이지에서는 항상 크림 스타일, 메인 페이지만 스크롤 기반
  const isHomePage = pathname === "/";
  const isLight = !isHomePage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/#philosophy", labelKo: "진심", labelEn: "Sincerity" },
    { href: "/#hosts", labelKo: "호스트", labelEn: "Hosts" },
    { href: "/destinations", labelKo: "목적지", labelEn: "Destinations" },
    { 
      labelKo: "여정", 
      labelEn: "Journey",
      children: [
        { href: "/courses", labelKo: "추천 여정", labelEn: "Recommended Journeys" },
        { href: "/builder", labelKo: "여정 만들기", labelEn: "Create Journey" },
        { href: "/archive", labelKo: "후기", labelEn: "Reviews" },
      ]
    },
    { href: "/blog", labelKo: "매거진", labelEn: "Magazine" },
    { href: "/#contact", labelKo: "연락처", labelEn: "Contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isLight ? 'bg-gradient-to-b from-[#FDFBF7]/95 to-[#FDFBF7]/80 backdrop-blur-md py-2' : 'bg-gradient-to-b from-black/60 to-transparent py-4'}`}>
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`font-sans font-black tracking-tighter text-3xl transition-colors ${isLight ? 'text-[var(--color-jm-navy)]' : 'text-white'}`}>
              JourneyMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                link.children ? (
                  <div key={link.labelEn} className="relative group">
                    <span className={`text-sm font-medium transition-colors tracking-wide cursor-pointer flex items-center gap-1 ${isLight ? 'text-jm-navy group-hover:text-jm-gold' : 'text-white/90 group-hover:text-white'}`}>
                      {t(link.labelKo, link.labelEn)}
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </span>
                    <div className="absolute top-full left-0 pt-4 hidden group-hover:block">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-48 flex flex-col">
                        {link.children.map(child => (
                          <Link 
                            key={child.href}
                            href={child.href}
                            className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[var(--color-jm-gold)] hover:bg-gray-50 transition-colors"
                          >
                            {t(child.labelKo, child.labelEn)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={link.href} 
                    href={link.href!} 
                    className={`text-sm font-medium transition-colors tracking-wide hover:text-jm-gold ${isLight ? 'text-jm-navy' : 'text-white/90 hover:text-white'}`}
                  >
                    {t(link.labelKo, link.labelEn)}
                  </Link>
                )
              ))}
            </div>

            <div className={`flex items-center gap-6 border-l pl-6 ${isLight ? 'border-jm-border' : 'border-white/20'}`}>
              <button
                onClick={() => setLang(lang === "ko" ? "en" : "ko")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  isLight 
                    ? 'border-jm-navy text-jm-navy hover:bg-jm-navy hover:text-white' 
                    : 'border-white/40 text-white hover:bg-white/20'
                }`}
                aria-label="Toggle language"
              >
                {lang === "ko" ? "English" : "한국어"}
              </button>
              
              {loading ? (
                <div className="w-16 h-4 bg-jm-border/50 animate-pulse rounded"></div>
              ) : user ? (
                <Link 
                  href="/mypage" 
                  className={`text-sm font-medium transition-colors tracking-wide ${isLight ? 'text-jm-navy hover:text-jm-gold' : 'text-white hover:text-jm-gold'}`}
                >
                  {t("마이페이지", "My Page")}
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className={`text-sm font-medium transition-colors tracking-wide ${isLight ? 'text-jm-navy hover:text-jm-gold' : 'text-white hover:text-jm-gold'}`}
                >
                  {t("로그인", "Login")}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${isLight ? 'border-jm-navy text-jm-navy' : 'border-white/40 text-white'}`}
              aria-label="Toggle language"
            >
              {lang === "ko" ? "EN" : "KR"}
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className={`p-2 transition-colors ${isLight ? 'text-jm-navy' : 'text-white'}`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer (Must be outside nav to avoid backdrop-blur fixed positioning bug) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 lg:hidden"
              style={{ zIndex: 9998 }}
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[75vw] max-w-sm bg-[#FDFBF7] flex flex-col pt-16 px-8 lg:hidden shadow-2xl overflow-y-auto"
              style={{ zIndex: 9999 }}
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 p-2 text-[#0F2C59]"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="flex flex-col mt-4">
                {[
                  { href: "/#philosophy", labelKo: "진심", labelEn: "Sincerity" },
                  { href: "/#hosts", labelKo: "호스트", labelEn: "Hosts" },
                  { href: "/destinations", labelKo: "목적지", labelEn: "Destinations" },
                  { href: "/courses", labelKo: "추천 여정", labelEn: "Recommended Journeys" },
                  { href: "/builder", labelKo: "여정 만들기", labelEn: "Create Journey" },
                  { href: "/archive", labelKo: "후기", labelEn: "Reviews" },
                  { href: "/blog", labelKo: "매거진", labelEn: "Magazine" },
                  { href: "/#contact", labelKo: "연락처", labelEn: "Contact" }
                ].map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="py-5 border-b border-[#E8E2DB] text-xl font-bold text-[#0F2C59] tracking-tight hover:text-[#8C6D46] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(link.labelKo, link.labelEn)}
                  </Link>
                ))}
              </div>

              <div className="mt-10 mb-12">
                {loading ? (
                  <div className="w-full h-12 bg-gray-200 animate-pulse rounded-full"></div>
                ) : user ? (
                  <Link 
                    href="/mypage" 
                    className="block text-center py-4 bg-[#0F2C59] text-white rounded-full font-bold text-sm tracking-wide shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("마이페이지 보기", "View My Page")}
                  </Link>
                ) : (
                  <Link 
                    href="/login" 
                    className="block text-center py-4 bg-[#0F2C59] text-white rounded-full font-bold text-sm tracking-wide shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("로그인 / 회원가입", "Login / Sign Up")}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
