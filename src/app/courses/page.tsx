"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { courses, CourseType } from "@/data/courses";
import { Clock, Moon, MapPin, DollarSign, Calendar, MessageCircle, Star, X, Sun, Sunset, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  const [activeFilter, setActiveFilter] = useState<'all' | CourseType>('all');

  const filters: { key: 'all' | CourseType; labelKo: string; labelEn: string }[] = [
    { key: 'all',       labelKo: '전체',   labelEn: 'All' },
    { key: 'day-trip',  labelKo: '당일',   labelEn: 'Day Trip' },
    { key: '1-night',   labelKo: '1박 2일', labelEn: '1 Night' },
    { key: '2-night',   labelKo: '2박 3일', labelEn: '2 Nights' },
    { key: '3-night',   labelKo: '3박 4일', labelEn: '3 Nights' },
    { key: '14-night',  labelKo: '일주',   labelEn: 'Grand Tour' },
  ];

  const filteredCourses = activeFilter === 'all' ? courses : courses.filter(c => c.type === activeFilter);

  const typeLabel = (type: CourseType) => {
    if (type === 'day-trip') return isEn ? 'Day Trip' : '당일';
    if (type === '1-night')  return isEn ? '1 Night / 2 Days' : '1박 2일';
    if (type === '2-night')  return isEn ? '2 Nights / 3 Days' : '2박 3일';
    if (type === '3-night')  return isEn ? '3 Nights / 4 Days' : '3박 4일';
    if (type === '14-night') return isEn ? '14 Nights / 15 Days' : '14박 15일';
    return '';
  };

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)] flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 bg-[var(--color-jm-navy)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("JourneyMate 추천 여정", "Recommended Journeys")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed break-keep whitespace-pre-line">
              {t(
                "여행의 일정을 정하기 어려우신가요?\nJourneyMate가 심혈을 기울여 기획한 테마 코스를 만나보세요.",
                "Finding it hard to plan your itinerary?\nDiscover theme courses meticulously curated by JourneyMate."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-12 px-4 sm:px-6 w-full max-w-[100vw] overflow-hidden bg-white/50">
        <div className="max-w-7xl mx-auto mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-jm-navy)] text-center mb-6">
            {t("원하시는 테마를 선택해 보세요", "Choose Your Theme")}
          </h2>
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => {
                  setActiveFilter(f.key);
                  const first = f.key === 'all' ? courses[0] : courses.find(c => c.type === f.key);
                  if (first) setSelectedCourse(first);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-300 cursor-pointer ${
                  activeFilter === f.key
                    ? 'bg-[var(--color-jm-navy)] text-white border-[var(--color-jm-navy)] shadow-md'
                    : 'bg-white text-[var(--color-jm-navy)] border-[var(--color-jm-border)] hover:border-[var(--color-jm-gold)] hover:text-[var(--color-jm-gold)]'
                }`}
              >
                {isEn ? f.labelEn : f.labelKo}
              </button>
            ))}
          </div>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="relative max-w-7xl mx-auto px-0 md:px-12 group">
          <button 
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-[40%] -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 text-[var(--color-jm-navy)] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-[40%] -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 text-[var(--color-jm-navy)] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 px-4 w-max max-w-full mx-auto"
          >
            {filteredCourses.map((course, index) => {
            const isSelected = selectedCourse.id === course.id;
            
            return (
              <div 
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                role="button"
                tabIndex={0}
                className={`snap-center shrink-0 w-[65vw] sm:w-[220px] md:w-[260px] group relative block rounded-2xl overflow-hidden transition-all duration-300 text-left cursor-pointer ${isSelected ? 'ring-4 ring-[var(--color-jm-gold)] shadow-xl transform scale-105' : 'shadow-md hover:shadow-lg opacity-80 hover:opacity-100'}`}
              >
                {/* Image Container - smaller aspect ratio */}
                <div className="aspect-[4/3] relative w-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  {/* Lighter Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 text-[var(--color-jm-gold)] fill-[var(--color-jm-gold)]" />
                    <span className="text-[10px] font-bold text-[var(--color-jm-navy)] tracking-wider">
                      {typeLabel(course.type)}
                    </span>
                  </div>

                  {/* Text Content - White text, lighter filter */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col justify-end">
                    <div className="text-lg md:text-xl font-bold text-white mb-1 leading-tight drop-shadow-md whitespace-pre-line break-keep">
                      {isEn ? course.titleEn : course.titleKo}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Selected Course Details Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCourse.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title & Subtitle for the selected course */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-jm-navy)] mb-4 font-serif whitespace-pre-line break-keep">
                {isEn ? selectedCourse.titleEn : selectedCourse.titleKo}
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-jm-gold)] font-light max-w-2xl mx-auto break-keep">
                {isEn ? selectedCourse.subtitleEn : selectedCourse.subtitleKo}
              </p>
            </div>

            {/* Meaning & Experiences */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-[var(--color-jm-navy)] mb-6 flex items-center gap-3 justify-center">
                <span className="w-6 h-[1px] bg-[var(--color-jm-gold)]"></span>
                {t("여행이 주는 의미", "Meaning of the Journey")}
                <span className="w-6 h-[1px] bg-[var(--color-jm-gold)]"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isEn ? selectedCourse.meaningEn : selectedCourse.meaningKo).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-jm-border)] flex flex-col gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--color-jm-cream)] flex items-center justify-center text-[var(--color-jm-gold)] font-serif text-lg font-bold">
                      0{idx + 1}
                    </div>
                    <h4 className="font-bold text-[var(--color-jm-navy)] text-lg leading-tight break-keep">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed break-keep">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-jm-border)]">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("기간", "Duration")}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-base text-[var(--color-jm-navy)]">
                      {isEn ? selectedCourse.details.duration.en : selectedCourse.details.duration.ko}
                    </span>
                    {selectedCourse.id === 'grand-tour-15d' ? (
                      <Link
                        href={`/courses/${selectedCourse.id}`}
                        className="px-3 py-1 text-xs border border-[var(--color-jm-gold)] bg-[var(--color-jm-gold)] text-white hover:bg-[var(--color-jm-navy)] hover:border-[var(--color-jm-navy)] rounded-full transition-all duration-300 font-bold cursor-pointer inline-flex items-center shadow-sm"
                      >
                        {t("특별 몰입형 페이지 보기", "View Immersive Page")}
                      </Link>
                    ) : (
                      <button
                        onClick={() => setIsScheduleOpen(true)}
                        className="px-3 py-1 text-xs border border-[var(--color-jm-gold)] text-[var(--color-jm-gold)] hover:bg-[var(--color-jm-gold)] hover:text-white rounded-full transition-all duration-300 font-medium cursor-pointer"
                      >
                        {t("세부일정 확인", "View Details")}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Moon className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("숙박", "Accommodation")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.accommodation.en : selectedCourse.details.accommodation.ko}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("추천 시기", "Best Timing")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.timing.en : selectedCourse.details.timing.ko}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <DollarSign className="w-4 h-4 text-[var(--color-jm-gold)]" /> {t("예상 가격", "Est. Price")}
                  </span>
                  <span className="font-medium text-base text-[var(--color-jm-navy)]">
                    {isEn ? selectedCourse.details.price.en : selectedCourse.details.price.ko}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a 
                href={`https://wa.me/821099008210?text=${encodeURIComponent(`Hello! I'm interested in booking [${selectedCourse.titleEn}].`)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[var(--color-jm-navy)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-jm-gold)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                {t("이 여정으로 호스트와 상담하기", "Inquire about this Journey")}
              </a>
            </div>

          </motion.div>
        </AnimatePresence>
      </section>

      {/* Detailed Schedule Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsScheduleOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col relative border border-[var(--color-jm-border)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 md:p-8 bg-[var(--color-jm-navy)] text-white relative">
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white transition-opacity cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-jm-gold)] block mb-1">
                  {t("상세 세부 일정", "DETAILED ITINERARY")}
                </span>
                <h3 className="text-2xl font-bold tracking-tight mb-2 font-serif text-white">
                  {isEn ? selectedCourse.titleEn : selectedCourse.titleKo}
                </h3>
                <p className="text-white/85 text-xs font-light break-keep">
                  {isEn ? selectedCourse.subtitleEn : selectedCourse.subtitleKo}
                </p>
              </div>

              {/* Body (Timeline scroll) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[var(--color-jm-cream)]">
                {selectedCourse.schedule.map((dayPlan) => (
                  <div key={dayPlan.day} className="relative">
                    {/* Day Title */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-[var(--color-jm-gold)] text-white font-bold text-sm px-3 py-1 rounded-full shadow-sm">
                        Day 0{dayPlan.day}
                      </div>
                      <h4 className="font-bold text-[var(--color-jm-navy)] text-base tracking-tight">
                        {isEn ? dayPlan.themeEn : dayPlan.themeKo}
                      </h4>
                    </div>

                    {/* Timeline line */}
                    <div className="absolute left-5 top-12 bottom-4 w-[1px] bg-[var(--color-jm-gold)]/20" />

                    {/* Day Items */}
                    <div className="space-y-6 pl-10">
                      {dayPlan.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="relative flex flex-col md:flex-row md:items-start gap-1 md:gap-4 group">
                          {/* Dot on line */}
                          <div className="absolute -left-10 top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-jm-gold)] border border-white group-hover:scale-125 transition-transform duration-300" />
                          
                          {/* Time */}
                          <span className="text-xs font-bold text-[var(--color-jm-gold)] tracking-wider md:w-28 shrink-0">
                            {item.time}
                          </span>

                          {/* Activity */}
                          <span className="text-sm font-medium text-[var(--color-jm-text)] leading-relaxed break-keep">
                            {isEn ? item.activityEn : item.activityKo}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[var(--color-jm-border)] bg-white flex justify-end">
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-6 py-2.5 bg-[var(--color-jm-navy)] text-white text-sm font-bold rounded-full hover:bg-[var(--color-jm-gold)] transition-colors cursor-pointer"
                >
                  {t("닫기", "Close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Style to hide scrollbar for the slider */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
