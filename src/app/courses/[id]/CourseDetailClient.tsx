"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Course } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Moon, MapPin, DollarSign, Calendar, MessageCircle, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CourseDetailClient({ course }: { course: Course }) {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

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
                <button
                  onClick={() => setIsScheduleOpen(true)}
                  className="px-3 py-1 text-xs border border-[var(--color-jm-gold)] text-[var(--color-jm-gold)] hover:bg-[var(--color-jm-gold)] hover:text-white rounded-full transition-all duration-300 font-medium cursor-pointer"
                >
                  {t("세부일정 확인", "View Details")}
                </button>
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

        {/* CTA */}
        <div className="text-center">
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
                  {isEn ? course.titleEn : course.titleKo}
                </h3>
                <p className="text-white/85 text-xs font-light break-keep">
                  {isEn ? course.subtitleEn : course.subtitleKo}
                </p>
              </div>

              {/* Body (Timeline scroll) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[var(--color-jm-cream)]">
                {course.schedule.map((dayPlan) => (
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
    </div>
  );
}
