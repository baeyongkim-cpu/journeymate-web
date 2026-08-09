"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Course } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Moon, MapPin, DollarSign, Calendar, MessageCircle, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CourseDetailClient({ course }: { course: Course }) {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  
  // For the accordion: keep track of which day is expanded. Default to day 1.
  const [expandedDay, setExpandedDay] = useState<number | null>(1);


  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] text-[var(--color-jm-text)]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-[var(--color-jm-navy)]">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60"
          style={{ backgroundImage: `url(${course.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-jm-navy)] via-transparent to-transparent opacity-90" />
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 w-full p-6 z-20">
          <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase text-sm font-bold tracking-wider">
            <ArrowLeft className="w-5 h-5" /> {t("전체 코스 보기", "Back to Courses")}
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
              {isEn ? course.titleEn : course.titleKo}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-jm-gold)] font-light max-w-3xl leading-relaxed">
              {isEn ? course.subtitleEn : course.subtitleKo}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Meaning & Experiences */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-jm-navy)] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--color-jm-gold)]"></span>
            {t("여행이 주는 의미", "Meaning of the Journey")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(isEn ? course.meaningEn : course.meaningKo).map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-jm-border)] flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-jm-cream)] flex items-center justify-center text-[var(--color-jm-gold)] font-serif text-xl font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-[var(--color-jm-navy)] text-xl leading-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-jm-navy)] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--color-jm-gold)]"></span>
            {t("상세 정보", "Journey Details")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[var(--color-jm-border)]">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <Clock className="w-5 h-5 text-[var(--color-jm-gold)]" /> {t("기간", "Duration")}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-lg text-[var(--color-jm-navy)]">
                  {isEn ? course.details.duration.en : course.details.duration.ko}
                </span>
                <a
                  href="#itinerary"
                  className="px-3 py-1 text-xs border border-[var(--color-jm-gold)] text-[var(--color-jm-gold)] hover:bg-[var(--color-jm-gold)] hover:text-white rounded-full transition-all duration-300 font-medium cursor-pointer"
                >
                  {t("세부일정 보기", "View Itinerary")}
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <Moon className="w-5 h-5 text-[var(--color-jm-gold)]" /> {t("숙박", "Accommodation")}
              </span>
              <span className="font-medium text-lg text-[var(--color-jm-navy)]">
                {isEn ? course.details.accommodation.en : course.details.accommodation.ko}
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <Calendar className="w-5 h-5 text-[var(--color-jm-gold)]" /> {t("추천 시기", "Best Timing")}
              </span>
              <span className="font-medium text-lg text-[var(--color-jm-navy)]">
                {isEn ? course.details.timing.en : course.details.timing.ko}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <DollarSign className="w-5 h-5 text-[var(--color-jm-gold)]" /> {t("예상 가격", "Est. Price")}
              </span>
              <span className="font-medium text-lg text-[var(--color-jm-navy)]">
                {isEn ? course.details.price.en : course.details.price.ko}
              </span>
            </div>
          </div>
        </div>

        {/* Accordion Schedule & Map Section */}
        {course.schedule && course.schedule.length > 0 && (
          <div id="itinerary" className="mb-16 pt-8">
            <h2 className="text-2xl font-bold text-[var(--color-jm-navy)] mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--color-jm-gold)]"></span>
              {t("상세 여정", "Detailed Itinerary")}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Accordion List */}
              <div className="flex flex-col gap-4">
                {course.schedule.map((dayPlan) => {
                  const isExpanded = expandedDay === dayPlan.day;
                  return (
                    <div 
                      key={dayPlan.day} 
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[var(--color-jm-gold)] shadow-md bg-white' : 'border-[var(--color-jm-border)] bg-[var(--color-jm-cream)] hover:bg-white'}`}
                    >
                      <button 
                        onClick={() => setExpandedDay(isExpanded ? null : dayPlan.day)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-sm font-bold px-3 py-1 rounded-full transition-colors ${isExpanded ? 'bg-[var(--color-jm-gold)] text-white' : 'bg-gray-200 text-gray-600'}`}>
                            Day {String(dayPlan.day).padStart(2, '0')}
                          </div>
                          <h4 className={`font-bold text-lg ${isExpanded ? 'text-[var(--color-jm-navy)]' : 'text-gray-700'}`}>
                            {isEn ? dayPlan.themeEn : dayPlan.themeKo}
                          </h4>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[var(--color-jm-gold)]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-0 border-t border-gray-100 mt-2">
                              <div className="space-y-4 pt-4 relative">
                                <div className="absolute left-2.5 top-6 bottom-4 w-[1px] bg-[var(--color-jm-gold)]/30" />
                                {dayPlan.items.map((item, itemIdx) => (
                                  <div key={itemIdx} className="relative flex flex-col md:flex-row gap-2 md:gap-4 pl-8 group">
                                    <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-jm-gold)] border-2 border-white" />
                                    <span className="text-sm font-bold text-[var(--color-jm-gold)] tracking-wider md:w-32 shrink-0 pt-0.5">
                                      {item.time}
                                    </span>
                                    <span className="text-[15px] font-medium text-gray-700 leading-relaxed break-keep">
                                      {isEn ? item.activityEn : item.activityKo}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Sticky Map Area */}
              <div className="sticky top-24 rounded-3xl overflow-hidden shadow-lg border border-[var(--color-jm-border)] bg-white h-[400px] lg:h-[600px] relative flex flex-col">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')" }}></div>
                <div className="relative z-10 flex flex-col h-full items-center justify-center p-8 text-center bg-black/20 backdrop-blur-sm">
                  <MapPin className="w-16 h-16 text-[var(--color-jm-gold)] mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">
                    {t("여정 지도", "Journey Map")}
                  </h3>
                  <p className="text-white/90">
                    {expandedDay 
                      ? t(`Day ${expandedDay}의 경로를 확인하세요.`, `View the route for Day ${expandedDay}.`) 
                      : t("지도를 통해 전체 이동 경로를 파악할 수 있습니다.", "Explore the full travel route on the map.")}
                  </p>
                  
                  {/* Decorative element to simulate map routes */}
                  <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 w-full max-w-sm">
                    <div className="flex items-center justify-between text-white text-sm font-bold">
                      <span>{t("출발", "Start")}</span>
                      <div className="flex-1 h-[1px] bg-dashed border-b border-white/50 mx-4"></div>
                      <span className="text-[var(--color-jm-gold)]">
                        Day {expandedDay || "1"}
                      </span>
                      <div className="flex-1 h-[1px] bg-dashed border-b border-white/50 mx-4"></div>
                      <span>{t("종료", "End")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href={`https://wa.me/821099008210?text=${encodeURIComponent(`Hello! I'm interested in booking [${course.titleEn}].`)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[var(--color-jm-navy)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-jm-gold)] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            {t("호스트에게 1:1 상담 예약하기", "Book 1:1 Consultation with Host")}
          </a>
        </div>

      </section>
    </div>
  );
}
