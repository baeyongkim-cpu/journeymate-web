"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Course } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Moon, MapPin, MessageCircle, ArrowLeft, ChevronDown, ChevronUp, Calendar, Wallet, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface GrandTourClientProps {
  course: Course;
  isEmbedded?: boolean;
}

export default function GrandTourClient({ course, isEmbedded = false }: GrandTourClientProps) {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  
  // Track the currently active day based on scroll position
  const [activeDay, setActiveDay] = useState(1);
  // Track which days are expanded (accordion)
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  const [mapZoom, setMapZoom] = useState(1);

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  // Maps day number to specific locations for the map visual
  const dayLocations: Record<number, { ko: string, en: string }> = {
  1: { ko: "인천", en: "Incheon" },
  2: { ko: "서울", en: "Seoul" },
  3: { ko: "고성 · 속초", en: "Goseong · Sokcho" },
  4: { ko: "동해안 · 영덕", en: "East Coast · Yeongdeok" },
  5: { ko: "경주", en: "Gyeongju" },
  6: { ko: "울산 · 부산", en: "Ulsan · Busan" },
  7: { ko: "부산", en: "Busan" },
  8: { ko: "여수", en: "Yeosu" },
  9: { ko: "순천 · 진도", en: "Suncheon · Jindo" },
  10: { ko: "제주도 북부", en: "North Jeju" },
  11: { ko: "제주도 남부", en: "South Jeju" },
  12: { ko: "광주", en: "Gwangju" },
  13: { ko: "전주 · 대전", en: "Jeonju · Daejeon" },
  14: { ko: "부여 · 공주", en: "Buyeo · Gongju" },
  15: { ko: "인천", en: "Incheon" }
};

// 위도/경도 기반 1772x1672 지도상의 정밀 비율 좌표
const dayCoordinates: Record<number, { top: string, left: string }> = {
  1: { top: "24.5%", left: "29.3%" },  // 인천
  2: { top: "22.7%", left: "32.9%" },  // 서울
  3: { top: "11.8%", left: "54.6%" },  // 고성/속초
  4: { top: "42.3%", left: "65.3%" },  // 동해안(영덕)
  5: { top: "51.7%", left: "62.9%" },  // 경주
  6: { top: "57.1%", left: "64.1%" },  // 울산
  7: { top: "63.2%", left: "60.9%" },  // 부산
  8: { top: "70.1%", left: "42.1%" },  // 여수
  9: { top: "74.9%", left: "23.4%" },  // 진도
  10: { top: "91.6%", left: "27.0%" }, // 제주도 북부(제주시)
  11: { top: "95.7%", left: "27.4%" }, // 제주도 남부(서귀포시)
  12: { top: "63.5%", left: "31.3%" }, // 광주
  13: { top: "52.2%", left: "35.2%" }, // 전주/대전
  14: { top: "44.5%", left: "32.1%" }, // 부여/공주
  15: { top: "24.5%", left: "29.3%" }  // 인천
};

  // Intersection Observer to update activeDay
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const day = Number(entry.target.getAttribute("data-day"));
            if (day) setActiveDay(day);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when the item is in the upper middle part of the screen
        threshold: 0
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [course.schedule]);

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] relative flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      {!isEmbedded && (
        <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-[var(--color-jm-navy)] p-4 flex items-center justify-between shadow-md">
          <Link href="/courses" className="!text-white flex items-center gap-2 text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> {t("전체 코스", "All Courses")}
          </Link>
          <span className="text-[#F5D070] font-serif font-bold">
            Day {activeDay}
          </span>
        </div>
      )}

      {/* Left Side: Sticky Map Area */}
      <div className="md:w-1/2 md:sticky md:top-0 h-[50vh] md:h-screen bg-[var(--color-jm-navy)] relative overflow-hidden flex-shrink-0 z-10 flex items-center justify-center">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[var(--color-jm-navy)] via-transparent to-[var(--color-jm-navy)]" />
        
        {/* Navigation & Title for Desktop */}
        {!isEmbedded && (
          <div className="hidden md:block absolute top-8 left-8 z-20">
            <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:!text-white transition-colors uppercase text-sm font-bold tracking-wider">
              <ArrowLeft className="w-5 h-5" /> {t("전체 코스 보기", "Back to Courses")}
            </Link>
          </div>
        )}

        {/* The Korea Map Container */}
        <div className="relative w-[95%] md:w-[85%] max-w-[800px] aspect-[1772/1672] mx-auto z-10 opacity-80 mt-12 md:mt-24 overflow-hidden rounded-xl">
          
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 bg-[var(--color-jm-navy)]/80 backdrop-blur-md p-2 rounded-lg border border-[#F5D070]/30 shadow-xl">
            <button 
              onClick={() => setMapZoom(prev => Math.min(prev + 0.5, 3))}
              className="p-2 text-white hover:text-[#F5D070] transition-colors"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMapZoom(prev => Math.max(prev - 0.5, 1))}
              className="p-2 text-white hover:text-[#F5D070] transition-colors border-t border-white/20"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMapZoom(1)}
              className="p-2 text-white hover:text-[#F5D070] transition-colors border-t border-white/20"
              aria-label="Reset Zoom"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>

          <motion.div 
            className="w-full h-full"
            animate={{ 
              scale: mapZoom,
              transformOrigin: `${dayCoordinates[activeDay].left} ${dayCoordinates[activeDay].top}`
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <img 
              src="/korea-transparent.svg" 
              alt="Map of South Korea" 
              className="w-full h-full object-cover filter invert opacity-50 drop-shadow-2xl" 
            />
          
          {/* Connecting Lines (Trail) */}
          <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none drop-shadow-lg">
            {Array.from({ length: activeDay - 1 }).map((_, i) => {
              const fromDay = i + 1;
              const toDay = i + 2;
              const from = dayCoordinates[fromDay];
              const to = dayCoordinates[toDay];
              
              // Skip drawing a line if it's the exact same location
              if (from.left === to.left && from.top === to.top) return null;

              return (
                <motion.line
                  key={`line-${fromDay}-to-${toDay}`}
                  x1={from.left}
                  y1={from.top}
                  x2={to.left}
                  y2={to.top}
                  stroke="#F5D070"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          {/* Animated Map Marker */}
          <motion.div
            className="absolute w-8 h-8 md:w-10 md:h-10 -ml-4 -mt-8 md:-ml-5 md:-mt-10 text-[#F5D070]"
            initial={false}
            animate={{
              top: dayCoordinates[activeDay].top,
              left: dayCoordinates[activeDay].left,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1
            }}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="absolute inset-0 bg-[#F5D070] rounded-full animate-ping opacity-40"></div>
              <MapPin className="w-full h-full drop-shadow-lg z-10 fill-[var(--color-jm-navy)]" />
            </div>
          </motion.div>
        </motion.div>
        </div>

        {/* Dynamic Location Title Content */}
        <div className="absolute bottom-8 md:bottom-16 left-0 right-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none">
          <motion.div
            key={`map-title-${activeDay}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="!text-[#F5D070] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-1 drop-shadow-md">
              Journey Location
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold !text-white mb-4 leading-tight drop-shadow-xl" style={{ color: "white" }}>
              {isEn ? dayLocations[activeDay].en : dayLocations[activeDay].ko}
            </h2>
            
            <div className="bg-[var(--color-jm-navy)]/80 backdrop-blur-md border border-[#F5D070]/30 rounded-full px-6 py-2 !text-white font-bold text-sm md:text-base shadow-lg">
              Day {activeDay} <span className="!text-[#F5D070] font-normal mx-1">of</span> 15
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Scrollable Content Area */}
      <div className="md:w-1/2 flex-1 pb-32 pt-16 md:pt-0">
        {/* Intro Section */}
        <div className="p-8 md:p-16 pt-12 md:pt-24 bg-white">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-jm-navy)] mb-6 font-serif leading-tight">
            {isEn ? course.titleEn : course.titleKo}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light mb-10 leading-relaxed break-keep">
            {isEn ? course.subtitleEn : course.subtitleKo}
          </p>

          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#F5D070]" /> {t("기간", "Duration")}
              </span>
              <span className="font-bold text-[var(--color-jm-navy)] text-sm">{isEn ? course.details.duration.en : course.details.duration.ko}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <Moon className="w-4 h-4 text-[#F5D070]" /> {t("숙박", "Stay")}
              </span>
              <span className="font-bold text-[var(--color-jm-navy)] text-sm">{isEn ? course.details.accommodation.en : course.details.accommodation.ko}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-[#F5D070]" /> {t("추천 시기", "Timing")}
              </span>
              <span className="font-bold text-[var(--color-jm-navy)] text-sm">{isEn ? course.details.timing.en : course.details.timing.ko}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <Wallet className="w-4 h-4 text-[#F5D070]" /> {t("판매가", "Price")}
              </span>
              <span className="font-bold text-[var(--color-jm-navy)] text-sm">{isEn ? course.details.price.en : course.details.price.ko}</span>
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="px-6 md:px-12 xl:px-16 py-12 bg-[var(--color-jm-cream)] space-y-12">
          {course.schedule.map((dayPlan, index) => {
            const isExpanded = !!expandedDays[dayPlan.day];
            
            return (
              <div 
                key={dayPlan.day} 
                className="relative"
                data-day={dayPlan.day}
                ref={(el) => {
                  if (itemRefs.current) {
                    itemRefs.current[index] = el;
                  }
                }}
              >
                {/* Connecting Line */}
                {index !== course.schedule.length - 1 && (
                  <div className="hidden md:block absolute left-[31px] top-16 bottom-[-48px] w-0.5 bg-[#F5D070]/30 z-0" />
                )}

                <div className={`relative z-10 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${isExpanded ? 'border-2 border-[#F5D070]' : 'border border-[var(--color-jm-border)]'}`}>
                  
                  {/* Summary Card Header (Always Visible) */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 items-start cursor-pointer" onClick={() => toggleDay(dayPlan.day)}>
                    {/* Day Badge */}
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--color-jm-navy)] text-[#F5D070] flex flex-col items-center justify-center font-bold">
                      <span className="text-[9px] md:text-[11px] uppercase tracking-widest leading-none mb-1">Day</span>
                      <span className="text-xl md:text-2xl leading-none">{dayPlan.day}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full pt-1">
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--color-jm-navy)] mb-2 leading-snug">
                        {isEn ? dayPlan.themeEn : dayPlan.themeKo}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-jm-gold)] hover:text-[var(--color-jm-navy)] transition-colors mt-4">
                        {isExpanded ? t("세부 정보 접기", "Hide Details") : t("세부 일정 펼치기", "View Details")}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detailed Itinerary */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-50/50 p-6 md:p-8 border-t border-[var(--color-jm-border)]">
                          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                            {t("시간별 상세 일정", "Timeline Itinerary")}
                          </h4>
                          
                          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                            {dayPlan.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                {/* Timeline Dot */}
                                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-[var(--color-jm-gold)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-0.5 md:ml-0" />
                                
                                {/* Content Box */}
                                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:border-[var(--color-jm-gold)] transition-colors ml-4 md:ml-0">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-[var(--color-jm-gold)] font-mono">{item.time}</span>
                                    <span className="text-sm font-medium text-[var(--color-jm-navy)] break-keep leading-relaxed">
                                      {isEn ? item.activityEn : item.activityKo}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="p-8 md:p-16 bg-white text-center border-t border-[var(--color-jm-border)]">
          <h2 className="text-2xl font-bold text-[var(--color-jm-navy)] mb-4 font-serif">
            {t("나를 찾는 15일간의 여정", "15 Days to Find Yourself")}
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto break-keep">
            {t("단순한 관광을 넘어 의미를 찾는 특별한 여정을 기획해보세요.", "Plan your extraordinary journey to find meaning beyond simple sightseeing.")}
          </p>
          <a 
            href={`https://wa.me/821099008210?text=${encodeURIComponent(`Hello! I'm interested in booking [${course.titleEn}].`)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[var(--color-jm-gold)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-jm-navy)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 w-full md:w-auto"
          >
            <MessageCircle className="w-6 h-6" />
            {t("여정 상담 예약하기", "Book Consultation")}
          </a>
        </div>
      </div>
    </div>
  );
}
