"use client";

import { useState } from "react";
import Link from 'next/link';
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/destinations", labelKo: "목적지", labelEn: "Destinations" },
    { href: "/builder", labelKo: "여행 만들기", labelEn: "Build Your Trip" },
    { href: "/blog", labelKo: "매거진", labelEn: "Magazine" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="font-bold text-2xl tracking-tight">Journey<span className="text-blue-600">Mate</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-blue-600 transition-colors">
                {t(link.labelKo, link.labelEn)}
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-4 border-l pl-6 border-gray-200 dark:border-gray-800">
              {loading ? (
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
              ) : user ? (
                <Link href="/mypage" className="text-sm font-medium hover:text-blue-600 transition-colors">
                  {t("마이페이지", "My Page")}
                </Link>
              ) : (
                <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
                  {t("로그인", "Login")}
                </Link>
              )}

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === "ko" ? "en" : "ko")}
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Toggle for Mobile */}
            <button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="block text-base font-medium py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.labelKo, link.labelEn)}
                </Link>
              ))}

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                {loading ? (
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                ) : user ? (
                  <Link 
                    href="/mypage" 
                    className="block text-base font-medium py-2 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("마이페이지", "My Page")}
                  </Link>
                ) : (
                  <Link 
                    href="/login" 
                    className="block text-base font-medium py-2 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("로그인", "Login")}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
